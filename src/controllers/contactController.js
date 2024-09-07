import { getContactsService, findContactById, createContact, updateContact, deleteContactServices } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContacts = async (req, res) => {

        const contacts = await getContactsService();
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;

        const contact = await findContactById(contactId);

        if (!contact) {
            throw createHttpError(404, "Contact not found");
        }

        return res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
};

export const addContact = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        contact,
    });
};

export const patchMovie = async (req, res) => {
    const { contactId } = req.params;
    const result = await updateContact({ _id: contactId }, req.body);

    if (!result) {
        throw createHttpError(404, `Contact with id=${contactId} not found`);
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.data,
    });
};

export const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const data = await deleteContactServices({ _id: contactId });

    if (!data) {
        throw createHttpError(404, `Contact with id=${contactId} not found`);
    }

    res.status(204).send();
};