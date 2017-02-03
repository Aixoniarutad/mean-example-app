angular.module('meanApp').controller('RegisterCtrl', RegisterCtrl);

function RegisterCtrl(auth){
  var vm = this;

  vm.register = register;

  function register() {
    var user = {
      username: vm.username,
      password: vm.password
    };

    if(!vm.username || !vm.password){
      vm.error = 'Please add a username and password.';
    } else {
      if(vm.password !== vm.passwordRepeat) {
        vm.error = 'Passwords do not match.'
      } else {
        auth.register(user).then(function(response){
          console.log(response);
        });
      }
    }
  };
};