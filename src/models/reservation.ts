import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { IsNotEmpty, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
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
    @Transform(({ value }) => value || undefined)
    @ValidateIf((object, value) => object.hasOwnProperty('patient'))
    patient: Patient

    @Column()
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    @ValidateIf((object, value) => object.hasOwnProperty('appointmentDate'))
    appointmentDate: Date

    @Column()
    @Transform(({ value }) => value || undefined)
    @ValidateIf((object, value) => object.hasOwnProperty('notes'))
    notes: string
}
