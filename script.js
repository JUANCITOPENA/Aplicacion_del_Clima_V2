function obtenerTemperatura() {
    // Obtiene el valor del input o select con el ID 'inputCiudad' o 'selectCiudades'
    const ciudad = document.getElementById('inputCiudad').value || document.getElementById('selectCiudades').value;

    // Clave de la API para acceder a los datos climáticos
    const api_key = '12e717669f6d0f7358f106ac8ab9528b';

    // URL para hacer la solicitud a la API del clima usando la ciudad y la clave de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_key}&units=metric`;

    // Hace la solicitud a la API y procesa los datos recibidos
    fetch(url)
        .then(response => {
            // Verifica si la respuesta es correcta; de lo contrario, lanza un error
            if (!response.ok) {
                throw new Error('Error al obtener los datos del clima');
            }
            return response.json();
        })
        .then(data => {
            // Extrae los datos específicos del clima desde la respuesta JSON
            const temperature = data.main.temp;
            const weatherDescription = traducirDescripcion(data.weather[0].description);
            const feelsLike = data.main.feels_like;
            const humidity = data.main.humidity;
            const pressure = data.main.pressure;
            const windSpeed = data.wind.speed;
            const weatherIcon = data.weather[0].icon; // Supongamos que 'icon' contiene el identificador del clima

            // Mapeo de identificadores de clima a emojis
            const weatherIcons = {
                '01d': '☀️', // Soleado
                '02d': '⛅', // Parcialmente nublado
                '03d': '☁️', // Nublado
                '04d': '☁️', // Nublado
                // ... otros identificadores y emojis
            };

            // Obtiene el emoji correspondiente al clima o un emoji predeterminado si no hay un emoji definido
            const weatherEmoji = weatherIcons[weatherIcon] || '🌍';

            // Actualiza el contenido del elemento con el ID 'infoClima' con los datos climáticos
            const infoClima = document.getElementById('infoClima');
            infoClima.innerHTML = `
                <p>La temperatura actual en ${ciudad} es: <span style="color: black; font-size: 25px;">${temperature} grados Celsius</span></p>
                <div class="additional-info">
                    <h2 style="color: black; font-size: 30px;">Información adicional:</h2>
                    <ul>
                        <li><strong>Descripción:</strong> ${weatherDescription} ${weatherEmoji}</li>
                        <li><strong>Sensación térmica:</strong> ${feelsLike} grados Celsius</li>
                        <li><strong>Humedad:</strong> ${humidity}%</li>
                        <li><strong>Presión atmosférica:</strong> ${pressure} hPa</li>
                        <li><strong>Velocidad del viento:</strong> ${windSpeed} m/s</li>
                    </ul>
                </div>
            `;
        })
        .catch(error => {
            // En caso de error, muestra un mensaje de error en el elemento con el ID 'infoClima' y lo resalta en rojo
            console.error('Hubo un error:', error);
            const infoClima = document.getElementById('infoClima');
            infoClima.innerText = 'Hubo un error al obtener la información del clima';
            infoClima.style.backgroundColor = 'red';
        });
}

// Función para actualizar el valor del input 'inputCiudad' con la opción seleccionada en 'selectCiudades'
function actualizarCiudadSeleccionada() {
    const ciudadSeleccionada = document.getElementById('selectCiudades').value;
    document.getElementById('inputCiudad').value = ciudadSeleccionada;
}


function traducirDescripcion(description) {
    // Objeto con las traducciones del estado del clima
    const traducciones = {
        // Mapeo de estados del clima en inglés a traducciones en español
        // Puedes expandir esta lista agregando más traducciones según sea necesario
        'clear sky': 'Cielo Despejado',
        'few clouds': 'Pocas Nubes',
        'scattered clouds': 'Nubes Dispersas',
        'broken clouds': 'Nubes Rotas',
        'overcast clouds': 'Nublado',
        'shower rain': 'Lluvia',
        'rain': 'lluvia',
        'thunderstorm with light rain': 'Tormenta eléctrica con Lluvia ligera',
        'thunderstorm with rain': 'Tormenta eléctrica con Lluvia',
        'thunderstorm with heavy rain': 'Tormenta eléctrica con Lluvia intensa',
        'light thunderstorm': 'Tormenta Eléctrica Ligera',
        'thunderstorm': 'Tormenta Eléctrica',
        'heavy thunderstorm': 'Tormenta Eléctrica Fuerte',
        'ragged thunderstorm': 'Tormenta Eléctrica Irregular',
        'thunderstorm with light drizzle': 'Tormenta Eléctrica con Llovizna ligera',
        'thunderstorm with drizzle': 'tormenta eléctrica con llovizna',
        'thunderstorm with heavy drizzle': 'Tormenta Tléctrica con Llovizna intensa',
        'light intensity drizzle': 'Llovizna Ligera',
        'drizzle': 'Llovizna',
        'heavy intensity drizzle': 'Llovizna Intensa',
        'light intensity drizzle rain': 'Lluvia Iigera',
        'drizzle rain': 'lluvia',
        'heavy intensity drizzle rain': 'Lluvia Intensa',
        'shower rain and drizzle': 'Lluvia y Llovizna',
        'heavy shower rain and drizzle': 'Lluvia Intensa y Llovizna',
        'shower drizzle': 'Llovizna',
        'light rain': 'Lluvia Ligera',
        'moderate rain': 'Lluvia Moderada',
        'heavy intensity rain': 'Lluvia Intensa',
        'very heavy rain': 'Lluvia Muy Intensa',
        'extreme rain': 'Lluvia Extrema',
        'freezing rain': 'Lluvia Helada',
        'light intensity shower rain': 'Lluvia Ligera',
        'shower rain': 'lluvia',
        'heavy intensity shower rain': 'Lluvia Intensa',
        'ragged shower rain': 'Lluvia Irregular',
        'light snow': 'Nieve Ligera',
        'snow': 'Nieve',
        'heavy snow': 'Nieve Intensa',
        'sleet': 'Aguanieve',
        'light shower sleet': 'Llovizna de Aguanieve Ligera',
        'shower sleet': 'Lluvia de Aguanieve',
        'light rain and snow': 'Lluvia y Nieve Ligera',
        'rain and snow': 'lluvia y nieve',
        'light shower snow': 'Nevada Ligera',
        'shower snow': 'nevada',
        'heavy shower snow': 'Nevada Intensa',
        'mist': 'Niebla',
        'smoke': 'Humo',
        'haze': 'Neblina',
        'sand/ dust whirls': 'Remolinos de Arena/Polvo',
        'fog': 'Niebla',
        'sand': 'Arena',
        'dust': 'Polvo',
        'volcanic ash': 'Ceniza Volcánica',
        'squalls': 'Ráfagas',
        'tornado': 'Tornado',
        'clear sky': 'Cielo Despejado',
        'broken clouds': 'Nubes Rotas',
        'partly cloudy': 'Parcialmente Nublado',
        'cloudy': 'nublado',
        'overcast clouds': 'Nublado',
        // Puedes agregar más traducciones según sea necesario
    };

    // Retorna la traducción correspondiente del estado del clima o el estado original si no hay traducción
    return traducciones[description] || description;
}