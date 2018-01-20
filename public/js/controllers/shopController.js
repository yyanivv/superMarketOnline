app.controller('shopController', ($scope, $http, superServices) => {
    
    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
    
    const continueShopping = cart => {
        $scope.cart = cart
        $scope.productsCart = cart.products;
    };
    
    const newCart = () => {
        $scope.cart = {
            price: 0
        }
        $scope.productsCart = [];
    };    
    
    const findProduct = id => $scope.products.filter(({_id}) => id === _id)[0];
    
    const findProductInCart = id => $scope.productsCart.filter(current => current.products._id === id)[0].products;
    
    $scope.patternCreditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    
    $scope.isAdmin = () => false;
    
    superServices.fetchUser().then(({data}) => $scope.authorizedUser(data)).catch(({status}) => status === 401 ? window.location.href="/login" : console.log(status));

    $scope.authorizedUser = data => {
        $scope.fullName = data.user.profile ? data.user.profile.displayName : capitalizeFirstLetter(data.user.firstName) + ' ' + capitalizeFirstLetter(data.user.lastName);
        $scope.userConnected = true;
        data.openCart ? continueShopping(data.openCart) : newCart() ;
        $scope.currentUser = data.user
    }

    superServices.getAllCategories().then(({data}) => $scope.categories = data.data);
    
    $scope.fetchProductsByCategory = cid => superServices.getProductsByCategory(cid).then(({data}) => {
        $scope.products = data.data
        if($scope.checkoutMode) $scope.checkoutMode = !$scope.checkoutMode;
        $('#buttons-wrapper li i').removeClass('fa-circle').addClass('fa-circle-o');
        $('#' + cid +' i').removeClass('fa-circle-o').addClass('fa-circle');
    }).catch(({status}) => status === 401 ? window.location.href="/login" : console.log(status))
    
    $scope.deleteFromCart = id => superServices.deleteProductFromCart(id).then(({data})=> data.data ? continueShopping(data.data) : newCart()).catch(({status}) => status === 401 ? window.location.href="/login" : console.log(status));
    
    $scope.addProduct = (pid,quantity) => {
        let currentProduct;
        if(quantity===undefined){
            quantity = $('#'+pid).val()
            currentProduct = findProduct(pid);
        }else {
            currentProduct = findProductInCart(pid);
        }
        const product = {
            products: currentProduct,
            quantity: Number(quantity),
        }
        superServices.updateCart(product).then(({data})=>continueShopping(data.data))
    }

    $scope.selectQuantity = (quantity, pid) => {
        let eval = $('#' + pid).val()
        eval = parseInt(eval)
        if (eval === 1 && quantity === -1) {
            return
        }
        eval += quantity
        $('#' + pid).val(eval)
    }
    
    $scope.clearCart = () => superServices.clearCart().then(res=> res.status === 204 ? newCart() : console.log(res)).catch(({status}) => status === 401 ? window.location.href="/login" : console.log(status));
    
    $scope.goToCash = () => $scope.productsCart.length > 0 ? $scope.checkoutMode = true : $scope.checkoutMode = false;
    
    superServices.getDeliveryDates().then(({
        data
    }) => {
        const disabledDates = [];
        data.data.forEach(current => {
            if (current.count = 3 ) {
                disabledDates.push(moment(current._id));
            }
        })
        $(() => $('#datetimepicker1').datetimepicker({
            daysOfWeekDisabled: [5,6],
            disabledDates,
            minDate: new Date(),
            pickTime: false,
            format: 'DD/MM/YYYY'
        }));
    })
    
    $scope.checkout = (city, address, creditCard) => $("#datetimepicker1").find("input").val() === "" ? $scope.dateErr=true : makeOrder(city, address, creditCard);

	const makeOrder = (city, address, creditCard) => {
		const obj = {shipping_details: {city, address}, creditCard, shipping_date: $("#datetimepicker1").find("input").val()};
		superServices.createOrder(obj).then(({data}) => data.success ? $('.window').css('display', 'block') : $scope.orderErr=true).catch(({status}) => {
	    	if(status === 401){
		     	window.location.href="/"; 
		    }
		})
	}
    
    $scope.fetchCity = () => $scope.city = $scope.currentUser.city;

	$scope.fetchAddress = () => $scope.address = $scope.currentUser.address;
    
    $scope.download = () => {
		$http.get('super/receipt').then(({data})=>{
			const content = "Cutomer name: " + $scope.fullName + ", " + "Order date: " + data.data.createdOn + ", " + "Total price: " + data.data.cart.price;
			$('popup #download').attr('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
			const element = document.getElementById('download');
			element.click();
		}).catch(({status}) => status === 401 ? window.location.href="/login" : console.log(status));
	}
    
    $scope.searchInCart = name => $scope.pname.length > 0 ? markProducts($scope.pname.toLowerCase()) : $('.product-name').removeClass('marked');

	const markProducts = name => {
		$('.product-details p:first-child').each(function() {
			$(this).text().toLowerCase().indexOf(name)!=-1 ? $(this).addClass('marked') : $(this).removeClass('marked');
		})
	}
});
