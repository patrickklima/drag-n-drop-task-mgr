import React, { Component } from 'react';
import List from '../components/List';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      isFetching: false,
      error: null
    };
  }
   
  
  render() {
    console.log("ListContainer", this.state.list);
    return (
      <div>
        <List
          list={this.state.list}
        />
      </div>
    );
  }
}

export default ListContainer;
