app.directive('categoryBtn', () => {
  return {
    restrict: 'E',
    scope: { category: '=category', fetch: "=clicky"},
    template: `
                <li class="categoryBtn" ng-click="exec(category._id)" id="{{category._id}}">
                  <i class="fa fa-circle-o" aria-hidden="true"></i> 
                    {{category.name}}
                </li>
              `,
    link: (scope, element, attrs) => scope.exec = id => scope.fetch(id)
  }
})