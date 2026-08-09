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
AWS_REGION="us-east-1"
DYNAMODB_TABLE_NAME="niagara-jr-elite-content"

ADMIN_BASIC_AUTH_USER="admin"
ADMIN_BASIC_AUTH_PASS="change-me"
```

### DynamoDB table requirements
Create a DynamoDB table with:

- Partition key: `pk` (String)
- Sort key: `sk` (String)

No secondary indexes are required for the current query patterns.

### Seed the database (initial content)
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
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="your-bucket-name"

# Optional (recommended): if set, uploaded asset URLs will use CloudFront instead of direct S3 URLs
CLOUDFRONT_URL="https://d123456abcdef8.cloudfront.net"
```

Notes:
- The app assumes uploaded images are readable via a public URL. Configure bucket/prefix policy accordingly.
- Configure S3 CORS to allow browser `PUT` from your site/admin origin.

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
