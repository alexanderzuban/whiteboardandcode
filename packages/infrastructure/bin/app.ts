#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import { DatabaseStack } from '../lib/database-stack';
import { FrontendStack } from '../lib/frontend-stack';

const app = new cdk.App();

const environment = app.node.tryGetContext('environment') || 'dev';

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

// Database stack (DynamoDB tables)
const databaseStack = new DatabaseStack(app, `WhiteboardDatabase-${environment}`, {
  env,
  environment,
});

// API stack (Lambda + API Gateway)
const apiStack = new ApiStack(app, `WhiteboardApi-${environment}`, {
  env,
  environment,
  documentsTable: databaseStack.documentsTable,
});

// Frontend stack (S3 + CloudFront)
new FrontendStack(app, `WhiteboardFrontend-${environment}`, {
  env,
  environment,
  apiUrl: apiStack.apiUrl,
});
