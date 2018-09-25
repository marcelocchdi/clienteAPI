var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, '0.0.0.0', function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "hdidbd",
    password: "bpm057$",
    server: "hdisqlsoa",
    database: "hdiDBD",
    port: 1435,
    encrypt: true
};


//Function to connect to database and execute query
var  executeQuery = function(res, query){  
    console.log(query);
    sql.connect(dbConfig).then(function() {
        var request = new sql.Request();
        request.query(query).then(function(data) {
            var clientes;
            console.log(data);
            if (data.recordset == null || data.recordset == 'undefined') {
                clientes = { Mensagem: { descricao: "OK"} };
            } else {
                clientes = { Clientes: data.recordset };
            }
            console.log(clientes);
            res.send(clientes);
            sql.close();
        }).catch(function(err) {
            res.status(400);
            var resp = { Mensagem: { descricao: err.originalError.info.message }};
            res.send(resp);
            sql.close();
        });
    }).catch(function(err) {
        res.status(400);
        var resp = { Mensagem: { descricao: err.originalError.info.message }};
        res.send(resp);
    });
};

//GET API
app.get("/api/clientes", function(req , res){
    var query = "select * from [Clientes]";
    executeQuery (res, query);
});

//GET API
app.get("/api/clientes/:codCliente", function(req , res){
    var query = "select * from [Clientes] where codCliente = '" + req.params.codCliente + "'";
    executeQuery (res, query);
});
//POST API
app.post("/api/clientes", function(req , res){
    var query = "INSERT INTO [Clientes] (codCliente,cpf,nome,email) VALUES ('" +  req.body.codCliente + "','" + req.body.cpf + "','" + req.body.nome + "','" + req.body.email + "')";
    executeQuery (res, query);
});

//PUT API
app.put("/api/clientes/:codCliente", function(req , res){
    var query = "UPDATE [Clientes] SET cpf = '" + req.body.cpf + "', nome= '" + req.body.nome  +  "' , email=  '" + req.body.email + "'  WHERE codCliente= '" + req.params.codCliente + "'";
    executeQuery (res, query);
});

// DELETE API
app.delete("/api/clientes/:codCliente", function(req , res){
    var query = "DELETE FROM [Clientes] WHERE codCliente='" + req.params.codCliente + "'";
    executeQuery (res, query);
});