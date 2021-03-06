const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'save_koala',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
};

const pool = new Pool(config);

pool.on('connect', (client) => {
    console.log('PostgeSQL connected');
});

pool.on('error', (err, client) => {
    console.log('Unexpected error client are you there?', err);
});

// GET
koalaRouter.get('/', (req, res) => {

    let qText = 'Select * FROM "koalalist" ORDER BY id ASC;';

    pool.query(qText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('Error trying to get koala list from DB', err);
            res.sendStatus(500);
        });

});


// POST
koalaRouter.post('/', (req, res) => {
    const newKoala = req.body;
    const qText = `INSERT INTO "koalalist" ("name", "gender", "age", "ready_to_transfer", "notes")
    VALUES ($1, $2, $3, $4, $5)`;
    pool.query(qText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.readyForTransfer, newKoala.notes])
        .then(res.sendStatus(200))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500)
        })
});

// PUT
koalaRouter.put('/:id', (req, res) => {
    const koalaId = req.params.id;


    // SQL query for toggling ready_to_transfer id
    let queryText = `
        UPDATE "koalalist"
        SET "ready_to_transfer" = NOT "ready_to_transfer"
        WHERE id = $1;`;

    pool.query(queryText, [koalaId])
        .then(dbResponse => {
            console.log('Updated row count: ', dbResponse.rowCount);
            res.sendStatus(202);
        })
        .catch(error => {
            console.log('There was an error updating the record.', error);
            res.sendStatus(500);
        });
})

koalaRouter.put('/edit/:id', (req, res) => {
    const koalaId = req.params.id;

    // SQL query for toggling ready_to_transfer id
    let queryText = `
        UPDATE "koalalist"
        SET "name" = $1,
            "gender" = $2,
            "age" = $3,
            "ready_to_transfer" = $4,
            "notes" = $5
        WHERE id = $6;`;

    pool.query(queryText, [req.body.name, req.body.gender, req.body.age, req.body.ready, req.body.notes, koalaId])
        .then(dbResponse => {
            console.log('Updated row count: ', dbResponse.rowCount);
            res.sendStatus(202);
        })
        .catch(error => {
            console.log('There was an error updating the record.', error);
            res.sendStatus(500);
        });
})

// DELETE
koalaRouter.delete('/:id', (req, res) => {
    console.log('Request URL: ', req.url);
    console.log('Request route parameters: ', req.params);
    const koalaId = req.params.id;
    console.log(`koala id is ${koalaId}`);
  
    const qText = `DELETE FROM "koalalist" WHERE id = $1;
    `;

    pool.query(qText, [koalaId])
        .then(dbResponse => {
            console.log(`${dbResponse.rowCount === 1} was deleted from database`);
            res.sendStatus(201)
        })
        .catch(error => {
            console.log(`Could not delete koala with id ${koalaId}.`, error);
            res.sendStatus(500);
        });
});

module.exports = koalaRouter;