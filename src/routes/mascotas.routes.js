import {Router} from 'express'
import pool from '../database.js'

const router = Router();





router.get('/listm', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM mascotas');
        res.render('mascotas/listm', {mascotas: result})
       } catch (error) {
        res.status(500).json({message: error.message});
    }
});


router.get('/delete/:id', async(req, res)=>{
    try {

        const {id} = req.params
        await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
        res.redirect('/listm');
    } catch (error) {
        res.status(500).json({message: error.message});
    }   
});


export default router;