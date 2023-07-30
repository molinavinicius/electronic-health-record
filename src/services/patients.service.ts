import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { Patient } from "../models/patient";


class PatientService extends BaseService<EntityTarget<Patient>> {

    constructor() {
        super();
        this.entity = Patient;
        this.repository = AppDataSource.getRepository(Patient);
    }
}

export default new PatientService;