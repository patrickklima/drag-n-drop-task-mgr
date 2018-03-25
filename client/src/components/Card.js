import React from 'react';
import {ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';
import MembersContainer from '../containers/MembersContainer';
import CardChanges from './CardChanges';

export default ({
  cardTitle, 
  cardId,
  description, 
  listTitle,
  isCompleted,
  toggleCompleted,
  isdialogOpen, 
  openDialog, 
  closeDialog,
  onChangeTextField, 
  okToSaveChanges,
  changes,
}) => {
  const buttons = [
    <FlatButton
      label="Save Changes"
      primary={true}
      onClick={(e) => okToSaveChanges(e, true)}
    />,
    <FlatButton
      label="Cancel"
      secondary={true}
      onClick={(e) => okToSaveChanges(e, false)}
    />,
  ];
  const style = {
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    },
    listTitle: {
      fontSize: 12,
      textTransform: 'capitalize',
      margin: 4,
      display: 'inline-block',
    }, 
    checkbox: {
      display: 'inline-block',
    },
    divider: {
      marginTop: 16,
      marginBottom: 16,
    }
  }; 
  const cardDialog = 
    <div>
      <Dialog
        modal={false}
        actions={buttons}
        open={isdialogOpen}
        onRequestClose={closeDialog}
      >
        <div>
          <TextField
            defaultValue={cardTitle}
            name='cardTitle'
            inputStyle={style.cardTitle}
            underlineShow={false}
            onChange={onChangeTextField}
          />
          <div>
            {'In list:'}
            <Chip style={style.listTitle}>
              {listTitle}
            </Chip>
            <Checkbox
              label="Completed"
              style={style.checkbox}
              defaultChecked={isCompleted}
              onCheck={toggleCompleted}
            />
          </div>
        </div>
        <Divider style={style.divider} />
        <label>Users added to this card:</label>
        <MembersContainer cardId={cardId}/>
        <Divider style={style.divider} />
        <div>
          <label>Description:</label> 
          <TextField
            defaultValue={description}
            name='description'
            multiLine={true}
            rows={2}
            rowsMax={6}
            fullWidth={true}
            underlineShow={false}
            onChange={onChangeTextField}
          />
        </div>
        <Divider style={style.divider} />
        <CardChanges changes={changes}/>
      </Dialog>
    </div>;
  return (
    <div>
        <ListItem 
          style={style.cardTitle}
          onClick={openDialog}
          primaryText={cardTitle}
        />
        {isdialogOpen && cardDialog }
      </div> 

  );
}