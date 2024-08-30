var vistaActual=null;
function cambiarVista(id){
    if(vistaActual){
        document.getElementById(vistaActual).classList.remove("visible");
    }
    document.getElementById(id).classList.add("visible");
    vistaActual=id;   
}
cambiarVista("inicio");

function volver(){
    cambiarVista("inicio");
}

function pantallalibro(libro){
    window.scrollTo(0, 0);
    cambiarVista("librovista");
    var vistalibro= document.getElementById('libro');
    vistalibro.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevas imágenes

    var imagenlibro= document.createElement('img');
    vistalibro.appendChild(imagenlibro);
    imagenlibro.src=libro.imagen;
    imagenlibro.alt=libro.nombre;

    titulo = document.createElement('h1');
    titulo.innerHTML=libro.nombre;
    titulo.classList="libre-baskerville-bold";
    vistalibro.appendChild(titulo);
    
    var info = document.createElement('div');
    info.id= "infolibro";
    autor = document.createElement('h2');
    autor.innerHTML=libro.autor;
    autor.classList="libre-baskerville-regular";
    fpublic= document.createElement('h3');
    fpublic.innerHTML = libro.fpublicacion;
    flect= document.createElement('h3');
    flect.innerHTML = libro.flectura;
    fpublic.classList="libre-baskerville-regular";
    flect.classList="libre-baskerville-regular";
    paginas = document.createElement('h3');
    paginas.innerHTML=libro.paginas;
    paginas.classList="libre-baskerville-regular";

    info.appendChild(autor);
    info.appendChild(fpublic);
    info.appendChild(flect);
    info.appendChild(paginas);
    vistalibro.appendChild(info);

    var lineavertical = document.createElement('div');
    lineavertical.classList='linea-vertical';
    vistalibro.appendChild(lineavertical);

    var datos = document.createElement('div');
    datos.id='datos';
    
    alto = document.createElement('h3');
    alto.innerHTML=libro.alto;
    datos.appendChild(alto);
    alto.classList="libre-baskerville-regular";

    ancho = document.createElement('h3');
    ancho.innerHTML=libro.ancho;
    ancho.classList="libre-baskerville-regular";
    datos.appendChild(ancho);
    grueso = document.createElement('h3');
    grueso.innerHTML=libro.grueso;
    datos.appendChild(grueso);
    grueso.classList="libre-baskerville-regular";

    editorial = document.createElement('h3');
    editorial.innerHTML=libro.editorial;
    datos.appendChild(editorial);
    editorial.classList="libre-baskerville-regular";

    vistalibro.appendChild(datos);

    var estrellas= document.createElement('div');
    estrellas.classList='star-rating';
    var puntuacion=0;
    switch(libro.puntuación){
        case 5:
            puntuacion= 100;
            break;
        case 4.5:
            puntuacion= 90;
            break;
        case 4:
            puntuacion= 80;
            break;
        case 3.5:
            puntuacion= 70;
            break;
        case 3:
            puntuacion= 60;
            break;
        case 2.5:
            puntuacion= 50;
            break;
        case 2:
            puntuacion= 40;
            break;
        case 1.5:
            puntuacion= 30;
            break;
        case 1:
            puntuacion= 20;
            break;
        case 0.5:
            puntuacion= 10;
            break;
        default:
            break;
    }
    estrellas.style='--rating: '+puntuacion+'%;';
    vistalibro.appendChild(estrellas);

    var lectura=document.createElement('div');
    lectura.id='lectura';
    var protas=document.createElement('h3');
    protas.id='protas';
    protas.innerHTML=libro.protagonistas;
    protas.classList="libre-baskerville-regular";

    lectura.appendChild(protas);
    var sinopsis=document.createElement('p');
    sinopsis.innerHTML=libro.sinopsis;
    sinopsis.classList="libre-baskerville-regular";
    lectura.appendChild(sinopsis);
    var citas=document.createElement('p');
    citas.id='citas';
    citas.innerHTML=libro.cita;
    citas.classList="libre-baskerville-regular";
    lectura.appendChild(citas);
    vistalibro.appendChild(lectura);

    var espacio = document.createElement('p');
    espacio.innerHTML='<br><br><br>';
    vistalibro.append(espacio);

    var sagas=sagalibro(libro,vistalibro);
}

