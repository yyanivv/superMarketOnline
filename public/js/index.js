const app = angular.module("app", ['ngRoute']);
app.config($routeProvider => {
    $routeProvider
        .when("/orders", {
            templateUrl: "orders.html"
        })
        .when("/shopping", {
            templateUrl: "shopping.html"
        })
});