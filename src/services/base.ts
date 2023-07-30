import { Repository } from "typeorm";

type ServiceReturn<T> = {
    status: "success" | "error",
    statusCode: number,
    message?: string,
    data?: T,
    error?: any
}

class BaseService<T> {
    entity: T;
    repository: Repository<any>;

    /**
     * Get all records of an entity
     * @param request
     * @param response
     * @param next
     */
    async all(): Promise<ServiceReturn<T[]>> {
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

    async one(id: Number): Promise<ServiceReturn<T>> {
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

    async save(body: any): Promise<ServiceReturn<T>> {
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

    async remove(id: Number): Promise<ServiceReturn<T>> {
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

    async update(id: Number, body: any): Promise<ServiceReturn<T>> {
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