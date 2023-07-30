import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';


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
}