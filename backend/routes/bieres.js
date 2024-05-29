import express from 'express';
import Biere from '../models/biere.js';

const router = express.Router();

// Liste des bières d'un bar
router.get('/bars/:bar_id/bieres', async (req, res) => {
    try {
        const bieres = await Biere.findAll({where: req.params});
        res.json(bieres);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Détail d'une bière
router.get('/bieres/:id', async (req, res) => {
    try {
        const biere = await Biere.findByPk(req.params.id);
        if (biere) {
            res.json(biere);
        } else {
            res.status(404).json({ error: 'Bière non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Détail de ttes les bieres
router.get('/bieres', async (req, res) => {
    try {
        const biere = await Biere.findAll();
        if (biere) {
            res.json(biere);
        } else {
            res.status(404).json({ error: 'Bière non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Ajouter une bière à un bar
router.post('/bars/:id/bieres', async (req, res) => {
    try {
        const newBiere = await Biere.create(req.body);
        res.status(201).json(newBiere);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Modifier une bière
router.put('/bieres/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const biere = await Biere.findByPk(id);
        if (biere) {
            await biere.update(req.body);
            res.json(biere);
        } else {
            res.status(404).json({ error: 'Bière non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Supprimer une bière
router.delete('/bieres/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const biere = await Biere.findByPk(id);
        if (biere) {
            await biere.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Bière non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
