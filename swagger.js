    // Users


/**
 * @swagger
 * 
 * /register:
 *   post:
 *    description: create user
 *    tags: [Users]
 *    consumes:
 *    - application/json
 *    produces:
 *    - application/json
 *    parameters:
 *    - in: body
 *      name: orders
 *      required: false
 *      description : create user. It is possible to add other different addresses by adding an object to the array "addressBook" with its corresponding element (shippingAddress)
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
 *    description: log in
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
 *      description : password
 *    responses:
 *      200:
 *        Sucess
 * 
 * /admin/users:
 *  get:
 *    description: View users
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
 *    description: Suspend user
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
 *    description: make an order
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
 *      description : Create an order. It is possible to add other different products by adding an object to the "order" array with its corresponding elements (product and amount)
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
 *    description: Edit an order, the change will be made to the unconfirmed order
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
 *      description : Edit an order. It is possible to add other different products by adding an object to the "order" array with its corresponding elements (product and amount)
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
 *    description: The order is confirmed in "new" status
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
 *    description: view history
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
 *    description: view all orders
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
 *    description: modify order statuses
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
 *        description: order id
 *        schema:
 *          type: integer
 *      - name: state
 *        type: string
 *        in: formData
 *        required: true
 *        description: new state
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
 *    description: view address book
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
 *    description: Create shipping address
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
 * /user/addressBook/{shippingAddress}:
 *  delete:
 *    description: Remove shipping address
 *    tags: [AddressBook]
 *    parameters:
 *      - name: authorization
 *        type: string
 *        in: header
 *        required: false
 *        description : token
 *      - in: path
 *        name: shippingAddress
 *        schema:
 *          type: integer
 *        required: true
 *        description: shippingAddress
 *    responses:
 *      200:
 *        Sucess
 */


    //Payments


/**
 * @swagger
 * /payments:
 *  get:
 *    description: View methods of payments
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
 *    description: Create payment method
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
 *    description: Edit payment method
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
 *        description: method of payment
 *    responses:
 *      200:
 *        Sucess
 */
/**
 * @swagger
 * /admin/payments/{idPayment}:
 *  delete:
 *    description: Remove payment method
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
 *        description: method id
 *    responses:
 *      200:
 *        Sucess
 */


    //Products


/**
 * @swagger
 * /products:
 *  get:
 *    description: view products
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
 *    description: Create products
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
 *    description: Edit product
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
 *    description: Remove product
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