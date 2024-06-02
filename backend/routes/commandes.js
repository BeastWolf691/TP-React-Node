import express from 'express';
import Commande from '../models/commande.js';
const router = express.Router();

// Liste des commandes d'un bar
router.get('/bars/:bar_id/commandes', async (req, res) => {
    try {
        const commandes = await Commande.findAll({ where: { bar_id: req.params.bar_id } });
        res.json(commandes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Liste des commandes d'une bière
router.get('/biere/:id/commandes', async (req, res) => {
    try {
        const commandes = await Commande.findAll({ where: { biere_id: req.params.id } });
        res.json(commandes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtenir une commande par ID
router.get('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            res.json(commande);
        } else {
            res.status(404).json({ error: 'Commande not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Liste de toutes les commandes
router.get('/commandes/', async (req, res) => {
    try {
        const commandes = await Commande.findAll();
        res.json(commandes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ajouter une commande à un bar
router.post('/bars/:bar_id/commandes', async (req, res) => {
    try {
        const newCommande = await Commande.create(req.body);
        res.status(201).json(newCommande);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour une commande
router.put('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.update(req.body);
            res.json(commande);
        } else {
            res.status(404).json({ error: 'Commande not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une commande
router.delete('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            await commande.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Commande not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
