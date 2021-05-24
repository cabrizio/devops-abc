const express = require('express')
const mysql = require('mysql')
const redis = require("redis");

const redisClient = redis.createClient(6379); // Redis server started at port 6379


// Create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'carmine',
    password: 'password',
    database: 'nodesql'
})


// Connect to DB
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected')
})

const app = express()

// Create Databases
app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE nodesql";
    db.query(sql, (err) => {
        if (err) {
        throw err;
        }
        res.send("Databases Created")
    });
});


// Create table
app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE customer(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), PRIMARY KEY(id))'
//    let sql = 'CREATE TABLE customer(id int AUTO_INCREMENT, name json, email json, PRIMARY KEY(id))'
    db.query(sql, (err) => {
        if (err) {
        throw err;
        }
        res.send(" Customer Table Created")
    });
});

// Insert data
app.get('/customer', (req, res) => {
    let post = {name: 'Carmine', email: 'carmine@example.com'}
//    let sql = `INSERT INTO customer VALUES('{"name": "Carmine", "email": "carmine@example.com"}')`
    let sql = `INSERT INTO customer SET ?`
    let query = db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Customer added')
    });
 });

// Select Customer

app.get('/getcustomer', (req, res) => {
    let sql = 'SELECT * FROM customer'
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err;
        }
        console.log(results)
//        res.status(200).send(JSON.parse(results));
        res.send(results)
    });
});

app.get("/cached-customer", (req, res) => {
  const searchTerm = req.query.search;

  try {
        redisClient.get(searchTerm, async (err, jobs) => {
            if (err) throw err;

            if (jobs) {
                res.status(200).send({
                    jobs: JSON.parse(jobs),
                    message: "data retrieved from the cache"
                });
            }
            else {
                connection.connect()
                connection.query('SELECT * FROM customer', function (err, results) {
                    if (err) throw err
                    console.log(results)
                });
                connection.end()
                };
            });
     }
     catch (err) {
     res.status(500).send({ error: err.message });
  }
});






app.listen('3000', () => {
    console.log(`Server started at port 3000`);
});

