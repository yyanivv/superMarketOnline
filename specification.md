# Super Market Online - Online Shopping #
## Specification - Restful API - mongoDB Schema ##
### Yaniv Dadon ###

### Technologies ###

Client               | Server                | Data base
-------------------- | --------------------- | -----------------------
Html5                | Node.js               |  MongoDB
Css3                 | Expressjs             |
bootstrap 3.3.7      |                       |
AngularJS            |                       |


### db schema for collection (obj): ###

1.	Users: uid, isActive, first name, last name, user@name, role, id, password, city, address, Orders.
2.	Categories: cid, name, image, pid.
3.	Products: pid, name, price, image, isActive.
4.	Orders: oid, createdOn, Cart{createdOn, products[{pid ,quantity,total}]}, price, payment_details, shipping_details. 
    *Cart, store on session until the user pay for the cart(create order), then the cart store in orders collection.
    
### Permissions (User.role) ###
* Admin- Add Edit and Remove: Products.
* Customer - Carts:  create cart, update and order.

### Authenticates ###
1.	Signup (local)
2.	Facebook (social)
3.	Google	 (social)

## RESTFUL API ##

## Users ## 

**Sign Up User**
----
  
* **URL**

  ```/signup```

* **Method:**

  `POST`

* **Data Params**
```
  {
    {
        firstName: [string],
        lastName: [String],
        userName: [String],
        password: [String],
        city: [String],
        address: [String]
    }
  }
```
* **Success Redirect:**

  * **Code:** 302  <br />
  * **Path:** ```/login?signup=true```
  
* **Failure Redirect:**

  * **Code:** 302  <br />
  * **Path:** ```/login?signup=false```
  
----
  ** User exist **
----
  Returns json data (boolean) about a user exist on db .

* **URL**

  ```/userExist/:username```

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `username=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{userExist:true}`
    
 OR
    
  * **Code:** 200 <br />
    **Content:** `{userExist:false}`

* **Sample Call:**

  ```javascript
      $.ajax({
      url: "/users/yyanivv@yyanivv",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Get User Details**
---
  Returns json data about a user connected.

* **URL**

  ```/oauth/fetchUser```

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `If the user has an open shopping cart, The response contain openCart, Otherwise a lastCart will be on response.`
    ``` 
    {               
        success: [boolean],
        user: [Object],
        lastOrder: [Object],
        openCart: [Object] 
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/oauth/fetchUser",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
---
  **Login user**
----

* **URL**

  ```/login```

* **Method:**

  `POST`
  
* **Data Params**
```
  {
    {
        username: [String],
        password: [String]
    }
  }
```

* **Success Redirect:**

  * **Code:** 302  <br />
  * **Path:** ```/login?login=true```
  
* **Failure Redirect:**

  * **Code:** 302  <br />
  * **Path:** ```/login?login=false```

----
# Products #
  **Create Product**
----
* **URL**

  ```/super/createProduct```

* **Method:**

  `PUT`
  
* **Data Params**

 ```
{
    {
        name: [String],
        price: [String],
        image: [String],
        cid: [String]
    }
}
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/createProduct",
      dataType: "json",
      type : "PUT",
      data : {
                name: [String],
                price: [String],
                image: [String],
                cid: [String]
            }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Edit Product**
----
  Returns json data about a single user.

* **URL**

 ```/super/editProduct```

* **Method:**

  `PATCH`
  
* **Data Params**

 ```
{
    {
        _id: [String]
        name: [String],
        price: [String],
        image: [String],
    }
}
```


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/editProduct",
      dataType: "json",
      type : "PATCH",
      data : {
                _id: [String]
                name: [String],
                price: [String],
                image: [String]
            }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Get Product By Name**
----
  Returns json data about a product.

* **URL**

  ```/super/getProduct/:pname```

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `pname=[String]`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/milk",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Get All Products**
----
  Returns json data about all products.

* **URL**

  ```/super/getAllProducts```

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/getAllProducts",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ``` 
----
  **Get Products By Category**
----
  Returns json data about a single user.

* **URL**

  ```/super/getProductsByCategory/:cid```

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `cid=[String]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/getProductsByCategory/drinks",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ``` 
----
# Cart #
  **Update Cart**
----
* **URL**

  ```/super/updateCart```

* **Method:**

  `PATCH`
  
* **Data Params**

 ```
 {
    products:  {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    quantity: Number,
    total: Number
 }
```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/updateCart",
      dataType: "json",
      type : "PATCH",
      data: {
            products:  {
                        _id: "34rdfg53fg5typxw112"
                        name: "milk",
                        price: "2",
                        image: "http://newMarketOnline.com/images/milk.png"
                    },
            quantity: 1 / -1,
      }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Delete Product From Cart**
----
* **URL**

  ```/super/deleteProductFromCart/:pid```

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `pid=[String]`

* **Success Response:**

  * **Code:** 204 <br />
    **NoContent** 
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/deleteProductFromCart/asd54asd884sd12as1d",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Delete All Products From Cart**
----
 * **URL**

  ```/super/clearCart```

* **Method:**

  `DELETE`
  
* **Success Response:**

  * **Code:** 204 <br />
    **NoContent** 
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/clearCart",
      dataType: "json",
      type : "DELETE",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
# Categories #
  **Create Category**
----
* **URL**

  ```/super/createCategory```

* **Method:**

  `PUT`

* **Data Params**

 ```
{
    {
        name: [String],
        image: [String]
    }
}
```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/createCategory",
      dataType: "json",
      type : "PUT",
      data : {
                name: [String],
                image: [String]
            }
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
----
  **Get All Categories**
----
  Returns json data about all Categories.

* **URL**

  ```/super/getAllCategories```

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/getAllCategories",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
---
# Orders #
  **Create Order**
----
* **URL**

  ```/super/createOrder```

* **Method:**

  `PUT`
  
* **Data Params**
```
 {
    createdOn: {type:Date, default: new Date()},
    cart: {
        products: [{
            products:  {type: Schema.Types.ObjectId, ref: 'Product'},
            quantity: Number,
            total: Number 
        }],
        createdOn: Date,
        price: Number,
    },
    payment_details: Object,
    shipping_details: {city:String,address:String},
    shipping_date: Date
 }
```
* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ data: [Object], success : [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error: [Error] }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />


* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/super/getAllCategories",
      dataType: "json",
      type : "PUT",
      data :  {
        createdOn: {type:Date, default: new Date()},
        cart: {
            products: [{
                products:  {type: Schema.Types.ObjectId, ref: 'Product'},
                quantity: Number,
                total: Number 
                }],
            createdOn: Date,
            price: Number,
            },
            payment_details: Object,
            shipping_details: {city:String,address:String},
            shipping_date: Date
        }
      success : function(r) {
        console.log(r);
      }
    });
  ```

  -----------------------------------------------------

