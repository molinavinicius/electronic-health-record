import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import BaseService from "./base";
import { APIReturn } from '../types/api';
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { User } from '../models/user';


/**
 * Implementation of CRUD BaseService for authentication.
 * 
 * @class
 * @extends {BaseService<EntityTarget<User>>}
 */
class AuthenticationService extends BaseService<EntityTarget<User>> {

    constructor() {
        super();
        this.entity = User;
        this.repository = AppDataSource.getRepository(User);
    }

    async signup(name: string, email: string, password: string): Promise<APIReturn<User>> {
        // Check if user exists
        let user = await this.repository.findOne({ where: { email } });
        if (user) {
            return {
                status: "error",
                statusCode: 400,
                message: 'Email already in use'
            }
        }
        // Save user credentials in the database
        user = new User();
        user.name = name;
        user.email = email;
        user.password = await bcrypt.hash(password, 8);
        let savedUser = await this.save(user)

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT Secret is not defined.");
        }

        var token = null
        if (savedUser.status == "success") {
            // Generate JWT token
            token = jwt.sign({ userId: savedUser.data?.id }, secret, {
                expiresIn: "6h" // Token expires in 6 hours
            });
            savedUser.data.token = token
        }

        return savedUser
    }

    async login(email: string, password: string): Promise<APIReturn<User>> {
        // Check if user exists
        let user = await this.repository.findOne({ where: { email } });
        if (!user) {
            return {
                status: "error",
                statusCode: 400,
                message: 'User not found'
            }
        }
        // Check if password is correct
        if (!await bcrypt.compare(password, user.password)) {
            return {
                status: "error",
                statusCode: 400,
                message: 'Invalid password'
            }
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT Secret is not defined.");
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secret, {
            expiresIn: "6h" // Token expires in 6 hours
        });

        return {
            status: "success",
            statusCode: 200,
            data: {
                user,
                token
            }
        }
    }
}

export default new AuthenticationService;