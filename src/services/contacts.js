import { SORT_ORDER } from '../constants/index.js';
import { Contacts } from '../db/models/contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';



export const getContactsService = async ({ perPage, page, sortBy= "_Id", sortOrder = SORT_ORDER[0], }) => {
    const skip = (page - 1) * perPage;
    const contacts = await Contacts.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const count = await Contacts.find().countDocuments();
    const paginationData = calculatePaginationData({count, perPage, page});
    return {
        page,
        perPage,
        contacts,
        totalItems: count,
        ...paginationData,
    };
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