# Delilah Restó API

Delilah Restó API es una API Rest que interactúa con un sistema de base de datos NoSQL construida con el objetivo de garantizar una gestión persistente del restaurante ficticio **Delilah Resto**.

## Comenzando 🚀

Haz un clon del repositorio

```
git clone https://gitlab.com/santieb/my-app.git
```

Instala las dependencias

```
npm install
```

### Instrucciones 📄

**1 - Base de datos**

Crea un archivo **".env"** e inserta los datos tomando como referencia el archivo **".env.example"** para crear la base de datos. Debería quedar algo asi:

```
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DB_NAME=restaurant
SECRET=signature
```

**2 - Inserción de datos**

Exporta los archivos JSON de la carpeta **"src/data"** e insertarlos en la base de datos en sus correspondientes colecciones

* Solo los archivos **"users.json"** y **"orderstatuses.json"** son necesarios, los demás archivos son opcionales
 
* Los datos del usuario con el rol administrador son **email: "admin@gmail.com", password "admin"**

**3 - Ejecución**

Para iniciar mi proyecto, tienes que usar `npm run dev` y para iniciar el test usa `npm run test`

* Recuerda que la API está documentada en swagger te será más fácil hacer pruebas

## Construido con 🛠️

* [NodeJS]("https://nodejs.org/es/") - Framework
* [Express]("https://expressjs.com/es/") - Framework web
* [Swagger]("https://swagger.io/) - Documentacion
* [MongoDB]("https://www.mongodb.com/es") - Database
* [Redis]("https://redis.io/") - Cache
* [Mocha]("https://mochajs.org/") - Test
* [JWT]("https://jwt.io/") - Auth


## Autor ✒️

* **Santiago Barreto** - [santieb](https://gitlab.com/santieb) 

---

por [santieb](https://gitlab.com/santieb)