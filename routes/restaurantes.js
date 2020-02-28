
const restaurantes = (APP, zonas) => {

  let zonaId = ''
  let nameRestaurante = ''
  
  APP.get('/zona/:zona',(req, res)=>{
    console.log(zonas);
    zonaId = req.params.zona
    let zonas1 = zonas.find(zonas => zonas.zona === zonaId)
    //res.send(zonas)
    res.json({status: 'suceess', result:{zonas1}})
  });

  APP.get('/zona/:zona/:restaurante', (req, res)=>{
    zonaId=req.params.zona
    nameRestaurante = req.params.restaurante
    console.log(nameRestaurante)
    let zonas1 = zonas.find(zonas => zonas.zona === zonaId)
    console.log(zonas1.restaurantes)
    let restaurante = zonas1.find( zonas1 => zonas1.restaurantes === nameRestaurante )
    res.json({status: 'suceess', result:{restaurante}})
  })

}

export default restaurantes