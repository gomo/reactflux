import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo'

$(function(){
  ReactDOM.render(<Todo />, document.getElementById('todo-wrapper'));
});