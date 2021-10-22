    // Users


/**
 * @swagger
 * 
 * /register:
 *   post:
 *    description: crear usuario
 *    tags: [Users]
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: body
 *      name: orders
 *      required: false
 *      description : crear usuario. Es posible añadir otras direcciones diferentes añadiendo un objeto al array "addressBook" con sus correspondientes elemento (shippingAddress)
 *      schema:
 *                  type: object
 *                  properties:
 *                    addressBook:
 *                      type: array
 *                      items:
 *                            type: object
 *                            properties:
 *                                  shippingAddress:
 *                                    type: string
 *                    name:
 *                        type: string
 *                    phone: 
 *                        type: number
 *                    email: 
 *                        type: string
 *                    username:
 *                        type: string
 *                    password: 
 *                        type: string
 *    responses:
 *      200:
 *        Sucess
 *
 * /login:
 *  post:
 *    description: Iniciar sesión
 *    tags: [Users]
 *    parameters:
 *    - name: email
 *      type: string
 *      in: formData
 *      required: false
 *      description : email
 *    - name: password
 *      type: string
 *      in: formData
 *      required: false
 *      description : Contraseña
 *    responses:
 *      200:
 *        Sucess
 * 
 * /admin/users:
 *  get:
 *    description: Ver usuarios
 *    tags: [Users]
 *    parameters:
 *    - name: authorization
 *      type: string
 *      in: header
 *      required: false
 *      description : token
 *    responses:
 *      200:
 *        Sucess
 *
 * /admin/users/{idUser}:
 *  put:
 *    description: suspender usuario
 *    tags: [Users]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idUser
 *        required: true
 *        description: idUser
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        Sucess
 */


    //Orders


/**
 * @swagger
 *
 * /orders:
 *   post:
 *    description: Hacer un pedido
 *    tags: [Orders]
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - name: authorization
 *      type: string
 *      in: header
 *      required: false
 *      description : token
 *    - in: body
 *      name: orders
 *      required: false
 *      description : Crear una orden. Es posible añadir otros productos diferente añadiendo un objeto al array "order" con sus correspondientes elementos (product y amount)
 *      schema:
 *                  type: object
 *                  properties:
 *                    order:
 *                      type: array
 *                      items:
 *                            type: object
 *                            properties:
 *                                  product:
 *                                    type: string
 *                                  amount: 
 *                                    type: number
 *                    methodOfPayment: 
 *                        type: string
 *                    shippingAddress: 
 *                        type: string
 *    responses:
 *      200:
 *        Sucess
 * 
*/
 /**
 * @swagger
 *
 * /orders:
 *   put:
 *    description: Editar un pedido, el cambio se efectuará en el pedido sin confirmar
 *    tags: [Orders]
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - name: authorization
 *      type: string
 *      in: header
 *      required: false
 *      description : token
 *    - in: body
 *      name: orders
 *      description : Editar una pedido. Es posible añadir otro producto diferente añadiendo un objeto al array "order" con sus correspondientes elementos (product y amount)
 *      schema:
 *                  type: object
 *                  properties:
 *                    order:
 *                      type: array
 *                      items:
 *                            type: object
 *                            properties:
 *                                  product:
 *                                    type: string
 *                                  amount: 
 *                                    type: number
 *                    methodOfPayment: 
 *                        type: string
 *                    shippingAddress: 
 *                        type: string
 *    responses:
 *      200:
 *        Sucess
 * 
 * /orders/confirmation:
 *  put:
 *    description: se confirma el pedido que esta en estado "new"
 *    tags: [Orders] 
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *    responses:
 *      200:
 *        Sucess
 *
 * /orders/history:
 *  get:
 *    description: Ver historial del usuario
 *    tags: [Orders] 
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *    responses:
 *      200:
 *        Sucess
 *
 * /admin/allOrders:
 *  get:
 *    description: Ver todas las ordenes
 *    tags: [Orders] 
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *    responses:
 *      200:
 *        Sucess
 * 
 * /admin/allorders/{idOrder}:
 *  put:
 *    description: Modificar estados
 *    tags: [Orders] 
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idOrder
 *        required: true
 *        description: id de la orden
 *        schema:
 *          type: integer
 *      - name: state
 *        type: string
 *        in: formData
 *        required: true
 *        description: Nuevo estado
 *    responses:
 *      200:
 *        Sucess
 * 
 */


    // address book


