import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDb1690758736532 implements MigrationInterface {
    name = 'CreateDb1690758736532';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `CREATE TABLE "health_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "evolution" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "appointmentId" integer, "healthProfessionalId" integer, CONSTRAINT "REL_029901e67c4cd020978cfada69" UNIQUE ("appointmentId"))`
        );
        await queryRunner.query(
            `CREATE TABLE "patient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "gender" varchar NOT NULL, "birthDate" varchar, "height" integer, "weight" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
        );
        await queryRunner.query(
            `CREATE TABLE "appointment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "appointmentDate" datetime NOT NULL, "duration" integer NOT NULL, "notes" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "healthProfessionalId" integer)`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_health_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "evolution" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "appointmentId" integer, "healthProfessionalId" integer, CONSTRAINT "REL_029901e67c4cd020978cfada69" UNIQUE ("appointmentId"), CONSTRAINT "FK_0a7486e7571808c07835f1deeff" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_029901e67c4cd020978cfada696" FOREIGN KEY ("appointmentId") REFERENCES "appointment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_85083b57c2de02099a1aaa9edbf" FOREIGN KEY ("healthProfessionalId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_health_record"("id", "evolution", "createdAt", "updatedAt", "patientId", "appointmentId", "healthProfessionalId") SELECT "id", "evolution", "createdAt", "updatedAt", "patientId", "appointmentId", "healthProfessionalId" FROM "health_record"`
        );
        await queryRunner.query(`DROP TABLE "health_record"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_health_record" RENAME TO "health_record"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_appointment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "appointmentDate" datetime NOT NULL, "duration" integer NOT NULL, "notes" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "healthProfessionalId" integer, CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_342276ce9cfe16c5399dde2fa5e" FOREIGN KEY ("healthProfessionalId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_appointment"("id", "appointmentDate", "duration", "notes", "createdAt", "updatedAt", "patientId", "healthProfessionalId") SELECT "id", "appointmentDate", "duration", "notes", "createdAt", "updatedAt", "patientId", "healthProfessionalId" FROM "appointment"`
        );
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_appointment" RENAME TO "appointment"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "appointment" RENAME TO "temporary_appointment"`
        );
        await queryRunner.query(
            `CREATE TABLE "appointment" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "appointmentDate" datetime NOT NULL, "duration" integer NOT NULL, "notes" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "healthProfessionalId" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "appointment"("id", "appointmentDate", "duration", "notes", "createdAt", "updatedAt", "patientId", "healthProfessionalId") SELECT "id", "appointmentDate", "duration", "notes", "createdAt", "updatedAt", "patientId", "healthProfessionalId" FROM "temporary_appointment"`
        );
        await queryRunner.query(`DROP TABLE "temporary_appointment"`);
        await queryRunner.query(
            `ALTER TABLE "health_record" RENAME TO "temporary_health_record"`
        );
        await queryRunner.query(
            `CREATE TABLE "health_record" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "evolution" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "patientId" integer, "appointmentId" integer, "healthProfessionalId" integer, CONSTRAINT "REL_029901e67c4cd020978cfada69" UNIQUE ("appointmentId"))`
        );
        await queryRunner.query(
            `INSERT INTO "health_record"("id", "evolution", "createdAt", "updatedAt", "patientId", "appointmentId", "healthProfessionalId") SELECT "id", "evolution", "createdAt", "updatedAt", "patientId", "appointmentId", "healthProfessionalId" FROM "temporary_health_record"`
        );
        await queryRunner.query(`DROP TABLE "temporary_health_record"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "health_record"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
