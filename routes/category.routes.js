const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, categoriasGet, categoriaPut, categoriaDelete, categoriaGet } = require('../controllers/category.controller');
const { exisCategoriaID, nombreCategoriaExiste } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todas las categorias - publico
router.get( '/', categoriasGet ) ;

//Obtener una categoria or id - publico
router.get( '/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( exisCategoriaID ),
    validarCampos
], categoriaGet ) ;

//Crear una categoria - privado - cualquier token valido
router.post( '/', [ 
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('nombre').custom( nombreCategoriaExiste ),
    validarCampos
 ] , crearCategoria ) ;

//Actualizar - privado - cualquier token valido
router.put( '/:id', [
    validarJWT,
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    check('id').custom( exisCategoriaID ),
    check('nombre').custom( nombreCategoriaExiste ),
    validarCampos
],categoriaPut) ;

//Borrar una categoria - Admin
router.delete( '/:id', [
    validarJWT,
    esAdminRole, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( exisCategoriaID ),
    validarCampos
],categoriaDelete) ;




module.exports = router;