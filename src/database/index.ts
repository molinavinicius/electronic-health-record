import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../models/user"
import { Patient } from "../models/patient"
import { Reservation } from "../models/reservation"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Reservation, Patient],
    migrations: [],
    subscribers: [],
})
