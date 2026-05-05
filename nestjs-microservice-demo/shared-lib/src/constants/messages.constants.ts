export const messages = {
  SUCCESS: "Success",
  UNAUTHORIZED: "🔐 Unauthorized. Please log in.",
  INTERNAL_SERVER_ERROR: "An internal server error occurred.",
  USER_REGISTERED: "🎉 User registered successfully!",
  JWT_SECRET_NOT_FOUND: "JWT_SECRET is not defined in environment",
  ACCESS_DENIED: "You do not have permission to perform this action.",
  PASSWORD_DOES_NOT_MATCH: "Password and confirm password do not match.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  DUPLICATE_EMAIL:
    "An account with this email already exists. Please use a different email or login instead.",
  USER_LOGGED_IN: "🔓 Login successful!",
  USER_FETCHED: "📋 User(s) retrieved successfully.",
  USER_NOT_FOUND: "User not found.",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  EMAIL_ALREADY_EXISTS: "Email is already registered",
  PRODUCT_NOT_FOUND: "Product not found with given Id.",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_FETCHED: "Product(s) retrieved successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
};

export type Messages = (typeof messages)[keyof typeof messages];
