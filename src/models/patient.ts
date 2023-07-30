import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    name: string

    @Column()
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    phone: string

    @Column()
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    @IsEmail()
    email: string

    @Column({ nullable: true })
    @Transform(({ value }) => value || undefined)
    birthDate: string

    @Column("int", { nullable: true })
    @Transform(({ value }) => value || undefined)
    @IsInt()
    height: number

    @Column("int", { nullable: true })
    @Transform(({ value }) => value || undefined)
    @IsInt()
    weight: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}