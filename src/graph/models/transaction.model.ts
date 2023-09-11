import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Transaction {
    @Field()
    block_hash: string

    @Field(type => Int)
    block_number: number

    @Field(type => Int)
    block_timestamp: number

    @Field(type => Int)
    gas: number

    @Field(type => Int)
    gas_price: number

    @Field(type => Int)
    gas_used: number

    @Field()
    hash: string

    @Field()
    input: string

    @Field(type => Int)
    transaction_fee: number

    @Field(type => Int)
    transaction_index: number

    @Field()
    value: string

}