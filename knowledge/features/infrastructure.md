# Infrastructure (AWS CDK)

## Overview

AWS infrastructure defined as code using AWS CDK with TypeScript. Supports multi-environment deployments (dev/prod) with serverless architecture.

## Architecture

```
packages/infrastructure/
├── bin/
│   └── app.ts           # CDK app entry point
├── lib/
│   ├── api-stack.ts     # API Gateway + Lambda
│   ├── database-stack.ts # DynamoDB tables
│   └── frontend-stack.ts # S3 + CloudFront
├── cdk.json             # CDK configuration
└── tsconfig.json
```

## Stacks

### DatabaseStack
DynamoDB tables for document storage.

**Resources:**
- `DocumentsTable` - Main documents table (pay-per-request)
  - Partition key: `pk` (String)
  - Sort key: `sk` (String)
  - GSI: `gsi-user-documents` for listing by user

**Cost Optimization:**
- Uses PAY_PER_REQUEST billing (no idle costs)
- Point-in-time recovery only in production

### ApiStack
API Gateway and Lambda function.

**Resources:**
- `ApiHandler` - Lambda function (Node.js 20.x)
- `WhiteboardApi` - REST API Gateway with proxy integration

**Configuration:**
- Memory: 512 MB
- Timeout: 30 seconds
- Log retention: 1 week
- Throttling: 50 req/s, burst 100

### FrontendStack
Static website hosting with CDN.

**Resources:**
- `WebsiteBucket` - S3 bucket (private)
- `Distribution` - CloudFront distribution
- Origin Access Identity for secure S3 access

**Features:**
- HTTPS redirect
- SPA routing (404 → index.html)
- Optimized caching

## Deployment

```bash
# Deploy to dev
npm run deploy:dev

# Deploy to production
npm run deploy:prod

# Preview changes
npm run --workspace=@whiteboardandcode/infrastructure diff

# Synthesize CloudFormation
npm run --workspace=@whiteboardandcode/infrastructure synth
```

## Environment Configuration

Environments are configured via CDK context:

```bash
cdk deploy --all -c environment=dev   # Development
cdk deploy --all -c environment=prod  # Production
```

**Environment Differences:**
| Setting | Dev | Prod |
|---------|-----|------|
| DynamoDB removal policy | DESTROY | RETAIN |
| Point-in-time recovery | No | Yes |
| S3 auto-delete objects | Yes | No |

## Stack Outputs

After deployment, these values are exported:

```
DocumentsTableName-{env}  # DynamoDB table name
ApiUrl-{env}              # API Gateway URL
FrontendBucket-{env}      # S3 bucket name
FrontendUrl-{env}         # CloudFront URL
```

## Cost Estimation (Low Traffic)

| Service | Monthly Cost |
|---------|--------------|
| Lambda | ~$0 (free tier) |
| API Gateway | ~$0 (free tier) |
| DynamoDB | ~$0 (pay-per-request) |
| S3 | ~$0.50 |
| CloudFront | ~$1.00 |
| **Total** | **~$1-2/month** |

## Key Files

| File | Purpose |
|------|---------|
| `bin/app.ts` | CDK app entry, stack instantiation |
| `lib/database-stack.ts` | DynamoDB table definition |
| `lib/api-stack.ts` | Lambda + API Gateway |
| `lib/frontend-stack.ts` | S3 + CloudFront |

## Prerequisites

1. AWS CLI configured with credentials
2. CDK bootstrapped: `cdk bootstrap aws://ACCOUNT/REGION`
3. Node.js 18+

## Security Considerations

- S3 bucket blocks all public access
- CloudFront uses Origin Access Identity
- API Gateway has throttling enabled
- Lambda has minimal IAM permissions
- No secrets in code (use environment variables)
