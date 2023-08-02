import { Request } from 'express';
/**
 * Type definition for service return value
 *
 * @typedef {Object} APIReturn
 * @property {"success" | "error"} status - Status of the operation
 * @property {number} statusCode - HTTP Status Code of the response
 * @property {string} [message] - Optional return message
 * @property {T | T[]} [data] - Optional return data of Type T or an array of Type T
 * @property {any} [error] - Optional error object if an error occurred
 */
export type APIReturn<T> = {
    status: 'success' | 'error';
    statusCode: number;
    message?: string;
    data?: T | T[] | any;
    error?: any;
};

export type AuthenticatedRequest = Request & { userId?: string };
