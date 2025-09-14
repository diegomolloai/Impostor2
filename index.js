

import React, { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Data for footballers, now categorized
const footballerData = {
  principiante: [
    { id: 1, name: "Lionel Messi", club: "Inter Miami", nationality: "Argentina" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", nationality: "Portugal" },
    { id: 3, name: "Neymar Jr.", club: "Al Hilal", nationality: "Brazil" },
    { id: 4, name: "Kylian Mbappé", club: "Real Madrid", nationality: "France" },
    { id: 7, name: "Mohamed Salah", club: "Liverpool", nationality: "Egypt" },
    { id: 10, name: "Robert Lewandowski", club: "Barcelona", nationality: "Poland" },
    { id: 6, name: "Kevin De Bruyne", club: "Manchester City", nationality: "Belgium" },
    { id: 9, name: "Luka Modrić", club: "Real Madrid", nationality: "Croatia" },
    { id: 14, name: "Karim Benzema", club: "Al-Ittihad", nationality: "France" },
    { id: 5, name: "Erling Haaland", club: "Manchester City", nationality: "Norway" },
    { id: 15, name: "Sadio Mané", club: "Al Nassr", nationality: "Senegal" },
    { id: 8, name: "Virgil van Dijk", club: "Liverpool", nationality: "Netherlands" },
    { id: 22, name: "Manuel Neuer", club: "Bayern Munich", nationality: "Germany" },
    { id: 20, name: "Sergio Ramos", club: "Sevilla", nationality: "Spain" },
    { id: 21, name: "Toni Kroos", club: "Real Madrid", nationality: "Germany" },
    { id: 13, name: "Harry Kane", club: "Bayern Munich", nationality: "England" },
    { id: 37, name: "Joshua Kimmich", club: "Bayern Munich", nationality: "Germany" },
    { id: 11, name: "Vinícius Júnior", club: "Real Madrid", nationality: "Brazil" },
    { id: 43, name: "Casemiro", club: "Manchester United", nationality: "Brazil" },
    { id: 26, name: "Bernardo Silva", club: "Manchester City", nationality: "Portugal" },
    { id: 23, name: "Thibaut Courtois", club: "Real Madrid", nationality: "Belgium" },
    { id: 12, name: "Jude Bellingham", club: "Real Madrid", nationality: "England" },
    { id: 17, name: "Antoine Griezmann", club: "Atlético Madrid", nationality: "France" },
    { id: 46, name: "Frenkie de Jong", club: "Barcelona", nationality: "Netherlands" },
    { id: 24, name: "Alisson Becker", club: "Liverpool", nationality: "Brazil" },
    { id: 33, name: "Phil Foden", club: "Manchester City", nationality: "England" },
    { id: 18, name: "Luis Suárez", club: "Inter Miami", nationality: "Uruguay" },
    { id: 19, name: "Zlatan Ibrahimović", club: "AC Milan (Leyenda)", nationality: "Sweden" },
    { id: 77, name: "Sergio Busquets", club: "Inter Miami", nationality: "Spain" },
    { id: 126, name: "Andrés Iniesta", club: "Barcelona", nationality: "Spain" },
    { id: 81, name: "Ousmane Dembélé", club: "PSG", nationality: "France" },
    { id: 40, name: "Lautaro Martínez", club: "Inter Milan", nationality: "Argentina" },
    { id: 82, name: "Sergio Agüero", club: "Man City (Leyenda)", nationality: "Argentina" },
    { id: 31, name: "Eden Hazard", club: "Real Madrid (Leyenda)", nationality: "Belgium" },
    { id: 83, name: "Lamine Yamal", club: "Barcelona", nationality: "Spain" },
    { id: 28, name: "Paul Pogba", club: "Juventus", nationality: "France" },
    { id: 50, name: "Julián Álvarez", club: "Manchester City", nationality: "Argentina" },
    { id: 84, name: "Rodrygo", club: "Real Madrid", nationality: "Brazil" }
  ],
  facil: [
    { id: 1, name: "Lionel Messi", club: "Inter Miami", nationality: "Argentina" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", nationality: "Portugal" },
    { id: 3, name: "Neymar Jr.", club: "Al Hilal", nationality: "Brazil" },
    { id: 4, name: "Kylian Mbappé", club: "Real Madrid", nationality: "France" },
    { id: 5, name: "Erling Haaland", club: "Manchester City", nationality: "Norway" },
    { id: 6, name: "Kevin De Bruyne", club: "Manchester City", nationality: "Belgium" },
    { id: 7, name: "Mohamed Salah", club: "Liverpool", nationality: "Egypt" },
    { id: 8, name: "Virgil van Dijk", club: "Liverpool", nationality: "Netherlands" },
    { id: 9, name: "Luka Modrić", club: "Real Madrid", nationality: "Croatia" },
    { id: 10, name: "Robert Lewandowski", club: "Barcelona", nationality: "Poland" },
    { id: 11, name: "Vinícius Júnior", club: "Real Madrid", nationality: "Brazil" },
    { id: 12, name: "Jude Bellingham", club: "Real Madrid", nationality: "England" },
    { id: 13, name: "Harry Kane", club: "Bayern Munich", nationality: "England" },
    { id: 14, name: "Karim Benzema", club: "Al-Ittihad", nationality: "France" },
    { id: 15, name: "Sadio Mané", club: "Al Nassr", nationality: "Senegal" },
    { id: 16, name: "N'Golo Kanté", club: "Al-Ittihad", nationality: "France" },
    { id: 17, name: "Antoine Griezmann", club: "Atlético Madrid", nationality: "France" },
    { id: 18, name: "Luis Suárez", club: "Inter Miami", nationality: "Uruguay" },
    { id: 19, name: "Zlatan Ibrahimović", club: "AC Milan (Leyenda)", nationality: "Sweden" },
    { id: 20, name: "Sergio Ramos", club: "Sevilla", nationality: "Spain" },
    { id: 21, name: "Toni Kroos", club: "Real Madrid", nationality: "Germany" },
    { id: 22, name: "Manuel Neuer", club: "Bayern Munich", nationality: "Germany" },
    { id: 23, name: "Thibaut Courtois", club: "Real Madrid", nationality: "Belgium" },
    { id: 24, name: "Alisson Becker", club: "Liverpool", nationality: "Brazil" },
    { id: 25, name: "Son Heung-min", club: "Tottenham Hotspur", nationality: "South Korea" },
    { id: 26, name: "Bernardo Silva", club: "Manchester City", nationality: "Portugal" },
    { id: 27, name: "Bruno Fernandes", club: "Manchester United", nationality: "Portugal" },
    { id: 28, name: "Paul Pogba", club: "Juventus", nationality: "France" },
    { id: 29, name: "Ángel Di María", club: "Benfica", nationality: "Argentina" },
    { id: 30, name: "Gareth Bale", club: "LAFC (Leyenda)", nationality: "Wales" },
    { id: 31, name: "Eden Hazard", club: "Real Madrid (Leyenda)", nationality: "Belgium" },
    { id: 32, name: "Bukayo Saka", club: "Arsenal", nationality: "England" },
    { id: 33, name: "Phil Foden", club: "Manchester City", nationality: "England" },
    { id: 34, name: "Pedri", club: "Barcelona", nationality: "Spain" },
    { id: 35, name: "Gavi", club: "Barcelona", nationality: "Spain" },
    { id: 36, name: "Jamal Musiala", club: "Bayern Munich", nationality: "Germany" },
    { id: 37, name: "Joshua Kimmich", club: "Bayern Munich", nationality: "Germany" },
    { id: 38, name: "Thomas Müller", club: "Bayern Munich", nationality: "Germany" },
    { id: 39, name: "Fede Valverde", club: "Real Madrid", nationality: "Uruguay" },
    { id: 40, name: "Lautaro Martínez", club: "Inter Milan", nationality: "Argentina" },
    { id: 41, name: "Marquinhos", club: "PSG", nationality: "Brazil" },
    { id: 42, name: "Rúben Dias", club: "Manchester City", nationality: "Portugal" },
    { id: 43, name: "Casemiro", club: "Manchester United", nationality: "Brazil" },
    { id: 44, name: "Declan Rice", club: "Arsenal", nationality: "England" },
    { id: 45, name: "Rodri", club: "Manchester City", nationality: "Spain" },
    { id: 46, name: "Frenkie de Jong", club: "Barcelona", nationality: "Netherlands" },
    { id: 47, name: "Marcelo", club: "Fluminense", nationality: "Brazil" },
    { id: 48, name: "Gerard Piqué", club: "Barcelona (Leyenda)", nationality: "Spain" },
    { id: 49, name: "Dani Alves", club: "UNAM (Leyenda)", nationality: "Brazil" },
    { id: 50, name: "Julián Álvarez", club: "Manchester City", nationality: "Argentina" },
    { id: 77, name: "Sergio Busquets", club: "Inter Miami", nationality: "Spain" },
    { id: 81, name: "Ousmane Dembélé", club: "PSG", nationality: "France" },
    { id: 82, name: "Sergio Agüero", club: "Man City (Leyenda)", nationality: "Argentina" },
    { id: 83, name: "Lamine Yamal", club: "Barcelona", nationality: "Spain" },
    { id: 84, name: "Rodrygo", club: "Real Madrid", nationality: "Brazil" },
    { id: 126, name: "Andrés Iniesta", club: "Barcelona", nationality: "Spain" },
  ],
  normal: [
    // Includes all from 'facil' plus more
    { id: 1, name: "Lionel Messi", club: "Inter Miami", nationality: "Argentina" },
    { id: 2, name: "Cristiano Ronaldo", club: "Al Nassr", nationality: "Portugal" },
    { id: 3, name: "Neymar Jr.", club: "Al Hilal", nationality: "Brazil" },
    { id: 4, name: "Kylian Mbappé", club: "Real Madrid", nationality: "France" },
    { id: 5, name: "Erling Haaland", club: "Manchester City", nationality: "Norway" },
    { id: 6, name: "Kevin De Bruyne", club: "Manchester City", nationality: "Belgium" },
    { id: 7, name: "Mohamed Salah", club: "Liverpool", nationality: "Egypt" },
    { id: 8, name: "Virgil van Dijk", club: "Liverpool", nationality: "Netherlands" },
    { id: 9, name: "Luka Modrić", club: "Real Madrid", nationality: "Croatia" },
    { id: 10, name: "Robert Lewandowski", club: "Barcelona", nationality: "Poland" },
    { id: 11, name: "Vinícius Júnior", club: "Real Madrid", nationality: "Brazil" },
    { id: 12, name: "Jude Bellingham", club: "Real Madrid", nationality: "England" },
    { id: 13, name: "Harry Kane", club: "Bayern Munich", nationality: "England" },
    { id: 14, name: "Karim Benzema", club: "Al-Ittihad", nationality: "France" },
    { id: 15, name: "Sadio Mané", club: "Al Nassr", nationality: "Senegal" },
    { id: 16, name: "N'Golo Kanté", club: "Al-Ittihad", nationality: "France" },
    { id: 17, name: "Antoine Griezmann", club: "Atlético Madrid", nationality: "France" },
    { id: 18, name: "Luis Suárez", club: "Inter Miami", nationality: "Uruguay" },
    { id: 19, name: "Zlatan Ibrahimović", club: "AC Milan (Leyenda)", nationality: "Sweden" },
    { id: 20, name: "Sergio Ramos", club: "Sevilla", nationality: "Spain" },
    { id: 21, name: "Toni Kroos", club: "Real Madrid", nationality: "Germany" },
    { id: 22, name: "Manuel Neuer", club: "Bayern Munich", nationality: "Germany" },
    { id: 23, name: "Thibaut Courtois", club: "Real Madrid", nationality: "Belgium" },
    { id: 24, name: "Alisson Becker", club: "Liverpool", nationality: "Brazil" },
    { id: 25, name: "Son Heung-min", club: "Tottenham Hotspur", nationality: "South Korea" },
    { id: 26, name: "Bernardo Silva", club: "Manchester City", nationality: "Portugal" },
    { id: 27, name: "Bruno Fernandes", club: "Manchester United", nationality: "Portugal" },
    { id: 28, name: "Paul Pogba", club: "Juventus", nationality: "France" },
    { id: 29, name: "Ángel Di María", club: "Benfica", nationality: "Argentina" },
    { id: 30, name: "Gareth Bale", club: "LAFC (Leyenda)", nationality: "Wales" },
    { id: 31, name: "Eden Hazard", club: "Real Madrid (Leyenda)", nationality: "Belgium" },
    { id: 32, name: "Bukayo Saka", club: "Arsenal", nationality: "England" },
    { id: 33, name: "Phil Foden", club: "Manchester City", nationality: "England" },
    { id: 34, name: "Pedri", club: "Barcelona", nationality: "Spain" },
    { id: 35, name: "Gavi", club: "Barcelona", nationality: "Spain" },
    { id: 36, name: "Jamal Musiala", club: "Bayern Munich", nationality: "Germany" },
    { id: 37, name: "Joshua Kimmich", club: "Bayern Munich", nationality: "Germany" },
    { id: 38, name: "Thomas Müller", club: "Bayern Munich", nationality: "Germany" },
    { id: 39, name: "Fede Valverde", club: "Real Madrid", nationality: "Uruguay" },
    { id: 40, name: "Lautaro Martínez", club: "Inter Milan", nationality: "Argentina" },
    { id: 41, name: "Marquinhos", club: "PSG", nationality: "Brazil" },
    { id: 42, name: "Rúben Dias", club: "Manchester City", nationality: "Portugal" },
    { id: 43, name: "Casemiro", club: "Manchester United", nationality: "Brazil" },
    { id: 44, name: "Declan Rice", club: "Arsenal", nationality: "England" },
    { id: 45, name: "Rodri", club: "Manchester City", nationality: "Spain" },
    { id: 46, name: "Frenkie de Jong", club: "Barcelona", nationality: "Netherlands" },
    { id: 47, name: "Marcelo", club: "Fluminense", nationality: "Brazil" },
    { id: 48, name: "Gerard Piqué", club: "Barcelona (Leyenda)", nationality: "Spain" },
    { id: 49, name: "Dani Alves", club: "UNAM (Leyenda)", nationality: "Brazil" },
    { id: 50, name: "Julián Álvarez", club: "Manchester City", nationality: "Argentina" },
    { id: 51, name: "Marco Verratti", club: "Al-Arabi", nationality: "Italy" },
    { id: 52, name: "Ciro Immobile", club: "Lazio", nationality: "Italy" },
    { id: 53, name: "Wissam Ben Yedder", club: "Monaco", nationality: "France" },
    { id: 54, name: "Dries Mertens", club: "Galatasaray", nationality: "Belgium" },
    { id: 55, name: "İlkay Gündoğan", club: "Barcelona", nationality: "Germany" },
    { id: 56, name: "Riyad Mahrez", club: "Al-Ahli", nationality: "Algeria" },
    { id: 57, name: "Jack Grealish", club: "Manchester City", nationality: "England" },
    { id: 58, name: "Marcus Rashford", club: "Manchester United", nationality: "England" },
    { id: 59, name: "Raphaël Varane", club: "Manchester United", nationality: "France" },
    { id: 60, name: "Jorginho", club: "Arsenal", nationality: "Italy" },
    { id: 61, name: "Thiago Silva", club: "Chelsea", nationality: "Brazil" },
    { id: 62, name: "Ederson", club: "Manchester City", nationality: "Brazil" },
    { id: 63, name: "Marc-André ter Stegen", club: "Barcelona", nationality: "Germany" },
    { id: 64, name: "Keylor Navas", club: "PSG", nationality: "Costa Rica" },
    { id: 65, name: "Wojciech Szczęsny", club: "Juventus", nationality: "Poland" },
    { id: 66, name: "Kyle Walker", club: "Manchester City", nationality: "England" },
    { id: 67, name: "John Stones", club: "Manchester City", nationality: "England" },
    { id: 68, name: "David Alaba", club: "Real Madrid", nationality: "Austria" },
    { id: 69, name: "Antonio Rüdiger", club: "Real Madrid", nationality: "Germany" },
    { id: 70, name: "Trent Alexander-Arnold", club: "Liverpool", nationality: "England" },
    { id: 71, name: "Andrew Robertson", club: "Liverpool", nationality: "Scotland" },
    { id: 72, name: "Alphonso Davies", club: "Bayern Munich", nationality: "Canada" },
    { id: 73, name: "Achraf Hakimi", club: "PSG", nationality: "Morocco" },
    { id: 74, name: "João Cancelo", club: "Barcelona", nationality: "Portugal" },
    { id: 75, name: "Marcos Llorente", club: "Atlético Madrid", nationality: "Spain" },
    { id: 76, name: "Koke", club: "Atlético Madrid", nationality: "Spain" },
    { id: 77, name: "Sergio Busquets", club: "Inter Miami", nationality: "Spain" },
    { id: 78, name: "Jordi Alba", club: "Inter Miami", nationality: "Spain" },
    { id: 79, name: "Ivan Rakitić", club: "Al-Shabab", nationality: "Croatia" },
    { id: 80, name: "Paulo Dybala", club: "Roma", nationality: "Argentina" },
    { id: 81, name: "Ousmane Dembélé", club: "PSG", nationality: "France" },
    { id: 82, name: "Sergio Agüero", club: "Man City (Leyenda)", nationality: "Argentina" },
    { id: 83, name: "Lamine Yamal", club: "Barcelona", nationality: "Spain" },
    { id: 84, name: "Rodrygo", club: "Real Madrid", nationality: "Brazil" },
    { id: 126, name: "Andrés Iniesta", club: "Barcelona", nationality: "Spain" },
  ],
  leyendas: [
    { id: 101, name: "Pelé", club: "Santos", nationality: "Brazil" },
    { id: 102, name: "Diego Maradona", club: "Napoli", nationality: "Argentina" },
    { id: 103, name: "Johan Cruyff", club: "Ajax", nationality: "Netherlands" },
    { id: 104, name: "Zinedine Zidane", club: "Real Madrid", nationality: "France" },
    { id: 105, name: "Ronaldo Nazario", club: "Real Madrid", nationality: "Brazil" },
    { id: 106, name: "Ronaldinho", club: "Barcelona", nationality: "Brazil" },
    { id: 107, name: "Franz Beckenbauer", club: "Bayern Munich", nationality: "Germany" },
    { id: 108, name: "Michel Platini", club: "Juventus", nationality: "France" },
    { id: 109, name: "Alfredo Di Stéfano", club: "Real Madrid", nationality: "Argentina/Spain" },
    { id: 110, name: "Ferenc Puskás", club: "Real Madrid", nationality: "Hungary" },
    { id: 111, name: "Gerd Müller", club: "Bayern Munich", nationality: "Germany" },
    { id: 112, name: "Lev Yashin", club: "Dynamo Moscow", nationality: "Soviet Union" },
    { id: 113, name: "Paolo Maldini", club: "AC Milan", nationality: "Italy" },
    { id: 114, name: "Franco Baresi", club: "AC Milan", nationality: "Italy" },
    { id: 115, name: "Marco van Basten", club: "AC Milan", nationality: "Netherlands" },
    { id: 116, name: "Ruud Gullit", club: "AC Milan", nationality: "Netherlands" },
    { id: 117, name: "Lothar Matthäus", club: "Inter Milan", nationality: "Germany" },
    { id: 118, name: "Eusébio", club: "Benfica", nationality: "Portugal" },
    { id: 119, name: "George Best", club: "Manchester United", nationality: "Northern Ireland" },
    { id: 120, name: "Bobby Charlton", club: "Manchester United", nationality: "England" },
    { id: 121, name: "Garrincha", club: "Botafogo", nationality: "Brazil" },
    { id: 122, name: "Sócrates", club: "Corinthians", nationality: "Brazil" },
    { id: 123, name: "Zico", club: "Flamengo", nationality: "Brazil" },
    { id: 124, name: "Roberto Baggio", club: "Juventus", nationality: "Italy" },
    { id: 125, name: "Thierry Henry", club: "Arsenal", nationality: "France" },
    { id: 126, name: "Andrés Iniesta", club: "Barcelona", nationality: "Spain" },
    { id: 127, name: "Xavi Hernández", club: "Barcelona", nationality: "Spain" },
    { id: 128, name: "Carles Puyol", club: "Barcelona", nationality: "Spain" },
    { id: 129, name: "Kaká", club: "AC Milan", nationality: "Brazil" },
    { id: 130, name: "Andriy Shevchenko", club: "AC Milan", nationality: "Ukraine" },
    { id: 131, name: "Pavel Nedvěd", club: "Juventus", nationality: "Czech Republic" },
    { id: 132, name: "Fabio Cannavaro", club: "Real Madrid", nationality: "Italy" },
    { id: 133, name: "Alessandro Del Piero", club: "Juventus", nationality: "Italy" },
    { id: 134, name: "Francesco Totti", club: "Roma", nationality: "Italy" },
    { id: 135, name: "Andrea Pirlo", club: "Juventus", nationality: "Italy" },
    { id: 136, name: "Gigi Buffon", club: "Juventus", nationality: "Italy" },
    { id: 137, name: "Iker Casillas", club: "Real Madrid", nationality: "Spain" },
    { id: 138, name: "Raúl González", club: "Real Madrid", nationality: "Spain" },
    { id: 139, name: "David Beckham", club: "Manchester United", nationality: "England" },
    { id: 140, name: "Steven Gerrard", club: "Liverpool", nationality: "England" },
    { id: 141, name: "Frank Lampard", club: "Chelsea", nationality: "England" },
    { id: 142, name: "Didier Drogba", club: "Chelsea", nationality: "Ivory Coast" },
    { id: 143, name: "Samuel Eto'o", club: "Barcelona", nationality: "Cameroon" },
    { id: 144, name: "Dennis Bergkamp", club: "Arsenal", nationality: "Netherlands" },
    { id: 145, name: "Patrick Vieira", club: "Arsenal", nationality: "France" },
    { id: 146, "name": "Roy Keane", "club": "Manchester United", "nationality": "Ireland" },
    { id: 147, "name": "Paul Scholes", "club": "Manchester United", "nationality": "England" },
    { id: 148, "name": "Ryan Giggs", "club": "Manchester United", "nationality": "Wales" },
    { id: 149, "name": "Éric Cantona", "club": "Manchester United", "nationality": "France" },
    { id: 150, "name": "Peter Schmeichel", "club": "Manchester United", "nationality": "Denmark" },
    { id: 151, "name": "Oliver Kahn", "club": "Bayern Munich", "nationality": "Germany" },
    { id: 152, "name": "Cafu", "club": "AC Milan", "nationality": "Brazil" },
    { id: 153, "name": "Roberto Carlos", "club": "Real Madrid", "nationality": "Brazil" },
    { id: 154, "name": "Javier Zanetti", "club": "Inter Milan", "nationality": "Argentina" },
    { id: 155, "name": "Gabriel Batistuta", "club": "Fiorentina", "nationality": "Argentina" },
    { id: 156, "name": "Hernán Crespo", "club": "Inter Milan", "nationality": "Argentina" },
    { id: 157, "name": "Juan Román Riquelme", "club": "Boca Juniors", "nationality": "Argentina" },
    { id: 158, "name": "Hristo Stoichkov", "club": "Barcelona", "nationality": "Bulgaria" },
    { id: 159, "name": "Gheorghe Hagi", "club": "Galatasaray", "nationality": "Romania" },
    { id: 160, "name": "Michael Laudrup", "club": "Barcelona", "nationality": "Denmark" },
    { id: 161, "name": "Romário", "club": "Barcelona", "nationality": "Brazil" },
    { id: 162, "name": "Rivaldo", "club": "Barcelona", "nationality": "Brazil" },
    { id: 163, "name": "Luís Figo", "club": "Real Madrid", "nationality": "Portugal" },
    { id: 164, "name": "Michael Ballack", "club": "Bayern Munich", "nationality": "Germany" },
    { id: 165, "name": "Miroslav Klose", "club": "Bayern Munich", "nationality": "Germany" },
    { id: 166, "name": "Philipp Lahm", "club": "Bayern Munich", "nationality": "Germany" },
    { id: 167, "name": "Bastian Schweinsteiger", "club": "Bayern Munich", "nationality": "Germany" },
    { id: 168, "name": "Arjen Robben", "club": "Bayern Munich", "nationality": "Netherlands" },
    { id: 169, "name": "Franck Ribéry", "club": "Bayern Munich", "nationality": "France" },
    { id: 170, "name": "Wesley Sneijder", "club": "Inter Milan", "nationality": "Netherlands" },
    { id: 171, "name": "Clarence Seedorf", "club": "AC Milan", "nationality": "Netherlands" },
    { id: 172, "name": "Edgar Davids", "club": "Juventus", "nationality": "Netherlands" },
    { id: 173, "name": "Ruud van Nistelrooy", "club": "Manchester United", "nationality": "Netherlands" },
    { id: 174, "name": "Alan Shearer", "club": "Newcastle United", "nationality": "England" },
    { id: 175, "name": "Michael Owen", "club": "Liverpool", "nationality": "England" },
    { id: 176, "name": "Fernando Torres", "club": "Liverpool", "nationality": "Spain" },
    { id: 177, "name": "David Villa", "club": "Barcelona", "nationality": "Spain" },
    { id: 178, "name": "Petr Čech", "club": "Chelsea", "nationality": "Czech Republic" },
    { id: 179, "name": "Edwin van der Sar", "club": "Manchester United", "nationality": "Netherlands" },
    { id: 180, "name": "Deco", "club": "Barcelona", "nationality": "Portugal" },
  ]
};

// Enum from types.ts
const GamePhase = {
  HOME: 0,
  LOBBY: 1,
  ROLE_REVEAL: 2,
  CLUES: 3,
  DEBATE: 4,
  VOTING: 5,
  RESULT: 6,
  END_GAME: 7,
};

// --- LocalStorage Helper Functions ---
const LOCKED_FOOTBALLERS_KEY = 'lockedFootballers';
const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

const getLockedFootballerIds = () => {
    try {
        const storedData = localStorage.getItem(LOCKED_FOOTBALLERS_KEY);
        if (!storedData) return [];
        
        const lockedFootballers = JSON.parse(storedData);
        const now = Date.now();
        
        // Filter out expired locks
        const validLocks = Object.entries(lockedFootballers).filter(([id, timestamp]) => {
            return (now - timestamp) < TWENTY_FOUR_HOURS_IN_MS;
        });

        // Update localStorage with only the valid locks to keep it clean
        const updatedLockedFootballers = Object.fromEntries(validLocks);
        localStorage.setItem(LOCKED_FOOTBALLERS_KEY, JSON.stringify(updatedLockedFootballers));

        return validLocks.map(([id]) => parseInt(id, 10));
    } catch (error) {
        console.error("Failed to read locked footballers from localStorage:", error);
        return [];
    }
};

const lockFootballerId = (footballerId) => {
    try {
        const storedData = localStorage.getItem(LOCKED_FOOTBALLERS_KEY);
        const lockedFootballers = storedData ? JSON.parse(storedData) : {};
        
        lockedFootballers[footballerId] = Date.now();
        
        localStorage.setItem(LOCKED_FOOTBALLERS_KEY, JSON.stringify(lockedFootballers));
    } catch (error) {
        console.error("Failed to save locked footballer to localStorage:", error);
    }
};


// Icons from components/icons.tsx (converted to React.createElement)
const SoccerBallIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: `inline-block ${props?.className || ''}`, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 7.1L9.44 9.35 9.1 12.1h5.8l-.34-2.75L12 7.1zM9.1 12.1L6.34 14l2.2 2.2h.56zm5.8 0h.56l2.2-2.2-2.76-1.9zm-5.8 0h5.8l-2.9 4.2-2.9-4.2zM9.1 12.1h.34m5.46 0h-.34m-5.12 0l-.34 2.75L6.34 14l2.76 1.9zm5.46 0l2.76-1.9-2.76 1.9-2.2 2.2.34-2.75z"}));
const SpyIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || 'h-6 w-6', fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" }));
const ClipboardIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }));
const CheckIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }));
const UserIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-10 w-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" }));
const WhistleIcon = (props) => React.createElement("svg", { ...props, className: props?.className || "h-6 w-6", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React.createElement("path", { d: "M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), React.createElement("path", { d: "M10 7H14C15.1046 7 16 7.89543 16 9V13C16 14.1046 15.1046 15 14 15H8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), React.createElement("path", { d: "M16 11H20", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }), React.createElement("path", { d: "M8 15V19L10 17", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }));
const LogoutIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }));
const ChevronLeftIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 19l-7-7 7-7" }));
const UserGroupIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }));
const GlobeAltIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m0 18a9 9 0 00-9-9m9-9c-5.42 0-9 4.03-9 9s4.58 9 9 9z" }));
const FictionalTeamIcon = (props) => React.createElement("svg", { ...props, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    React.createElement("path", {
        d: "M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z",
        fill: "currentColor",
        className: "text-blue-800"
    }),
    React.createElement("path", {
        d: "M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "text-blue-300"
    }),
    React.createElement("path", {
        d: "M9.5 9H14.5M12 9V15M9.5 12H13.5",
        stroke: "white",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    })
);
const TrashIcon = (props) => React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", className: props?.className || "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }));


