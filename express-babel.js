import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
//data del proyecto
import zonas from './utils/zonasRestaurantes'

//rutas del proyecto
import restaurantes from './routes/restaurantes'


dotenv.config()

const APP = express();


const SERVER = http.createServer(APP);



restaurantes(APP, zonas)

/*APP.get('/',(req, res)=>{
  console.log(zonas1);
  //res.send(zonas)
  res.json({status: 'suceess', result:{zonas1}})
});*/

APP.post(['/', '/users'] ,(req, res) => {
  console.log(req.headers);
  res.send('end request on post')
});

SERVER.listen(process.env.PORT);