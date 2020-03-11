

 firebase.initializeApp({
    apiKey: "aquituApikey",
    authDomain: "xxxxxx",
    projectId: "xxxxxxx"
  });
  var db = firebase.firestore();
  

 ///funcion insertar servicio a firestore, primero conseguimos el valor de los txt y añadimos a coleccion
/*
function agregarServicio(){
    let Servicio=document.querySelector('#Servicio').value;  
    let Anden=document.querySelector('#Anden').value;  
    db.collection("Servicios").add({
        servicio: Servicio,
        anden: Anden,
        fecha:hoy,
        hora:horita,
        intervalo:0
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });     
    leerDatos();
  }
*/
 
 /*Funcion que recoje el texto que contiene el boton del anden, se lo pasamos atraves de la funcion onclick junto con el anden
 y ingresa el servicio a la base de datos y tabla. */
  function agregarServiciobtn(Servicio,Anden){
    let Fecha=new Date();
    let dd=Fecha.getDate();
    let mm=Fecha.getMonth()+1;
    let yyyy=Fecha.getFullYear();
    let hoy= dd+'/'+mm+'/'+yyyy;
    let hora=Fecha.getHours();
    let minutos=Fecha.getMinutes();
    str_minutos = new String (minutos)
    if (str_minutos.length == 1){
       minutos = "0" + minutos
    }
    let segundos=Fecha.getSeconds();
    str_segundo = new String (segundos)
    if (str_segundo.length == 1){
       segundos = "0" + segundos
    }
    let horita= hora+':'+minutos+':'+segundos;
    
    db.collection("Servicios").add({
        servicio: Servicio,
        anden: Anden,
        fecha:hoy,
        hora:horita,
        intervalo:0
    })
    .then(function(docRef) {        
        toastr.success(`${Servicio} correctamente`, 'Ingresado', { 
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"})
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });     
    leerDatos();
  }
  

//traer datos desde firestore usando querysnapshot como escucha
  function leerDatos(){
     
    let tabla=document.getElementById('tabla');
    
    db.collection("Servicios").onSnapshot((querySnapshot) => {
        tabla.innerHTML='';
       
        querySnapshot.forEach((doc) => {
            
            tabla.innerHTML +=`
            <tr>
            <th scope="row">${doc.data().servicio}</th>
            <td>${doc.data().hora}</td>
            <td>${doc.data().fecha}</td>        
            <td>${doc.data().anden}</td>
            <td><input type="button" class=" btn btn-warning"value="Eliminar" onclick="eliminar('${doc.id}')"</td>
            </tr>
            `;
        });
        sortTable(0, 'str');

    });

  }
 
  /* <td><input type="button" class="btn btn-warning" value="Modificar" onclick="modificar('${doc.id}','${doc.servicio}','${doc.anden}')"</td> */ 
 
  /// funcion que imprimia los registros ingresados en cards arriba de la tabla
  /*
  function consultar2(){  
    var div=document.getElementById('contenido');
    
    db.collection("Servicios").onSnapshot((querySnapshot) => {    
        div.innerHTML='';       
        querySnapshot.forEach((doc) => {     
            div.innerHTML+=`
            <div class="card col-3 mt-2" style="width: 18rem;" id="${doc.id}"  >
            <img src="transantiago_003.jpg" class="rounded-circle" width="80%"> 
            <div class=card-body "> 
              <h3 class="card-title">Servicio:${doc.data().servicio}</h5>                       
             <p class="card-text lead">Hora:${doc.data().hora}</p>
             <p class="card-text lead">Anden:${doc.data().anden}</p>
                                                
             <p></p>
            </div>           
            </div>       
            `
        })

    });
} 
*/
    //funcion eliminar que recibe como paremetro el doc.id que viene desde la coleccion del documento
  function eliminar(id){
    db.collection("Servicios").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    ///ejecutamos la funcion leer datos para refrescar la tabla
    leerDatos();
}
    //editar un registro

    /*
function recuperarValor(Servicio){
    let cajaServicio=document.querySelector('#Servicio');
    cajaServicio.value=Servicio;
    return Servicio;
}
function modificar(ServicioAmdf){
    let nuevoValor='';
    let cajaServicio=document.querySelector('#Servicio');
    valorIngresado=cajaServicio.value;
    nuevoValor=document.getElementById(`${ServicioAmdf}`);
    nuevoValor=valorIngresado;
    
}
*/

/*
function cambiarestado2(id){
    
    let body=document.getElementById(`${id}`);
    Valor1='Inactivo';
    Valor2='Disponible';
    db.collection("Servicios").doc(id)
    .onSnapshot(function(doc) {
        if(doc.data().estado==Valor1){
            body.classList.add('bg-danger');
        }if(doc.data().estado==Valor2){
            body.classList.add('bg-success');
        }
        console.log("Current data: ", doc.data());
    });
}

function cambiarestado(id,Estado){
    var washingtonRef = db.collection("Servicios").doc(id);
    let body=document.getElementById(`${id}`);

    body.onclick=function (){   
        var valor='Inactivo';
        Estado=valor;       
        return washingtonRef.update({
            estado:Estado            
        })
        .then(function() {                       
            console.log("Servicio Actualizado");       
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    
}
// cambiarestado2(id)
}
*/