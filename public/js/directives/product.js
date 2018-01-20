app.directive('productWrap', () => {
    return {
      	restrict: 'EA',
        scope: { product: '=productData', label: `=label`,  edit: '=editProduct', label2: '=labell', add: '=addProduct', isAdmin:"=admin", chQuantity:"=selectQuantity"},
        template: `<div class="cell">
                      <h4 class="name-heading">{{product.name}}</h4>
                      <img src="{{product.image}}">
                      <p>price: {{product.price}}<i class="fa fa-ils"></i></p>
                      <div ng-hide="checkAdmin" class="products-btns">
                        <button type="button" ng-click="changeQuantity(-1,product._id)" class="quantity-btns">-</button>
                        <input type="number" id={{product._id}} value="1">
                        <button type="button" ng-click="changeQuantity(1,product._id)" class="quantity-btns">+</button>
                        <button ng-click="addProduct(product._id)" id="add-btn">{{label2}}</button>
                      </div>
                    <button ng-show="checkAdmin" ng-click="editProduct(product._id)">{{label}}</button>
                    </div>`,
        link: (scope, element, attrs) => {
           scope.editProduct = id => scope.edit(id)
           scope.addProduct = id => scope.add(id)
           scope.checkAdmin = scope.isAdmin()
           scope.changeQuantity = (quantity,pid) => scope.chQuantity(quantity,pid)
       }
    }
})
