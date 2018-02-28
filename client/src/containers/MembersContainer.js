import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {updateBoard} from '../actions/BoardActions';
const moment = require('moment');

const mapStateToProps = (state, ownProps) => {
  const {cards, _id} = state.board;
  const {cardId} = ownProps;
  return {
    username: state.user.username,
    card: cards[cardId],
    members: cards[cardId].members,
    boardId: _id
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (type, id, data, boardId) => dispatch(updateBoard(type, id, data, boardId))
  };
}
class MembersContainer extends Component {
  constructor(props) {
    super(props);
    this.state={
      showButtons: false,
      deletableMemberId: ''
    };
  }
  onRequestDelete = (deletableMemberId) => {
    this.setState({
      showButtons: true,
      deletableMemberId: deletableMemberId
    })
  };
  deleteMember = () => {
    const {username, card, members, updateBoard, cardId, boardId} = this.props;
    const {deletableMemberId} = this.state;
    const editedMembers = members.filter(member => member._id !== deletableMemberId);
    const newCardState = {
      members: editedMembers,
      changes: [...card.changes, {
          removedMember: deletableMemberId, 
          username: username,
          date: moment()
        }]
    }
    updateBoard('Card', cardId, newCardState, boardId);
    this.setState({
      showButtons: false,
      deletableMemberId: '',
    })
  };
  keepMember = () => {
    this.setState({
      showButtons: false,
      deletableMemberId: ''
    })
  };
  render() {
    const {members} = this.props;
    const saveCancelButtons = [
      <FlatButton
        key="Remove"
        label="Remove?"
        secondary={true}
        onClick={this.deleteMember}
      />,
      <FlatButton
        key="Keep"
        label="Keep!"
        primary={true}
        onClick={this.keepMember}
      />
    ];
    const style = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    };
    const membersMap = members.map(member => {
      return ( 
        <Chip
          key={member._id}
          onRequestDelete={() => this.onRequestDelete(member._id)}
          style={style.chip}
        >
          {member.username}
        </Chip>
      );
    });
    
    return (
      <div style={style.wrapper}>
        {membersMap}
        {this.state.showButtons && saveCancelButtons}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);