// Initial State and Reducer
const initialState = {
  phase: GamePhase.HOME,
  gameCode: null,
  players: [],
  secretFootballer: null,
  currentPlayerTurnIndex: 0,
  clues: [],
  votes: [],
  eliminatedPlayerId: null,
  tiedPlayerIds: null,
  winner: null,
  gameMode: null,
  numberOfImpostors: 1,
  footballerCategory: 'principiante',
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_GAME': {
      const { playerName, gameMode } = action.payload;
      const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const hostPlayer = { id: crypto.randomUUID(), name: playerName, isHost: true, role: null, isEliminated: false, score: 0 };
      return { ...initialState, phase: GamePhase.LOBBY, gameCode, players: [hostPlayer], gameMode };
    }
    case 'UPDATE_GAME_SETTINGS': {
        return { ...state, ...action.payload };
    }
    case 'JOIN_GAME': // This is a placeholder for multiplayer, for now we add players in lobby
    case 'ADD_PLAYER': {
      if (state.players.length >= 15) return state;
      const newPlayer = { id: crypto.randomUUID(), name: action.payload.playerName, isHost: false, role: null, isEliminated: false, score: 0 };
      return { ...state, players: [...state.players, newPlayer] };
    }
    case 'REMOVE_PLAYER': {
        return {
            ...state,
            players: state.players.filter(p => p.id !== action.payload.playerId)
        };
    }
    case 'START_GAME': {
      if (state.players.length < 3) return state;

      const impostorIndexes = new Set();
      while (impostorIndexes.size < state.numberOfImpostors) {
          impostorIndexes.add(Math.floor(Math.random() * state.players.length));
      }

      const playersWithRoles = state.players.map((player, index) => ({
        ...player,
        isEliminated: false,
        role: impostorIndexes.has(index) ? 'impostor' : 'squad',
      }));

      const shuffledPlayersWithRoles = [...playersWithRoles];
      for (let i = shuffledPlayersWithRoles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayersWithRoles[i], shuffledPlayersWithRoles[j]] = [shuffledPlayersWithRoles[j], shuffledPlayersWithRoles[i]];
      }

      const categoryFootballers = footballerData[state.footballerCategory];
      const lockedIds = getLockedFootballerIds();
      
      let availableFootballers = categoryFootballers.filter(f => !lockedIds.includes(f.id));
      
      if (availableFootballers.length === 0) {
          // Fallback: If all are locked, unlock them for this round.
          availableFootballers = categoryFootballers;
      }
      
      const secretFootballer = availableFootballers[Math.floor(Math.random() * availableFootballers.length)];
      lockFootballerId(secretFootballer.id); // Lock the chosen footballer for 24 hours
      
      return {
        ...state,
        phase: GamePhase.ROLE_REVEAL,
        players: shuffledPlayersWithRoles,
        secretFootballer,
        currentPlayerTurnIndex: 0,
        clues: [],
        votes: [],
        eliminatedPlayerId: null,
        tiedPlayerIds: null,
      };
    }
    case 'ADVANCE_ROLE_REVEAL':
        return {...state, currentPlayerTurnIndex: state.currentPlayerTurnIndex + 1};
    case 'FINISH_ROLE_REVEAL':
        return {
            ...state, 
            phase: state.gameMode === 'offline' ? GamePhase.VOTING : GamePhase.CLUES, 
            currentPlayerTurnIndex: 0
        };
    case 'SUBMIT_CLUE': {
      const currentPlayer = state.players.filter(p => !p.isEliminated)[state.currentPlayerTurnIndex];
      const newClue = { playerId: currentPlayer.id, clue: action.payload.clue };
      const nextIndex = state.currentPlayerTurnIndex + 1;
      const newClues = [...state.clues, newClue];
      
      if (nextIndex >= state.players.filter(p => !p.isEliminated).length) {
          return { ...state, clues: newClues, phase: GamePhase.DEBATE, currentPlayerTurnIndex: 0 };
      }
      return { ...state, clues: newClues, currentPlayerTurnIndex: nextIndex };
    }
    case 'START_DEBATE':
        return { ...state, phase: GamePhase.DEBATE };
    case 'START_VOTING': {
        return { ...state, phase: GamePhase.VOTING };
    }
    case 'SUBMIT_VOTE': {
      const votes = action.payload.votes;
      const voteCounts = votes.reduce((acc, vote) => {
        acc[vote.votedPlayerId] = (acc[vote.votedPlayerId] || 0) + 1;
        return acc;
      }, {});

      const maxVotes = Math.max(0, ...Object.values(voteCounts));
      
      if (maxVotes === 0) {
        return { ...state, votes, phase: GamePhase.RESULT, eliminatedPlayerId: null, tiedPlayerIds: [] };
      }

      const potentialEliminations = Object.keys(voteCounts).filter(
        id => voteCounts[id] === maxVotes
      );
      
      if (potentialEliminations.length !== 1) { 
        return { ...state, votes, phase: GamePhase.RESULT, eliminatedPlayerId: null, tiedPlayerIds: potentialEliminations };
      }
      
      const eliminatedPlayerId = potentialEliminations[0];
      const eliminatedPlayer = state.players.find(p => p.id === eliminatedPlayerId);

      if (!eliminatedPlayer) return { ...state, votes, phase: GamePhase.RESULT };

      const baseStateUpdate = { ...state, votes, tiedPlayerIds: null, eliminatedPlayerId };

      if (eliminatedPlayer.role === 'impostor') {
        const remainingImpostorsAfterElimination = state.players.filter(p => p.role === 'impostor' && p.id !== eliminatedPlayerId).length;

        if (remainingImpostorsAfterElimination === 0) { // Last impostor, squad wins
            const impostorVoters = votes
                .filter(v => v.votedPlayerId === eliminatedPlayerId)
                .map(v => v.voterId);

            const playersWithNewScores = state.players.map(p => {
                let scoreToAdd = 0;
                if (p.role === 'squad' && !p.isEliminated) {
                    scoreToAdd += 1; // Win point
                    if (impostorVoters.includes(p.id)) {
                        scoreToAdd += 1; // Bonus for correct vote
                    }
                }
                return { ...p, score: p.score + scoreToAdd };
            });
            return { ...baseStateUpdate, phase: GamePhase.END_GAME, winner: 'squad', players: playersWithNewScores };
        }
      }
      
      const updatedPlayers = state.players.map(p => p.id === eliminatedPlayerId ? { ...p, isEliminated: true } : p);
      const remainingPlayers = updatedPlayers.filter(p => !p.isEliminated);
      const remainingImpostorsCount = remainingPlayers.filter(p => p.role === 'impostor').length;
      const remainingSquadCount = remainingPlayers.length - remainingImpostorsCount;

      if (remainingSquadCount <= remainingImpostorsCount) {
        const playersWithNewScores = updatedPlayers.map(p => {
            if (p.role === 'impostor' && !p.isEliminated) { // Only award points to living impostors
                return { ...p, score: p.score + 3 };
            }
            return p;
        });
        return { ...baseStateUpdate, phase: GamePhase.END_GAME, winner: 'impostor', players: playersWithNewScores };
      }

      return { ...baseStateUpdate, players: updatedPlayers, phase: GamePhase.RESULT };
    }
    case 'NEXT_ROUND':
        return {
            ...state,
            phase: state.gameMode === 'offline' ? GamePhase.VOTING : GamePhase.CLUES,
            clues: [],
            votes: [],
            eliminatedPlayerId: null,
            tiedPlayerIds: null,
            currentPlayerTurnIndex: 0,
        };
    case 'PLAY_AGAIN':
        return {
            ...initialState,
            phase: GamePhase.LOBBY,
            gameCode: state.gameCode,
            gameMode: state.gameMode,
            players: state.players.map(p => ({...p, role: null, isEliminated: false, score: p.score})),
            numberOfImpostors: state.numberOfImpostors,
            footballerCategory: state.footballerCategory,
        };
    case 'RETURN_TO_LOBBY':
        return {
            ...state,
            phase: GamePhase.LOBBY,
            eliminatedPlayerId: null,
            tiedPlayerIds: null,
            winner: null,
            clues: [],
            votes: [],
            players: state.players.map(p => ({...p, isEliminated: false, role: null}))
        };
    case 'GO_HOME':
        return {...initialState, phase: GamePhase.HOME, players: state.players.map(p => ({...p, score: p.score}))};
    default:
      return state;
  }
};

