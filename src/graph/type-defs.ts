import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum AddressType {
    eoa
    contract
  }

  type Address {
    address: String!
    type: AddressType

    bought: [Transaction!]! @relationship(type: "BUY", direction: OUT)
    sold: [Transaction!]! @relationship(type: "SELL", direction: OUT)
  }

  type Transaction {
    block_hash: String!
    block_number: Int!
    block_timestamp: DateTime!
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

  type YearlyVolumeStat {
    year: Int!
    transactionsCount: Int!
    totalValue: Int!
  }

  type Query {
    getYearlyVolume: [YearlyVolumeStat]
      @cypher(
        statement: """
        MATCH (transaction:Transaction)
        WITH transaction.block_timestamp.year as year, count(*) as transactionsCount, sum(transaction.value) as totalValue
        RETURN
        {
            year: year,
            transactionsCount: transactionsCount,
            totalValue: totalValue
        } as result
        """
        columnName: "result"
      )

  }
`;
