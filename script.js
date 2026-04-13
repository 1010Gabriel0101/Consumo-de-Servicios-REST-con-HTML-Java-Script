// Obtiene el elemento <select> de países del HTML
// Se usa para poder manipularlo desde JavaScript
const selectPaises = document.getElementById('country');

// Obtiene el formulario completo
// Sirve para capturar el evento de envío (submit)
const formulario = document.getElementById('miFormulario');


//Aqui hacemos uso de la API
// Función asíncrona (usa async/await) para obtener datos desde internet
async function obtenerPaises() {
    try {
        // Hace una petición HTTP a una API externa (REST Countries)
        // fetch obtiene los datos desde la URL
        const respuesta = await fetch('https://restcountries.com/v3.1/all?fields=name');

        // Convierte la respuesta a formato JSON 
        const datos = await respuesta.json();

        // Limpia el select y agrega una opción por defecto
        selectPaises.innerHTML = '<option value="">Seleccione un país...</option>';

        // Ordena los países alfabéticamente
        // localeCompare sirve para comparar textos correctamente
        datos.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Recorre cada país y crea una opción en el select
        datos.forEach(pais => {
            const opcion = document.createElement('option');
            // Crea un elemento <option>

            opcion.value = pais.name.common;
            // Valor que se enviará al seleccionar

            opcion.textContent = pais.name.common;
            // Texto visible en la lista

            selectPaises.appendChild(opcion);
            // Agrega la opción al select
        });

    } catch (error) {
        // Si ocurre un error (por ejemplo sin internet)
        // muestra mensaje en el select
        selectPaises.innerHTML = '<option value="">Error al cargar</option>';
    }
}


//En este bloque del codigo, hacemos envio de los datos del formulario
// Escucha cuando el usuario envía el formulario
formulario.addEventListener('submit', async (e) => {

    e.preventDefault();
    // Evita que la página se recargue ya que eso pasa por default

    // Crea un objeto FormData para enviar datos como si fuera un formulario real
    const datosAEnviar = new FormData();

    // Agrega cada campo del formulario con append(nombre, valor)
    datosAEnviar.append('name', document.getElementById('name').value);
    datosAEnviar.append('lastName', document.getElementById('lastName').value);
    datosAEnviar.append('email', document.getElementById('email').value);
    datosAEnviar.append('account', document.getElementById('account').value);
    datosAEnviar.append('avg', document.getElementById('avg').value);
    datosAEnviar.append('country', document.getElementById('country').value);

    try {
        // Envía los datos al servidor usando fetch
        const respuesta = await fetch('https://masksoft.com.mx/register', {
            method: 'POST', // Método POST para enviar datos
            body: datosAEnviar // Datos del formulario
        });

        const resultado = await respuesta.json();

        // Verifica si el servidor respondió con éxito
        if (resultado.status === "success") {
            alert("¡Éxito! " + resultado.message);

            formulario.reset();
            // Con esto, limnpiamos todos los campos del formulario
        }

    } catch (error) {
        alert("Error al conectar con el servidor.");
    }
});

// Con esto llamamos a la función al cargar la página
obtenerPaises();