// UI Components
const Page = ({ children }) => React.createElement("div", { className: "min-h-screen text-white flex flex-col items-center justify-center p-4 text-center relative overflow-hidden" }, React.createElement("div", { className: "w-full max-w-md mx-auto z-10 fade-in" }, children));
const Button = (props) => React.createElement("button", { ...props, className: `w-full px-4 py-3 font-bold text-lg rounded-lg transition-transform transform duration-200 uppercase tracking-wider button-3d ${props.disabled ? 'bg-gray-500 text-gray-300 cursor-not-allowed shadow-none' : 'bg-gradient-to-b from-[--gold-light] to-[--gold-primary] hover:from-yellow-300 hover:to-yellow-400 text-green-900 shadow-[0_4px_0_0_var(--gold-dark)] hover:shadow-[0_2px_0_0_var(--gold-dark)] active:translate-y-1 active:shadow-none'} ${props.className || ''}` });
const SecondaryButton = (props) => React.createElement("button", { ...props, className: `w-full px-4 py-3 font-bold text-lg rounded-lg transition-transform transform duration-200 uppercase tracking-wider button-3d bg-gradient-to-b from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 border-2 border-green-400 hover:border-green-300 text-white shadow-[0_4px_0_0_#065f46] hover:shadow-[0_2px_0_0_#065f46] active:translate-y-1 active:shadow-none ${props.className || ''}` });
const Input = (props) => React.createElement("input", { ...props, className: `w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border-2 border-[rgba(255,255,255,0.2)] rounded-lg focus:outline-none focus:border-[--gold-primary] text-white text-lg placeholder:text-gray-400 ${props.className || ''}` });
const Select = (props) => React.createElement("select", { ...props, className: `w-full px-4 py-3 bg-[rgba(0,0,0,0.3)] border-2 border-[rgba(255,255,255,0.2)] rounded-lg focus:outline-none focus:border-[--gold-primary] text-white text-lg appearance-none bg-no-repeat bg-right bg-[url('data:image/svg+xml;utf8,<svg_xmlns="http://www.w3.org/2000/svg"_viewBox="0_0_20_20"_fill="%23facc15"><path_fill-rule="evenodd"_d="M10_12a1_1_0_01-.7-.29l-4-4a1_1_0_111.4-1.42L10_9.58l3.3-3.3a1_1_0_111.4_1.42l-4_4a1_1_0_01-.7.29z"_clip-rule="evenodd"/></svg>')] [background-position-x:95%] pr-8 ${props.className || ''}` });
const Card = ({ children, className }) => React.createElement("div", { className: `bg-[--card-bg] backdrop-blur-md rounded-xl p-6 shadow-2xl border-2 border-[--card-border] ${className || ''}` }, children);

