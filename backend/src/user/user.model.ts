import * as mongoose from 'mongoose';
import User from './user.interface';
import {Schema} from "mongoose";
import { ObjectId } from 'mongodb';


const userSchema = new mongoose.Schema({
    userType: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    lastLogged: [String],
    npi: Number,
    specialty: String,
    city: String,
    profilePic: String,
    rates: [Schema.Types.Mixed],
    rating: Number,
    visits: [{
        date: String, hour: String, id: Number, status: String, patientName: String,
        doctorName: String, patientId: String, doctorId: String, read: Boolean,
        exam: {
            weight: Number, heartRate: Number, bloodPressure: Number, medHistory: String,
            diagnosis: String, prescription: String, advices: String
        }
    }]
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;