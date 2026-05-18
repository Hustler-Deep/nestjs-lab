export class UserDataDto {
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
