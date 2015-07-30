var mongoose = require('mongoose'),
    util = require('../util/palindrome'),
    Message = mongoose.model('Messages');
    
var ObjectId = mongoose.Schema.Types.ObjectId;

//Responds to the client with a single message or 404 if message not found
module.exports.getMessage = function(req, res, next){
    if(req.params.id === undefined)
        return res.status(400).send({ reason: 'Message ID is required' });
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ reason: 'A Valid Message ID is required' });
    
    var id = req.params.id;
    console.log('Message Requested: '+id);

    Message.findById(id,'-__v',{ lean: true },function(err, message){
        if(err) 
            return next(err);
        if(!message)
            return res.status(404).send({ reason: 'That message doesn\'t exist' });
        
        message.isPalindrome = util.isPalindrome(message.text);
        res.send(message);
    });  
}

//Responds to the client with a list of messages.
module.exports.getAllMessages = function(req, res, next){
    var limit = 100;
        
    console.log('All Messages Requested');

    Message.find({},'-__v',{ lean: true },function(err, messages){
        if(err)
            return next(err);
        messages.forEach(function(message) {
            message.isPalindrome = util.isPalindrome(message.text);
        }, this);
        res.send(messages);
    });  
}

//Adds a new message
module.exports.addMessage = function(req, res, next){
    if(req.body.text === undefined)
        return res.status(400).send({ reason: 'Cmon! A message needs some text!' });
        
    console.log('Adding message: '+req.body.text);
    var message = new Message({
        text: req.body.text
    });
    
    message.save(function(err, doc){
        if(err) 
            return next(err);
        doc._doc.isPalindrome = util.isPalindrome(doc._doc.text);
        delete doc._doc.__v;    //Remove the mongo document version - We don't need to send that!
        res.send(doc._doc);
    });
}

//Removes a specified message from the DB
module.exports.removeMessage = function(req, res, next){
    if(req.params.id === undefined)
        return res.status(400).send({ reason: 'Message ID is required' });
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ reason: 'A Valid Message ID is required' });
    
    var id = req.params.id;
    console.log('Deleting Message: '+id);

    Message.findByIdAndRemove(id,function(err, message){
        if(err) 
            return next(err);
        if(!message)
            return res.status(404).send({ reason: 'That message doesn\'t exist' });

        res.send({deleted: true});
    });  
}