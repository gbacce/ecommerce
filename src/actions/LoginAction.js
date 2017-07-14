import $ from 'jquery';

export default function(loginData) {
  var request = $.ajax({
    method: "POST",
    url: window.hostAddress + '/login',
    data: loginData
  })
  return {
    type: "REGISTER",
    payload: request
  }
}