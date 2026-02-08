// // test vocabulary knowledge through game
// import express from "express";
// import pg from 'pg';
// const { Pool } = pg;
// import keys from '../config/keys.js';
// import requireLogin from '../middlewares/requireLogin.js';
// import requireCredits from '../middlewares/requireCredits.js';

// const pgPool = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort,
// });

// export default function gameRoutes(app) {

//   app.get('/api/game/start', (req, res) => {
//     res.send('Game started! Get ready to test your vocabulary knowledge.');
//   });

//   app.post('/api/game/answer', (req, res) => {
//     const { answer } = req.body;
//     // Here you would normally check the answer against the correct one
//     res.send(`You answered: ${answer}`);
//   });

// }