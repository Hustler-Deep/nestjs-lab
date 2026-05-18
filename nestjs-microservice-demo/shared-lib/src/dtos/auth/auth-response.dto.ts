export class AuthUserDataDto {
  /**
   * Unique user ID
   * @example 1
   */
  declare id: number;

  /**
   * User email
   * @example john.doe@example.com
   */
  declare email: string;

  /**
   * Full name
   * @example John Doe
   */
  declare name: string;

  /**
   * User role
   * @example user
   */
  declare role: string;
}

export class LoginDataDto {
  /**
   * JWT access token
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   */
  declare access_token: string;

  declare user: AuthUserDataDto;
}

export class RegisterDataDto {
  /**
   * @example 1
   */
  declare id: number;

  /**
   * @example john.doe@example.com
   */
  declare email: string;

  /**
   * @example John Doe
   */
  declare name: string;

  /**
   * @example user
   */
  declare role: string;

  /**
   * @example 2026-05-15T08:00:00.000Z
   */
  declare createdAt: string;

  /**
   * @example 2026-05-15T08:00:00.000Z
   */
  declare updatedAt: string;

  /**
   * @example null
   */
  declare deletedAt: string | null;
}
