import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class ValidateDateFormatDecorator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const [format] = args.constraints;
    const regex = new RegExp(format.replace(/[YMD]/g, '\\d'));
    return typeof value === 'string' && regex.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    const [format] = args.constraints;
    return `Date must be in the format ${format}`;
  }
}

export const ValidateDateFormat = (
  format: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [format],
      validator: ValidateDateFormatDecorator,
    });
  };
};
