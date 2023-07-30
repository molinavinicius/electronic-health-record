import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/user"
import { Patient } from "../models/patient"
import { Reservation } from "../models/reservation"
import { HealthRecord } from "../models/healthRecord"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: ["src/models/**/*.ts"],
    migrationsTableName: "ehr_migration_table",
    migrations: ["src/database/migrations/**/*.ts"],
    subscribers: [],
})
