import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import * as path from 'path';

export interface ApiStackProps extends cdk.StackProps {
  environment: string;
  documentsTable: dynamodb.Table;
}

export class ApiStack extends cdk.Stack {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    // API Lambda function
    const apiHandler = new lambda.Function(this, 'ApiHandler', {
      functionName: `whiteboard-api-${props.environment}`,
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'handlers/api.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../server/dist')),
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      environment: {
        NODE_ENV: props.environment,
        DOCUMENTS_TABLE: props.documentsTable.tableName,
      },
      logRetention: logs.RetentionDays.ONE_WEEK,
    });

    // Grant DynamoDB permissions
    props.documentsTable.grantReadWriteData(apiHandler);

    // API Gateway
    const api = new apigateway.RestApi(this, 'WhiteboardApi', {
      restApiName: `whiteboard-api-${props.environment}`,
      description: 'Whiteboard and Code API',
      deployOptions: {
        stageName: props.environment,
        throttlingBurstLimit: 100,
        throttlingRateLimit: 50,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    // Proxy all requests to Lambda
    const lambdaIntegration = new apigateway.LambdaIntegration(apiHandler);
    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
      anyMethod: true,
    });

    this.apiUrl = api.url;

    // Output API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      exportName: `ApiUrl-${props.environment}`,
    });
  }
}
