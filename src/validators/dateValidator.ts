import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';
import moment, { MomentFormatSpecification } from 'moment';

export function IsDateStringFormat(format: MomentFormatSpecification = "YYYY-MM-DD", validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsDateStringFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return moment(value, format, true).isValid();
                },
            },
        });
    };
}