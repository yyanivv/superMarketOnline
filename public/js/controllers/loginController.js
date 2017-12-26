app.controller('loginController', ($scope, $http, superServices) => {
    
//    $scope.openCart = false;
//    $scope.lastOrder = false;
    
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    
    const continueShopping = cart => {
        $scope.openCart = cart;
        return 'Continue Shopping'
    } 
    
    const startShopping = data => {
        if(data.lastOrder){
			$scope.lastOrder = data.lastOrder;
			console.log($scope.lastOrder);
		}
		return 'start Shopping'
    }
    
    $scope.authorizedUser = data => {
		$scope.fullName = data.user.profile ? data.user.profile.displayName : capitalizeFirstLetter(data.user.firstName) + ' ' + capitalizeFirstLetter(data.user.lastName);
        $scope.userConnectedBtns = true;
        $scope.shoppingStatus = data.openCart ? continueShopping(data.openCart) : startShopping(data) ;
    }
        
    superServices.fetchUser().then(({data}) => $scope.authorizedUser(data));

    $scope.checkUser = () => superServices.userExist($scope.user).then(({data}) => $scope.userExist = data.userExist ? true : false);

    $scope.toggleSteps = () => $scope.regStep = !$scope.regStep;
    
    $scope.p1 = {
            products:  {
                _id:"5a299085a18eb029547b42d4",
                name:"beef fillet",
                price:20,
                image:"https://www.graigfarm.co.uk/pub/media/catalog/product/2/0/20.jpg",
                __v:0,
                isActive:true
            },
            quantity: -1,
        }
    $scope.p2 = {
        products:  {
            _id:"5a3e9ff5f36d2805ea5159c9",
            name:"milk",
            price:2,
            image:"https://image.freepik.com/free-vector/milk-bottle_1020-433.jpg",
            __v:0,
            isActive:true
        },
        quantity: 1,
    }
    $scope.p3 = {
        products: {_id:"5a299252a18eb029547b42d5",name:"cheddar cheese",price:5,image:"https://bigoven-res.cloudinary.com/image/upload/c_fill,h_300,w_300/cheddar-cheese.jpg",__v:0,isActive:true},
        quantity: 1
    }
    
    $scope.addProduct = p => superServices.updateCart(p).then(({data})=>console.log(data)) 
    
//    superServices.getAllProducts().then(({data})=>{console.log(data)})
//    let cart = {
//	"cart" : {
//		"products" : [
//			{
//            "products":  {"_id":"5a299085a18eb029547b42d4","name":"beef fillet","price":20,"image":"https://www.graigfarm.co.uk/pub/media/catalog/product/2/0/20.jpg","__v":0,"isActive":true},
//            "quantity": 1,
//            "total": 20 
//        },{
//            "products":  {"_id":"5a3e9ff5f36d2805ea5159c9","name":"milk","price":2,"image":"https://image.freepik.com/free-vector/milk-bottle_1020-433.jpg","__v":0,"isActive":true},
//            "quantity": 2,
//            "total": 4 
//        },{
//            "products": {"_id":"5a299252a18eb029547b42d5","name":"cheddar cheese","price":5,"image":"https://bigoven-res.cloudinary.com/image/upload/c_fill,h_300,w_300/cheddar-cheese.jpg","__v":0,"isActive":true},
//            "quantity": 3,
//            "total": 15 
//        }
//			],
//		"price": 39
//	}
//}
//console.log(cart)
//    superServices.createOrder(cart).then(({data})=>console.log(data))
})
