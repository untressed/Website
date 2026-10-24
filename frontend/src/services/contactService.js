import axios from 'axios';

const API_URL = '/api/contact/';

// Submit contact form
const submitContact = async (contactData) => {
    const response = await axios.post(API_URL, contactData);
    return response.data;
};

const contactService = {
    submitContact,
};

export default contactService;
