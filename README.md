# 70070_EntregaFinal_Datach


Este proyecto permite a un usario ingresar  productos al carrito , visualizarlo mediante un modal, eliminar el producto o vaciar el contenido del carrito 
adiconalemte ,permite realizar consulta de stock , paginacion y  cantidad de items a mostrar.
se prodra crear usuario y loguearse, e ingresar como Administrador con el siguiente
USER :admin123@gmail.com
Password:123


## Requisitos

- Node.js (v12 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

    ```
    git clone https://github.com/tu-usuario/tu-repositorio.git
    en el directorio "primerEntrega_70070>"  ejecutar en NPM install
    
    cd src
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Configuración

No se necesita configuración adicional. El proyecto está listo para usarse después de instalar las dependencias.

## Uso

1. Inicia el servidor:

    ```bash
    npm start
    puede haber un poco de demora al levantar el servidor
    ```

    Esto iniciará el servidor en el puerto 8080.

2. Abre tu navegador web y navega a:

    ```
    http://localhost:8080/Login
    ```


3. interactua con las tarjetas y el carrito para  guardar elementos , modificar la cantidad , o eliminar.


4. al iniciar el carrito esta en 0

   ![carrito vacio al iniciar la app](animatedCollection/src/public/img/carrito_vacio.png)
   
5. aumentando las cantidades y presionando add to cart el producto se agrega al cart
  ### Importante!!! En caso de ingresar al carrito un artiuclo repetido , con el mismo ID , solo se modificara la cantidad ingresada en el carrito remplazandos las actuales, no duplica o suma las cantidades, 
   
  ![card en 0 ](animatedCollection/src/public/img/card_elemetos.png)

6. las cantidades se reflejaran en el carrito, haciendo click , se puede ver todos los items

  ![carrtio con items ](animatedCollection/src/public/img/carrito_con_items.png)

7. las cantidades se reflejaran en el carrito , se puede eliminar de a uno o vaciar todo el carrito
   
 #### el boton comprar esta habilitado
 el mismo llevara al ticket , para tener productos sin stock , ingresar una cantidad mayor a la renderizada en la card de la http://localhost:8080/api/products

   
  ![modal con itesms ](animatedCollection/src/public/img/modal.png) 

8.Pagination
## prosionanado se prodra cambiar de pagina ,el default de items es 8 , se puede modificar en productos por pagina , para mostar los valores asc o dsc se debe ingresar el -1 o 1 y para el stock un valor numerico , para obtener resultado presionar aplicar
![pagination ](animatedCollection/src/public/img/pagination.png) 

10.Usuario Administrador
## al ingresar como modo administrador en el margen suuperior derecho se podra ver le link CRUD para acceder baja,alta,actualizacion y eliminacion de productos, esta parte quedo incompleta
![pagination ](animatedCollection/src/public/img/pagination.png) 




   




