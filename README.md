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

**1 - Variables de entorno**

Crea un archivo **".env"** e inserta los datos tomando como referencia el archivo **".env.example"** para crear la base de datos. Debería quedar algo asi:

```
CLOUD_MONGODB=mongodburl
ELASTICACHE_URL=redisurl
SECRET=signature
PORT=3000
FACEBOOK_APP_ID=id
FACEBOOK_APP_SECRET=secret
GOOGLE_APP_ID=secret
GOOGLE_APP_SECRET=secret
GITHUB_APP_ID=id
GITHUB_APP_SECRET=secret
LINKEDIN_APP_ID=id
LINKEDIN_APP_SECRET=secret
```

**2 - Ejecución**

Para iniciar mi proyecto, tienes que usar `npm run start` y para iniciar el test usa `npm run test`

* Recuerda que la API está documentada en swagger, te será más fácil hacer pruebas
https://www.delilahresto.gq/api-docs/
* Los datos del usuario con el rol administrador son: **email: "admin@gmail.com", password: "admin"**

## Construido con 🛠️

* [NodeJS]("https://nodejs.org/es/") - Framework
* [Express]("https://expressjs.com/es/") - Framework web
* [Swagger]("https://swagger.io/) - Documentacion
* [MongoDB]("https://www.mongodb.com/es") - Database
* [Redis]("https://redis.io/") - Cache
* [Mocha]("https://mochajs.org/") - Test
* [JWT]("https://jwt.io/") - Auth
* [AWS]("https://aws.amazon.com/) - Cloud services


## Autor ✒️

* **Santiago Barreto** - [santieb](https://gitlab.com/santieb) 

---
