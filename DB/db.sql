-- Password for AdminAcc and UserAcc is: 12345

CREATE DATABASE third_project;

USE third_project;

CREATE TABLE users (
userID int auto_increment,
firstName varchar(60),
lastName varchar(60),
userName varchar(60),
userPassword varchar(60),
userType bool NOT NULL default 0,
primary key (userID)
);

CREATE TABLE `vacations` (
  vacID int auto_increment,
  vacDest varchar(50) NOT NULL,
  vacDesc varchar(255) NOT NULL,
  startDate date NOT NULL,
  endDate date NOT NULL,
  vacPrice varchar(10) NOT NULL,
  vacImage varchar(255) NOT NULL,
  primary key (vacID)
);

CREATE TABLE followed (
id int auto_increment,
userID int NOT NULL,
vacID int NOT NULL,
primary key (id),
FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
FOREIGN KEY (vacID) REFERENCES vacations(vacID) ON DELETE CASCADE
);

INSERT INTO users (firstName, lastName, userName, userPassword, userType) VALUES
("Admin","Istrator","AdminAcc","$2b$10$ymxgUG0S7Are6alfENhILeZq9KZALrkM04Uw27tuKzWWO4XoqfiGa",1),
("Ohad","Mor Yosef","UserAcc","$2b$10$ymxgUG0S7Are6alfENhILeZq9KZALrkM04Uw27tuKzWWO4XoqfiGa",0);

INSERT INTO vacations (vacDest, vacDesc, startDate, endDate, vacPrice,vacImage) VALUES
("Tokyo, Japan", "Tokyo offers unlimited choice of shopping, entertainment, culture and dining to its visitors, aswell as excellent museums, historic temples and gardens.", "2021-10-20", "2021-11-10", "12000","http://localhost:1000/images/Tokyo.jpeg"),
("Paris, France", "In terms of tourism, Paris is the second most visited city in Europe which offers attractions like visiting the Eiffel Tower, the Arc de Triomphe and Notre-Dame Cathedral.", "2021-10-15", "2021-10-21", "3300","http://localhost:1000/images/Paris.jpg"),
("London, England", "England is full of pageantry and tradition, no matter the time of year, a London trip brings a taste of bustling city life.", "2021-10-22", "2021-11-05", "3600","http://localhost:1000/images/London.jpg"),
("New York, USA", "New York is a city that's always celebrating something, whatever it is you're into, you'll find there's more to do in New York than you'll have time.", "2021-12-23", "2021-12-28", "5600","http://localhost:1000/images/New%20York.jpg"),
("Barcelona, Spain", "With its cosmopolitan feel, relaxed pace of life, breathtaking architecture, fantastic gastronomy, and unbeatable climate, it really is the city that has everything.", "2021-11-12", "2021-11-20", "1300","http://localhost:1000/images/Barcelona.png"),
("Copenhagen, Denmark", "Copenhagen offers a charming historic atmosphere filled with well-known gourmet restaurants, abundant nightlife, fascinating architecture, world-class museums.", "2021-10-23", "2021-10-31", "1750","http://localhost:1000/images/Copenhagen.jpg"),
("Moscow, Russia", "Moscow's most popular tourist attraction is floodlit at night and takes on a fairy-tale quality, especially when the cobblestones are dusted with snow and St Basil's Cathedral is at its best.", "2022-01-13", "2022-01-22", "1200","http://localhost:1000/images/Moscow.jpg"),
("Vienna, Austria", "There are plenty of reasons to fall in love with Vienna, the majestic architecture, the imperial presence in the streets of the Innere Stadt, the music, literature, and art." , "2021-11-21", "2021-11-26", "750","http://localhost:1000/images/Vienna.jpg"),
("Stockholm, Sweden", "The city has modern art, cutting-edge design, and noteworthy architecture, all set among the cobblestoned streets of the Old Town, where many buildings date back to the 1700s.", "2021-11-14", "2021-11-21", "3200","http://localhost:1000/images/Stockholm.jpg"),
("Berlin, Germany", "When you visit Berlin, reminders of the city’s history like the Berlin Wall and Palace will surround you. Combined with today’s nightclubs, have made Berlin one of Europe’s most exciting destinations.", "2021-12-01", "2021-12-11", "3600","http://localhost:1000/images/Berlin.jpg");

