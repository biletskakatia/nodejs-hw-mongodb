import { Router } from 'express';
import { getContacts, getContactById, addContact, patchMovie, deleteContact } from '../controllers/contactController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { addContactSchema, patchContactSchema } from '../validation/contacts.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';


const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContacts));
contactsRouter.get('/:contactId',isValidId, ctrlWrapper(getContactById));
contactsRouter.post('/',validateBody(addContactSchema), ctrlWrapper(addContact));
contactsRouter.patch('/:contactId',isValidId, validateBody(patchContactSchema),ctrlWrapper(patchMovie));
contactsRouter.delete('/:contactId',isValidId, ctrlWrapper(deleteContact));

export default contactsRouter;