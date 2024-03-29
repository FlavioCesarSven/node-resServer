const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, "El nombre es Obligatorio"],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    precio : {
        type: Number,
        default: 0,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion:{
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true
    }



});

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...producto } = this.toObject();
    
    return producto;
}

module.exports = model( 'Producto', ProductoSchema );