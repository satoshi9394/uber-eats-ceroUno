//generador de ids randon
import { v4 as uuidv4 } from 'uuid';

let orderActual = []
let orderEnd = []

const restaurant = (REST, orderClient, ordersRest) =>{
  REST.get('/pedido' , (req, res) => {
    ordersRest.push({
      id: uuidv4(),
      pedido: [...orderClient]
    })
    res.json({status: 'pedidos recibidos', result:{ordersRest}})
  })
  REST.put('/status', (req, res) =>{
    const status = req.query.action
    const id = req.query.id
    switch (status){
      case 'aceptado':
        const inProcess = ordersRest.filter( o => o.id === id )
        orderActual = orderActual.concat(inProcess)
        res.json({status: 'pedido aceptado', result:{orderActual}})
        break
      case 'cancelar':
        const cancelado = ordersRest.filter( o => o.id === id )
        ordersRest = ordersRest.find( o => o.id !== id )
        res.json({status: 'pedido cancelado', actual:{ordersRest}, cancelado: {cancelado} })
        break
      case 'terminado':
        orderEnd = orderActual.find( o => {
          if(o.id === id){
            return o.pedido
          }
        })
        console.log(orderEnd)
        ordersRest.push({
          id: uuidv4(),
          pedido: [orderEnd]
        })
        res.json({status: 'pedido finalizado', result:{orderEnd}})
        break
    }

    res.send(status)
  })
}

export default restaurant;