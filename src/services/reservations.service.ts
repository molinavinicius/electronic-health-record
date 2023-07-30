import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { Reservation } from "../models/reservation";


class ReservationService extends BaseService<EntityTarget<Reservation>> {

    constructor() {
        super();
        this.entity = Reservation;
        this.repository = AppDataSource.getRepository(Reservation);
    }
}

export default new ReservationService();