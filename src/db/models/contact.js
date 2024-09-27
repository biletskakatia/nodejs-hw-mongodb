import { Schema, model } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        phoneNumber: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            default: 'personal',
            required: true,
        },
        userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        },

        photo: { 
            type: String,
        }
    },
    

    {
        timestamps: true,
        versionKey: false,
    }
);
export const sortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType"];
export const Contacts = model('contacts', contactSchema);