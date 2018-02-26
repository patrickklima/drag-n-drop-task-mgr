import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import {updateBoard} from '../actions/BoardActions'

const mapStateToProps = (state, ownProps) => {
  const {cards, _id: boardId} = state.board;
  const {cardId} = ownProps;
  return {
    members: cards[cardId].members,
    boardId
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
      detetableMemberId: ''
    };
  }
  onRequestDelete = (detetableMemberId) => {
    this.setState({
      showButtons: true,
      detetableMemberId: detetableMemberId
    })
  };
  deleteMember = () => {
    const {members, updateBoard, cardId, boardId} = this.props;
    const {detetableMemberId} = this.state;
    const editedMembers = members.filter(member => member._id !== detetableMemberId);
    updateBoard('Card', cardId, {members: editedMembers}, boardId);
    this.setState({
      showButtons: false,
      detetableMemberId: '',
    })
  };
  keepMember = () => {
    this.setState({
      showButtons: false,
      detetableMemberId: ''
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