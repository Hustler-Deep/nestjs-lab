/**
 * Injection tokens for microservice clients.
 * Use these instead of raw strings when registering / injecting ClientProxy.
 */
export const ServiceTokens = {
  AUTH_SERVICE: 'AUTH_SERVICE',
  USER_SERVICE: 'USER_SERVICE',
  PRODUCT_SERVICE: 'PRODUCT_SERVICE',
} as const;
