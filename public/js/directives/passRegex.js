app.directive('validatePass', ()=>{
    
    return {
      restrict: 'A',
      	require: 'ngModel',
      	link: function(scope, element, attr, ctrl) {
          function validatePass(ngModelValue) {
              if (/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{5,}$/.test(ngModelValue)) {
                  ctrl.$setValidity('validPass', true);
              } else {
                  ctrl.$setValidity('validPass', false);
              }

              return ngModelValue;
          }
          ctrl.$parsers.push(validatePass); 
      }
    };
});