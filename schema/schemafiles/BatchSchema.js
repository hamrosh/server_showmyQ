import { gql } from 'apollo-server';
import Batch from '../../models/BatchModel';

// Type Defs

export const typeDef = gql`
  type StatusHistorySchema {
    status: String
    setOn: Date
    setBy: String
  }
  type Batch {
    id: ID
    doctorID: String
    batchDescription: String
    batchDate: Date
    startTime: Date
    endTime: Date
    isBookingOpen: Boolean
    status: String
    statusHistory: [StatusHistorySchema]
    cancellationReason: String
    createdDate: Date
    operatorID: String
  }

  extend type Query {
    allBatches: [Batch]
  }

  extend type Mutation {
    addBatch(input: BatchInput): Batch
  }

  input StatusHistoryInput {
    status: String
    setOn: Date
    setBy: String
  }

  input BatchInput {
    doctorID: String!
    batchDescription: String
    batchDate: Date
    startTime: Date
    endTime: Date
    isBookingOpen: Boolean
    status: String
    statusHistory: [StatusHistoryInput]
    cancellationReason: String
    createdDate: Date
    operatorID: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allBatches: () => {
      return Batch.find();
    }
  },
  Mutation: {
    addBatch: (root, { input }, context) => {
      let q = new Batch(input);
      return q.save();
    }
  }
};
