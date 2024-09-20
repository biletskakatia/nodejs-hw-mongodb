import { SORT_ORDER } from '../constants/index.js';
import { Contacts } from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';



export const getContactsService = async ({ perPage, page, sortBy= "_Id", sortOrder = SORT_ORDER[0], userId  }) => {
    const skip = (page - 1) * perPage;
    const contacts = await Contacts.find({ userId }).skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const count = await Contacts.find().countDocuments({ userId });
    const paginationData = calculatePaginationData({count, perPage, page});
    return {
        page,
        perPage,
        contacts,
        totalItems: count,
        ...paginationData,
    };
};

export const findContactById = async (contactId, userId) => {
return Contacts.findOne({ _id: contactId, userId });
};

export const createContact = payload => Contacts.create(payload);

export const updateContact = async (contactId, data, userId, options = {}) => {
    const updatedContact = await Contacts.findOneAndUpdate(
        { _id: contactId, userId },
        data,
        { new: true, ...options }
    );

    if (!updatedContact) return null;
    return {
        data: updatedContact,
        isNew: Boolean(options.upserted),
    };
};

export const deleteContactServices = async (contactId, userId) => {
    return Contacts.findOneAndDelete({ _id: contactId, userId }); 
};