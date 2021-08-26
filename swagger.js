    // Users


/**
 * @swagger
 * /:
 *  get:
 *    description: Ver usuarios
 *    tags: [Users] 
 *    responses:
 *      200:
 *        Sucess
 *
 * /register:
 *  post:
 *    description: Registrar un usuario
 *    tags: [Users]
 *    parameters:
 *    - name: username
 *      type: string
 *      in: formData
 *      required: false
 *      description : Nombre de usuario
 *    - name: name
 *      type: string
 *      in: formData
 *      required: false
 *      description : Nombre y apellido
 *    - name: email
 *      type: string
 *      in: formData
 *      required: false
 *      description : Correo electronico
 *    - name: phone
 *      type: number
 *      in: formData
 *      required: false
 *      description : Telefono
 *    - name: shippingAddress
 *      type: string
 *      in: formData
 *      required: false
 *      description : Direccion de envio
 *    - name: password
 *      type: string
 *      in: formData
 *      required: false
 *      description : Contraseña
 *    responses:
 *      200:
 *        Sucess
 *
 * /login:
 *  post:
 *    description: Iniciar sesión
 *    tags: [Users]
 *    parameters:
 *    - name: userOrEmail
 *      type: string
 *      in: formData
 *      required: false
 *      description : Nombre o email
 *    - name: password
 *      type: string
 *      in: formData
 *      required: false
 *      description : Contraseña
 *    responses:
 *      200:
 *        Sucess
 * 
 */


    //Orders


/**
 * @swagger
 *
 * /orders/{id}:
 *  post:
 *    tags: [Orders]
 *    parameters:
 *      - name: order
 *        type: array
 *        in: formData
 *        items:
 *          properties:
 *            product: 
 *              type: string
 *            amount:   
 *              type: integer
 *    responses:
 *      200:
 *        Sucess
 *
 * /orders/confirmation/{id}:
 *  get:
 *    description: confirmar pedido del usuario en estado "new"
 *    tags: [Orders] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id user
 *    responses:
 *      200:
 *        Sucess
 *
 * /orders/history/{id}:
 *  get:
 *    description: Ver historial del usuario
 *    tags: [Orders] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id user
 *    responses:
 *      200:
 *        Sucess
 */


    //Payments


/**
 * @swagger
 * /payments/{id}:
 *  get:
 *    description: Ver metodos de pago
 *    tags: [Payments] 
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id user
 *    responses:
 *      200:
 *        Sucess
 */
 /**
 * @swagger
 * /payments/{id}:
 *  post:
 *    description: Crear metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del usuario
 *      - name: method
 *        type: string
 *        in: formData
 *        required: true
 *        description: Nuevo metodo
 *    responses:
 *      200:
 *        Sucess
 * 
 * /payments/{id}/{idMethod}:
 *  put:
 *    description: Editar metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del usuario
 *      - in: path
 *        name: idMethod
 *        required: true
 *        description: id del metodo
 *        schema:
 *          type: integer
 *      - name: method
 *        type: string
 *        in: formData
 *        required: true
 *        description: Nuevo metodo
 *    responses:
 *      200:
 *        Sucess
 */
/**
 * @swagger
 * /payments/{id}/{idMethod}:
 *  delete:
 *    description: Eliminar metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del usuario
 *      - in: path
 *        name: idMethod
 *        schema:
 *          type: integer
 *        description: id del metodo
 */
/**
 * @swagger
 * /payments/{id}/{idMethod}:
 *  delete:
 *    description: Eliminar metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: id del usuario
 *      - in: path
 *        name: idMethod
 *        schema:
 *          type: integer
 *        description: id del metodo
 */


    //Products


/**
 * @swagger
 * /products:
 *  get:
 *    description: Ver metodos de pago
 *    tags: [Products]
 *    responses:
 *      200:
 *        Sucess
 */