import Doctor from '../../models/DoctorModel';
import { gql } from 'apollo-server';

// Type Defs

export const typeDef = gql`
  type Department {
    name: String
    description: String
  }

  type Doctor {
    id: ID
    doctorName: String
    hospitalID: [String]
    department: [Department]
    address: Address
    contact: Contact
    createdDate: Date
    createdBy: String
  }

  extend type Query {
    allDoctors: [Doctor]
  }

  extend type Mutation {
    addDoctor(input: DoctorInput): Doctor
  }

  input DepartmentInput {
    name: String
    description: String
  }

  input DoctorInput {
    doctorName: String!
    hospitalID: [String]
    department: [DepartmentInput]
    address: AddressInput
    contact: ContactInput
    createdDate: Date
    createdBy: String
  }
`;

//Writing the resolvers for the queries in the schema file for queries
export const resolvers = {
  Query: {
    allDoctors: () => {
      return Doctor.find();
    }
  },
  Mutation: {
    addDoctor: (root, { input }, context) => {
      let q = new Doctor(input);
      return q.save();
    }
  }
};