const ScreenHeader = ({ onBack, title }) => React.createElement("div", { className: "absolute top-0 left-0 right-0 p-4 flex items-center h-20 z-20 bg-gradient-to-b from-[--green-dark] to-transparent" },
    onBack && React.createElement("button", { onClick: onBack, className: "absolute left-4 p-2 rounded-full hover:bg-white/10 transition-colors", "aria-label": "Go back" },
        React.createElement(ChevronLeftIcon, { className: "w-8 h-8" })
    ),
    React.createElement("h2", { className: "text-2xl font-bold uppercase tracking-wider text-center w-full text-shadow text-gold-gradient" }, title)
);

const QuitButton = ({ onQuit }) => {
    const handleQuit = () => {
        if (window.confirm("¿Seguro que quieres abandonar la partida? Perderás todo el progreso.")) {
            onQuit();
        }
    };
    return React.createElement("button", { onClick: handleQuit, className: "absolute top-6 right-4 flex items-center gap-2 text-sm text-yellow-300 hover:text-white transition-colors z-20", "aria-label": "Quit game" },
        React.createElement(LogoutIcon, { className: "w-5 h-5" }),
        " Salir"
    );
};

const HelpModal = ({ onClose }) => React.createElement("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in", onClick: onClose },
    React.createElement("div", { className: "bg-green-900/80 rounded-xl p-6 shadow-2xl border-2 border-yellow-400/50 max-w-lg w-full text-left", onClick: e => e.stopPropagation() },
        React.createElement("h2", { className: "text-3xl font-bold mb-4 text-gold-gradient text-shadow" }, "¿Cómo Jugar?"),
        React.createElement("div", { className: "space-y-4 text-gray-200" },
            React.createElement("p", null, React.createElement("strong", null, "Objetivo:"), " ¡Encontrar al impostor que no sabe quién es el futbolista secreto!"),
            React.createElement("p", null, React.createElement("strong", null, "Roles:")),
            React.createElement("ul", { className: "list-disc list-inside ml-4 space-y-2" },
                React.createElement("li", null, React.createElement("strong", { className: "text-blue-400" }, "Miembro del Equipo:"), " Sabes quién es el futbolista. Tu objetivo es dar pistas para que los demás te crean y votar para eliminar al impostor."),
                React.createElement("li", null, React.createElement("strong", { className: "text-red-500" }, "Impostor:"), " No sabes quién es el futbolista. Tu objetivo es engañar a todos, hacerles creer que eres del equipo y sobrevivir a las votaciones.")
            ),
            React.createElement("p", null, React.createElement("strong", null, "Flujo del Juego (Online):")),
            React.createElement("ol", { className: "list-decimal list-inside ml-4" },
                React.createElement("li", null, React.createElement("strong", null, "Pistas:"), " Cada jugador da una pista sobre el futbolista. ¡El impostor debe improvisar!"),
                React.createElement("li", null, React.createElement("strong", null, "Debate:"), " Discutid las pistas para encontrar contradicciones."),
                React.createElement("li", null, React.createElement("strong", null, "Votación:"), " Todos votan para eliminar al jugador que creen que es el impostor.")
            ),
            React.createElement("p", null, React.createElement("strong", null, "Flujo del Juego (Offline):"), " Es más simple. No hay pistas, solo debate y votación directa."),
            React.createElement("p", {className: "pt-2 font-bold"}, "¡El equipo gana si elimina a todos los impostores! ¡Los impostores ganan si su número iguala o supera al de los miembros del equipo!")
        ),
        React.createElement(Button, { onClick: onClose, className: "mt-6" }, "Entendido")
    )
);

