# AWS Infrastructure Setup — Claudje

Owner: Berend
Region: eu-north-1 (Stockholm)

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

### Custom attributes (add these during pool creation)
| Attribute | Type | Mutable |
|-----------|------|---------|
| `custom:role` | String | Yes |
| `custom:customer_id` | String | Yes |
| `custom:plan` | String | Yes |

### App client
Create app client: `claudje-web`
- Generate a client secret: YES
- Auth flows: check `ALLOW_ADMIN_USER_PASSWORD_AUTH`
- No hosted UI needed (we use our own login page)

### After creation, note down:
- User Pool ID (format: `eu-north-1_XXXXXXXXX`)
- App Client ID
- App Client Secret

## 3. IAM Users

### User 1: `claudje-portal-s3`
Used by: the Vercel-deployed portal (needs full S3 + Cognito admin access)

**Policies to attach:**
- `AmazonS3FullAccess` (or scoped to bucket `claudje-portal-data`)
- `AmazonCognitoPowerUser` (for AdminCreateUser, AdminInitiateAuth, etc.)

Create access key → save Access Key ID + Secret.

### User 2: `claudje-agent`
Used by: Berend's customers/ folder (needs S3 read/write only)

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
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::claudje-portal-data",
        "arn:aws:s3:::claudje-portal-data/*"
      ]
    }
  ]
}
```

Create access key → save Access Key ID + Secret.

## 4. Create Admin User in Cognito

After everything is set up, manually create an admin user in the Cognito console:
- Email: wybe's or berend's email
- Set `custom:role` = `admin`
- Set `custom:customer_id` = `all`
- Send temporary password via email

This admin user can then log in to `/login` and access `/portal/admin`.

## 5. Fill in .env.local

Once all resources are created, fill in `/dev/.env.local`:

```
AUTH_SECRET=<generate with: npx auth secret>
NEXTAUTH_URL=http://localhost:3000

COGNITO_USER_POOL_ID=eu-north-1_XXXXXXXXX
COGNITO_CLIENT_ID=<from app client>
COGNITO_CLIENT_SECRET=<from app client>

AWS_REGION=eu-north-1
AWS_ACCESS_KEY_ID=<claudje-portal-s3 access key>
AWS_SECRET_ACCESS_KEY=<claudje-portal-s3 secret key>

S3_BUCKET_NAME=claudje-portal-data
```

For production (Vercel), set these same values as environment variables in the Vercel dashboard.

## 6. Stripe (placeholder — set up later)

When ready, add these to .env.local:
```
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
```
