import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsEmail, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Reservation } from './reservation';
import { HealthRecord } from './healthRecord';

enum Gender {
    Male = 'male',
    Female = 'female'
}

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    name: string

    @Column()
    @IsNotEmpty()
    phone: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender

    @Column({ nullable: true })
    birthDate: string

    @Column("int", { nullable: true })
    @IsInt()
    height: number

    @Column("int", { nullable: true })
    @IsInt()
    weight: number

    @OneToMany(() => Reservation, reservation => reservation.patient)
    reservations: Reservation[];

    @OneToMany(() => HealthRecord, healthRecord => healthRecord.patient, { eager: true })
    healthRecords: HealthRecord[];

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}