# Niagara Jr Elite — Next.js + Bootstrap

This is the Next.js conversion of the modern parallax site.

## Install & run
```bash
yarn
yarn dev
```

## Content management (DynamoDB + Admin)

This app now loads teams/sponsors/site copy from **DynamoDB** (instead of hardcoded `lib/*.ts`) and provides a Basic-Auth–protected admin UI.

### Required env vars
Create `.env.local` with:

```bash
REGION="us-east-1"
DYNAMODB_TABLE_NAME="niagara-jr-elite-content"

ADMIN_BASIC_AUTH_USER="admin"
ADMIN_BASIC_AUTH_PASS="change-me"
```

Amplify note: Amplify Hosting reserves env names starting with `AWS`. In Amplify, use `REGION` and `S3_BUCKET_NAME` instead of `AWS_REGION` and `AWS_S3_BUCKET_NAME`.

### DynamoDB table requirements
Create a DynamoDB table with:

- Partition key: `pk` (String)
- Sort key: `sk` (String)

No secondary indexes are required for the current query patterns.

### Seed the database (initial content)
Make sure AWS credentials are available in your shell first (for example via `AWS_PROFILE`, `aws configure`, or environment variables).

```bash
yarn seed
```

Then run:
```bash
yarn dev
```

Admin UI: `/admin`

## Image uploads (S3)

Admin pages include an S3 upload widget that uses **presigned PUT URLs**.

Add env vars:

```bash
REGION="us-east-1"
S3_BUCKET_NAME="your-bucket-name"

# Optional (recommended): if set, uploaded asset URLs will use CloudFront instead of direct S3 URLs
CLOUDFRONT_URL="https://d123456abcdef8.cloudfront.net"
```

Notes:
- The app assumes uploaded images are readable via a public URL. Configure bucket/prefix policy accordingly.
- Configure S3 CORS to allow browser `PUT` from your site/admin origin.

## Stripe donations

The donation page uses Stripe's embedded Payment Element. Add test keys to `.env.local`:

```bash
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

For local webhook testing, forward Stripe events to the app:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Use the `whsec_...` value printed by that command as `STRIPE_WEBHOOK_SECRET`. In production,
register `https://your-domain/api/stripe/webhook` for the `payment_intent.succeeded` event.
Every completed donation and sponsorship is recorded in a unified DynamoDB payment ledger using
partition key `PAYMENT` and the Stripe PaymentIntent ID as its sort key. The same atomic transaction
increments the current team's `raised` amount; player donations also increment that player's `raised`
amount. Stripe webhook retries are idempotent and cannot increment the totals twice.
The protected ledger is available at `/admin/payments` and as JSON at `/api/admin/payments`.

### Amplify payment configuration

Set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, and
`STRIPE_WEBHOOK_SECRET` in Amplify's environment variables. Use secret and publishable
keys from the same Stripe account and mode. Use the webhook signing secret for the
deployed endpoint, rather than the local Stripe CLI listener.

Amplify build variables are not automatically available to Next.js server routes.
The repository's `amplify.yml` runs the helper before building. Push that file and
`scripts/prepare-stripe-env.mjs` together so the next Amplify build uses them.
If managing build settings in the console instead, add the helper immediately before
your existing build command (keep the other commands, artifacts, and cache settings):

```yaml
build:
  commands:
    - node scripts/prepare-stripe-env.mjs
    - npm run build
```

The helper writes only the Stripe variables into the ignored `.env.production` file
without logging their values. It stops the build if either payment key is missing.
Do not put the secret key in `NEXT_PUBLIC_*` or `next.config.js`'s `env` option.
Redeploy after changing the environment variables or build settings.

If payment setup still returns 500, inspect the Amplify server logs for
`Unable to create Stripe PaymentIntent`. The following error distinguishes missing
runtime configuration from a rejected Stripe key or another Stripe API failure.

## Static export (GitHub Pages / Netlify)

Note: `next export` is only suitable for fully static sites. If you enable DynamoDB-backed content pages, static export will not work.

```bash
yarn export
```
Output: `out/`

## Notes
- Bootstrap CSS is imported in `app/layout.tsx`.
- Bootstrap JS bundle is loaded via CDN (for navbar collapse, carousel, accordion, modal).
- Parallax overlay movement uses `data-parallax` + a small client script.
- Images can be served from `/public/images/` and/or S3 (via uploaded URLs).
