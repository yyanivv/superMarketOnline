app.directive('inputSearch', superServices  => {
    return {
    	restrict: 'E',
    	scope: {update: '=render'},
	    template: `<input type="text" id="search" placeholder="Search for a product" ng-model="product" ng-keyup="callService(product)">`,
	    link: (scope, element, attrs) => scope.callService = val => val.length > 1 ? superServices.getProductByName(val).then(({data}) => scope.update = data.data) : scope.update = []
    }
}); 