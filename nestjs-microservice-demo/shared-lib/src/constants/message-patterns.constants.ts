/**
 * Centralized TCP message pattern commands.
 * All microservices and the API gateway must reference these
 * constants instead of using raw strings.
 */
export const MessagePatterns = {
  // Auth
  AUTH_REGISTER: { cmd: 'register' },
  AUTH_LOGIN: { cmd: 'login' },

  // User
  USER_CREATE: { cmd: 'create_user' },
  USER_GET_ALL: { cmd: 'get_users' },
  USER_GET_ONE: { cmd: 'get_user' },
  USER_GET_BY_EMAIL: { cmd: 'get_user_by_email' },
  /** Internal: returns user WITH password hash — only for auth-service credential validation */
  USER_VALIDATE_CREDENTIALS: { cmd: 'validate_user_credentials' },
  USER_UPDATE: { cmd: 'update_user' },
  USER_DELETE: { cmd: 'delete_user' },

  // Product
  PRODUCT_CREATE: { cmd: 'create_product' },
  PRODUCT_GET_ALL: { cmd: 'get_products' },
  PRODUCT_GET_ONE: { cmd: 'get_product' },
  PRODUCT_GET_BY_NAME: { cmd: 'get_product_by_name' },
  PRODUCT_UPDATE: { cmd: 'update_product' },
  PRODUCT_DELETE: { cmd: 'delete_product' },
} as const;
