console.log('hoge');

$.ajax({
  url: '/todo/save',
  method: "POST",
  data: {
    'title': 'hogahoga',
    'status': 'ready'
  }
}).done(function(data){
  console.log(data);
});