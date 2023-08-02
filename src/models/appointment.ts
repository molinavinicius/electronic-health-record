import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';
import { Patient } from './patient';
import { User } from './user';
import { Transform } from 'class-transformer';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, (patient) => patient.appointments)
    @IsNotEmpty()
    patient: Patient;

    @Column()
    @IsNotEmpty()
    @IsDateString()
    appointmentDate: Date;

    @Column()
    @IsInt()
    duration?: number;

    @ManyToOne(() => User)
    @IsNotEmpty()
    healthProfessional: User;

    @Column({ nullable: true })
    notes?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
