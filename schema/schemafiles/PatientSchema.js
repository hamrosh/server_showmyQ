import { gql } from 'apollo-server';
import Patient from '../../models/PatientModel';
import { PubSub } from 'graphql-subscriptions';
export const pubsub = new PubSub();
// Type Defs

export const typeDef = gql`
  type Patient {
    id: ID
    patientName: String
    mobileNumber: String
    isActivated: Boolean
    activatedDate: Date
    address: Address
    createdDate: Date
    createdBy: String
  }

  type Subscription {
    patientAdded: Patient
  }
  extend type Query {
    allPatients: [Patient]
  }

  extend type Mutation {
    addPatient(input: PatientInput): Patient
  }

  input PatientInput {
    patientName: String!
    mobileNumber: String!
    isActivated: Boolean!
    activatedDate: Date
    address: AddressInput
    createdDate: Date
    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allPatients: () => {
      return Patient.find();
    }
  },
  Mutation: {
    addPatient: (root, { input }, context) => {
      let q = new Patient(input);

      return q.save().then(patient => {
        pubsub.publish('patientAdded', { patientAdded: patient });
        return patient;
      });
    }
  },
  Subscription: {
    patientAdded: {
      subscribe: () => pubsub.asyncIterator('patientAdded')
    }
  }
};