const LoginScreen = ({ onLogin }) => {
    const [playerName, setPlayerName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            onLogin(playerName.trim());
        }
    };
    return React.createElement(Page, null,
        React.createElement("div", { className: "relative w-full flex flex-col items-center" },
            React.createElement("img", {
                src: "public/assets/image/Impostor_Futbolero_Logo_SF.png",
                alt: "El Impostor Futbolero Logo",
                className: "absolute inset-0 w-[48rem] h-[48rem] m-auto opacity-50 -z-10"
            }),
            React.createElement("h1", { className: "text-6xl md:text-7xl font-bold my-2 uppercase tracking-wider text-shadow text-gold-gradient" }, "El Impostor"),
            React.createElement("h2", { className: "text-5xl md:text-6xl font-bold mb-4 uppercase tracking-wider text-shadow text-white" }, "Futbolero"),
            React.createElement("p", { className: "text-xl text-gray-300 mb-8" }, "El juego de los cracks."),
            React.createElement(Card, { className: "w-full" },
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(Input, { placeholder: "Introduce tu nombre", value: playerName, onChange: (e) => setPlayerName(e.target.value), className: "mb-4 text-center", "aria-label": "Player Name" }),
                    React.createElement(Button, { type: "submit", disabled: !playerName.trim() }, "Entrar")
                )
            )
        )
    );
};

