import mongoose from 'mongoose';

import { StatusHistorySchema } from './StatusHistoryModel';

const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  doctorID: String,
  batchDescription: {
    type: String,
    required: [true, 'Operator Name Field is required']
  },
  batchDate: Date,
  startTime: Date,
  endTime: Date,
  isBookingOpen: Boolean, // open closed
  status: String,
  statusHistory: [StatusHistorySchema],
  cancellationReason: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  operatorID: String
});

// cREATE Model
const Batch = mongoose.model('batch', BatchSchema);
export default Batch;
