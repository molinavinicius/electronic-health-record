import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsNotEmpty, MinLength, ValidateIf, IsDefined } from 'class-validator';
import { Patient } from "./patient";
import { Appointment } from "./appointment";
import { User } from "./user";

@Entity()
export class HealthRecord {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Patient, (patient) => patient.healthRecords)
    @IsNotEmpty()
    patient: Patient

    @OneToOne(() => Appointment)
    @JoinColumn()
    appointment?: Appointment

    @ManyToOne(() => User)
    @ValidateIf((object, value) => value !== undefined)
    @IsDefined()
    @IsNotEmpty()
    healthProfessional: User

    @Column()
    @IsNotEmpty()
    @MinLength(30, { message: 'The evolution must be at least 30 characters long. Please make a longer description.' })
    evolution: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
