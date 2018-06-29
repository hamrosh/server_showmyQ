import { gql } from 'apollo-server';
import Operator from '../../models/OperatorModel';

// Type Defs

export const typeDef = gql`
  type Operator {
    id: ID
    operatorName: String
    emailID: String
    password: String
    operatorType: String
    hospitalID: String
    doctorID: [String]
    address: Address
    contact: Contact
    createdDate: Date
    createdBy: String
  }

  extend type Query {
    allOperators: [Operator]
  }

  extend type Mutation {
    addOperator(input: OperatorInput): Operator
  }

  input OperatorInput {
    operatorName: String!
    emailID: String!
    password: String!
    operatorType: String
    hospitalID: String
    doctorID: [String]
    address: AddressInput
    contact: ContactInput
    createdDate: Date
    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allOperators: () => {
      return Operator.find();
    }
  },
  Mutation: {
    addOperator: (root, { input }, context) => {
      let q = new Operator(input);
      return q.save();
    }
  }
};
