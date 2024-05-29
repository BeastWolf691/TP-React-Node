import express from 'express';
import Commande from '../models/commande.js';
const router = express.Router();

router.get('/bars/:bar_id/commandes', async (req, res) => {//liste des commandes d'un bar
    try {
        const commande = await Commande.findAll({where: req.params});
        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id);
        if (commande) {
            res.json(commande);
        } else {
            res.status(404).json({ error: 'commande not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/commandes', async (req, res) => {//liste de toutes les commandes
    try {
        const commande = await Commande.findAll({where: req.params});
        res.json(commande);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//ajouter une commande a un bar
router.post('/bars/:bar_id/commandes', async (req, res) => {
    try {
        const newCommande = await Commande.create(req.body);
        res.status(201).json(newCommande);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.put('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id)
        if (commande) {
            await commande.update(req.body)
            res.json(commande)
        } else {
            res.status(404).json({ error: 'commande not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/commandes/:id', async (req, res) => {
    try {
        const commande = await Commande.findByPk(req.params.id)
        if (commande) {
            await commande.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'commande not found' })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;