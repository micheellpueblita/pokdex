window.addEventListener("load", ()=>{
  const btnAgregar = document.getElementById("btn-agregar");
  const divAgregar = document.getElementById("contenedor-agregar");
  const btnEnviar = document.getElementById("btn-enviar");
  const buscador = document.getElementById("buscador");
  const divDatos = document.getElementById("contenedor-mostrar");
  const divResultados = document.getElementById("contenedor-resultados");
  const formNuevo = document.getElementById("form-nuevo");
  let pokemonExistente = 0;



  btnAgregar.addEventListener("click", (evento)=>{
    divAgregar.style.display = "block";
    divDatos.style.display = "none";
  });

  formNuevo.addEventListener("change", (evento) => { //EVENTOS DEL FORM PARA VALIDAR LOS DATOS
    let pokemonNuevo = document.getElementById("nombre").value;
    const msg1 = document.getElementById("msg1");
    let altura = document.getElementById("altura").value;
    const msg2 = document.getElementById("msg2");
    let peso = document.getElementById("peso").value;
    const msg3 = document.getElementById("msg3");
    let exp_base = document.getElementById("exp_base").value;
    const msg4 = document.getElementById("msg4");
    pokemonExistente = 0;
    if(altura<0){
      msg2.innerHTML = "Numero invalido"
      pokemonExistente = 1;
    }
    if(peso<0){
      msg3.innerHTML = "Numero invalido"
      pokemonExistente = 1;
    }
    if(exp_base<0){
      msg4.innerHTML = "Numero invalido"
      pokemonExistente = 1;
    }
    fetch("dynamics/php/pokemon.php?q="+pokemonNuevo)
    .then((response)=>{
      return response.json();
    })
    .then((datosJSON)=>{
      if(datosJSON.length != 0)//Condiciona que ya existe ese pokemón
      {
        //alert("Parece que el pokemon que ingresaste ya existe. :(");
        msg1.innerHTML = "Ese Pokemón ya existe ):"
        pokemonExistente = 1;
      }
    }); 
  });

  btnEnviar.addEventListener("click", (evento)=>{//Verificar que todo esta bien en el formulario
    divAgregar.style.display = "none";
    evento.preventDefault();
    let pokemonNuevo = document.getElementById("nombre").value;
    fetch("dynamics/php/pokemon.php?q="+pokemonNuevo)
    .then((response)=>{
      return response.json();
    })
    .then((datosJSON)=>{
      if(datosJSON.length == 0 && pokemonExistente ==0)
      {
        let datosForm = new FormData(formNuevo);
        fetch("dynamics/php/crear_pokemon.php", {
          method:"POST",
          body: datosForm,
        }).then((response)=>{
          return response.json();
        }).then((datosJSON)=>{
          if(datosJSON.ok == true){
            alert("Todo bien, tu pokemon se registro. :)");
          }else{
            alert(datosJSON.texto);
          }
        })
      }
      else
        alert("Rellena correctamente todos los campos");
    }); 
  });

  fetch("dynamics/php/tipos.php")
    .then((response)=>{
      return response.json();
    })
    .then((datosJSON)=>{
      //console.log(datosJSON);
      let selectTipos = document.getElementById("select-tipos");
      for(tipo of datosJSON){
        selectTipos.innerHTML+="<option value='"+tipo.id+"'>"+tipo.nombre+"</option>";
        let selectTiposActualizada = document.getElementById("select-tiposActualizada");
        selectTiposActualizada.innerHTML+="<option value='"+tipo.id+"'>"+tipo.nombre+"</option>";
      }
    });

  buscador.addEventListener("keyup", (evento)=>{//Detecta cada letra que presionamos
    let termino = buscador.value;//almacena nuestra busaqueda en una variable
    divResultados.innerHTML = "";
    if(termino.length >= 3){//Aqui si es mayor de 3 letras hace la consulta en el php
      fetch("dynamics/php/pokemon.php?q="+termino)
        .then((response)=>{
          return response.json();
        })
        .then((datosJSON)=>{
          if(datosJSON.length == 0)//si no lo encuentra que muestre no se encntraron resultados
          {
            let noResultados = document.createElement("noResultados");
            noResultados.innerHTML = "No se encontraron resultados";
            divResultados.appendChild(noResultados);
          }

          for(pokemon of datosJSON) //Mostrar resultados
          {
            let div = document.createElement("div");
            div.innerHTML = pokemon.pok_name;
            div.dataset.id = pokemon.pok_id;
            div.classList.add("coincidencia");
            divResultados.appendChild(div);
          }
        });
    }
  });




const contenedorActualizar = document.getElementById("contenedor-actualizar")


  divResultados.addEventListener("click", (evento)=>{
    if(evento.target.classList.contains("coincidencia")){
      let id = evento.target.dataset.id;

      fetch("dynamics/php/pokemon.php?id="+id)
        .then((response)=>{
          return response.json();
        })
        .then((datosJSON)=>{
          if(datosJSON.ok == true){
            divDatos.innerHTML="<div class='dato'><strong>Nombre</strong>"+datosJSON.datos.nombre+"</div>";
            divDatos.innerHTML+="<div class='dato'><strong>Altura</strong>"+datosJSON.datos.altura+"</div>";
            divDatos.innerHTML+="<div class='dato'><strong>Peso</strong>"+datosJSON.datos.peso+"</div>";
            divDatos.innerHTML+="<div class='dato'><strong>Tipo</strong>"+datosJSON.datos.tipo+"</div>";
            divDatos.innerHTML+="<button data-id="+id+" id='btn-eliminar'>Eliminar pokemon</button>";
            divDatos.innerHTML+="<button data-id="+id+" id='btn-form-actualizar'>Actualizar datos</button>";
            contenedorActualizar.innerHTML+="<button data-id="+id+" id='btn-actualizar'>Actualizar</button>";
            divDatos.style.display = "flex";
          }
        });
    }
  });

  let datosErroneos=0;
  divDatos.addEventListener("click", (evento) =>{

    if(evento.target.id == "btn-eliminar"){
      let datosForm = new FormData();
      datosForm.append("id", evento.target.dataset.id);
      fetch("dynamics/php/borrar_pokemon.php",{
        method:"POST",
        body: datosForm,
      }).then((response)=>{
        return response.json();
      }).then((datosJSON)=>{
        if(datosJSON.ok ==true)
        {
          alert("Se elimino este pokemon");
          window.location.reload();//Se recarga la pagina para dejar de mostrar la informacion del pokemon que se elimino
        }
        else
          alert("No se pudo eliminar");
      });
    }
    if(evento.target.id == "btn-form-actualizar"){
      contenedorActualizar.style.display = "block";
    }

    contenedorActualizar.addEventListener("change", (evento) => {

      let alturaActualizada = document.getElementById("alturaActualizada").value;
      const msgError1 = document.getElementById("msgError1");
    
      let pesoActualizada = document.getElementById("pesoActualizada").value;
      const msgError2 = document.getElementById("msgError2");
    
      let exp_baseActualizada = document.getElementById("exp_baseActualizada").value;
      const msgError3 = document.getElementById("msgError3");

      if(alturaActualizada<0){
        msgError1.innerHTML = "Numero invalido"
        datosErroneos = 1;
      }
      if(pesoActualizada<0){
        msgError2.innerHTML = "Numero invalido"
        datosErroneos = 1;
      }
      if(exp_baseActualizada<0){
        msgError3.innerHTML = "Numero invalido"
        datosErroneos = 1;
      }
      console.log(datosErroneos)
    })

    const btnActualizar = document.getElementById("btn-actualizar")
    const formActualizar = document.getElementById("form-actualizar")//Que ya se actualice la base de datos
    btnActualizar.addEventListener("click", (evento) => {


      let datosForm = new FormData(formActualizar);//Tomando la informacion del forms
      datosForm.append("id", evento.target.dataset.id);//Agregandole el id del pokemon
      fetch("dynamics/php/actualizar_datos.php", {
        method:"POST",
        body: datosForm,
      }).then((response)=>{
        return response.json();
      }).then((datosJSON)=>{
        if(datosJSON.ok == true){
          alert("Todo bien, tu pokemon se actualizo");
        }else{
          alert(datosJSON.texto);
        }
      })




    })

  });



});