import express from 'express';
import Biere_commande from '../models/biere_commande.js';
const router = express.Router();

router.get('/biere_commande/', async (req, res) => {
    try {
        const bierecommande = await Biere_commande.findAll({ where: req.params });
        res.json(bierecommande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/biere_commande/commandes/:id/bieres/:id', async (req, res) => {
    try {
        const biere_commande = await Biere_commande.create(req.body);
        res.status(201).json(biere_commande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/biere_commande/:id', async (req, res) => {
    try {
        const biere_commande = await Biere_commande.findByPk(req.params.id);
        if (biere_commande) {
            await biere_commande.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'biere_commande not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
