import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const hello: APIGatewayProxyHandlerV2 = async (event) => {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Hello from merchant-link-service',
      timestamp: new Date().toISOString(),
      path: event.rawPath ?? event.requestContext?.http?.path,
    }),
  };
};
