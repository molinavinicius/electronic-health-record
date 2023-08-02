import BaseService from './base';
import { AppDataSource } from '../database';
import { EntityTarget, LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { APIReturn } from '../types/api';
import { error } from 'console';

const APPOINTMENT_DURATION = 30;

/**
 * Implementation of CRUD BaseService for the Appointment entity.
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

    async validateAppointment(appointmentToUpdate: any, fields: string[]): Promise<APIReturn<Appointment>> {
        let errors = []
        if (fields.includes('patient')) {
            let validatedPatient = await this.validatePatient(appointmentToUpdate.patient)
            if (validatedPatient.status === 'error') {
                errors.push(validatedPatient.message)
            }
        }
        if (fields.includes('healthProfessional')) {
            let validatedHealthProfessional = await this.validateDoctor(appointmentToUpdate.healthProfessional)
            if (validatedHealthProfessional.status === 'error') {
                errors.push(validatedHealthProfessional.message)
            }
        }
        if (fields.includes('appointmentDate')) {
            let validatedAppointmentDate = await this.validateAppointmentDate(
                appointmentToUpdate.healthProfessional,
                appointmentToUpdate.appointmentDate
            )
            if (validatedAppointmentDate.status === 'error') {
                errors.push(validatedAppointmentDate.message)
            }
        }
        if (errors.length > 0) {
            return {
                status: 'error',
                statusCode: 400,
                message: errors.join(', ')
            }
        }
        return {
            status: 'success',
            statusCode: 200,
            data: appointmentToUpdate
        }
    }
    async validatePatient(patientId: number): Promise<APIReturn<Patient>> {
        let patient = await AppDataSource.getRepository(Patient).findOne({
            where: { id: patientId }
        });
        if (!patient) {
            return {
                status: 'error',
                statusCode: 400,
                message: 'Patient not found'
            };
        }
        return {
            status: 'success',
            statusCode: 200,
            data: patient
        };
    }

    async validateDoctor(doctorId: number): Promise<APIReturn<User>> {
        let doctor = await AppDataSource.getRepository(User).findOne({
            where: { id: doctorId }
        });
        if (!doctor) {
            return {
                status: 'error',
                statusCode: 400,
                message: 'Health professional not found'
            };
        }
        return {
            status: 'success',
            statusCode: 200,
            data: doctor
        };
    }

    async validateAppointmentDate(
        healthProfessionalId: number,
        appointmentDate: Date | string
    ): Promise<APIReturn<Appointment>> {

        let date = new Date(appointmentDate);
        let existingAppointments = await this._getOverlappingAppointments(
            healthProfessionalId,
            date,
            APPOINTMENT_DURATION
        );

        if (existingAppointments.length > 0) {
            return {
                status: 'error',
                statusCode: 400,
                message: `This health professional is not available at this time`
            };
        }

        return {
            status: 'success',
            statusCode: 200,
            message: 'Appointment date is valid'
        };
    }

    async _getOverlappingAppointments(
        healthProfessionalId: number,
        date: Date,
        duration: number
    ): Promise<Appointment[]> {
        duration = duration * 60 * 1000; // convert duration to milliseconds
        // calculate start and end time of doctor's availability
        const inferiorLimit = new Date(date.getTime() - duration);
        const superiorLimit = new Date(date.getTime() + duration);

        // find appointments that overlap with the doctor's availability
        const overlappingAppointments = await this.repository.find({
            where: {
                healthProfessional: healthProfessionalId,
                appointmentDate: And(
                    LessThanOrEqual(superiorLimit),
                    MoreThanOrEqual(inferiorLimit)
                )
            }
        });
        return overlappingAppointments;
    }
}

export default new AppointmentService();
