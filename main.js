import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser'
//data del proyecto
import zonas from './utils/zonasRestaurantes'

//rutas del proyecto
import client from './routes/client'
import restaurant from './routes/restaurant';





dotenv.config()



const APP = express();
const CLIENTE = express();
const RESTAURANTE = express();
const REPARTIDOR = express();

APP.use(bodyParse.json());

APP.use('/cliente', CLIENTE);
APP.use('/restuarante', RESTAURANTE);
APP.use('/repartidor', REPARTIDOR);

let orderClient = []
let ordersRest = []
let ordersRep = []

const SERVER = http.createServer(APP);



client(CLIENTE, zonas, orderClient)
restaurant(RESTAURANTE, orderClient , ordersRest)



SERVER.listen(process.env.PORT);