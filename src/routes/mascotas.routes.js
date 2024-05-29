import {Router} from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router();

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})


router.get('/addm', (req, res)=>{
    res.render('mascotas/addm')
 });
 
 router.post('/addm', upload.single('file') , async (req, res) => {
     try {
         const { name, genero, age, observacion} = req.body
         let newMascota = {}
         if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newMascota = { name, genero, age, observacion, imagen}
        }else{
            newMascota = {name, genero, age, observacion}
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

router.get('/editm/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [mascota] = await pool.query('SELECT * FROM mascotas WHERE id = ?', [id]);
        const mascotaEdit = mascota[0]
        res.render('mascotas/editm', { mascota: mascotaEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/editm/:id',upload.single('file'), async (req, res) => {
    try {
        const {id} = req.params
        const {name, genero, age, observacion}  = req.body
        let editMascota = {}
         if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editMascota = { name, genero, age, observacion, imagen}
        }else{
            editMascota = {name, genero, age, observacion}
        }
        await pool.query('UPDATE mascotas SET ? WHERE id = ?', [editMascota, id]);
        res.redirect('/listm');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;