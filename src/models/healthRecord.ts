import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { IsNotEmpty, MinLength, ValidateIf, IsDefined, IsString } from 'class-validator';
import { Patient } from './patient';
import { Appointment } from './appointment';
import { User } from './user';

@Entity()
export class HealthRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, (patient) => patient.healthRecords, { onDelete: 'SET NULL' })
    @IsNotEmpty()
    patient: Patient;

    @OneToOne(() => Appointment)
    @JoinColumn()
    appointment?: Appointment;

    @ManyToOne(() => User)
    @ValidateIf((object, value) => value !== undefined)
    @IsDefined()
    @IsNotEmpty()
    healthProfessional: User;

    @Column()
    @IsNotEmpty()
    @MinLength(30, {
        message:
            'The evolution must be at least 30 characters long. Please make a longer description.'
    })
    @IsString()
    evolution: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
