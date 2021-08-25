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
 * 
 * /orders/{id}:
 *  post:
 *    summary: Update the book by the id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id user
 *      - name: userOrEmail
 *        type: string
 *        in: formData
 *        required: false
 *        description : Nombre o email
 *    requestBody:
 *      required: true
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
 * 
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

