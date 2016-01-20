export default {
  handlers: function(constants){
    var handlers = {};
    constants.map((value) => {
      handlers[value] = "handle" + value.replace(/_?([^_]+)/g, (m, p1) => p1[0].toUpperCase() + p1.substr(1).toLowerCase())
    });
    return handlers;
  }
}