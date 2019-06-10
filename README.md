# NextJS con FaaS

Este repo fue creado como proyecto final de curso, partio de todo el conocimiento aportado durante los dos años de aprendizaje, además del periodo de prácticas dónde aprendí React y Next, como otras tecnologías o conceptos entre ellas scraping, serverless, Node.js

⭐ <a href="https://scraperdede.now.sh" target="_blank">scraperDede</a>

**⚠ Esta aplicación web busca enlaces, no almacena ningun medio audiovisual, ni tiene una base de datos... ⚠**

Mediante scraping y consultas a APIs externas consigue encontrar enlaces, para después poder visualizar su contenido.

---

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Despliegue](#despliegue)
- [Explicación](#explicación)
- [APIs](#apis)
- [Presentación](#presentación)
- [Enlaces de interés](#enlaces-de-interés)

---

## Introducción

La realización de este proyecto ha sido posible gracias al conocimiento aportado en el curso de desarrollo de aplicaciones web, cada linea de código ha tenido borradores, pruebas y demasiadas horas de investigación previas al resultado obtenido. El proceso ha sido emocionante y muy gratificante.

En sí, la funcionalidad de esta aplicación consiste en la busqueda y extracción de enlaces a servidores de streaming, que usuarios llamados uploaders comparten con infinidad de comunidades para que sus usuarios puedan visualizar el contenido audiovisual, en varias calidades, idiomas y/o subtítulos.

<p align="center">
    <img src="https://raw.githubusercontent.com/pangeasi/scraperDede/master/web.png" alt="web" width="400"/>
</p>
El funcionamiento es simple; el usuario introduce un termino en el input de busqueda y en cuanto comienza a introducir carácteres hace una petición a <a href="https://www.themoviedb.org/">TheMovieDB</a> una API externa que administra una base de datos de películas y series inmensa, de ahi obtiene respuesta con el resultado de todas las coincidencias obtenidas. Los resultados obviamente pueden ser o películas o series y dependiendo de una otra ira mostrando información diferente al momento de seleccionar un resultado, como por ejemplo la sinopsis, temporadas, episodios y por último la lista de enlaces a servidores de streaming y un reproductor para ver el contenido directamente.


## Instalación

### Requerimientos:

Para la instalación y despliegue son necesarias algunos tokens a APIs y el cli de now

#### Instalando Now de zeit.co
sigue esta guía para la instalación de now: https://zeit.co/download

o simplemente, ejecuta:
```
curl -sfLS https://zeit.co/download.sh | sh
```

#### APIs necesarias:
- [TMDB](https://www.themoviedb.org/)
- [Telegram](https://core.telegram.org/)

#### Dependencias utilizadas:

- antd
- request
- cheerio
- express
- next
- node-sass
- @zeit/next-sass
- react
- react-dom
- cors

### Proceso de instalación

Descarga el repo:

```
git clone https://github.com/pangeasi/scraperDede.git
```

Crea un archivo ```config.js``` y editalo con tus claves:

```javascript
module.exports = {
    cookie: [
        {name: 'PHPSESSID',
        value: '',
        domain: '',
        path: '/',
        expires: 1605376742.173697,
        size: 35,
        httpOnly: true,
        secure: false,
        session: false }
        ],
        TELEGRAM_TOKEN: 'YOUR_KEY',
        MASTODON_TOKEN: 'YOUR_KEY',
        THEMOVIEDB_API_TOKEN: 'YOUR_KEY',
        LOGIN_VERYSTREAM_API: 'YOUR_KEY',
        KEY_VERYSTREAM_API: 'YOUR_KEY'
}
```


Instala dependencias:
```
npm install
```
o
```
yarn install
```

Ejecuta estos dos scripts:

para levantar next en modo desarrollo en el puerto 3000
```
yarn now-dev 3000
```
y para el arrancar el servidor en local imitando FaaS
```
yarn start
```


## Despliegue

Para desplegar en now, puedes hacerlo directamente a pruducción o con tu rama a fase de pruebas

```
now
```
para el despliegue a producción, recuerda cambiar el alias en ```now.json```
```
now --target production
```

## Explicación

### ¿Cómo funciona?

Una vez llevado a producción, la aplicación funciona en serverless, apoyandose en las function lambdas de now, sus diferentes funciones son apis montadas con express que recepcionan mediante query strings los parametros necesarios, al hacerse la petición se origina la invocación de la función y esta responde retornando el resultado.

#### Functions lambdas:

estas son las diferences funciones que demanda el cliente:

- **/search , /search-seasons y /search-episode**

```./search/index.js```
```./search-seasons/index.js```
```./search-episodes/index.js```

Estas funciones se nutren de la API TheMovieDB, las cual hace consulta mediante el término marcado y retornando la información de los resultados.

- **/adede**

```./adede/index.js```

La función que hace scraping a otra página y comprueba su disponibilida, mediante la libreria ***request***, pide el cuerpo de la página inyectando las cookies en la solicitud, permitiendo el acceso y capurando los enlaces. Una vez obtenidos son comprobados con ***cheerio*** en un bucle, si esta disponible o ha caido.

- **/msg4admin**
```./msg4admin/index.js```

Con esta funcion, la aplicación se sirve de puente para comunicar mediante mensajes de chat a un bot de **Telegram**, utilizando su API; es utilizada cuando un usuario busca algo, se envia el ID al bot ó cuando se utiliza el text area del apartado de desarrollo ```about.js``` para enviar un mensaje al bot.

- **/search-api**
```./search-api/index.js```

Función en desarrollo, que pretende usar la API de Mastodon a modo de base de datos.

## APIs

- [TMDB](https://www.themoviedb.org/)
- [Telegram](https://core.telegram.org/)

## Presentación

<a href="https://docs.google.com/presentation/d/1EXmQpOzSnqw4zFiHwJApAxHuK7HjXiqyv6ko8wEfdi8/edit?usp=sharing">Presentación aportada del proyecto</a>

## Enlaces de interés

## NextJS
- <a href="https://nextjs.org/">Web de Next</a>
- <a href="https://github.com/zeit/next.js">github</a>
- <a href="https://github.com/zeit/next.js/tree/canary/examples">ejemplos prácticos</a>
- <a href="https://nextjs.org/docs">Documentación</a>

## FaaS

### Now

- <a href="https://zeit.co/now">Now</a>
- <a href="https://zeit.co/docs/v2/getting-started/introduction-to-now">Documentación de now</a>

### Proveedores de FaaS

- <a href="https://aws.amazon.com/lambda/">AWS Lambda</a>
- <a href="https://cloud.google.com/functions/">Google cloud functions</a>
- <a href="https://azure.microsoft.com/en-us/services/functions/">Azure functions</a>
- <a href="https://zeit.co">Zeit</a>
- <a href="https://console.ng.bluemix.net/openwhisk/">IBM Bluemix</a>

### Para montar tu propio FaaS

- <a href="http://open.iron.io/">Iron functions</a>
- <a href="https://wiki.openstack.org/wiki/Picasso">Openstack Picasso</a>
- <a href="http://fission.io/">Fission</a>
- <a href="https://openwhisk.incubator.apache.org/">Apache Openwhisk</a>
- <a href="https://www.openfaas.com/">OpenFaaS</a>