function iracompra(){
    cambiarVista('comprar');
    var comprar=document.getElementById('comprar2');
    comprar.innerHTML = '';
    var h1=document.createElement('h1');
    h1.innerHTML='Libros que tengo pensados comprar';
    h1.classList="libre-baskerville-regular";
    comprar.appendChild(h1);

    var comprado=document.getElementById('comprado');
    comprado.innerHTML = '';
    var h11=document.createElement('h1');
    h11.innerHTML='Libros ya comprados';
    h11.classList="libre-baskerville-regular";
    comprado.appendChild(h11);

    var librosacomprar = {};
    var librosacomprado={}
    Object.keys(libros).forEach(function(key) {
        var libro = libros[key];
        if (libro.comprar) {
            librosacomprar[key] = libro;
        }
        if (libro.comprado) {
            librosacomprado[key] = libro;
        }
    });

    var libroscomprar= document.createElement('div');
    libroscomprar.id='libroscomprar';
    var libroscomprado= document.createElement('div');
    libroscomprado.id='libroscomprar';
    comprado.appendChild(libroscomprado);

    Object.keys(librosacomprar).forEach(function(key) {
        var libro = librosacomprar[key];
        var imagen = document.createElement('img');
        imagen.src = libro.imagen;
        imagen.alt = libro.nombre;
        imagen.addEventListener('click', function() {
            window.open(libro.link, '_blank');
        });
        imagen.classList.add('imagen-saga');
        libroscomprar.appendChild(imagen);
    });
    comprar.appendChild(libroscomprar);

    Object.keys(librosacomprado).forEach(function(key) {
        var libro = librosacomprado[key];
        var imagen = document.createElement('img');
        imagen.src = libro.imagen;
        imagen.alt = libro.nombre;
        imagen.addEventListener('click', function() {
            pantallalibro(libro);

        });
        imagen.classList.add('imagen-saga');
        libroscomprado.appendChild(imagen);
    });
    comprado.appendChild(libroscomprado);
}

function irafanart(){
    cambiarVista("fanarts");

    const gallery = document.getElementById('fotosfanart');
    gallery.innerHTML = '';

    const imageFolder = 'fanarts';

    function limpiarNombre(nombre) {
        // Eliminar la extensión
        nombre = nombre.replace(/\.\w+$/, '');
        // Eliminar los números al final
        nombre = nombre.replace(/\d+(?!13$)/, '');  
        return nombre;
    }    
   
    imagenes_fan.forEach(imageName => {
        var img = document.createElement('img');
        img.title=limpiarNombre(imageName);
        img.addEventListener('click', function() {
            var tituloImagen = this.title; // Obtener el título de la imagen en la que se hizo clic

            // Iterar sobre las claves del objeto libros
            for (let clave in libros) {
                // Verificar si el título de la imagen coincide con alguna clave del objeto libros
                if (tituloImagen === clave) {
                    console.log(`Hiciste clic en el libro: ${libros[clave].nombre}`);
                    pantallalibro(libros[clave]); // Llamar a la función con el libro correspondiente
                    break; // Salir del bucle una vez encontrado el libro
                }
            }
        });
        img.src = `${imageFolder}/${imageName}`;
        img.style.marginTop = `${Math.random() * 50}px`; // Margen superior aleatorio
        img.style.marginBottom = `${Math.random() * 50}px`; // Margen inferior aleatorio
        img.style.transform = `rotate(${Math.random() * 30 - 15}deg)`; // Rotación aleatoria
        gallery.appendChild(img);
        
    });
}



