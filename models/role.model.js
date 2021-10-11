const { Schema, model } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String,
        require: [true, "El rol es Obligatorio"]
    },
});



module.exports = model( 'Role', RolSchema );