import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { IsDate, IsNotEmpty } from 'class-validator';
import { Patient } from "./patient";

export type IAppointment = {
    id: number;
    patientId: number;
    appointmentDate: Date,
    notes: string
};


@Entity()
export class Reservation {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Patient)
    @JoinColumn()
    @IsNotEmpty()
    patient: Patient

    @Column()
    @IsNotEmpty()
    @IsDate()
    appointmentDate: Date

    @Column()
    notes: string
}
