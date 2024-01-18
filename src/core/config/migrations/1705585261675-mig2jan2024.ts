import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig2jan20241705585261675 implements MigrationInterface {
  name = 'Mig2jan20241705585261675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`roles\`
                             (
                                 \`id\`          int          NOT NULL AUTO_INCREMENT,
                                 \`name\`        varchar(255) NOT NULL,
                                 \`description\` varchar(255) NOT NULL,
                                 UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`),
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE=InnoDB`);
    await queryRunner.query(`CREATE TABLE \`users_roles_roles\`
                             (
                                 \`usersId\` bigint NOT NULL,
                                 \`rolesId\` int    NOT NULL,
                                 INDEX       \`IDX_df951a64f09865171d2d7a502b\` (\`usersId\`),
                                 INDEX       \`IDX_b2f0366aa9349789527e0c36d9\` (\`rolesId\`),
                                 PRIMARY KEY (\`usersId\`, \`rolesId\`)
                             ) ENGINE=InnoDB`);
    await queryRunner.query(`ALTER TABLE \`users_roles_roles\`
        ADD CONSTRAINT \`FK_df951a64f09865171d2d7a502b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE \`users_roles_roles\`
        ADD CONSTRAINT \`FK_b2f0366aa9349789527e0c36d97\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_b2f0366aa9349789527e0c36d97\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_df951a64f09865171d2d7a502b1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b2f0366aa9349789527e0c36d9\` ON \`users_roles_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_df951a64f09865171d2d7a502b\` ON \`users_roles_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_roles_roles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``,
    );
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
