import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { Patient } from "../models/patient";

/**
 * Implementation of CRUD BaseService for the Patient entity.
 * 
 * @class
 * @extends {BaseService<EntityTarget<Patient>>}
 */
class PatientService extends BaseService<EntityTarget<Patient>> {

    constructor() {
        super();
        this.entity = Patient;
        this.repository = AppDataSource.getRepository(Patient);
    }
}

export default new PatientService;