/**
 * @swagger
 * /user/addressBook:
 *  get:
 *    description: Ver direcciones
 *    tags: [AddressBook]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *    responses:
 *      200:
 *        Sucess
 */
 /**
 * @swagger
 * /user/addressBook:
 *  post:
 *    description: Crear producto
 *    tags: [AddressBook]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - name: address
 *        type: string
 *        in: formData
 *        required: true
 *        description: shippingAddress
 *    responses:
 *      200:
 *        Sucess
 */
/**
 * @swagger
 * /user/addressBook/{idAddress}:
 *  delete:
 *    description: Eliminar producto
 *    tags: [AddressBook]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idAddress
 *        schema:
 *          type: integer
 *        required: true
 *        description: idAddress
 *    responses:
 *      200:
 *        Sucess
 */


    //Payments


/**
 * @swagger
 * /payments:
 *  get:
 *    description: View users
 *    tags: [Payments] 
 *    parameters:
 *    - name: authorization
 *      type: string
 *      in: header
 *      required: false
 *      description : token
 *    responses:
 *      200:
 *        Sucess
 */
 /**
 * @swagger
 * /admin/payments:
 *  post:
 *    description: Crear metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - name: method
 *        type: string
 *        in: formData
 *        required: true
 *        description: Method of payment
 *    responses:
 *      200:
 *        Sucess
 * 
 * /admin/payments/{idPayment}:
 *  put:
 *    description: Editar metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idPayment
 *        required: true
 *        description: method of payment ID
 *        schema:
 *          type: integer
 *      - name: method
 *        type: string
 *        in: formData
 *        required: true
 *        description: Metodo
 *    responses:
 *      200:
 *        Sucess
 */
/**
 * @swagger
 * /admin/payments/{idPayment}:
 *  delete:
 *    description: Eliminar metodo de pago
 *    tags: [Payments]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idPayment
 *        schema:
 *          type: integer
 *        description: id del metodo
 *    responses:
 *      200:
 *        Sucess
 */


    //Products


/**
 * @swagger
 * /products:
 *  get:
 *    description: Ver productos
 *    tags: [Products]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *    responses:
 *      200:
 *        Sucess
 * 
 * /admin/products:
 *  post:
 *    description: Crear producto
 *    tags: [Products]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - name: name
 *        type: string
 *        in: formData
 *        required: true
 *        description: Product name
 *      - name: price
 *        type: integer
 *        in: formData
 *        required: true
 *        description: product price
 *      - name: abbreviation
 *        type: string
 *        in: formData
 *        required: true
 *        description: product abbreviation
 *    responses:
 *      200:
 *        Sucess
 *
 * /admin/products/{idProduct}:
 *  put:
 *    description: Editar producto
 *    tags: [Products]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idProduct
 *        schema:
 *          type: integer
 *        required: true
 *        description: Product ID
 *      - name: name
 *        type: string
 *        in: formData
 *        required: true
 *        description: Product name
 *      - name: price
 *        type: integer
 *        in: formData
 *        required: true
 *        description: Product price
 *      - name: abbreviation
 *        type: string
 *        in: formData
 *        required: true
 *        description: Product abbreviation
 *    responses:
 *      200:
 *        Sucess
 */
/**
 * @swagger
 * /admin/products/{idProduct}:
 *  delete:
 *    description: Eliminar producto
 *    tags: [Products]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: idProduct
 *        schema:
 *          type: integer
 *        required: true
 *        description: Product ID
 *    responses:
 *      200:
 *        Sucess
 */