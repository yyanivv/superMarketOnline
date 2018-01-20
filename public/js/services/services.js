const ajaxCalls = ($http) => {

    //    const getCities = (city) => $http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + city + "&types=(cities)&language=il&key=AIzaSyCMOW460pzV8DIkyCkIoVt1yA1TfJrNrvM");

    const fetchUser = () => $http.get('/oauth/fetchUser');
    
    const userExist = username => $http.get('/userExist/' + username);
    
    const createProduct = product => $http.put('/super/createProduct', product);

    const editProduct = product => $http.patch('/super/editProduct', product);
    
    const deleteProduct = (pid, cid) => $http.delete('/super/deleteProduct/' + pid + '/' + cid);

    const getAllProducts = () => $http.get('/super/getAllProducts');

    const getProductByName = pname => $http.get('/super/getProductByName/' + pname);

    const createOrder = order => $http.put('/super/createOrder', order);

    const updateCart = product => $http.patch('/super/updateCart', product);

    const getOrdersByUser = uid => $http.get('/super/getOrdersByUser/' + uid);

    const getAllCategories = () => $http.get('/super/getAllCategories');

    const createCategory = category => $http.put('/super/createCategory', category);

    const getProductsByCategory = cid => $http.get('/super/getProductsByCategory/' + cid)

    const deleteProductFromCart = pid => $http.delete('/super/deleteProductFromCart/' + pid);

    const clearCart = () => $http.delete('/super/clearCart/');

    const getDeliveryDates = () => $http.get('/super/getDeliveryDates');
    
    const uploadFile = formData => $http({url:'/upload',method: 'POST',data: formData, headers: {'Content-Type': undefined}});
    
    const getSuperDetails = () => $http.get('/getSuperDetails');

    return { 
        /*getCities,*/
        fetchUser,
        userExist,
        createProduct,
        editProduct,
        deleteProduct,
        getAllProducts,
        getProductByName,
        createOrder,
        updateCart,
        getOrdersByUser,
        getAllCategories,
        createCategory,
        getProductsByCategory,
        deleteProductFromCart,
        clearCart,
        getDeliveryDates,
        uploadFile,
        getSuperDetails
    }
}

app.factory('superServices', ajaxCalls);
