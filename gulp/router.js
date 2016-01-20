var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function loadTodoData(callback){
  fs.readFile('./example/todo/data.json', 'utf8', function (err, data) {
    if (err) {
      var data = '{"list": []}';
      fs.writeFile('./example/todo/data.json', data, function(err){
        if(err){
          return console.err(err);
        }

        callback(data);
      });
    }
    else
    {
      callback(data);
    }
  });
}

function saveTodoData(data, callback){
  fs.writeFile('./example/todo/data.json', data, function(err){
    if(err){
      return console.err(err);;
    }

    callback();
  });
}

var Controllers = {
  todo: {
    save: function(req, res, query, post, callback){
      loadTodoData(function(data){
        data = JSON.parse(data);
        var item = post;
        item['id'] = data.list.length + 1;
        data.list.unshift(item);
        var stringData = JSON.stringify(data);
        saveTodoData(stringData, function(){
          res.write(JSON.stringify(item), 'utf8', function(){
            callback();
          });
        });
      });
    },
    list: function(req, res, query, post, callback){
      loadTodoData(function(data){
        res.write(data, 'utf8', function(){
          callback();
        });
      });
    }
  }
}

exports.route  = function(req, res, next){
  var urlData = url.parse(req.url, true);
  var chunk = urlData.pathname.split('/');
  var controller = chunk[1] ? chunk[1] : 'index';
  var action = chunk[2] ? chunk[2] : 'index';

  if(Controllers[controller] && Controllers[controller][action]){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var post = '';
    req.on('data', function (data) {
      post += data;
    });
    req.on('end', function () {
      Controllers[controller][action](req, res, urlData.query, qs.parse(post), function(){
        res.end();
        next();
      });
    });

  } else {
    next();
  }
}