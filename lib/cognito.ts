import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminDeleteUserCommand,
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallengeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ListUsersCommand,
  type UserType,
} from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from "crypto";

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION ?? "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID!;
const CLIENT_ID = process.env.COGNITO_CLIENT_ID!;
const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET!;

function computeSecretHash(username: string): string {
  return createHmac("sha256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64");
}

export interface CognitoUser {
  username: string;
  email: string;
  role: string;
  customerId: string;
  status: string;
  enabled: boolean;
  createdAt: Date | undefined;
}

function parseUser(user: UserType): CognitoUser {
  const attrs = user.Attributes ?? [];
  const get = (name: string) =>
    attrs.find((a) => a.Name === name)?.Value ?? "";
  return {
    username: user.Username ?? "",
    email: get("email"),
    role: get("custom:role") || "customer",
    customerId: get("custom:customer_id") || "",
    status: user.UserStatus ?? "",
    enabled: user.Enabled ?? true,
    createdAt: user.UserCreateDate,
  };
}

export async function listCognitoUsers(): Promise<CognitoUser[]> {
  const res = await cognito.send(
    new ListUsersCommand({ UserPoolId: USER_POOL_ID })
  );
  return (res.Users ?? []).map(parseUser);
}

export async function listUsersByCustomerId(
  customerId: string
): Promise<CognitoUser[]> {
  const res = await cognito.send(
    new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      Filter: `"custom:customer_id" = "${customerId}"`,
    })
  );
  return (res.Users ?? []).map(parseUser);
}

export async function createCognitoUser(
  email: string,
  role: string,
  customerId: string
): Promise<{ user: CognitoUser; tempPassword: string }> {
  const tempPassword =
    "Tmp!" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);

  const res = await cognito.send(
    new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
        { Name: "custom:role", Value: role },
        { Name: "custom:customer_id", Value: customerId },
      ],
      MessageAction: "SUPPRESS",
    })
  );

  await cognito.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: tempPassword,
      Permanent: false,
    })
  );

  return {
    user: parseUser(res.User ?? ({} as UserType)),
    tempPassword,
  };
}

export async function createCognitoUserWithPassword(
  email: string,
  password: string,
  role: string,
  customerId: string
): Promise<CognitoUser> {
  const res = await cognito.send(
    new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "email_verified", Value: "true" },
        { Name: "custom:role", Value: role },
        { Name: "custom:customer_id", Value: customerId },
      ],
      MessageAction: "SUPPRESS",
    })
  );

  await cognito.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: password,
      Permanent: true,
    })
  );

  return parseUser(res.User ?? ({} as UserType));
}

export async function deleteCognitoUser(username: string): Promise<void> {
  await cognito.send(
    new AdminDeleteUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
    })
  );
}

// --- Authentication ---

export interface AuthSuccess {
  success: true;
  idToken: string;
}

export interface AuthChallenge {
  challenge: "NEW_PASSWORD_REQUIRED";
  session: string;
}

export type AuthResult = AuthSuccess | AuthChallenge;

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthResult> {
  const res = await cognito.send(
    new AdminInitiateAuthCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: computeSecretHash(email),
      },
    })
  );

  if (res.ChallengeName === "NEW_PASSWORD_REQUIRED") {
    return { challenge: "NEW_PASSWORD_REQUIRED", session: res.Session! };
  }

  return { success: true, idToken: res.AuthenticationResult!.IdToken! };
}

export async function respondToNewPasswordChallenge(
  email: string,
  newPassword: string,
  session: string
): Promise<AuthSuccess> {
  const res = await cognito.send(
    new AdminRespondToAuthChallengeCommand({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      Session: session,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: newPassword,
        SECRET_HASH: computeSecretHash(email),
      },
    })
  );

  return { success: true, idToken: res.AuthenticationResult!.IdToken! };
}

export function parseIdToken(idToken: string): {
  email: string;
  role: string;
  customerId: string;
} {
  const payload = JSON.parse(
    Buffer.from(idToken.split(".")[1], "base64url").toString()
  );
  return {
    email: payload.email ?? "",
    role: payload["custom:role"] ?? "customer",
    customerId: payload["custom:customer_id"] ?? "",
  };
}

export async function forgotPassword(email: string): Promise<void> {
  await cognito.send(
    new ForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
      SecretHash: computeSecretHash(email),
    })
  );
}

export async function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string
): Promise<void> {
  await cognito.send(
    new ConfirmForgotPasswordCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
      SecretHash: computeSecretHash(email),
    })
  );
}
