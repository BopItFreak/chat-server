module.exports = function deleteClient(id) {
clients.forEach(function(cl,num)) {
      if (cl.user.id == id) {
      var index = clients.indexOf(num);
      if (index > -1) {
        clients.splice(index, 1);
      }
    }
  }
}
