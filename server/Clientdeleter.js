module.exports = function deleteClient(client,id) {
clients.forEach(function(cl,num) {
      //console.log("Client id: " + cl.user.id + " ID TO GET: " + id);
      if (cl.user.id == id) {
      var index = id;
      if (index > -1) {
        clients.splice(index, 1);
        console.log("Removed client: " + id)
      }
    }
  });
}
