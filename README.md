# NextJS con FaaS

Este repo fue creado como proyecto final de curso, partio de todo el conocimiento aportado durante los dos años de aprendizaje, además del periodo de prácticas dónde aprendí React y Next, como otras tecnologías o conceptos entre ellas scraping, serverless, Node.js

**⚠ Esta aplicación web busca enlaces, no almacena ningun medio audiovisual, ni tiene una base de datos... ⚠**

Mediante scraping y consultas a APIs externas consigue encontrar enlaces, para después poder visualizar su contenido.

---

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Despliegue](#despliegue)

---

## Introducción

La realización de este proyecto ha sido posible gracias al conocimiento aportado en el curso de desarrollo de aplicaciones web, cada linea de código ha tenido borradores, pruebas y demasiadas horas de investigación previas al resultado obtenido. El proceso ha sido emocionante y muy gratificante.

En sí, la funcionalidad de esta aplicación consiste en la busqueda y extracción de enlaces a servidores de streaming, que usuarios llamados uloaders comparten con infinidad de comunidades para que sus usuarios puedan visualizar el contenido audiovisual, en varias calidades, idiomas y/o subtítulos.

<p align="center">
    <img src="https://raw.githubusercontent.com/pangeasi/scraperDede/master/web.png" alt="web" width="400"/>
</p>
El funcionamiento es simple; el usuario introduce un termino en el input de busqueda y en cuanto comienza a introducir carácteres hace una petición a [TMDB][1] una API externa que administra una base de datos de películas y series inmensa, de ahi obtiene respuesta con el resultado de todas las coincidencias obtenidas. Los resultados obviamente pueden ser o películas o series y dependiendo de una otra ira mostrando información diferente al momento de seleccionar un resultado, como por ejemplo la sinopsis, temporadas, episodios y por último la lista de enlaces a servidores de streaming y un reproductor para ver el contenido directamente.

[1]: https://www.themoviedb.org/


## Instalación

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

## Despliegue

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

## APIs

- [TMDB](https://www.themoviedb.org/)
