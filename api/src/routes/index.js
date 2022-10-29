const { Router } = require('express');
const Characters = require('./Characters.js');
const Occupations = require('./Occupations.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/characters', Characters)
router.use('/occupations', Occupations)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
