const ajaxCalls = ($http) => {

    //    const getCities = (city) => $http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + city + "&types=(cities)&language=il&key=AIzaSyCMOW460pzV8DIkyCkIoVt1yA1TfJrNrvM");

    const fetchUser = () => $http.get('/oauth/fetchUser');
    
    const userExist = username => $http.get('/userExist/' + username);
    
    const createProduct = product => $http.put('/super/createProduct', product);

    const editProduct = product => $http.patch('/super/editProduct', product);

    const getAllProducts = () => $http.get('/super/getAllProducts');

    const getProduct = pname => $http.get('/super/getAllProducts/' + pname);

    const createOrder = order => $http.put('/super/createOrder', order);

    const updateCart = product => $http.patch('/super/updateCart', product);

    const getOrdersByUser = uid => $http.get('/super/getOrdersByUser/' + uid);

    const getAllCategories = () => $http.get('/super/getAllCategories');

    const createCategory = category => $http.put('/super/createCategory', category);

    const getProductsByCategory = cid => $http.get('/super/getProductsByCategory/' + cid);

    const deleteProductFromCart = pid => $http.delete('/super/deleteProductFromCart/' + pid);

    const clearCart = cid => $http.delete('/super/clearCart/' + cid);

    const getDeliveryDates = () => $http.get('/super/getDeliveryDates');

    return { 
        /*getCities,*/
        fetchUser,
        userExist,
        createProduct,
        editProduct,
        getAllProducts,
        getProduct,
        createOrder,
        updateCart,
        getOrdersByUser,
        getAllCategories,
        createCategory,
        getProductsByCategory,
        deleteProductFromCart,
        clearCart,
        getDeliveryDates
    }
}

app.factory('superServices', ajaxCalls);
