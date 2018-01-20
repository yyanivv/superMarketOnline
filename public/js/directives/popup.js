app.directive('popup', () => {
    return {
      	restrict: 'E',
        scope:{downloadReceipt: `=download`},
        template: `<div class="window">
                  <div class="box">
                    <div class="panel panel-success">
                      <div class="panel-heading">
                      </div>
                      <div class="panel-body p-info row">
                        <h1>Your purchase was successful!</h1>
                        <h3>To download receipt click <a ng-click="downloadFile()">here</a><a id="download" download="receipt.txt"></a></h3>
                      </div>
                      <div class="panel-footer">
                        <button class="btn btnPush" ng-click="confirm()">OK</button>
                      </div>
                    </div>
                  </div>
                </div>`,
      link: (scope, element, attrs) => {
        scope.confirm =  () => window.location.href="/shop.html";
        scope.downloadFile = () => scope.downloadReceipt();
      }
    }
})