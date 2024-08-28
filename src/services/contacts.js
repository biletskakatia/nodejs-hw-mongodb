import { Contacts } from '../db/models/contact.js';

export const getContactsService = async () => {
    const contacts = await Contacts.find();
    return contacts;
};

export const findContactById = async (contactId) => {
return Contacts.findById(contactId);
};