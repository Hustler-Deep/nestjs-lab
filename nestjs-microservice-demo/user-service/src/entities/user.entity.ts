import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserRole } from '@nestjs/shared-lib';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column({ unique: true })
  declare email: string;

  @Exclude()
  @Column({ select: false })
  declare password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  declare role: UserRole;

  @Column()
  declare name: string;

  @CreateDateColumn()
  declare createdAt: Date;

  @UpdateDateColumn()
  declare updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  declare deletedAt: Date | null;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
