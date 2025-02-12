import {Router} from 'express';
import pool from '../database.js';

const router = Router();

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        res.render('personas/list', {personas: result});
    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        const {nombre, apellido, edad} = req.body;
        const newPersona = {
            nombre,
            apellido,
            edad
        };
        await pool.query('INSERT INTO personas SET ?', [newPersona]);

    } catch (error) {
        res.status(500).json({
            message: 'Error',
            error
        });
    }
});

router.get('/add', (req, res) => {
    res.render('personas/add');
});

export default router;