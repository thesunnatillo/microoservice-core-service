import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseTable1728495741348 implements MigrationInterface {
    name = 'CourseTable1728495741348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "course"`);
    }

}
