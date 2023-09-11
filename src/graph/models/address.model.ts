import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Address {
  @Field()
  address: string;

  @Field()
  type: AddressType;
}

export enum AddressType {
  'eoa',
  'contract',
}
