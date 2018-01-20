app.controller('adminController', ($scope, $http, superServices) => {

    $scope.search = val => val.length > 1 ? superServices.getProductByName(val).then(({data}) =>
    $scope.products = data.data) : $('product-wrap').remove();


    const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

    $scope.adminConnected = data => {
        $scope.admin = true;
        $scope.fullName = data.user.profile ? data.user.profile.displayName : capitalizeFirstLetter(data.user.firstName) + ' ' + capitalizeFirstLetter(data.user.lastName);
    }

    superServices.fetchUser().then(({
        data
    }) => data.user.role === 'admin' ? $scope.adminConnected(data) : window.location.href = '/login').catch(({
        err
    }) => err.status = 401 ? window.location.href = '/login' : console.log(err));

    $scope.getAllCategories = newCategory => {
        superServices.getAllCategories().then(({
            data
        }) => {
            $scope.categories = data.data
            if (newCategory) {
                $scope.allCategories = $scope.categories[$scope.categories.length - 1]._id;
            }
        })
    }
    
    $scope.renderProducts = data => {
    	$scope.products = data;
    	$('#buttons-wrapper li').removeClass('category-selected');
    }
    
    $scope.fetchProductsByCategory = cid => superServices.getProductsByCategory(cid).then(({
        data
    }) => {
        $scope.products = data.data
        $scope.cid = cid;
        $('#buttons-wrapper li').removeClass('category-selected');
        $('#' + cid).addClass('category-selected');
        $scope.resetForm();
    })

    $scope.resetForm = () => {
        $('form :input').val('');
        $('.img-selected img').attr('src', '');
        $scope.updateMode = false
    }

    const categoryExist = cname => $scope.categories.find(x => x.name === cname);

    $scope.addCategory = () => $scope.newCategory.length > 3 && !categoryExist($scope.newCategory.toLowerCase()) ? superServices.createCategory({
        name: $scope.newCategory.toLowerCase()
    }).then(({
        data
    }) => data.success ? $scope.getAllCategories($scope.newCategory.toLowerCase()) : $scope.err = 'cant add category') : $scope.categoryExistErr = "Invalid name"

    const addProductDetails = (service, obj) => {
        service(obj).then(({
            data
        }) => data.success ? $scope.fetchProductsByCategory($('.category-selected').attr('id')) : $scope.addError = 'cannot add product')
    }

    $scope.addProduct = () => {
        const file = document.getElementById('myFile');
        const formData = new FormData();
        formData.append('sampleFile', file.files[0]);
        superServices.uploadFile(formData).then(({
            data
        }) => {
            if (data.success) {
                const productDetails = {
                    name: $scope.pname.toLowerCase(),
                    price: $scope.pprice,
                    image: data.path,
                    cid: $scope.cid
                }
                return addProductDetails(superServices.createProduct, productDetails)
            }
            $scope.err = 'cant add product';
        })
    }

    const findProduct = id => $scope.products.filter(({
        _id
    }) => id === _id);

    $scope.editProduct = pid => {
        const currentProduct = findProduct(pid)[0];
        $scope.pid = pid;
        $scope.cid = $('.category-selected').attr('id');
        $('.img-selected img').attr('src', currentProduct.image)
        $scope.pname = currentProduct.name;
        $scope.pprice = currentProduct.price;
        $scope.pca = currentProduct.price;
        $scope.updateMode = true;
        const file = document.getElementById('myFile');
        file.files[0] = currentProduct.image
    }

    $scope.updateProduct = () => {
        if (document.getElementById('myFile').files[0]) {
            return uploadImg((err, path) => {
                if (!err) {
                    const productDetails = {
                        _id: $scope.pid,
                        name: $scope.pname.toLowerCase(),
                        price: $scope.pprice,
                        image: path,
                    }
                    return addProductDetails(superServices.editProduct, productDetails);
                }
                return $scope.imgErr = err
            })
        }
        const productDetails = {
            _id: $scope.pid,
            name: $scope.pname.toLowerCase(),
            price: $scope.pprice
        }
        return addProductDetails(superServices.editProduct, productDetails);
    }

    const uploadImg = (cb) => {
        const file = document.getElementById('myFile');
        const imageExtension = file.files[0].name.split(".").pop();
        const formData = new FormData();
        formData.append('sampleFile', file.files[0]);
        if (imgValidation(imageExtension)) {
            return superServices.uploadFile(formData).then(({
                data
            }) => cb(null, data.path)).catch(err => console.log(err));
        }
        return cb('Please choose a valid image file');
    }

    const imgValidation = imageExtension => jQuery.inArray(imageExtension.toLowerCase(), ['png', 'jpg', 'jpeg']) == -1 ? false : true;

    $("#myFile").change(function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => $('.img-selected img').attr('src', e.target.result);
            reader.readAsDataURL(this.files[0]);
        }
    });

    $scope.isAdmin = () => true;


    $("#myfile").change(function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => $('.img-selected img').attr('src', e.target.result);
            reader.readAsDataURL(this.files[0]);
        }
    });


    $scope.deleteProduct = (pid, cid) => {
        pid = $scope.pid
        cid = $scope.cid
        superServices.deleteProduct(pid, cid).then(res => res.status === 204 ? $scope.fetchProductsByCategory(cid) : $scope.deleteError = 'cannot delete product')
    }

});
