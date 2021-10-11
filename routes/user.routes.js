const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require('../controllers/user.controllers');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

  router.get('/', usuarioGet );

  router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( esRoleValido),
    validarCampos
  ],usuarioPut);

  router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El password debe de contener 6 caracteres').isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),

    check('rol').custom( esRoleValido),
    validarCampos
   ] ,usuarioPost );

  router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
  ] ,usuarioDelete );

  router.patch('/', usuarioPatch )


module.exports = router;