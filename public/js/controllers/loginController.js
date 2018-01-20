app.controller('loginController', ($scope, $http, superServices) => {
    
    $scope.pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    
    const continueShopping = cart => {
        $scope.openCart = cart;
            console.log($scope.openCart)
        return 'Continue Shopping'
    } 
    
    const startShopping = data => {
        if(data.lastOrder){
			$scope.lastOrder = data.lastOrder;
            console.log($scope.lastOrder)
		}
		return 'Start Shopping'
    }
    
    $scope.authorizedUser = data => {
		$scope.fullName = data.user.profile ? data.user.profile.displayName : capitalizeFirstLetter(data.user.firstName) + ' ' + capitalizeFirstLetter(data.user.lastName);
        $scope.userConnected = true;
        $scope.shoppingStatus = data.openCart ? continueShopping(data.openCart) : startShopping(data) ;
    }
      
    superServices.fetchUser().then(({data}) => data.user.role === 'admin'? window.location.href = '/admin.html' : $scope.authorizedUser(data));
    
    superServices.getSuperDetails().then(({data}) => $scope.superDetails = data);
    
    $scope.checkUser = () => $scope.user != undefined ? superServices.userExist($scope.user).then(({data}) => $scope.userExist = data.userExist ? true : false) : $scope.userExist = false;

    $scope.toggleSteps = () => $scope.regStep = !$scope.regStep;

})
