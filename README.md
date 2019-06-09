# NextJS con FaaS

Este repo fue creado como proyecto final de curso, partio de todo el conocimiento aportado durante los dos años de aprendizaje, además del periodo de prácticas dónde aprendí React y Next, como otras tecnologías o conceptos entre ellas scraping, serverless, Node.js

**⚠ Esta aplicación web busca enlaces, no almacena ningun medio audiovisual, ni tiene una base de datos... ⚠**

Mediante scraping y consultas a APIs externas consigue encontrar enlaces, para después poder visualizar su contenido.

---

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Despliegue](#despliegue)
- [APIs](#apis)

---

## Introducción

La realización de este proyecto ha sido posible gracias al conocimiento aportado en el curso de desarrollo de aplicaciones web, cada linea de código ha tenido borradores, pruebas y demasiadas horas de investigación previas al resultado obtenido. El proceso ha sido emocionante y muy gratificante.

En sí, la funcionalidad de esta aplicación consiste en la busqueda y extracción de enlaces a servidores de streaming, que usuarios llamados uloaders comparten con infinidad de comunidades para que sus usuarios puedan visualizar el contenido audiovisual, en varias calidades, idiomas y/o subtítulos.

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
```curl -sfLS https://zeit.co/download.sh | sh
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

```git clone https://github.com/pangeasi/scraperDede.git
```

Crea un archivo ```config.js``` y editalo con tus claves:

```module.exports = {
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
```npm install
```
o
```yarn install
```

Ejecuta estos dos scripts:

para levantar next en modo desarrollo en el puerto 3000
```yarn now-dev 3000
```
y para el arrancar el servidor en local imitando FaaS
```yarn start
```


## Despliegue

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

## APIs

- [TMDB](https://www.themoviedb.org/)
- [Telegram](https://core.telegram.org/)