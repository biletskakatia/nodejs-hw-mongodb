import { Schema, model } from "mongoose";


const userSchema = new Schema({
name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
},
password: {
    type: String,
    required: true,
},
}, { versionKey: false, timestamps: true, });

export const UserCollection = model('user', userSchema);
