import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.S3_BUCKET_NAME ?? "claudje-portal-data";

export async function getJsonFromS3<T = unknown>(key: string): Promise<T | null> {
  try {
    const res = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const body = await res.Body?.transformToString();
    return body ? (JSON.parse(body) as T) : null;
  } catch {
    return null;
  }
}

export async function listS3Objects(prefix: string) {
  const res = await s3.send(
    new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix })
  );
  return (res.Contents ?? []).map((obj) => ({
    key: obj.Key!,
    lastModified: obj.LastModified,
    size: obj.Size,
  }));
}

export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function putJsonToS3(key: string, data: unknown): Promise<void> {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: "application/json",
      Body: JSON.stringify(data, null, 2),
    })
  );
}

export async function getTextFromS3(key: string): Promise<string | null> {
  try {
    const res = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const body = await res.Body?.transformToString();
    return body ?? null;
  } catch {
    return null;
  }
}

export async function getDownloadUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function getInlineUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentDisposition: "inline",
    ResponseContentType: "application/pdf",
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function listCustomerIds(): Promise<string[]> {
  const res = await s3.send(
    new ListObjectsV2Command({ Bucket: bucket, Delimiter: "/" })
  );
  return (res.CommonPrefixes ?? [])
    .map((p) => p.Prefix?.replace(/\/$/, "") ?? "")
    .filter((id) => id && id !== "all");
}
