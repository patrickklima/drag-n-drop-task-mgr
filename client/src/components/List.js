import React from 'react';
import CardContainer from '../containers/CardContainer';

// export default (props) =>  {
//   return <div>{JSON.stringify(props)}</div>;
// };

export default ({list}) =>  {
  const cardMap = list.cards.map(cardId => {
    console.log("cardMap", cardId);
    return (
      <div key={cardId}>
        <CardContainer cardId={cardId} listId={list._id}/>
      </div>
    );
  });
  const style = {
    listTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      textTransform: 'capitalize'
    }
  }; 
  return (
    <div >
      <h4 style={style.listTitle}>{list.listTitle}</h4>
      {cardMap}
    </div>
  );
};
