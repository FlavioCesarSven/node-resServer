const mongoose = require('mongoose');


const dbConection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGODB_CNN);

        console.log('Base de Datos Online');

    } catch (error) {
        throw new Error('Error al inicializar la BD');
    }

}

module.exports = {
    dbConection
}