import { MigrationInterface, QueryRunner } from "typeorm";
import * as chalk from "chalk";
import { DatabaseTypeEnum } from "@gauzy/config";

export class OrganizationProjectAlterTable1655885355508 implements MigrationInterface {

    name = 'OrganizationProjectAlterTable1655885355508';

    /**
     * Up Migration
     *
     * @param queryRunner
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(chalk.yellow(this.name + ' start running!'));

        switch (queryRunner.connection.options.type) {
            case DatabaseTypeEnum.sqlite:
            case DatabaseTypeEnum.betterSqlite3:
                await this.sqliteUpQueryRunner(queryRunner);
                break;
            case DatabaseTypeEnum.postgres:
                await this.postgresUpQueryRunner(queryRunner);
                break;
            case DatabaseTypeEnum.mysql:
                await this.mysqlUpQueryRunner(queryRunner);
                break;
            default:
                throw Error(`Unsupported database: ${queryRunner.connection.options.type}`);
        }
    }
    /**
     * Down Migration
     *
     * @param queryRunner
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        switch (queryRunner.connection.options.type) {
            case DatabaseTypeEnum.sqlite:
            case DatabaseTypeEnum.betterSqlite3:
                await this.sqliteDownQueryRunner(queryRunner);
                break;
            case DatabaseTypeEnum.postgres:
                await this.postgresDownQueryRunner(queryRunner);
                break;
            case DatabaseTypeEnum.mysql:
                await this.mysqlDownQueryRunner(queryRunner);
                break;
            default:
                throw Error(`Unsupported database: ${queryRunner.connection.options.type}`);
        }
    }

    /**
    * PostgresDB Up Migration
    *
    * @param queryRunner
    */
    public async postgresUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_project" ADD "imageUrl" character varying(500)`);
    }

    /**
    * PostgresDB Down Migration
    *
    * @param queryRunner
    */
    public async postgresDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "organization_project" DROP COLUMN "imageUrl"`);
    }

    /**
    * SqliteDB Up Migration
    *
    * @param queryRunner
    */
    public async sqliteUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_7cf84e8b5775f349f81a1f3cc4"`);
        await queryRunner.query(`DROP INDEX "IDX_9d8afc1e1e64d4b7d48dd2229d"`);
        await queryRunner.query(`DROP INDEX "IDX_37215da8dee9503d759adb3538"`);
        await queryRunner.query(`DROP INDEX "IDX_c210effeb6314d325bc024d21e"`);
        await queryRunner.query(`DROP INDEX "IDX_bc1e32c13683dbb16ada1c6da1"`);
        await queryRunner.query(`CREATE TABLE "temporary_organization_project" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "tenantId" varchar, "organizationId" varchar, "name" varchar NOT NULL, "startDate" datetime, "endDate" datetime, "billing" varchar, "currency" varchar, "public" boolean, "owner" varchar, "taskListType" varchar NOT NULL DEFAULT ('GRID'), "code" varchar, "description" varchar, "color" varchar, "billable" boolean, "billingFlat" boolean, "openSource" boolean, "projectUrl" varchar, "openSourceProjectUrl" varchar, "budget" integer, "budgetType" text DEFAULT ('cost'), "organizationContactId" varchar, "membersCount" integer DEFAULT (0), "imageUrl" varchar(500), CONSTRAINT "FK_7cf84e8b5775f349f81a1f3cc44" FOREIGN KEY ("tenantId") REFERENCES "tenant" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_9d8afc1e1e64d4b7d48dd2229d7" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bc1e32c13683dbb16ada1c6da14" FOREIGN KEY ("organizationContactId") REFERENCES "organization_contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_organization_project"("id", "createdAt", "updatedAt", "tenantId", "organizationId", "name", "startDate", "endDate", "billing", "currency", "public", "owner", "taskListType", "code", "description", "color", "billable", "billingFlat", "openSource", "projectUrl", "openSourceProjectUrl", "budget", "budgetType", "organizationContactId", "membersCount") SELECT "id", "createdAt", "updatedAt", "tenantId", "organizationId", "name", "startDate", "endDate", "billing", "currency", "public", "owner", "taskListType", "code", "description", "color", "billable", "billingFlat", "openSource", "projectUrl", "openSourceProjectUrl", "budget", "budgetType", "organizationContactId", "membersCount" FROM "organization_project"`);
        await queryRunner.query(`DROP TABLE "organization_project"`);
        await queryRunner.query(`ALTER TABLE "temporary_organization_project" RENAME TO "organization_project"`);
        await queryRunner.query(`CREATE INDEX "IDX_7cf84e8b5775f349f81a1f3cc4" ON "organization_project" ("tenantId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d8afc1e1e64d4b7d48dd2229d" ON "organization_project" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37215da8dee9503d759adb3538" ON "organization_project" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_c210effeb6314d325bc024d21e" ON "organization_project" ("currency") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc1e32c13683dbb16ada1c6da1" ON "organization_project" ("organizationContactId") `);
    }

    /**
    * SqliteDB Down Migration
    *
    * @param queryRunner
    */
    public async sqliteDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_bc1e32c13683dbb16ada1c6da1"`);
        await queryRunner.query(`DROP INDEX "IDX_c210effeb6314d325bc024d21e"`);
        await queryRunner.query(`DROP INDEX "IDX_37215da8dee9503d759adb3538"`);
        await queryRunner.query(`DROP INDEX "IDX_9d8afc1e1e64d4b7d48dd2229d"`);
        await queryRunner.query(`DROP INDEX "IDX_7cf84e8b5775f349f81a1f3cc4"`);
        await queryRunner.query(`ALTER TABLE "organization_project" RENAME TO "temporary_organization_project"`);
        await queryRunner.query(`CREATE TABLE "organization_project" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "tenantId" varchar, "organizationId" varchar, "name" varchar NOT NULL, "startDate" datetime, "endDate" datetime, "billing" varchar, "currency" varchar, "public" boolean, "owner" varchar, "taskListType" varchar NOT NULL DEFAULT ('GRID'), "code" varchar, "description" varchar, "color" varchar, "billable" boolean, "billingFlat" boolean, "openSource" boolean, "projectUrl" varchar, "openSourceProjectUrl" varchar, "budget" integer, "budgetType" text DEFAULT ('cost'), "organizationContactId" varchar, "membersCount" integer DEFAULT (0), CONSTRAINT "FK_7cf84e8b5775f349f81a1f3cc44" FOREIGN KEY ("tenantId") REFERENCES "tenant" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_9d8afc1e1e64d4b7d48dd2229d7" FOREIGN KEY ("organizationId") REFERENCES "organization" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_bc1e32c13683dbb16ada1c6da14" FOREIGN KEY ("organizationContactId") REFERENCES "organization_contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "organization_project"("id", "createdAt", "updatedAt", "tenantId", "organizationId", "name", "startDate", "endDate", "billing", "currency", "public", "owner", "taskListType", "code", "description", "color", "billable", "billingFlat", "openSource", "projectUrl", "openSourceProjectUrl", "budget", "budgetType", "organizationContactId", "membersCount") SELECT "id", "createdAt", "updatedAt", "tenantId", "organizationId", "name", "startDate", "endDate", "billing", "currency", "public", "owner", "taskListType", "code", "description", "color", "billable", "billingFlat", "openSource", "projectUrl", "openSourceProjectUrl", "budget", "budgetType", "organizationContactId", "membersCount" FROM "temporary_organization_project"`);
        await queryRunner.query(`DROP TABLE "temporary_organization_project"`);
        await queryRunner.query(`CREATE INDEX "IDX_bc1e32c13683dbb16ada1c6da1" ON "organization_project" ("organizationContactId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c210effeb6314d325bc024d21e" ON "organization_project" ("currency") `);
        await queryRunner.query(`CREATE INDEX "IDX_37215da8dee9503d759adb3538" ON "organization_project" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d8afc1e1e64d4b7d48dd2229d" ON "organization_project" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7cf84e8b5775f349f81a1f3cc4" ON "organization_project" ("tenantId") `);
    }

    /**
     * MySQL Up Migration
     *
     * @param queryRunner
     */
    public async mysqlUpQueryRunner(queryRunner: QueryRunner): Promise<any> {
    }

    /**
     * MySQL Down Migration
     *
     * @param queryRunner
     */
    public async mysqlDownQueryRunner(queryRunner: QueryRunner): Promise<any> {
    }

}
