import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToUser1753253236066 implements MigrationInterface {
  name = 'AddNameToUser1753253236066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`createdAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`deletedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
