import { Repository } from "typeorm";
import { APIReturn } from "../types/api";

/**
 * Base service for data manipulation.
 * 
 * @class
 * @template T - Type of the entity being manipulated
 */
class BaseService<T> {
    entity: T;
    repository: Repository<any>;

    /**
     * Fetch all records of an entity.
     * 
     * @return {Promise<APIReturn<T[]>>} - promise that resolves with all retrieved records
     */
    async all(): Promise<APIReturn<T[]>> {
        try {
            const all = await this.repository.find();
            console.log('all', all);
            return {
                status: "success",
                statusCode: 200,
                data: all
            };
        } catch (err) {
            return {
                status: "error",
                statusCode: 500,
                error: err
            }
        }
    }
    /**
     * Fetch a single record of an entity by id.
     * 
     * @param {Number} id - Id of the record to be retrieved
     * @return {Promise<APIReturn<T>>} - promise that resolves with the retrieved record, or an error if not found
     */
    async one(id: Number): Promise<APIReturn<T>> {
        try {
            const one = await this.repository.findOne({
                where: { id }
            });
            if (!one) {
                return {
                    status: "error",
                    statusCode: 404,
                    message: `The object with id ${id} does not exist`,
                };
            }
            return {
                status: "success",
                statusCode: 200,
                data: one
            };
        } catch (err) {
            return {
                status: "error",
                statusCode: 500,
                error: err
            }
        }
    }

    /**
    * Save a new record of an entity.
    * 
    * @param {any} body - Data for the record to be saved
    * @return {Promise<APIReturn<T>>} - promise that resolves with the saved record, or the error if saving failed
    */
    async save(body: any): Promise<APIReturn<T>> {
        try {
            // @ts-ignore
            const entity = Object.assign(new this.entity(), body);
            const saved = await this.repository.save(entity);
            return {
                status: "success",
                statusCode: 201,
                data: saved
            };
        } catch (err) {
            return {
                status: "error",
                statusCode: 500,
                error: err
            }
        }
    }
    /**
     * Remove a record of an entity by id.
     * 
     * @param {Number} id - Id of the record to be removed
     * @return {Promise<APIReturn<T>>} - promise that resolves with an success/error message, or the error if removal failed
     */
    async remove(id: Number): Promise<APIReturn<T>> {
        try {
            const toRemove = await this.repository.findOne({
                where: { id }
            });
            if (!toRemove) {
                return {
                    status: "error",
                    statusCode: 404,
                    message: `The object with id ${id} does not exist`,
                };
            }
            await this.repository.remove(toRemove);
            return {
                status: "success",
                statusCode: 202,
                message: `The object with id ${id} was removed`,
            };
        } catch (err) {
            return {
                status: "error",
                statusCode: 500,
                error: err
            };
        }
    }

    /**
     * Update a record of an entity by id.
     * 
     * @param {Number} id - Id of the record to be updated
     * @param {any} body - New data for the record
     * @return {Promise<APIReturn<T>>} - promise that resolves with the updated record, or the error if update failed
     */
    async update(id: Number, body: any): Promise<APIReturn<T>> {
        try {
            const toUpdate = await this.repository.findOne({
                where: { id }
            });
            if (!toUpdate) {
                return {
                    status: "error",
                    statusCode: 404,
                    message: `The object with id ${id} does not exist`,
                };
            }
            const entity = Object.assign(toUpdate, body);
            const updated = await this.repository.save(entity);
            return {
                status: "success",
                statusCode: 200,
                data: updated
            };
        } catch (err) {
            return {
                status: "error",
                statusCode: 500,
                error: err
            }
        }
    }
}

export default BaseService;