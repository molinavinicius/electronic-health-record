import { body } from 'express-validator';

export const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
];


// import {
//     ValidatorConstraint,
//     ValidatorConstraintInterface,
//   } from 'class-validator';
  
//   @ValidatorConstraint({ name: 'idadeValida', async: false })
//   export class IdadeValida implements ValidatorConstraintInterface {
//     validate(idade: number) {
//       return idade > 18 ? true : false;
//     }
  
//     defaultMessage() {
//       return 'A idade precisa ser acima de 18 anos';
//     }
//   }