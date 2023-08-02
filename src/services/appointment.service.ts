import BaseService from './base';
import { AppDataSource } from '../database';
import { EntityTarget, LessThanOrEqual, MoreThanOrEqual, And } from 'typeorm';
import { Appointment } from '../models/appointment';
import { User } from '../models/user';
import { Patient } from '../models/patient';
import { APIReturn } from '../types/api';

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

    async createAppointment(
        patientId: number,
        doctorId: number,
        date: Date,
        duration: number = APPOINTMENT_DURATION
    ): Promise<APIReturn<Appointment>> {
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
        let doctor = await AppDataSource.getRepository(User).findOne({
            where: { id: doctorId }
        });
        if (!doctor) {
            return {
                status: 'error',
                statusCode: 400,
                message: 'Doctor not found'
            };
        }
        date = new Date(date);
        let existingAppointments = await this.checkAvailability(
            doctor,
            date,
            duration
        );
        if (existingAppointments.length > 0) {
            return {
                status: 'error',
                statusCode: 400,
                message: `Doctor ${doctor.name} is not available at this time`
            };
        }

        let appointment = {
            patient: patient.id,
            healthProfessional: doctor.id,
            appointmentDate: date,
            duration: duration
        };

        return await this.repository.save(appointment);
    }

    async checkAvailability(
        doctor: User,
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
                healthProfessional: doctor.id,
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
