# AWS Infrastructure Setup — Claudje

Owner: Berend (Berend's AWS account)
Region: eu-north-1 (Stockholm)

Berend is responsible for creating all AWS resources listed below.
Wybe owns the domain (claudje.com on Namecheap) and the Vercel deployment.

---

## Overview: What Berend needs to create

| # | Resource | Type |
|---|----------|------|
| 1 | S3 bucket: `claudje-portal-data` | Storage |
| 2 | Cognito User Pool: `claudje-users` | Auth |
| 3 | IAM user: `wybe` | Human (console) |
| 4 | IAM user: `claudje-dev` | Machine (dev + portal runtime) |
| 5 | IAM user: `claudje-agent` | Machine (customer research) |
| 6 | SES domain verification | Email |

---

## 1. S3 Bucket

Create bucket: `claudje-portal-data`
- Region: eu-north-1
- Block all public access: YES
- Versioning: optional (not required for v1)

No special bucket policy needed — access is via IAM users.

## 2. Cognito User Pool

Create user pool: `claudje-users`

### User pool settings
- Sign-in: email only (no username)
- Password policy: minimum 8 characters
- MFA: off (for now)
- Email: Cognito default email sender (for password reset codes)
  - Later: switch to SES for custom sender domain (see section 7)

### Custom attributes (add these during pool creation)

| Attribute | Type | Mutable |
|-----------|------|---------|
| `custom:role` | String | Yes |
| `custom:customer_id` | String | Yes |
| `custom:plan` | String | Yes |

**Important:** Custom attributes cannot be added after pool creation. Make sure all three are created during setup.

### App client

Create app client: `claudje-web`
- Generate a client secret: YES
- Auth flows: check `ALLOW_ADMIN_USER_PASSWORD_AUTH`
- No hosted UI needed (we use our own login page)

### After creation, note down:
- User Pool ID (format: `eu-north-1_XXXXXXXXX`)
- App Client ID
- App Client Secret

Send these three values to Wybe — they go into the portal's environment variables.

## 3. IAM Users

Berend creates three IAM users on his AWS account:

### User 1: `wybe` (human — console access)

**Purpose:** Wybe can log into the AWS console to view resources, debug issues, and monitor usage.

**Setup:**
- Enable console access: YES
- Send Wybe the console login URL, username, and temporary password
- Require password change on first login

**Policies to attach:**
- `ReadOnlyAccess` (AWS managed policy — lets Wybe view everything without changing anything)
- Berend can upgrade to `AdministratorAccess` later if needed

**No access key needed** — this user is for browser-based console access only.

### User 2: `claudje-dev` (machine — development + portal runtime)

**Purpose:** This user serves two roles:
1. **Development:** Claude Code in the `dev/` folder uses these credentials to build and test AWS integrations (Cognito, S3, SES) during development
2. **Portal runtime:** The deployed portal on Vercel uses these same credentials to authenticate users via Cognito and read/write data on S3

**Policies to attach:**
- `AmazonS3FullAccess` (or scoped to bucket `claudje-portal-data`)
- `AmazonCognitoPowerUser` (for AdminCreateUser, AdminInitiateAuth, etc.)
- `AmazonSESFullAccess` (when SES is set up — for transactional and report emails)

**Setup:**
- Create an access key (Access Key ID + Secret Access Key)
- Send both values to Wybe

**Where Wybe stores these credentials:**
- Locally: `dev/.env.local` (gitignored — never committed)
- Production: Vercel dashboard → Environment Variables
- Claude Code has access to these credentials when working inside `dev/` because it reads `.env.local`

### User 3: `claudje-agent` (machine — customer research)

**Purpose:** Claude Code in the `customers/` folder uses these credentials to pull customer onboarding data from S3 and push finished reports back to S3. This user intentionally has narrow permissions — it should NOT be able to modify Cognito users, send emails, or access anything outside S3.

**Custom inline policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::claudje-portal-data",
        "arn:aws:s3:::claudje-portal-data/*"
      ]
    }
  ]
}
```

**Setup:**
- Create an access key (Access Key ID + Secret Access Key)
- Berend stores these in `customers/.env` on his own machine
- Berend also sends them to Wybe if Wybe needs to test the customers workflow

**Where credentials are stored:**
- `customers/.env` (gitignored — never committed)
- Claude Code has access to these credentials when working inside `customers/` because it reads `.env`

---

## 4. Credential Storage Summary

| Credential | Stored in | Who sets it up | Claude Code access? |
|------------|-----------|---------------|-------------------|
| `wybe` console login | AWS console (browser) | Berend creates, Wybe logs in | No — browser only |
| `claudje-dev` access key | `dev/.env.local` + Vercel env vars | Berend creates key, Wybe stores it | Yes — when working in `dev/` |
| `claudje-agent` access key | `customers/.env` | Berend creates key + stores it | Yes — when working in `customers/` |
| Cognito User Pool ID | `dev/.env.local` + Vercel env vars | Berend creates pool, Wybe stores values | Yes — when working in `dev/` |
| Cognito Client ID + Secret | `dev/.env.local` + Vercel env vars | Berend creates app client, Wybe stores values | Yes — when working in `dev/` |
| AUTH_SECRET | `dev/.env.local` + Vercel env vars | Wybe generates (`npx auth secret`) | Yes — when working in `dev/` |
| Stripe keys | `dev/.env.local` + Vercel env vars | Wybe (Stripe is Wybe's account) | Yes — when working in `dev/` |

**Important:** `.env.local` and `.env` are gitignored. Credentials never go into git. The `.env.example` and `.env.local.example` files show which variables are needed without revealing actual values.

---

## 5. Create Admin Users in Cognito

After the User Pool is created, manually create two admin users in the Cognito console:

| Email | `custom:role` | `custom:customer_id` | Purpose |
|-------|--------------|----------------------|---------|
| Wybe's email | `admin` | `all` | Portal admin access |
| Berend's email | `admin` | `all` | Portal admin access |

Both users will receive a temporary password via email and must change it on first login at `/login`.

## 6. Fill in Environment Variables

### dev/.env.local (Wybe fills this in after receiving values from Berend)

```
# Auth (Wybe generates this)
AUTH_SECRET=<generate with: npx auth secret>
NEXTAUTH_URL=http://localhost:3000

