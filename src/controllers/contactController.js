import { getContactsService, findContactById } from '../services/contacts.js';

export const getContacts = async (req, res) => {
    try {
        const contacts = await getContactsService();
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to retrieve contacts.",
            error: error.message,
        });
    }
};

export const getContactById = async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await findContactById(contactId);

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
            });
        }

        return res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        console.error('Error in getContactById:', error); 
        res.status(500).json({
            message: 'An error occurred while retrieving the contact',
            error: error.message, 
        });
    }
};