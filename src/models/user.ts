import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { IsNotEmpty, IsEmail, Length, IsStrongPassword } from 'class-validator';
import { Appointment } from './appointment';
import { HealthRecord } from './healthRecord';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @Column()
    email: string;

    @Length(5, 100)
    @IsNotEmpty()
    @Column()
    password: string;

    @OneToMany(
        () => Appointment,
        (appointment) => appointment.healthProfessional
    )
    appointments: Appointment[];

    @OneToMany(() => HealthRecord, (record) => record.healthProfessional)
    healthRecords: HealthRecord[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
