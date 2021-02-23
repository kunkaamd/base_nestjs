import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E,
  ];
}

export abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly connection: Connection) {}

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await this.connection.getRepository(EntityClass).count({
        where:
          typeof findCondition === 'function'
            ? findCondition(args)
            : {
                [findCondition || args.property]: value,
              },
      })) <= 0
    );
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same '${args.property}' already exist`;
  }
}

@ValidatorConstraint({ name: 'uniquedb', async: true })
@Injectable()
export class UniqueDB extends UniqueValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
