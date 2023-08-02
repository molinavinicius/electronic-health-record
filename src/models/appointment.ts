import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { IsDateString, IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { Patient } from './patient';
import { User } from './user';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: 'SET NULL' })
    @IsNotEmpty()
    patient: Patient;

    @Column()
    @IsNotEmpty()
    @IsDateString()
    appointmentDate: Date;

    @Column()
    @IsInt()
    @ValidateIf((o) => o.duration !== undefined)
    duration?: number;

    @ManyToOne(() => User)
    @IsNotEmpty()
    healthProfessional: User;

    @Column({ nullable: true })
    @IsString()
    notes?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
