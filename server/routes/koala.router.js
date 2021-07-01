const { Router } = require('express');
const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT


// DELETE
Router.delete('/:id' (req, res) => {
    console.log('Request URL: ', req.url);
    console.log('Request route parameters: ', req.params);
    const koalaId = req.params.id;
    console.log(`koala id is ${koalaId}`);
    
    const qText = `DELETE FROM "koalas" WHERE id = $1;
    `;

    pool.query(qText, [koalaId])
        .then(dbResponse => {
            console.log(`${drResponse.rowCount === 1} was deleted from database`);
            res.sendStatus(201)
        })
        .catch(error => {
            console.log(`Could not delete koala with id ${koalaId}.`, error);
            res.sendStatus(500);
        });
});
module.exports = koalaRouter;