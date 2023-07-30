import BaseService from "./base";
import { AppDataSource } from "../database";
import { EntityTarget } from "typeorm";
import { User } from "../models/user";


class UserService extends BaseService<EntityTarget<User>> {

    constructor() {
        super();
        this.entity = User;
        this.repository = AppDataSource.getRepository(User);
    }
}

export default new UserService;