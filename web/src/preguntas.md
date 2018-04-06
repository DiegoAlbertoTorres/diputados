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