const ModeSelectionScreen = ({ loggedInUser, dispatch, onLogout }) => {
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    return React.createElement(Page, null,
        isHelpVisible && React.createElement(HelpModal, { onClose: () => setIsHelpVisible(false) }),
        React.createElement("div", { className: "absolute top-4 right-4" },
            React.createElement("button", { onClick: onLogout, className: "flex items-center gap-2 text-sm text-yellow-300 hover:text-white transition-colors" },
                React.createElement(LogoutIcon, { className: "w-5 h-5" }), " Salir"
            )
        ),
        React.createElement("div", { className: "flex flex-col items-center" },
            React.createElement(WhistleIcon, { className: "w-20 h-20 text-yellow-400 mb-4" }),
            React.createElement("h1", { className: "text-4xl font-bold mb-2 text-shadow" }, "¡Hola, ", loggedInUser, "!"),
            React.createElement("p", { className: "text-xl text-gray-300 mb-8" }, "Elige un modo de juego"),
            React.createElement(Card, { className: "w-full space-y-4" },
                React.createElement(Button, { onClick: () => dispatch({ type: 'CREATE_GAME', payload: { playerName: loggedInUser, gameMode: 'offline' } }), className: "flex items-center justify-center gap-3" }, React.createElement(UserGroupIcon, {className: "w-6 h-6"}), "Jugar Offline (Pass & Play)"),
                React.createElement(Button, { disabled: true, className: "flex items-center justify-center gap-3" }, React.createElement(GlobeAltIcon, {className: "w-6 h-6"}), "Partida Online (próximamente)"),
                React.createElement(SecondaryButton, { onClick: () => setIsHelpVisible(true), className: "!bg-transparent border-2 border-yellow-400 text-yellow-400 hover:!bg-yellow-400/20 !shadow-none active:!translate-y-0" }, "Cómo Jugar")
            )
        )
    );
};

const PlayerCard = ({ name, isHost, onRemove }) => React.createElement("div", { className: "flex items-center bg-black/30 p-3 rounded-lg border-l-4 border-[--gold-primary]" },
    React.createElement(UserIcon, { className: "w-8 h-8 text-gray-300 mr-4" }),
    React.createElement("span", { className: "text-lg font-medium" }, name),
    isHost && React.createElement("span", { className: "ml-auto text-xs font-bold text-green-900 bg-gradient-to-r from-[--gold-light] to-[--gold-primary] px-3 py-1 rounded-full uppercase tracking-wider" }, "Capitán"),
    onRemove && React.createElement("button", { onClick: onRemove, className: "ml-auto p-1 text-red-400 hover:text-red-200" }, React.createElement(TrashIcon, { className: "w-6 h-6" }))
);

