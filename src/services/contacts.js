import { Contacts } from '../db/models/contact.js';

export const getContactsService = async () => {
    const contacts = await Contacts.find();
    return contacts;
};

export const findContactById = async (contactId) => {
return Contacts.findById(contactId);
};

export const createContact = payload => Contacts.create(payload);

export const updateContact = async (filter, data, options = {}) => {
    const updatedContact = await Contacts.findOneAndUpdate(filter, data, {
        new: true,
        ...options,
    });

    if (!updatedContact) return null;
    return {
        data: updatedContact,
        isNew: Boolean(options.upserted),
    };
};

export const deleteContactServices = filter => Contacts.findByIdAndDelete(filter);