const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var cors = require("cors");

// Configurar cabeceras y cors
app.use(cors());
app.use(bodyParser.json());

app.get('/api/getList', (req, res) => {
    var list = [
        {
            id: 1,
            name: 'PANTS',
            price: 5,
            discount: '2x1 in pants'
        },
        {
            id: 2,
            name: 'TSHIRT',
            price: 20,
            discount: '3 or more, price per unit should be $19.00'
        },
        {
            id:3,
            name: 'HAT',
            price: 7.5,
            discount: ''
        }
    ];
    res.json(list);
});

app.post('/api/order/create', (req, res) => {
    //data post
    var data = req.body.data;
    //precios
    var p_pants = 5;
    var p_tshirt = 20;
    var p_hat = 7.5;

    if(data.TSHIRT >= 3) {
        p_tshirt = 19;
    }
    
    var dividendo = Math.floor(data.PANTS / 2);
    var residuo   = data.PANTS % 2;

    var t_pants  = (dividendo + residuo) * p_pants;
    var t_tshirt = data.TSHIRT * p_tshirt;
    var t_hat    = data.HAT * p_hat;
    
    var sum = t_pants + t_tshirt + t_hat;

    var result = [
        {name: 'PANTS', unit: data.PANTS, price: p_pants, total: t_pants}, 
        {name: 'TSHIRT', unit: data.TSHIRT, price: p_tshirt, total: t_tshirt},
        {name: 'HAT', unit: data.HAT, price: p_hat, total: t_hat}
    ];

    res.json(result);
});

app.listen(process.env.PORT || 3001);