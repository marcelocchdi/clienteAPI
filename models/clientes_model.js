var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ClientesSchema = new Schema({
    codCliente: String,
    cpf: String,
    nome: String,
    email: String
});
 
module.exports = mongoose.model('Clientes', ClientesSchema);