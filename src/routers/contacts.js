import { Router } from 'express';
import { getContacts, getContactById, addContact, patchMovie, deleteContact } from '../controllers/contactController.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { addContactSchema, patchContactSchema } from '../validation/contacts.js';
import validateBody from '../utils/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';


const contactsRouter = Router();
contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(getContacts));
contactsRouter.get('/:contactId',isValidId, ctrlWrapper(getContactById));
contactsRouter.post('/',upload.single('photo'),validateBody(addContactSchema), ctrlWrapper(addContact));
contactsRouter.patch('/:contactId',upload.single('photo'), isValidId, validateBody(patchContactSchema),ctrlWrapper(patchMovie));
contactsRouter.delete('/:contactId',isValidId, ctrlWrapper(deleteContact));

export default contactsRouter;