const LobbyScreen = ({ state, dispatch }) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const [copied, setCopied] = useState(false);
    const { players, gameCode, gameMode, numberOfImpostors, footballerCategory } = state;

    const handleAddPlayer = (e) => {
        e.preventDefault();
        if (newPlayerName.trim() && players.length < 15) {
            dispatch({ type: 'ADD_PLAYER', payload: { playerName: newPlayerName.trim() } });
            setNewPlayerName('');
        }
    };
    
    const handleCopyCode = () => {
        if (gameCode) {
            navigator.clipboard.writeText(gameCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const impostorOptions = [
        { value: 1, label: '1 Impostor', minPlayers: 3 },
        { value: 2, label: '2 Impostores', minPlayers: 7 },
        { value: 3, label: '3 Impostores', minPlayers: 11 },
    ];

    const canStart = players.length >= 3;

    return React.createElement(Page, null,
        React.createElement(ScreenHeader, { title: "Sala", onBack: () => dispatch({ type: 'GO_HOME' }) }),
        React.createElement(Card, { className: "mt-20" },
            gameMode === 'online' && React.createElement("div", { className: "flex justify-between items-center bg-black/40 p-4 rounded-lg mb-6 border border-white/10" },
                React.createElement("div", { className: "text-left" },
                    React.createElement("span", { className: "text-gray-300 text-sm" }, "CÓDIGO DE PARTIDA"),
                    React.createElement("p", { className: "text-4xl font-bold tracking-widest text-gold-gradient" }, gameCode)
                ),
                React.createElement("button", { onClick: handleCopyCode, className: "p-2 rounded-lg hover:bg-white/10 transition-colors", title: "Copiar código" },
                    copied ? React.createElement(CheckIcon, { className: "w-8 h-8 text-yellow-400" }) : React.createElement(ClipboardIcon, { className: "w-8 h-8" })
                )
            ),
             React.createElement("div", { className: "bg-black/30 p-4 rounded-lg mb-4 space-y-4 border border-[--card-border]" },
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-medium text-gray-300 mb-1" }, "Número de Impostores"),
                    React.createElement(Select, { value: numberOfImpostors, onChange: e => dispatch({ type: 'UPDATE_GAME_SETTINGS', payload: { numberOfImpostors: parseInt(e.target.value) } }) },
                        impostorOptions.map(opt => React.createElement("option", { key: opt.value, value: opt.value, disabled: players.length < opt.minPlayers }, `${opt.label} (min. ${opt.minPlayers} jug.)`))
                    )
                ),
                React.createElement("div", null,
                    React.createElement("label", { className: "block text-sm font-medium text-gray-300 mb-1" }, "Categoría de Futbolistas"),
                    React.createElement(Select, { value: footballerCategory, onChange: e => dispatch({ type: 'UPDATE_GAME_SETTINGS', payload: { footballerCategory: e.target.value } }) },
                        React.createElement("option", { value: "principiante" }, "Principiante"),
                        React.createElement("option", { value: "facil" }, "Fácil"),
                        React.createElement("option", { value: "normal" }, "Normal"),
                        React.createElement("option", { value: "leyendas" }, "Leyendas")
                    )
                )
            ),
            React.createElement("h2", { className: "text-2xl font-semibold mb-4 text-shadow" }, "Jugadores (", players.length, "/15)"),
            React.createElement("div", { className: "space-y-3 mb-6 max-h-60 overflow-y-auto p-1" },
                players.map(p => React.createElement(PlayerCard, { 
                    key: p.id, 
                    name: p.name, 
                    isHost: p.isHost,
                    onRemove: !p.isHost ? () => dispatch({ type: 'REMOVE_PLAYER', payload: { playerId: p.id } }) : null
                }))
            ),
            players.length < 15 && state.gameMode === 'offline' && React.createElement("form", { onSubmit: handleAddPlayer, className: "flex gap-2 mb-6" },
                React.createElement(Input, { placeholder: "Nombre del nuevo jugador", value: newPlayerName, onChange: (e) => setNewPlayerName(e.target.value) }),
                React.createElement(Button, { type: "submit", className: "w-auto px-4 !text-base", disabled: !newPlayerName.trim() }, "Añadir")
            ),
            React.createElement(Button, { onClick: () => dispatch({ type: 'START_GAME' }), disabled: !canStart, className: canStart ? "!bg-emerald-500 !hover:bg-emerald-400 !text-white !shadow-[0_4px_0_0_#059669] !hover:shadow-[0_2px_0_0_#059669]" : ""}, canStart ? 'Empezar Partido' : `Faltan ${3 - players.length} jugadores`)
        )
    );
};

const RoleRevealScreen = ({ state, dispatch }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { players, currentPlayerTurnIndex, secretFootballer } = state;
    const currentPlayer = players[currentPlayerTurnIndex];
    const isLastPlayer = currentPlayerTurnIndex === players.length - 1;

    const handleContinue = () => {
        if (isLastPlayer) {
            dispatch({ type: 'FINISH_ROLE_REVEAL' });
        } else {
            setIsFlipped(false);
            setTimeout(() => dispatch({ type: 'ADVANCE_ROLE_REVEAL' }), 300); // Wait for card to flip back
        }
    };

    const isImpostor = currentPlayer.role === 'impostor';

    return React.createElement(Page, null,
        React.createElement(QuitButton, { onQuit: () => dispatch({ type: 'GO_HOME' }) }),
        React.createElement("div", { className: "w-full max-w-sm mx-auto card-flip-container", style: {height: '500px'}, onClick: () => setIsFlipped(!isFlipped) },
            React.createElement("div", { className: `card-flipper w-full h-full ${isFlipped ? 'flipped' : ''}` },
                // Card Front
                React.createElement("div", { className: "card-front" },
                    React.createElement(Card, { className: "w-full h-full flex flex-col items-center justify-between border-2 border-[--card-border] bg-gradient-to-br from-[--green-medium] via-[--green-dark] to-[--green-dark]" },
                        React.createElement("div", {className: "text-center w-full"}, 
                          React.createElement("p", { className: "text-lg text-gray-300" }, "PASA EL MÓVIL A"),
                          React.createElement("h1", { className: "text-4xl font-bold text-gold-gradient text-shadow mt-1" }, currentPlayer.name)
                        ),
                        React.createElement("div", {className: "flex flex-col items-center"},
                            React.createElement(UserIcon, {className: "w-32 h-32 text-gray-500"}),
                            React.createElement("p", { className: "text-5xl font-bold text-gray-400" }, "???")
                        ),
                        React.createElement("div", { className: "text-center w-full" },
                          React.createElement("h2", { className: "text-3xl font-bold text-shadow" }, "TOCA PARA REVELAR"),
                          React.createElement("p", { className: "text-sm text-gray-400 mt-1" }, "(Asegúrate que nadie más mire)")
                        )
                    )
                ),
                // Card Back
                React.createElement("div", { className: "card-back" },
                    React.createElement(Card, { className: `w-full h-full flex flex-col items-center py-8 ${isImpostor ? 'bg-gradient-to-br from-red-900 via-black to-red-800 border-red-500' : 'bg-gradient-to-br from-blue-900 via-[--green-dark] to-blue-800 border-blue-400'}` },
                        React.createElement("div", { className: "text-center" },
                            React.createElement("p", { className: "text-lg" }, "TU ROL,"),
                             React.createElement("h1", { className: "text-3xl font-bold text-gold-gradient text-shadow" }, currentPlayer.name)
                        ),
                        React.createElement("div", { className: "flex-grow flex flex-col items-center justify-center text-center" },
                            isImpostor ? React.createElement(SpyIcon, {className: "w-32 h-32 text-red-400"}) : React.createElement(FictionalTeamIcon, {className: "w-32 h-32"}),
                            React.createElement("h2", { className: `text-6xl font-bold text-shadow mt-4 ${isImpostor ? 'text-red-400' : 'text-blue-300'}` }, isImpostor ? "IMPOSTOR" : "EQUIPO")
                        ),
                        React.createElement("div", { className: "text-center px-4" },
                            isImpostor ?
                                React.createElement("p", { className: "text-lg" }, "No sabes quién es el futbolista. ¡Engáñalos a todos!")
                                : React.createElement("div", null,
                                    React.createElement("p", { className: "text-lg mb-1" }, "El futbolista secreto es:"),
                                    React.createElement("h3", { className: "text-4xl font-bold text-gold-gradient text-shadow" }, secretFootballer?.name)
                                )
                        )
                    )
                )
            )
        ),
        React.createElement(Button, { onClick: handleContinue, disabled: !isFlipped, className: "mt-8" }, isLastPlayer ? 'Comenzar Partido' : 'Entendido, pasar al siguiente')
    );
};

const CluesScreen = ({ state, dispatch }) => {
    const [clue, setClue] = useState('');
    const livingPlayers = useMemo(() => state.players.filter(p => !p.isEliminated), [state.players]);
    const currentPlayer = livingPlayers[state.currentPlayerTurnIndex];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (clue.trim()) {
            dispatch({ type: 'SUBMIT_CLUE', payload: { clue: clue.trim() } });
            setClue('');
        }
    };

    return React.createElement(Page, null,
        React.createElement(ScreenHeader, { title: "Ronda de Pistas" }),
        React.createElement("div", {className: "mt-20 w-full"},
            React.createElement(Card, null,
                React.createElement("p", { className: "text-lg mb-2 text-gray-300" }, `Turno ${state.currentPlayerTurnIndex + 1} de ${livingPlayers.length}`),
                React.createElement("p", { className: "text-2xl mb-6" }, "Le toca a ", React.createElement("span", { className: "font-bold text-gold-gradient text-4xl" }, currentPlayer.name)),
                React.createElement("form", { onSubmit: handleSubmit },
                    React.createElement(Input, { placeholder: "Escribe tu pista sobre el futbolista...", value: clue, onChange: (e) => setClue(e.target.value), className: "mb-4 text-center" }),
                    React.createElement(Button, { type: "submit", disabled: !clue.trim() }, "Enviar Pista")
                ),
                React.createElement("div", { className: "mt-6 text-sm text-gray-300" }, currentPlayer.role === 'impostor' ? "Finge que sabes quién es. ¡No levantes sospechas!" : `El futbolista es: ${state.secretFootballer?.name}`)
            )
        )
    );
};

const DebateScreen = ({ state, dispatch }) => {
    const [timer, setTimer] = useState(120); // 2 minutes

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        } else {
            dispatch({ type: 'START_VOTING' });
        }
    }, [timer, dispatch]);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const isTimeLow = timer <= 10;

    return React.createElement(Page, null,
        React.createElement(QuitButton, { onQuit: () => dispatch({ type: 'GO_HOME' }) }),
        React.createElement(Card, null,
            React.createElement("div", { className: `absolute -top-6 right-1/2 translate-x-1/2 bg-yellow-400 text-green-900 px-6 py-2 rounded-full text-4xl font-bold shadow-lg transition-colors ${isTimeLow ? 'bg-red-500 text-white timer-pulse' : ''}` }, minutes, ":", seconds.toString().padStart(2, '0')),
            React.createElement("h1", { className: "text-4xl font-bold mb-4 pt-4 text-shadow text-gold-gradient" }, "Fase de Debate"),
            React.createElement("p", { className: "text-lg mb-6" }, "Discutid las pistas y decidid quién es el impostor."),
            React.createElement("div", { className: "bg-black/30 p-4 rounded-lg mb-6 border border-[--card-border] max-h-64 overflow-y-auto" },
                React.createElement("h2", { className: "text-xl font-bold mb-3 text-yellow-400" }, "Pistas de la Ronda:"),
                React.createElement("ul", { className: "space-y-3 text-left" },
                    state.clues.map((c, index) => {
                        const player = state.players.find(p => p.id === c.playerId);
                        return React.createElement("li", { key: index, className: "p-3 bg-green-900/50 rounded-lg" },
                            React.createElement("strong", { className: "text-yellow-300" }, player?.name, ":"),
                            React.createElement("span", { className: "italic ml-2" }, `"${c.clue}"`)
                        );
                    })
                )
            ),
            React.createElement(Button, { onClick: () => dispatch({ type: 'START_VOTING' }) }, "Ir a Votación")
        )
    );
};


const VotingScreen = ({ state, dispatch }) => {
    const livingPlayers = useMemo(() => state.players.filter(p => !p.isEliminated), [state.players]);
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);

    const handleConfirmExpulsion = () => {
        if (!selectedPlayerId) return;
        const unanimousVotes = livingPlayers.map(p => ({ voterId: p.id, votedPlayerId: selectedPlayerId }));
        dispatch({ type: 'SUBMIT_VOTE', payload: { votes: unanimousVotes } });
    };

    const handleNoExpulsion = () => {
        dispatch({ type: 'SUBMIT_VOTE', payload: { votes: [] } });
    };

    const handleToggleSelection = (playerId) => {
        setSelectedPlayerId(currentId => currentId === playerId ? null : playerId);
    };

    return React.createElement(Page, null,
       React.createElement(ScreenHeader, { title: "Votación Grupal" }),
        React.createElement("div", {className: "mt-20 w-full"},
            React.createElement(Card, null,
                React.createElement("p", { className: "text-xl mb-6" }, "Decidid en grupo a quién eliminar."),
                React.createElement("div", { className: "w-full grid grid-cols-2 gap-3 mb-8" },
                    livingPlayers.map(player => React.createElement("button", {
                        key: player.id,
                        onClick: () => handleToggleSelection(player.id),
                        className: `relative w-full px-4 py-3 font-bold text-lg rounded-lg transition-all duration-200 uppercase tracking-wider shadow-md text-white text-center border-2 ${selectedPlayerId === player.id ? 'bg-yellow-500 border-yellow-300 scale-105 text-green-900' : 'bg-green-700 hover:bg-green-600 border-transparent'}`
                    }, player.name)
                    )
                ),
                React.createElement(Button, {
                    onClick: handleConfirmExpulsion,
                    disabled: !selectedPlayerId,
                    className: "mb-4"
                }, "Expulsar al Jugador Seleccionado"),
                React.createElement(SecondaryButton, {
                    onClick: handleNoExpulsion,
                    className: "!bg-gray-700 hover:!bg-gray-600 !border-gray-500 !shadow-[0_4px_0_0_#4b5563] hover:!shadow-[0_2px_0_0_#4b5563]"
                }, "Nadie fue expulsado")
            )
        )
    );
};

