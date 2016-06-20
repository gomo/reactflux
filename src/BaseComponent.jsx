import React from 'react';

export default class BaseComponent extends React.Component
{
  constructor(props) {
    super(props);
    this.store = this.initStore();
    this.state = this.store.getInitialState();

    this.storeChangeCallback = (resolve) => {
      this.setState(this.store.bindUpdatedState(), ()=>{
        resolve();
      });
    };
  }

  initStore(){
    throw 'You must implements initStore().';
  }

  componentWillMount() {
    this.store.addChangeListener(this.storeChangeCallback);
  }

  componentWillUnmount() {
    this.store.removeChangeListener(this.storeChangeCallback);
  }
}
