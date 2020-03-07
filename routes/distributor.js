let orderActual = []
let cost;

const distributor = (REP, ordersRep) => {
  REP.get('/', (req, res)=> {
    res.json({status: 'pedidos pendientes', result:{ordersRep}})
  })
  REP.put('/status', (req, res)=>{
    const status = req.query.action
    const id = req.query.id
    switch (status) {
      case 'aceptado':
        const inProcess = ordersRep.filter( o => o.id === id)
        orderActual.push({...inProcess})
        res.json({status: 'pedido aceptado', result:{orderActual}})
        break
      case 'rechazado':
        const cancelado = orderActual.filter( o  => o.id === id)
        orderActual = orderActual.find( o => o.id !== id)
        res.json({status: 'pedido rechazado', actual:{orderActual}, cancelado: {cancelado} })
        break
      case 'ver':
        const actual = orderActual.filter( o => o.id === id )
        res.json({status: 'pedido actual', result:{actual}})
        break
      case 'finalizar':
        const endOrder = orderActual.filter( o => o.id === id)
        orderActual = orderActual.find( o => o.id !== id)
        for( let idx in endOrder.pedido ){
          cost += (endOrder.pedido[idx].precio * 0.2)
        }
        res.json({status: 'pedido entregado', result:{endOrder}, pedientes: {orderActual}, profits: 'ganado hasta el momento', profitsQty: {cost} })
    }
  })
}


export default distributor;