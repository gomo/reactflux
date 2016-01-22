"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  handlers: function handlers(constants) {
    var handlers = {};
    constants.map(function (value) {
      handlers[value] = "handle" + value.replace(/_?([^_]+)/g, function (m, p1) {
        return p1[0].toUpperCase() + p1.substr(1).toLowerCase();
      });
    });
    return handlers;
  }
};