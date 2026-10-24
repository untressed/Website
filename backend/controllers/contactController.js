const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const contact = await Contact.create({
            name,
            phone,
            email,
            message
        });

        res.status(201).json({
            success: true,
            data: contact,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    submitContact
};
