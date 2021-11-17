const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'jasminecheung',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '213',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            od: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => {signin.handleSignin(req,res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req,res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res, db)})

app.put('/image', (req, res) => {image.handleImage(req,res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})


app.listen(3000, () => {
    console.log('app is running on port 3000')
})



/*
Before we code, we have to design our API, how does that look like.
/--> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userID --> GET = user
/image --> PUT --> user
*/