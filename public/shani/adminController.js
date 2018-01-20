app.controller('adminController2', ($scope, $http, superServices)=>{
	
    superServices.getAllCategories().then(({data})=>$scope.categories = data.data);

	$scope.addCtg = () =>{
	
		console.log($scope.ctg)
	}
//	$scope.upload = () => {
//		const file = document.getElementById('myfile');
//        const formData = new FormData();
//        formData.append('sampleFile', file.files[0]);
//        SuperServices.uploadFile(formData).then(({data})=>console.log(data))
//	}
});