# AWS Cognito (from Berend)
COGNITO_USER_POOL_ID=eu-north-1_XXXXXXXXX
COGNITO_CLIENT_ID=<from app client>
COGNITO_CLIENT_SECRET=<from app client>

# AWS credentials — claudje-dev IAM user (from Berend)
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=<claudje-dev access key>
AWS_SECRET_ACCESS_KEY=<claudje-dev secret key>

# S3
S3_BUCKET_NAME=claudje-portal-data
```

For production (Vercel), set these same values as environment variables in the Vercel dashboard.

### customers/.env (Berend fills this in)

```
# AWS credentials — claudje-agent IAM user (S3 only)
AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=<claudje-agent access key>
AWS_SECRET_ACCESS_KEY=<claudje-agent secret key>
S3_BUCKET=claudje-portal-data
```

## 7. SES Setup (Berend — do this when ready for email)

1. Go to SES in eu-north-1 (or eu-west-1 if SES isn't available in Stockholm)
2. Verify domain: `claudje.com`
   - SES will provide DNS records (DKIM, SPF)
   - **Wybe adds these DNS records on Namecheap**
3. Request production access (SES starts in sandbox mode — can only send to verified emails)
4. The `claudje-dev` IAM user already has `AmazonSESFullAccess`, so the portal can send emails once SES is verified

SES will be used for:
- Transactional emails (password reset, welcome emails)
- Report delivery (PDF attached or download link)

## 8. Stripe (Wybe — set up later)

When ready, add these to `dev/.env.local` and Vercel:
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
```
