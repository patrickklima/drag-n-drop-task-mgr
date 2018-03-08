import React from 'react';
const moment = require('moment');

export default ({changes}) => {
  const actions = {
    'cardTitle': 'changed the card title',
    'description': 'changed the description',
    'isCompleted': 'changed the completed status',
    'removedMember': 'removed'
  };
  let changesMap;
  if (changes.length === 0) {
    changesMap = <li>No changes</li>;
  } else {
    changesMap = changes.reduce((changesMap, change) => {
      let listOfChanges = Object.keys(change).reduce((listOfChanges, key) => {
        let listItem = (actions[key]) ? `${change.username} ${actions[key]}` : '';  
        listItem += (key === 'removedMember') ? ` ${change.removedMember}` : '';
        listItem += (listItem.length > 0) ? ` on ${moment(change.date).format("MMM D, YYYY")}` : '';
        listOfChanges = (listItem.length > 0) ? [...listOfChanges, <li key={change.date}>{listItem + '.'}</li>] : listOfChanges; 
        return listOfChanges; 
      }, []);
      return [...changesMap, ...listOfChanges];
    }, []);
  }
  return (
    <ul>
      {changesMap}
    </ul>
  );
}