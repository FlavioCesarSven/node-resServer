const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');

const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es Obligatorio').isEmail(),
    check('password', 'El password es Obligatorio').not().isEmpty(),
    validarCampos
],login );



 


module.exports = router;