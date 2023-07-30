import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Patient } from "./patient";

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Patient, (patient) => patient.appointments, { cascade: true, eager: true })
    @IsNotEmpty()
    patient: Patient

    @Column()
    @IsNotEmpty()
    @IsDateString()
    appointmentDate: Date

    @Column()
    notes?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
