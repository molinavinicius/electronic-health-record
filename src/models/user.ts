import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { Transform } from 'class-transformer';


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    @Column()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    @Column()
    email: string;

    @Length(5, 100)
    @IsNotEmpty()
    @Transform(({ value }) => value || undefined)
    @Column()
    password: string;
}