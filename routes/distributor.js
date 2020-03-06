

const distributor = (REP, ordersRep) => {
  REP.get('/', (req, res)=> {
    console.log(ordersRep)
    res.json({status: 'pedido pendiente', result:{ordersRep}})
  })
}


export default distributor;