import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from '../components/List';
import {updateBoard} from '../actions/BoardActions';


const mapStateToProps = (state, ownProps) => {
  const {listId} = ownProps;
  const {_id, lists} = state.board;
  return {
    list: lists[listId],
    boardId: _id,
    listId
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId))
  }
}


class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'List',
      displayedListTitle: '',
      buttonsShow: false
    };
  }
  componentDidMount = () => {
    this.setState({
      displayedListTitle: this.props.list.listTitle
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.list.listTitle !== prevProps.list.listTitle) {
      this.setState({
        displayedListTitle: this.props.list.listTitle
      });
    }
  }
  onChangeTextField = (e, newValue) => {
    console.log("onChangeTextField - target", e.target);
    this.setState({
      buttonsShow: true,
      displayedListTitle: newValue
    });
  }
  saveChanges = (e) => {
    const {type, displayedListTitle} = this.state;
    const {listId, boardId} = this.props;
    this.props.updateBoard(type, listId, {listTitle: displayedListTitle}, boardId);
    this.setState({
      buttonsShow: false
    });
  }
  cancelChanges = (e) => {
    this.setState({
      listTitle: this.props.list.listTitle,
      buttonsShow: false
    })
  }
  
  render() {
    console.log("ListContainer", this.props.list);
    return (
      <div>
        <List
          list={this.props.list}
          listTitle={this.state.listTitle}
          onChangeTextField={this.onChangeTextField}
          buttonsShow={this.state.buttonsShow}
          saveChanges={this.saveChanges}
          cancelChanges={this.cancelChanges}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
