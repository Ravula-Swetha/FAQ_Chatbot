const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    query: {type: String, required: true}, 
    response: {type: String, required: true}, 
    embeddings: {type: String, required: true}, 
    time: {type: Date, default: Date.now}
});

const QueryModel = mongoose.model('Query', QuerySchema);


module.exports = QueryModel;