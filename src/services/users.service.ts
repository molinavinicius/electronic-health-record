import BaseService from './base';
import { AppDataSource } from '../database';
import { EntityTarget } from 'typeorm';
import { User } from '../models/user';

/**
 * Implementation of CRUD BaseService for the User entity.
 *
 * @class
 * @extends {BaseService<EntityTarget<User>>}
 */
class UserService extends BaseService<EntityTarget<User>> {
    constructor() {
        super();
        this.entity = User;
        this.repository = AppDataSource.getRepository(User);
    }
}

export default new UserService();
