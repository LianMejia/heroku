const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3006;

const app = express();

app.use(bodyParser.json());

//MySql
const connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bfe8670fd52af4',
    password: '68229b1a',
    database: 'heroku_ee3112de2f45482'
    /* host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_web' */
});

//Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!')
});

// all customers 
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM productos';

    connection.query(sql, (error, results) =>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

app.get('/products/:id', (req, res) => {
    const{id} = req.params
    const sql = `SELECT * FROM productos WHERE id = ${id}`
    connection.query(sql, (error, result) =>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('Not result');
        }
    });
    /* res.send('Get products by Id'); */
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO productos SET ?';
    const productsObj = {
        titulo: req.body.titulo,
        price: req.body.price,
        description: req.body.description
    }
    connection.query(sql, productsObj, error => {
        if(error) throw error;
        res.send('Product created!');
    });
    /* res.send('New product'); */
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {titulo, price, description} = req.body;
    const sql = `UPDATE productos SET titulo = '${titulo}', price = '${price}', description = '${description}'
    WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Product updated!');
    });
    /* res.send('Update product'); */
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM productos WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Delete product');
    });
    /* res.send('Delete product'); */
});

// Check connect
connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))