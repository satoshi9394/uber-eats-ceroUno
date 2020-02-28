
const restaurantes = (APP, zonas) => {

  let zonaId = '';
  let nameRestaurante = '';
  let zonasLocation=[];
  let restaurante=[];
  let elecionPlatillo =  [];
  let newPlatillo=[];

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
  APP.post(['/platillos', ] ,(req, res) => {
    let platillo = restaurante.platillos
    if(req.body.endProces===false){
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
    }else{
      res.json({status: 'Fin de pedido', result:{restaurante}})
    }
    res.json({status: 'suceess', result:{restaurante}})
  });

}

export default restaurantes