import React from 'react';

export default class BaseComponent extends React.Component
{
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.store = this.initStore();
    this.state = this.store.getState();
  }

  initStore(){
    throw 'You must implements initStore().';
  }

  onStoreChange(callback){
    if(this._isMounted){
      this.setState(this.store.getState(), callback);
    }
  }

  componentWillMount() {
    this.store.addChangeListener(this.onStoreChange.bind(this));
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.store.removeChangeListener(this.onStoreChange.bind(this));
  }
}
