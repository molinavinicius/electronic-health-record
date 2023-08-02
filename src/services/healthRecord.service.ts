import BaseService from './base';
import { AppDataSource } from '../database';
import { EntityTarget, SaveOptions } from 'typeorm';
import { HealthRecord } from '../models/healthRecord';
import { APIReturn } from '../types/api';
import PatientsService from './patients.service';
/**
 * Implementation of CRUD BaseService for the HealthRecord entity.
 *
 * @class
 * @extends {BaseService<EntityTarget<HealthRecord>>}
 */
class HealthRecordService extends BaseService<EntityTarget<HealthRecord>> {
    constructor() {
        super();
        this.entity = HealthRecord;
        this.repository = AppDataSource.getRepository(HealthRecord);
    }

    async save(body: any, options?: SaveOptions | undefined): Promise<APIReturn<EntityTarget<HealthRecord>>> {
        let patient = await PatientsService.one(body.patient);
        if (patient.status === 'error') {
            return {
                status: 'error',
                statusCode: 400,
                message: 'Patient not found'
            };
        }
        return super.save(body, options);
    }
}

export default new HealthRecordService();
