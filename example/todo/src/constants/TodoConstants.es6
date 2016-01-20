import ReactFlux from '../../../../';

export default{
  ActionTypes: ReactFlux.handlers([
    "BIND_TODO_LIST",
    "SHOW_LOADING",
    "HIDE_LOADING",
    "SHOW_MISSING_TITLE_ERROR",
    "HIDE_MISSING_TITLE_ERROR",
    "ADD_TODO",
    "BIND_TODO_TITLE"
  ])
};
