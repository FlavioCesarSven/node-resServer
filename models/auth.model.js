// const { Schema, model } = require('mongoose');

// const AuthSchema = Schema({
//     nombre: {
//         type: String,
//         required: [ true, 'El nombre es Obligatorio' ]
//     },
//     password: {
//         type: String,
//         required: [ true, 'El password es Obligatorio' ]
//     },
//     correo: {
//         type: String,
//         required: [ true, 'El correo es Obligatorio' ],
//         unique: true
//     },

//     // rol: {
//     //     type: String,
//     //     required: true,
//     //     enum: ['ADMIN_ROLE', 'USER_ROLE']
//     // },
//     estado: {
//         type: Boolean,
//         default: true
//     },
//     google: {
//         type: Boolean,
//         default: false
//     }
   
// });

// AuthSchema.methods.toJSON = function () {
//     const { __v, password, ...usuario } = this.toObject();

//     return usuario;
// }


// module.exports = model( 'Auth', AuthSchema );