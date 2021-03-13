const { response, request } = require('express');

const usuarioGet = (req = request, res = response ) => {
    const query = req.query;

    res.json({
        msg: 'get API Controllers',
        query
    })

  }

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API Controllers',
        id,
    })
  }

const usuarioPost = (req, res= response) => {
    const { nombre, edad } = req.body;

    
    res.json({
        msg: 'post API Controllers',
        nombre,
        edad
    })
  }


const usuarioDelete = (req, res= response) => {
    res.json({
        msg: 'delete API Controllers',
    })
  }

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API Controllers'
    })
}

module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}