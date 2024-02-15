
/* CREATE accessToken

    curl -X POST "https://accounts.spotify.com/api/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=0e6c8481b3384742b6591b303f0376db&client_secret=b2f86eca748242c9aa0957d827be9c60"

*/

//var accessToken = "BQC6IyU8fslRobq2FbuHcBF9nv9ZpLM2dIa1x5Xs8yqam4UqcZCFIzGb_So51HLQD9QncFAc7UgdUFcY5_sgq1J9mFV3W0t1pPXfdpEF1yYD9ActPRc";




function listadoArtistas() {

    const clientId = '0e6c8481b3384742b6591b303f0376db';
    const clientSecret = 'b2f86eca748242c9aa0957d827be9c60';
    const requestBody = {
        grant_type: 'client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(requestBody)
    }) 
    .then(response => response.json())
    .then(data => {

        // Almacenar el token de acceso en la variable accessToken
        accessToken = data.access_token;

                fetch('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C5eAWCfyUhZtHHtBdNk56l1%2C1vCWHaC5f2uS3yhpwWbIA6%2C762310PdDnwsDxAQxzQkfX%2C6Mo9PoU6svvhgEum7wh2Nd%2C5UqTO8smerMvxHYA5xsXb6%2C4YrKBkKSVeqDamzBPWVnSJ%2C67tgMwUfnmqzYsNAtnP6YJ%2C0yNLKJebCb8Aueb54LYya3',  {
                    method: 'GET', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                } )
                .then(response => response.json())
                .then(data => {
                    // Procesar los datos de respuesta aquí
                    console.log(data);
                    
                    let filtro = [];  

                    data["artists"].map(function(art, index){

                        let estructura = document.createElement('div');
                        estructura.className = "col ";

                        let estructura2Nivel = document.createElement('div');
                        estructura2Nivel.className = "card shadow-sm";


                        let estructura3Nivel = document.createElement('span');
                        estructura3Nivel.className = "name";
                        estructura3Nivel.innerHTML = '<p>' + data["artists"][index]['name'] + '</p>';
                        let genres = document.createElement('div');
                        genres.id = "genero";

                        for(let x=0; x<data['artists'][index]['genres'].length; x++) {

                           
                            if(genres.innerHTML!="") {
                                genres.innerHTML += ', &nbsp';
                            }
                         
                            
                            let genero = document.createElement('p');
                            genero.className = data["artists"][index]['genres'][x];
                            genero.innerHTML = data["artists"][index]['genres'][x];

                        

                            genres.appendChild(genero);

                            estructura.className += data["artists"][index]['genres'][x] + " ";

                            if (!filtro.includes(data["artists"][index]['genres'][x])) {
                                // Si el valor no está presente, agregarlo al array
                                filtro.push(data["artists"][index]['genres'][x]);
                            }
                           
                       }
                       estructura2Nivel.appendChild(genres);


                        let estructura4Nivel = document.createElement('span');
                        estructura4Nivel.className = "nameClick";
                        estructura4Nivel.id = data["artists"][index]['id'];
                        estructura4Nivel.addEventListener('click', verArtista);

                        let image = document.createElement('img');
                        image.src = data["artists"][index]['images'][0]['url'];
                        estructura2Nivel.appendChild(image);

                        estructura2Nivel.appendChild(estructura4Nivel);
                        estructura2Nivel.appendChild(estructura3Nivel);
                        estructura.appendChild(estructura2Nivel);
                        document.getElementById('artistas').appendChild(estructura);


                    });

                    let div = document.createElement('div');
                    div.id = "filtro";
                    div.innerHTML = "Género: "
                    let select = document.createElement('select');
                    select.id = "opciones";

                    // Agregar algunas opciones al <select> (esto es solo un ejemplo)
                    //let opciones = ['Opción 1', 'Opción 2', 'Opción 3'];
                    filtro.forEach(opcion => {
                        let option = document.createElement('option');
                        option.textContent = opcion;
                        option.value = opcion;
                        select.appendChild(option);
                    });

                    // Agregar el <select> al <div>
                    div.appendChild(select);

                    // Obtener el elemento con el id "artistas"
                    let contenedorArtistas = document.getElementById('artistas');

                    // Obtener el primer hijo del contenedor (si existe)
                    let primerHijo = contenedorArtistas.firstChild;

                    // Agregar el div al principio del contenedor
                    contenedorArtistas.insertBefore(div, primerHijo);

                    // Agregar el <div> al elemento con el id "artistas"
                    //contenedorArtistas.appendChild(div);
                    console.log(filtro);


                    // Obtener el elemento select
                    //const select = document.getElementById('opciones');

                    // Obtener todos los divs con la clase "contenido"
                    const divsContenido = document.querySelectorAll('.col');

                    // Agregar un event listener al select para detectar cambios
                    select.addEventListener('change', function() {
                        // Obtener el valor seleccionado en el select

                        const valorSeleccionado = select.value;
                        console.log(valorSeleccionado);
                        
                        // Iterar sobre los divs de contenido y ocultar los que no coinciden con la opción seleccionada
                        divsContenido.forEach(div => {
                            // Dividir el valor seleccionado en palabras individuales
                            const palabras = valorSeleccionado.split(' ');

                            // Verificar si el div tiene todas las clases especificadas
                            if (palabras.every(palabra => div.classList.contains(palabra))) {
                                div.style.display = 'block'; // Muestra el div si todas las clases están presentes
                            } else {
                                div.style.display = 'none'; // Oculta el div si alguna clase falta
                            }
                        });
                    });



                    // CREAR FILTRO
                }).catch(error => {
                   // console.error('Error al generar el listado de artistas en la home:', error);
                });


            })
            .catch(error => {
                console.error('Error al obtener el token de acceso:', error);
            });
         

}