function sagalibro(libroselec,vistalibro){
    if(libroselec.saga!=""){
        var librosSaga = {};
        Object.keys(libros).forEach(function(key) {
            var libro = libros[key];
            if (libroselec.saga==libro.saga) {
                librosSaga[key] = libro;
            }
        });
        var contenedorImagenesSaga=document.createElement('div');
        contenedorImagenesSaga.id='contenedorsaga';
        contenedorImagenesSaga.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevas imágenes
    
        var saga=document.createElement('h2');
        saga.innerHTML='Saga: '+ libroselec.saga;
        saga.classList="libre-baskerville-regular";
        contenedorImagenesSaga.appendChild(saga);

        var imagenesSaga= document.createElement('div');
        imagenesSaga.id='imagenessaga';
        Object.keys(librosSaga).forEach(function(key) {
            var libro = librosSaga[key];
            var imagen = document.createElement('img');
            imagen.src = libro.imagen;
            imagen.alt = libro.nombre;
            imagen.addEventListener('click', function() {
                console.log(`Hiciste clic en el libro: ${libro.nombre}`);
                pantallalibro(libro);
            });
            imagen.classList.add('imagen-saga');
            imagenesSaga.appendChild(imagen);
        });
        contenedorImagenesSaga.appendChild(imagenesSaga);
        vistalibro.appendChild(contenedorImagenesSaga);
    }
}





function mostrarImagenesLibros(librosFiltrados) {
    var contenedorImagenes = document.getElementById('contenedor-imagenes');
    contenedorImagenes.innerHTML = ''; // Limpiar el contenedor antes de añadir nuevas imágenes

    Object.keys(librosFiltrados).forEach(function(key) {
        var libro = librosFiltrados[key];
        var imagen = document.createElement('img');
        imagen.src = libro.imagen;
        imagen.alt = libro.nombre;
        imagen.addEventListener('click', function() {
            console.log(`Hiciste clic en el libro: ${libro.nombre}`);
            pantallalibro(libro);
        });
        imagen.classList.add('imagen-libro');
        contenedorImagenes.appendChild(imagen);
    });
}


function buscarLibros() {
    var input = document.getElementById('buscadorA');
    var filtro = input.value.toLowerCase();
    var librosFiltrados = {};

    Object.keys(libros).forEach(function(key) {
        var libro = libros[key];
        if (libro.nombre.toLowerCase().includes(filtro) || libro.autor.toLowerCase().includes(filtro)) {
            librosFiltrados[key] = libro;
            console.log(librosFiltrados[key]);
        }
    });

    mostrarImagenesLibros(librosFiltrados);
}



var criterio="autor";

function ordenarLibros() {
    criterio = document.getElementById('ordenar').value;
    var librosArray = Object.keys(libros).map(function(key) {
        return {key: key, value: libros[key]};
    });

    librosArray.sort(function(a, b) {
        if (criterio === 'titulo') {
            return a.value.nombre.localeCompare(b.value.nombre);
        } else if (criterio === 'autor') {
            return a.value.autor.localeCompare(b.value.autor);
        } else if (criterio === 'fechaLectura') {
            // Parse the dates
            var dateA = new Date(a.value.flectura.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
            var dateB = new Date(b.value.flectura.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
            console.log(a.value.nombre+dateA);
            console.log(b.value.nombre+dateB);
            return dateA - dateB;
        }
        else if (criterio === 'fechaPublicacion') {
            // Parse the dates
            var dateA = new Date(a.value.fpublicacion.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
            var dateB = new Date(b.value.fpublicacion.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
            return dateA - dateB;
        }
    });

    var librosOrdenados = {};
    librosArray.forEach(function(item) {
        librosOrdenados[item.key] = item.value;
    });
    mostrarImagenesLibros(librosOrdenados);
}

// Llamar a la función para mostrar las imágenes al cargar la página
mostrarImagenesLibros(libros);
ordenarLibros();


    
