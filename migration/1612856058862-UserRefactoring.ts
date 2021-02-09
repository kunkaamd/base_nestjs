import {MigrationInterface, QueryRunner} from "typeorm";

export class UserRefactoring1612856058862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD address varchar(255);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN address;`);
    }

}
