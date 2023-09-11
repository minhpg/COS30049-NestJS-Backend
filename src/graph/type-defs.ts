import { gql } from 'apollo-server-express';

export const typeDefs = gql`

  enum AddressType {
    eoa
    contract
  }

  type Address {
    address: String!
    type: AddressType

    bought: [Transaction!]! @relationship(type: "SELL", direction: OUT)
    sold: [Transaction!]! @relationship(type: "BUY", direction: OUT)
  }

  type Transaction {
    block_hash: String!
    block_number: Int!
    block_timestamp: Int!
    gas: Int!
    gas_price: Int!
    gas_used: Int!
    hash: String!
    input: String!
    transaction_fee: Int!
    transaction_index: Int!
    value: Int!

    from_address: Address! @relationship(type: "SELL", direction: IN)
    to_address: Address! @relationship(type: "BUY", direction: IN)
  }

`;
