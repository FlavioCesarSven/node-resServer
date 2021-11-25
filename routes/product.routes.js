const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, mostrarProductos, mostrarProducto, actualizarProducto, EliminarProducto } = require('../controllers/product.controller');
const { exisProductoID, exisCategoriaID } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// Obtener todas las productos - publico
router.get( '/', mostrarProductos ) ;

//Obtener una producto or id - publico
router.get( '/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( exisProductoID ),
    validarCampos
], mostrarProducto ) ;

//Crear una producto - privado - cualquier token valido
router.post( '/', [ 
    validarJWT,
    check('nombre', 'El nombre del Producto es Obligatorio').not().isEmpty(),
    check('categoria', 'No es un Id de MongoDB ').isMongoId(),
    check('categoria').custom( exisCategoriaID ),
    validarCampos
 ] , crearProducto ) ;

//Actualizar - privado - cualquier token valido
router.put( '/:id', [
    validarJWT,
    // check('categoria', 'No es un Id de MongoDB ').isMongoId(), 
    check('id').custom( exisProductoID ),
    validarCampos
],actualizarProducto) ;

//Borrar una categoria - Admin
router.delete( '/:id', [
    validarJWT,
    esAdminRole, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( exisProductoID ),
    validarCampos
],EliminarProducto) ;
 


module.exports = router;