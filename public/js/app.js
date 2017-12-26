const app = angular.module("app", ['ngRoute']);
app.config($routeProvider => {
    $routeProvider
        .when("/login", {
            templateUrl: "login.html"
        })
        .when("signup", {
            templateUrl: "signup.html"
        })
        .when("/social", {
            templateUrl: "social.html"
        })
});