import awsLambdaFastify from '@fastify/aws-lambda';
import { buildApp } from '../app.js';

const app = buildApp({ logger: false });
const proxy = awsLambdaFastify(await app);

export const handler = proxy;
