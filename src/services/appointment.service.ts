import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { Appointment } from "../models/appointment";


/**
 * Implementation of BaseService for the Appointment entity.
 * 
 * @class
 * @extends {BaseService<EntityTarget<Appointment>>}
 */
class AppointmentService extends BaseService<EntityTarget<Appointment>> {

    constructor() {
        super();
        this.entity = Appointment;
        this.repository = AppDataSource.getRepository(Appointment);
    }
}

export default new AppointmentService();