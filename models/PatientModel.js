import mongoose from 'mongoose';
import { AddressSchema } from './AddressModel';

const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  patientName: {
    type: String,
    required: [true, 'Operator Name Field is required']
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: [true, 'Mobile Number Field is required']
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activatedDate: Date,
  address: AddressSchema,
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: String
});

// cREATE Model
const Patient = mongoose.model('patient', PatientSchema);
export default Patient;
