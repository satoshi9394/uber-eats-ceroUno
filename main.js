import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser'
//data del proyecto
import zonas from './utils/zonasRestaurantes'

//rutas del proyecto
import restaurantes from './routes/restaurantes'


dotenv.config()

const APP = express();

APP.use(bodyParse.json());


const SERVER = http.createServer(APP);



restaurantes(APP, zonas)


SERVER.listen(process.env.PORT);