const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3006;

const app = express();

app.use(bodyParser.json());

//MySql
const connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b49b526303d637',
    password: '66f7bfc9',
    database: 'heroku_3fbb44d2f435376'
    /* host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_web' */
    // mysql://b49b526303d637:66f7bfc9@us-cdbr-east-02.cleardb.com/heroku_3fbb44d2f435376?reconnect=true
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
    const{id} = req.params;
    const sql = `SELECT * FROM productos WHERE id = ${id}`;
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

app.post('/products', (req, res) => {
    const sql = 'INSERT INTO productos SET ?';
    const productsObj = {
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,

    };
    connection.query(sql, productsObj, error => {
        if(error) throw error;
        res.send('Product created!');
    });
    /* res.send('New product'); */
});

app.put('/products/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, image, description} = req.body;
    const sql = `UPDATE productos SET title = '${title}', price = '${price}', image = '${image}' description = '${description}'
    WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Product updated!');
    });
    /* res.send('Update product'); */
});

app.delete('/products/:id', (req, res) => {
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

// https://api-cejam-web.herokuapp.com/products

// heroku ps:scale web=0
// heroku ps:scale web=1