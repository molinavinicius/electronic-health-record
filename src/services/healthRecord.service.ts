import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { HealthRecord } from "../models/healthRecord";


class HealthRecordService extends BaseService<EntityTarget<HealthRecord>> {

    constructor() {
        super();
        this.entity = HealthRecord;
        this.repository = AppDataSource.getRepository(HealthRecord);
    }
}

export default new HealthRecordService;