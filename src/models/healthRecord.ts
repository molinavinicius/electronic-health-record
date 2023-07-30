import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, MinLength } from 'class-validator';
import { Patient } from "./patient";
import { Reservation } from "./reservation";

@Entity()
export class HealthRecord {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Patient, (patient) => patient.id)
    @JoinColumn()
    @IsNotEmpty()
    patient: Patient

    @OneToOne(() => Patient, (patient) => patient.id)
    @JoinColumn()
    appointment?: Reservation

    @Column()
    @IsNotEmpty()
    @MinLength(30, { message: 'The evolution must be at least 30 characters long. Please make a longer description.' })
    evolution: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
