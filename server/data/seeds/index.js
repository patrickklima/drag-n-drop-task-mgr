const mongoose = require('mongoose');
const models = require('../models');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/mongo')[env];
const mongooseeder = require('mongooseeder');
const faker = require('faker');
const {hashPassword} = require('../../services/password-service.js');

const saltRounds = 10;

const {
  User,
  Board,
  List, 
  Card
} = models;


const seeds = () => {
  const users = [1,2,3,4,5].map(el => {
    return new User({
      username : `user${el}`,
      password : hashPassword(`user${el}`)
    });
  });
  const cardFactory = (cardName) => {
    return new Card({
      cardTitle: cardName, 
      description: cardName+" "+faker.lorem.paragraph(),
      members: users.filter(user => user.username === 'user3' || user.username === 'user4' || user.username === 'user5'),
      changes:[]
    });
  };

  const listFactory = (title, description, cardsArray) => {
    return new List({
      listTitle: title, 
      description: description,
      cards: cardsArray.map(card => card._id)
    });
  }

  const boardFactory = (title, arrayOfLists) => {
    return new Board({
      boardTitle: title,
      lists: arrayOfLists.map(list => list._id),
      members: users.filter(user => user.username === 'user1' || user.username === 'user2' ),
    });
  };

  const berryCards = ['strawberries', 'blueberries', 'blackberries', 'raspberries'].map(cardFactory);
  const citrusCards = ['oranges', 'limes', 'lemons', 'grapefruit'].map(cardFactory);
  const berries = listFactory('berries', 'great on ice cream', berryCards);
  const citrus = listFactory('citrus', 'sour and juicy', citrusCards);
  const fruit = boardFactory('fruit', [berries, citrus]);

  const germanyCards = ['Berlin', 'Munich', 'Frankfurt'].map(cardFactory);
  const usaCards = ['San Diego', 'Austin', 'Seattle', 'Boston'].map(cardFactory);
  const spainCards = ['Madrid', 'Barcelona', 'Sevilla'].map(cardFactory);
  const germany = listFactory("Germany", "Always on time", germanyCards);
  const usa = listFactory('USA', 'Big, messy, and colorful', usaCards);
  const spain = listFactory('Spain', "I've always wanted to go there...", spainCards);
  const places = boardFactory('places', [germany, usa, spain]);

  const toyotaCards = ['Prius', 'Tacoma', 'Titan'].map(cardFactory);
  const fordCards = ['Focus', 'Ranger', 'F-Series'].map(cardFactory);
  const hondaCards = ['Civic', 'Accord', 'Fit'].map(cardFactory);
  const toyota = listFactory('Toyota', 'Good-looking and basically indestructible', toyotaCards);
  const ford = listFactory('Ford', "Made in the USA. Probably won't break", fordCards);
  const honda = listFactory('Honda', 'Long-lasting and average-looking', hondaCards);
  const cars = boardFactory('cars', [toyota, ford, honda]);

  const lists = [berries, citrus, germany, usa, spain, toyota, ford, honda];
  const boards = [fruit, places, cars];

  const instances = [
    ...users,
    ...berryCards,
    ...citrusCards,
    ...germanyCards,
    ...usaCards,
    ...spainCards,
    ...toyotaCards,
    ...fordCards,
    ...hondaCards,
    ...lists, 
    ...boards
  ];
  return Promise.all(
    instances.map(instance => instance.save())
  );
};

const mongodbUrl = env === 'production' ?
  process.env[config.use_env_variable] :
  `mongodb://${ config.host }/${ config.database }`;

mongooseeder.seed({
  mongodbUrl: mongodbUrl,
  seeds: seeds,
  clean: true,
  models: models,
  mongoose: mongoose
});