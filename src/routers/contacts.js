import { Router } from 'express';
import { getContacts, getContactById, addContact, patchMovie, deleteContact } from '../controllers/contactController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContactById));
contactsRouter.post('/', ctrlWrapper(addContact));
contactsRouter.patch('/:contactId', ctrlWrapper(patchMovie));
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContact));

export default contactsRouter;