import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata,
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value as Record<string, unknown>);
    const errors: ValidationError[] = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return value;
  }

  private toValidate(
    metatype: unknown,
  ): metatype is new (...args: unknown[]) => object {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return typeof metatype === 'function' && !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): {
    property: string;
    message: string;
  } {
    const PRIORITY = [
      'isDefined',
      'isNotEmpty',
      'isString',
      'isEmail',
      'minLength',
      'maxLength',
    ];

    for (const error of errors) {
      if (error.constraints) {
        const sortedMessages = Object.entries(error.constraints).sort(
          ([a], [b]) => {
            const aIndex = PRIORITY.indexOf(a);
            const bIndex = PRIORITY.indexOf(b);
            return (
              (aIndex === -1 ? PRIORITY.length : aIndex) -
              (bIndex === -1 ? PRIORITY.length : bIndex)
            );
          },
        );

        const [, message] = sortedMessages[0];

        return {
          property: error.property,
          message,
        };
      } else if (error.children?.length) {
        return this.formatErrors(error.children);
      }
    }

    return {
      property: 'Unknown Error',
      message: 'Validation Failed',
    };
  }
}
