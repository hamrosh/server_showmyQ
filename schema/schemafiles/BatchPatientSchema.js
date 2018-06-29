import { gql } from 'apollo-server';

import BatchPatient from '../../models/BatchPatientModel';

// Type Defs

export const typeDef = gql`
  type BatchPatient {
    id: ID
    batchID: String
    patientID: String
    patientNumber: String
    sequenceNumber: Int
    pushedTimes: Int
    status: String
    statusHistory: [StatusHistorySchema]
    createdDate: Date
    operatorID: String
  }

  extend type Query {
    allBatchPatients(batchID: String): [BatchPatient]
  }

  extend type Mutation {
    addBatchPatients(input: BatchPatientInput): BatchPatient
  }
  input BatchPatientInput {
    batchID: String!
    patientID: String!
    patientNumber: String
    sequenceNumber: Int
    pushedTimes: Int
    status: String
    statusHistory: [StatusHistoryInput]
    createdDate: Date
    operatorID: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allBatchPatients: () => {
      return BatchPatient.find();
    }
  },
  Mutation: {
    addBatchPatients: (root, { input }, context) => {
      let q = new BatchPatient(input);
      return q.save();
    }
  }
};
