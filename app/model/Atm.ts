import mongoose, { Schema, Document } from "mongoose";

export interface Atm extends Document {
  id: string;
  balance: number;
  date_of_Servicing: Date;
  machine_status: boolean;
  location: string;
  lastServiced: Date;
}

const AtmSchema: Schema<Atm> = new Schema({
    id: { type: String, required: true },
    balance: { type: Number, required: true },
    date_of_Servicing: { type: Date, required: true },
    machine_status: { type: Boolean, required: true },
    location: { type: String, required: true },
    lastServiced: { type: Date, required: true },
});

const AtmModel =
  (mongoose.models.Atm as mongoose.Model<Atm>) ||
  mongoose.model<Atm>("User", AtmSchema);

export default AtmModel;