const ResultScreen = ({ state, dispatch }) => {
    const { eliminatedPlayerId, tiedPlayerIds, players, votes } = state;
    const getPlayerName = (id) => players.find(p => p.id === id)?.name || 'Desconocido';

    const renderContent = () => {
        if (eliminatedPlayerId) {
            const eliminatedPlayer = players.find(p => p.id === eliminatedPlayerId);
            if (!eliminatedPlayer) return null;
            return React.createElement(React.Fragment, null,
                React.createElement("h1", { className: "text-4xl font-bold text-red-500 mb-4 text-shadow" }, "¡Jugador Eliminado!"),
                React.createElement("p", { className: "text-5xl font-bold mb-4 text-shadow" }, eliminatedPlayer.name),
                React.createElement("p", { className: "text-2xl mb-6" }, "Su rol era: ", React.createElement("span", { className: `font-bold ${eliminatedPlayer.role === 'impostor' ? 'text-red-400' : 'text-blue-400'}` }, eliminatedPlayer.role?.toUpperCase()))
            );
        }

        if (tiedPlayerIds && tiedPlayerIds.length > 0) {
            const tiedPlayers = players.filter(p => tiedPlayerIds.includes(p.id));
            return React.createElement(React.Fragment, null,
                React.createElement("h1", { className: "text-4xl font-bold text-yellow-500 mb-4 text-shadow" }, "¡Hay un Empate!"),
                React.createElement("p", { className: "text-xl mb-4" }, "El voto estuvo empatado entre:"),
                React.createElement("div", { className: "font-bold text-3xl mb-6" }, tiedPlayers.map(p => p.name).join(', ')),
                React.createElement("p", { className: "text-xl" }, "Nadie es eliminado en esta ronda.")
            );
        }

        return React.createElement(React.Fragment, null,
            React.createElement("h1", { className: "text-4xl font-bold text-yellow-500 mb-4 text-shadow" }, "Sin Mayoría"),
            React.createElement("p", { className: "text-xl" }, "No hubo votos suficientes para eliminar a un jugador.")
        );
    };

    return React.createElement(Page, null,
        React.createElement(QuitButton, { onQuit: () => dispatch({ type: 'GO_HOME' }) }),
        React.createElement(Card, null,
            renderContent(),
            React.createElement(Button, { onClick: () => dispatch({ type: 'NEXT_ROUND' }), className: "mt-4" }, "Siguiente Ronda")
        )
    );
};

const Confetti = () => {
    const confettiCount = 50;
    const colors = ['#fde047', '#facc15', '#fbbf24', '#ffffff', '#e5e7eb'];

    return React.createElement("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none z-0" },
        Array.from({ length: confettiCount }).map((_, i) => React.createElement("div", {
            key: i,
            className: "confetti",
            style: {
                left: `${Math.random() * 100}%`,
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: `${Math.random() * 3}s`,
                transform: `scale(${Math.random() * 0.8 + 0.5})`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0'
            }
        }))
    );
};

const EndGameScreen = ({ state, dispatch }) => {
    const { winner, players, secretFootballer } = state;
    const impostors = players.filter(p => p.role === 'impostor');
    
    return React.createElement(Page, null,
        React.createElement(Confetti, null),
        React.createElement(Card, null,
            React.createElement("h1", { className: "text-6xl font-bold mb-6 text-shadow text-gold-gradient" }, "¡Fin del Partido!"),
            winner === 'squad' ? React.createElement("div", { className: "text-center" },
                React.createElement("h2", { className: "text-4xl font-bold text-blue-400 mb-4 text-shadow" }, "¡EL EQUIPO GANA!"),
                React.createElement("p", { className: "text-xl mb-4" }, "Habéis descubierto a los impostores."),
                impostors.length > 0 && React.createElement("p", { className: "text-lg text-gray-200" }, `El/Los impostor(es) era(n): ${impostors.map(i => i.name).join(', ')}.` )
            ) : React.createElement("div", { className: "text-center" },
                React.createElement("h2", { className: "text-4xl font-bold text-red-500 mb-4 text-shadow" }, "¡LOS IMPOSTORES GANAN!"),
                impostors.length > 0 && React.createElement("p", { className: "text-xl mb-4" }, `¡${impostors.map(i => i.name).join(' y ')} han engañado a todos!` )
            ),
            React.createElement("p", { className: "text-md mt-4 text-gray-300" }, "El futbolista secreto era ", React.createElement("span", { className: "font-bold text-yellow-400 text-lg" }, secretFootballer?.name), "."),
            React.createElement("div", { className: "my-8" },
                React.createElement("h3", { className: "text-2xl font-semibold mb-4 border-b-2 border-[--card-border] pb-2 text-shadow" }, "Tabla de Goleadores"),
                React.createElement("div", {className: "space-y-2 text-left"},
                  players.sort((a,b) => b.score - a.score).map((p, index) => React.createElement("div", { key: p.id, className: `flex justify-between items-center p-3 rounded-md ${index === 0 ? 'bg-yellow-500/20 border-l-4 border-yellow-400' : 'bg-black/20'}` },
                      React.createElement("div", {className: "flex items-center gap-3"},
                        React.createElement("span", {className: "font-bold text-xl w-6 text-center"}, index + 1),
                        React.createElement("span", {className: "text-lg"}, p.name),
                        p.role === 'impostor' ? React.createElement(SpyIcon, {className: "w-5 h-5 text-red-400"}) : React.createElement(SoccerBallIcon, {className: "w-5 h-5 text-blue-400"})
                      ),
                      React.createElement("span", { className: "font-bold text-yellow-300 text-xl" }, p.score, " pts")
                  ))
                )
            ),
            React.createElement("div", { className: "grid grid-cols-2 gap-4" },
                React.createElement(Button, { onClick: () => dispatch({ type: 'PLAY_AGAIN' }) }, "Jugar Revancha"),
                React.createElement(SecondaryButton, { onClick: () => dispatch({ type: 'RETURN_TO_LOBBY' }) }, "Ajustar Jugadores"),
                React.createElement(SecondaryButton, { onClick: () => dispatch({ type: 'GO_HOME' }), className: "col-span-2 !bg-gray-700 hover:!bg-gray-600 !border-gray-500 !shadow-[0_4px_0_0_#4b5563] hover:!shadow-[0_2px_0_0_#4b5563]" }, "Volver al Menú Principal")
            )
        )
    );
};

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [state, dispatch] = useReducer(gameReducer, initialState);

    useEffect(() => {
        const storedName = localStorage.getItem('footballImpostorPlayerName');
        if (storedName) {
            setLoggedInUser(storedName);
        }
    }, []);

    const handleLogin = (name) => {
        localStorage.setItem('footballImpostorPlayerName', name);
        setLoggedInUser(name);
    };

    const handleLogout = () => {
        localStorage.removeItem('footballImpostorPlayerName');
        setLoggedInUser(null);
        dispatch({ type: 'GO_HOME' });
    };

    if (!loggedInUser) {
        return React.createElement(LoginScreen, { onLogin: handleLogin });
    }
    
    // Using a key on the top-level component of each phase forces a re-mount,
    // which makes the fade-in animation trigger on each screen change.
    const screenKey = `${state.phase}-${state.currentPlayerTurnIndex}`;

    switch (state.phase) {
        case GamePhase.HOME:
            return React.createElement(ModeSelectionScreen, { key: screenKey, loggedInUser: loggedInUser, dispatch: dispatch, onLogout: handleLogout });
        case GamePhase.LOBBY:
            return React.createElement(LobbyScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.ROLE_REVEAL:
            return React.createElement(RoleRevealScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.CLUES:
            return React.createElement(CluesScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.DEBATE:
            return React.createElement(DebateScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.VOTING:
            return React.createElement(VotingScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.RESULT:
            return React.createElement(ResultScreen, { key: screenKey, state: state, dispatch: dispatch });
        case GamePhase.END_GAME:
            return React.createElement(EndGameScreen, { key: screenKey, state: state, dispatch: dispatch });
        default:
            return React.createElement(ModeSelectionScreen, { key: screenKey, loggedInUser: loggedInUser, dispatch: dispatch, onLogout: handleLogout });
    }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App, null)
  )
);
