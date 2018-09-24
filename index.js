var port = process.env.OPENSHIFT_NODEJS_PORT || 8080,
    host = process.env.OPENSHIFT_NODEJS_IP || "localhost";

var express = require('express'),
    bodyParser = require('body-parser');

var mongoose = require('mongoose');    
mongoose.connect('mongodb://172.30.226.248:27017/mongodb');

var Cliente = require('./models/clientes_model');

var app = express();
    
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next();
});
 
router.get('/', function(req, res) {
    res.json({ message: 'YEAH! Seja Bem-Vindo a nossa API' });
});
 
router.route('/clientes')
    .post(function(req, res) {
        var usuario = new Usuario();

        //aqui setamos os campos do usuario (que virá do request)
        Cliente.codCliente = req.body.codCliente;
        Cliente.cpf = req.body.cpf;
        Cliente.nome = req.body.nome;    
        Cliente.email = req.body.email;

        Cliente.save(function(error) {
            if(error)
                res.send(error);

            res.json({ message: 'Cliente criado!' });
        })
    .get(function(req, res) { 
            Usuario.find(function(err, usuarios) {
                if(err)
                    res.send(err);
                         
                res.json(usuarios);
            });
        });
});

app.use('/api', router);


app.listen(port, () => {
    console.log("Server is UP ans running on port: " + port);
});


