//generador de ids randon
import { v4 as uuidv4 } from 'uuid';

const restaurant = (REST, orderClient, ordersRest) =>{
  REST.get('/pedido' , (req, res) => {
    ordersRest.push({
      id: uuidv4(),
      pedido: [...orderClient]
    })
    res.json({status: 'comprado el pedido', result:{ordersRest}})
  })
}

export default restaurant;