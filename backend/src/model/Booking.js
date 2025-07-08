import mongoose, { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Clients',
    required: true
  },
  vehicle: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default model('Booking', bookingSchema);
