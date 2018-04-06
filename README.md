# La telaraña del congreso

La [telaraña del congreso](https://diputados.diegotorr.es) de una visualización
de la LXIII legislatura del congreso de México.

## Metodología

*La telaraña del congreso* fue construida utilizando los datos disponibles a
través del [INFOPAL](http://www.diputados.gob.mx/sistema_legislativo.html), el
Servicio de Información para la Estadística Parlamentaria. Debido a que el
INFOPAL no ofrece un método de descarga de su información en un formato
estandarizado, la extracción de los datos necesarios fue un proceso extenuante.
Este es un enorme fracaso de los sistemas de datos abiertos del gobierno
mexicano, que en ocasiones parecen estar diseñados con el fin de dificultar el
análisis de los datos que supuestamente facilitan. Así, la extracción tuvo que
ser llevada a cabo por un programa diseñado específicamente para navegar el
sitio, recolectar los datos y estructurarlos de manera que sean compatibles 
con diversas herramientas de análisis. Este programa es de código abierto y
está disponible a través de un [repositorio en GitHub](https://github.com/DiegoAlbertoTorres/diputados),
contenido en una libreta de [IPython](https://ipython.readthedocs.io/en/stable/).

El programa de extracción de datos hace lo siguiente mientras navega el INFOPAL:

* Recauda un listado de todos los miembros del congreso que están registrados
  bajo la [LXIII
  legislatura](http://sitl.diputados.gob.mx/LXIII_leg/listado_diputados_gpnp.php?tipot=TOTAL).
  Este listado incluye información básica de cada miembro del congreso, como su
  nombre, partido, suplente y curul.

* Hace un conteo de los votos de los diputados por cada decreto de la
  legislatura, registrando a los votantes a favor, en contra, ausentes y
  abstinentes.

El listado de todos los miembros del congreso fue simplemente utilizado para
mostrar la información básica de cada diputado en *La telaraña del congreso*, y por lo tanto
no es particularmente interesante.

El conteo de votos por cada decreto es la pieza fundamental para construir la
simulación que se asemeja a una telaraña. A partir de este conteo se compila
uno nuevo, que registra la cantidad de veces que cualquier par de miembros del
congreso votó idénticamente. Como ejemplo, se considera el siguiente escenario
ficticio, en que tres diputados (A, B y C) votan por cinco decretos distintos
(I-V).

Decreto | A favor | En contra
--------|---------|----------
I       | A, B, C | -
II      | A, B    | C
III     | A, C    | B
IV      | C       | A, B
V       | -       | A, B, C

El registro resultante en este escenario luciría de la siguiente manera:

Diputado 1 | Diputado 2 | Votos en común
-----------|------------|---------------
A          | B          | 4 
A          | C          | 3 
C          | B          | 2

Este registro puede ser estructurado como un
[*grafo*](https://es.wikipedia.org/wiki/Grafo), donde los vértices son
corresponden a los diputados y las aristas que los unen capturan la cantidad de
votos en común entre cada par de vértices. Los *grafos* son comunes para el
análisis de redes sociales, como lo es el congreso mexicano, pues pueden ayudar
a explicar dinámicas que emergen de la organización de un conjunto de
individuos. Una vez creado este *grafo* se pueden utilizar numerosas técnicas
establecidas en el campo del [análisis de redes
sociales](https://en.wikipedia.org/wiki/Social_network_analysis) para entender
mejor al congreso. Por ejemplo, se puede encontrar a los diputados más
céntricos haciendo un [análisis de
centralidad](https://en.wikipedia.org/wiki/Betweenness_centrality), o también
se puede explorar la conglomeración del congreso en grupos de poder a través de un
[análisis de grupos](https://es.wikipedia.org/wiki/An%C3%A1lisis_de_grupos).

En el caso de *La telaraña del congreso*, la simulación ayuda a visualizar
tanto la centralidad de sus miembros así como sus agrupamientos naturales. La
técnica utilizada para dibujar la telaraña es conocida como [*force-directed
graph drawing*](https://en.wikipedia.org/wiki/Force-directed_graph_drawing), y
es utilizada comúnmente para proveer una idea visual de la estructura de un
*grafo*. El algoritmo que da vida a la telaraña es en realidad una simulación
de física mecánica: los vértices del grafo son colocados en un plano, a la vez
que se les aplica una fuerza de repulsión, como si fuesen partículas cargadas.
Simultáneamente, cada arista entre cada par de vértices suministra una fuerza
de atracción entre sus dos terminaciones. Así, la fuerza de repulsión logra
separar a los diputados que rara vez votan en común, mientras que los diputados
con elecciones similares se amontonan gracias a la fuerza de atracción de sus
votos. Es importante notar que a pesar de que las aristas no están dibujadas
en la pantalla (con excepción de unas cuantas, si un miembro es seleccionado)
debido a las limitaciones de cómputo del navegador, existen miles de ellas, todas
las cuales son usadas por el algoritmo.

Debido a que la telaraña tiene como objetivo secundario hacer asequible el
funcionamiento del congreso a través de una aplicación web, se optó por
maximizar la interactividad del resultado, sacrificando algo de rigor. Debido
a esto, fue necesario hacer las siguientes concesiones:

* *La telaraña del congreso* no incluye en la simulación a todos los diputados
  que alguna vez votaron en la LXIII legislatura. Esto es computacionalmente
  demandante y habría dañado la interactividad del sitio. Para elegir a los
  diputados mostrados, primero se eliminaron del *grafo* la mayoría de las
  aristas, dejando solamente aquellas con un peso mayor al del percentil 90º.
  Después, se eliminaron los vértices (diputados) con un grado menor al
  percentil 50º. El resultado es un *grafo* que cuenta con los diputados más
  participativos y colaborativos. Es decir, este proceso de eliminación tiende
  a remover a los diputados que votaron poco (debido a faltas, licencias, o
  suplencia) o que rara vez votan en común con otros.

* La simulación utilizada no es la aplicación más rigurosa y establecida de un
  algoritmo de *force-directed graph drawing*. Un algoritmo más estandarizado
  es el de *Fruchterman-Reingold*. Desgraciadamente, la herramienta utilizada
  para crear la simulación (D3.js) no utiliza este algoritmo e implementarlo
  habría demorado el proyecto. Para compensar defecto, se produjo una
  [visualización](#simple.html) de *la telaraña* utilizando este algoritmo,
  aunque su interactividad es limitada.

Estas concesiones están explícitamente indicadas en el código utilizado para
crear *la telaraña*, disponible en [GitHub](https://github.com/DiegoAlbertoTorres/diputados).

## Preguntas frecuentes

### ¿Quién hizo *La telaraña del congreso*? ¿Con qué recursos? 
*La telaraña del congreso* es un proyecto desarrollado, mantenido y financiado
enteramente por mí, [Diego Alberto Torres Quintanilla](https://es.diegotorr.es).
Hice este proyecto en mi tiempo libre y me reservo los derechos de autor de todos
sus componentes y código.

### ¿Por qué no aparecen todos los miembros del congreso en la simulación?

Desgraciadamente el sitio es computacionalmente demandante. Agregar más
diputados a la simulación sin impactar su desempeño sería un proyecto retador.
Me encantaría tener tiempo para solucionar este problema.

### ¿Qué significa que no aparezca un diputado en la simulación?

Para reducir la carga computacional del sitio algunas diputadas y diputados
fueron removidos de la simulación. La columna titulada 'visible' en la lista de
diputados indica quiénes aparecen en la simulación. Los miembros eliminados
fueron aquellos que son poco centrales en el plano, ya sea porque votaron poco
(faltaron mucho), o porque sus votos no se alinean con los de muchos otros
diputados. En general, la mayoría de los diputados removidos tienen más faltas
que los demás.

Adicionalmente, los suplentes de diputado que nunca han tenido oportunidad de
votar no fueron incluidos en la simulación ni en la lista de miembros.

### *La telaraña* es algo lenta en mi computadora, ¿qué puedo hacer al respecto?

Puedes hacerle click al botón de pausa en la esquina superior izquierda de la
simulación. Esto detiene la simulación, lo que con suerte aliviará un poco la
carga sobre tu navegador.


### ¿Qué tecnologías utiliza el sitio?

El análisis fue hecho enteramente con Python y librerías de análisis de datos
en su ecosistema, incluyendo [NetworkX](https://networkx.github.io/) y
[Plotly](https://plot.ly/).  Una lista completa puede ser encontrada en la
[libreta de Jupyter](https://es.diegotorr.es) que se utilizó durante el
análisis.

El sitio en sí fue construido con ayuda de [React](https://reactjs.org/) y
diversos componentes del ecosistema que lo rodea. La simulación del congreso
fue hecha con ayuda de [D3.js](https://d3js.org/). El sitio vive en [AWS
(Amazon Web Services)](https://aws.amazon.com/).

### ¿Por qué el sitio no funciona en mi dispositivo móvil?

La simulación que dibuja la telaraña es computacionalmente muy demandante para
un dispositivo móvil. Además, el sitio no está diseñado para pantallas verticales.

### Tengo una idea para un proyecto similar, ¿me podrías ayudar?

Por favor envía un correo electrónico a [diego@diegotorr.es](mailto:diego@diegotorr.es).
Tras terminar *la Telaraña* estaré buscando proyectos similares.
