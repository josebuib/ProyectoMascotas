import {Router} from 'express'
import pool from '../database.js'

const router = Router();


router.get('/addm', (req, res)=>{
    res.render('mascotas/addm')
 });
 
 router.post('/addm', async (req, res)=>{
     try {
         const { name, genero, age, observacion} = req.body
         const newMascota = {
             name, genero, age, observacion
         }
         await pool.query('INSERT INTO mascotas SET ?', [newMascota]);
         res.redirect('/listm');
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 });



router.get('/listm', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM mascotas');
        res.render('mascotas/listm', {mascotas: result})
       } catch (error) {
        res.status(500).json({message: error.message});
    }
});


router.get('/deletem/:id', async(req, res)=>{
    try {

        const {id} = req.params
        await pool.query('DELETE FROM mascotas WHERE id = ?', [id]);
        res.redirect('/listm');
    } catch (error) {
        res.status(500).json({message: error.message});
    }   
});


export default router;