import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig21703338200829 implements MigrationInterface {
  name = 'Mig21703338200829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\`
        ADD \`refreshToken\` varchar(255) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``,
    );
  }
}
