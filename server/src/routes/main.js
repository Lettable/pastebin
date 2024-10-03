const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'This is the example route!' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `You requested example with ID: ${id}` });
});

router.post('/:name', (req, res) => {
    const { name } = req.params;
    res.json({ message: `You sent a name: ${name}` });
});

export default router;
