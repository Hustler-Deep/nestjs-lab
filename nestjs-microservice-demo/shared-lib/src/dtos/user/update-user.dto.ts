import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  /**
   * New email address
   * @example jane.doe@example.com
   */
  @IsOptional()
  @IsEmail()
  declare email?: string;

  /**
   * New full name
   * @example Jane Doe
   */
  @IsOptional()
  @IsString()
  declare name?: string;
}
