
const express   = require('express');
const cors      = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        
        //Middleware
        this.middleware();

        //Rutas de mi Aplicación
        this.route();
    }

    middleware(){
        //cors
        this.app.use(cors());

        //Parseo y lectura del Body
        this.app.use( express.json() );

        //Directorio Público
        this.app.use( express.static('public') );

    }

    route(){
        this.app.use(this.usuariosPath, require('../routes/user.routes'));
    }

    listen(){ 
        this.app.listen( this.port, () => {
            console.log( `Servidor corriendo en Puerto ${ this.port }` );
        });
    }

}

module.exports = Server;