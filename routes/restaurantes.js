
const restaurantes = (APP, zonas) => {

  let zonaId = '';
  let nameRestaurante = '';
  let zonasLocation=[];
  let restaurante=[];
  let elecionPlatillo =  [];
  let newPlatillo=[];
  let allCost= 0
  let product=[]

  APP.get(['/zona/:zona','/zona/:zona/:restaurante'], (req, res)=>{
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
  APP.post(['/platillos/:status', ] ,(req, res) => {
    let status= req.params.status
    let platillo = restaurante.platillos
    switch(status){
      case 'comprando':
        if(req.body.process==='agregar'){
          elecionPlatillo = platillo.find(platillo => platillo.name == req.body.platillo )
          newPlatillo = newPlatillo.concat(elecionPlatillo)
          res.json({status: 'pedido actual:', result:{newPlatillo}})
        }else if(req.body.process==='eliminar'){
          let platillo = req.body.platillo
          newPlatillo = newPlatillo.filter(newPlatillo => newPlatillo.name != platillo )
          res.json({status: 'pedido actual:', result:{newPlatillo}})
        }else{
          res.send('opcion no valida')
        }
        break;
      case 'cancelar':
        newPlatillo=[]
        res.json({status: 'pedido cancelado', result:{newPlatillo}})
        break;
      case 'confirmado':
        for(let idx in newPlatillo){
          allCost= allCost + Number(newPlatillo[idx].precio)
          product = product.concat(newPlatillo[idx].name)
        }
        res.json({status: 'comprado el pedido', result:{newPlatillo}, total: {allCost}})
    }
  });

}

export default restaurantes