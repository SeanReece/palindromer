var mongoose = require('mongoose'),
    config = require('./config');
var ObjectId = mongoose.Schema.Types.ObjectId;

//Connect
mongoose.connect('mongodb://'+config.db.server+'/palindromer');
var db = mongoose.connection;
db.on('error', function (err) {
    console.log("connection error: "+err);
});
db.on('open', function (callback) {
    console.log("MongoDB opened");
});
db.on('connecting', function (callback) {
    console.log("Connecting to MongoDB...");
});
db.on('connected', function (callback) {
    console.log("MongoDB connected");
});
db.on('disconnected', function (callback) {
    console.error("MongoDB disconnected");
});

//Schemas
var userSchema = new mongoose.Schema({
    since: { type: Date, default: Date.now }
});

var messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
    views: { type: Number, default: 0}
});

mongoose.model('Users', userSchema);
mongoose.model('Messages', messageSchema);