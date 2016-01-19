// console.log('hoge');

// $.ajax({
//   url: '/todo/save',
//   method: "POST",
//   data: {
//     'title': 'hogahoga',
//     'status': 'ready'
//   }
// }).done(function(data){
//   console.log(data);
// });

import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo'

$(function(){
  ReactDOM.render(<Todo />, document.getElementById('todo-wrapper'));
});