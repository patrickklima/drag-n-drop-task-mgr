import React from 'react';
import CardContainer from '../containers/CardContainer';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

// export default (props) =>  {
//   return <div>{JSON.stringify(props)}</div>;
// };

export default ({list, listTitle, onChangeTextField, buttonsShow, saveChanges, cancelChanges}) =>  {
  const cardMap = list.cards.map(cardId => {
    console.log("cardMap", cardId);
    return (
      <div key={cardId}>
        <CardContainer cardId={cardId} listId={list._id}/>
      </div>
    );
  });
  const buttons = [
    <FlatButton
      label="Save"
      primary={true}
      onClick={saveChanges}
    />,
    <FlatButton
      label="X"
      secondary={true}
      onClick={cancelChanges}
    />,
  ];
  const style = {
    listTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }; 
  return (
    <div >
      <TextField
        defaultValue={list.listTitle}
        name='listTitle'
        inputStyle={style.listTitle}
        underlineShow={false}
        onChange={onChangeTextField}
      />
      {buttonsShow && buttons}
      {cardMap}
    </div>
  );
};