function filtrar(valor) {

    let div = document.createElement('div');
    div.id = "filtro";

    if (palabras.every(palabra => div.classList.contains(palabra))) {
        div.style.display = 'block'; // Muestra el div si todas las clases están presentes
    } else {
        div.style.display = 'none'; // Oculta el div si alguna clase falta
    }
}


// Función que se ejecutará cuando se haga clic en el span
function verArtista(event) {

    const elementoClicado = event.target;
    console.log('Elemento clicado:', elementoClicado);
    //console.log('Se hizo clic en el span'+event.id);
    document.getElementById('artistas').innerHTML = "";
    var artista =  elementoClicado.id;
    console.log(artista);




    const clientId = '0e6c8481b3384742b6591b303f0376db';
    const clientSecret = 'b2f86eca748242c9aa0957d827be9c60';
    const requestBody = {
        grant_type: 'client_credentials'
    };

    fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(requestBody)
    }) 
    .then(response => response.json())
    .then(data => {

        // Almacenar el token de acceso en la variable accessToken
        accessToken = data.access_token;

                fetch('https://api.spotify.com/v1/artists/'+artista,  {
                    method: 'GET', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                } )
                .then(response => response.json())
                .then(data => {
                        // Procesar los datos de respuesta aquí
                        console.log(data);
          
                        let estructura = document.createElement('div');
                        estructura.className = "col";

                        let estructura2Nivel = document.createElement('div');
                        estructura2Nivel.className = "card shadow-sm";

                        let cont = document.createElement('div');
                        cont.className = "contenido";

                        let nombre = document.createElement('h1');
                        nombre.innerHTML = data['name'];

                        let popularity = document.createElement('p');
                        popularity.innerHTML = 'Popularity: ' + data['popularity'];
                        cont.appendChild(nombre);
                        cont.appendChild(popularity);

                        let genres = document.createElement('ul');
                        for(let x=0; x<data['genres'].length;x++) {
                                genres.innerHTML += "<li>" + data['genres'][x] + "</li>";      
                        }
                        cont.appendChild(genres);
                            
                        let image = document.createElement('img');
                        image.src = data['images'][0]['url'];
                        estructura2Nivel.appendChild(image);
                        estructura.appendChild(estructura2Nivel);
                        document.getElementById('artistas').appendChild(estructura);
                        document.getElementById('artistas').appendChild(cont);


                })
                .catch(error => {
                   // console.error('Error al generar el listado de artistas en la home:', error);
                });


                //


                fetch('https://api.spotify.com/v1/artists/'+artista+'/albums',  {
                    method: 'GET', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken
                    }
                } )
                .then(response => response.json())
                .then(data => {
                    console.log("AQUI");
                    console.log(data);

                    console.log(data['items'][0]['name']);

                    let disco = document.createElement('h2');
                    disco.innerHTML = "Discografia";
               

                    let discos = document.createElement('div');
                    discos.className = "discos";
                    for(let x=0; x<data['items'].length; x++) {
                        discos.innerHTML += "<div class='disco'><img src='" + data['items'][x]['images'][0]['url'] + "' ><h3>" + data['items'][x]['name'] + "</h3></div>";      
                    }
                  

                    const cont = document.getElementsByClassName('contenido')[0];
                    cont.appendChild(disco);
                    cont.appendChild(discos);


                  

                })
                .catch(error => {
                   // console.error('Error al generar el listado de artistas en la home:', error);
                });


            })
            .catch(error => {
                console.error('Error al obtener el token de acceso:', error);
            });



    
}




window.onload = function() {
    listadoArtistas();
};






