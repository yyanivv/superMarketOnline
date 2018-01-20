app.directive('cartProduct', () => {
  return {
    restrict: 'E',
    scope: { product: '=data', addToCart: '=addProduct', deleteFromCart:'=deleteProductFromCart'},
    template: `
                <div class="product-cart">
                    <div class="delete-wrapper">
                        <button ng-click="deleteProductFromCart(product.products._id)">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                    </div>
                  <div class="img-wrapper">
                   <img class="product-image" src="{{product.products.image}}"></div>
                   <div class="product-details">
                     <p>{{product.products.name}}</p>
                     <p>{{product.products.price}}</p>
                     <p>Total: {{product.total}}</p>
                   </div>
                   <div class="product-actions">
                    <button ng-click="addProductToCart(product.products._id,1)">+</button>
                     <p>X {{product.quantity}}</p>
                    <button ng-click="addProductToCart(product.products._id,-1)">-</button>
                  </div>
                </div>
              `
        ,
      link: (scope, element, attrs) => {
           scope.addProductToCart = (id,quantity) => scope.addToCart(id,quantity)
           scope.deleteProductFromCart = id => scope.deleteFromCart(id)
       }
    }
})

