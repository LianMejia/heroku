const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 80; //3006

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

////////////////////////////////////////////////////////////////
// all products 
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) =>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

app.get('/ropa', (req, res) => {
    const sql = 'SELECT * FROM ropa';

    connection.query(sql, (error, results) =>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

app.get('/zapatos', (req, res) => {
    const sql = 'SELECT * FROM zapatos';
    connection.query(sql, (error, results) =>{
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    });
});

////////////////////////////////////////////////////////////////


app.get('/products/:id', (req, res) => {
    const {id} = req.params;
    const sql = ('SELECT * FROM products WHERE id = ?', [id]);
    connection.query(sql, (error, result) =>{
        /* if(error) throw error; */
        if(result.length > 0){
            return res.json(sql[0]);
        }else{
            res.send('Not result');
        }
    });
});

/* router.get('/products/:id', (req, res) => {
    (async () => {
        try{
        const doc = db.collection("products").doc(req.params.product_id);
        const item = await doc.get();
        const response = item.data();
        return res.status(200).json(response);
        }catch(error){
            return res.status(500).send(error);
        }
    })();
}); */

app.get('/ropa/:id', (req, res) => {
    const{id} = req.params;
    const sql = `SELECT * FROM ropa WHERE id = ${id}`;
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

app.get('/zapatos/:id', (req, res) => {
    const{id} = req.params;
    const sql = `SELECT * FROM zapatos WHERE id = ${id}`;
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

////////////////////////////////////////////////////////////////

app.post('/products', (req, res) => {
    const sql = 'INSERT INTO products SET ?';
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

app.post('/ropa', (req, res) => {
    const sql = 'INSERT INTO ropa SET ?';
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
});

app.post('/zapatos', (req, res) => {
    const sql = 'INSERT INTO zapatos SET ?';
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
});

////////////////////////////////////////////////////////////////

app.put('/products/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, image, description} = req.body;
    const sql = `UPDATE products SET title = '${title}', price = '${price}', image = '${image}', description = '${description}'
    WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Product updated!');
    });
    /* res.send('Update product'); */
});

app.put('/ropa/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, image, description} = req.body;
    const sql = `UPDATE ropa SET title = '${title}', price = '${price}', image = '${image}', description = '${description}'
    WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Product updated!');
    });
    /* res.send('Update product'); */
});

app.put('/zapatos/:id', (req, res) => {
    const {id} = req.params;
    const {title, price, image, description} = req.body;
    const sql = `UPDATE zapatos SET title = '${title}', price = '${price}', image = '${image}', description = '${description}'
    WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Product updated!');
    });
    /* res.send('Update product'); */
});

////////////////////////////////////////////////////////////////

app.delete('/products/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Delete product');
    });
    /* res.send('Delete product'); */
});

app.delete('/ropa/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM ropa WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Delete product');
    });
    /* res.send('Delete product'); */
});

app.delete('/zapatos/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM zapatos WHERE id = ${id}`;
    connection.query(sql, error => {
        if(error) throw error;
        res.send('Delete product');
    });
    /* res.send('Delete product'); */
});

////////////////////////////////////////////////////////////////

// Check connect
connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// https://api-cejam-web.herokuapp.com/products

// heroku ps:scale web=0
// heroku ps:scale web=1