const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto}  = require('../models/');

const coleccionesPermitadas  = [
    'usuarios', 
    'categorias', 
    'productos',
    'roles'
];

const buscarUsuarios = async ( termino = '', resp = response ) => {

    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const usuario = await Usuario.findById( termino );
        return resp.json( {
           results : ( usuario ) ? [usuario  ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [{ nombre : regex}, { correo: regex}] ,
        $and: [{estado: true}]  
    });

    return resp.json( {
        results : ( usuarios ) ? [usuarios ] : []
     });
}

const buscarCategorias = async ( termino = '', resp = response ) => {

    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const categoria = await Categoria.findById( termino );
        return resp.json( {
           results : ( categoria ) ? [categoria  ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ 
        $or: [{ nombre : regex}] ,
        $and: [{estado: true}]  
    });

    return resp.json( {
        results : ( categorias ) ? [ categorias ] : []
     });
}


const buscarProductos = async ( termino = '', resp = response ) => {

    const esMongoId = ObjectId.isValid( termino );
    if ( esMongoId ) {
        const producto = await Producto.findById( termino ).populate('categoria','nombre').populate('usuario', 'nombre');
        return resp.json( {
           results : ( producto ) ? [producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ 
        $or: [{ nombre : regex}] ,
        $and: [{estado: true}]  
    }).populate('categoria','nombre');;

    return resp.json( {
        results : ( productos ) ? [ productos ] : []
     });
}


const buscar = (req, resp = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitadas.includes(coleccion)) {
        return resp.status(400).json({
            msg: `Las colecciones son ${coleccionesPermitadas} `    
        });
    }

    switch (coleccion) {
        case 'usuarios':
                buscarUsuarios(termino, resp);
            break;
        case 'categorias':
            buscarCategorias(termino, resp);
            break;
        case 'productos':
            buscarProductos(termino, resp);
            break;
    
        default:
            resp.status(500).json({
                msg : `Se me olvido realizar esta búsqueda`
            })
            break;
    }
}

module.exports = {
    buscar
}