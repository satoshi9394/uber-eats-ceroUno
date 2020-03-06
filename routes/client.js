
const restaurantes = (CLIENTE, zonas, orderClient) => {

  let zonaId = '';
  let nameRestaurante = '';
  let zonasLocation=[];
  let restaurante=[];
  let elecionPlatillo =  [];
  let allCost= 0

  CLIENTE.get(['/zona/:zona','/zona/:zona/:restaurante'], (req, res)=>{
    zonaId=req.params.zona
    nameRestaurante = req.params.restaurante
    zonasLocation = zonas.find(zonas => zonas.zona === zonaId)
    if (nameRestaurante){
      let rest=zonasLocation.restaurantes
      restaurante = rest.find( rest => rest.name = nameRestaurante )
      res.json({status: 'suceess', result:{restaurante}})
    }else{
      res.json({status: 'suceess', result:{zonasLocation}})
    }
  })
  CLIENTE.post(['/platillos/:status', ] ,(req, res) => {
    let status= req.params.status
    let platillo = restaurante.platillos
    switch(status){
      case 'comprando':
        if(req.body.process==='agregar'){
          elecionPlatillo = platillo.find(platillo => platillo.name == req.body.platillo )
          orderClient.push({...elecionPlatillo})
          res.json({status: 'pedido actual:', result:{orderClient}})
        }else if(req.body.process==='eliminar'){
          let platillo = req.body.platillo
          orderClient = orderClient.filter(orderClient => orderClient.name != platillo )
          res.json({status: 'pedido actual:', result:{orderClient}})
        }else{
          res.send('opcion no valida')
        }
        break;
      case 'cancelar':
        orderClient=[]
        res.json({status: 'pedido cancelado', result:{orderClient}})
        break;
      case 'confirmado':
        for(let idx in orderClient){
          allCost= allCost + Number(orderClient[idx].precio)
        }
        res.json({status: 'comprado el pedido', result:{orderClient}, total: {allCost}})
      
    }
  });

}

export default restaurantes