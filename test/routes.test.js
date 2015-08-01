var assert = require('assert'),
    request = require('supertest'),
    mongoose = require('mongoose');

//Define tests for the API
describe('Routing', function() {
  var palMessageID;
  var nonPalMessageID;
  var myApp = require('../index');
  
  before(function(done){
    mongoose.connection.on('connected', function (callback) {
      done();
    });
  });
  
  //Test POST /api/messages
  describe('Add Message', function() {
    it('Should add palindrome message', function(done) {
      
      request(myApp)
      .post('/api/messages')
      .send({text:'racecar'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert(res.body.isPalindrome);
        palMessageID = res.body._id;
        done();
      });
    });
    
    it('Should add non palindrome message', function(done) {
      request(myApp)
      .post('/api/messages')
      .send({text:'not palindrome'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert.equal(false, res.body.isPalindrome);
        nonPalMessageID = res.body._id;
        done();
      });
    });
    
    it('Should fail without text', function(done) {
      request(myApp)
      .post('/api/messages')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  }); 
  
  //Test GET /api/messages
  describe('Get Message', function() {
    
    it('Should retrieve palindrome message', function(done) {
      request(myApp)
      .get('/api/messages/'+palMessageID)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert(res.body.isPalindrome);
        done();
      });
    });
    
    it('Should retrieve non palindrome message', function(done) {
      request(myApp)
      .get('/api/messages/'+nonPalMessageID)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert.equal(false,res.body.isPalindrome);
        done();
      });
    });
    
    it('Should fail with improper ID', function(done) {
      request(myApp)
      .get('/api/messages/notarealmessageid')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
  
  //Test GET /api/messages
  describe('Get all Messages', function() {
    
    it('Should retrieve all messages', function(done) {
      request(myApp)
      .get('/api/messages')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert(res.body.length >= 2);
        done();
      });
    });
  });
  
  //Test DELETE /api/messages
  describe('Delete Messages', function() {
    
    it('Should delete a message', function(done) {
      request(myApp)
      .delete('/api/messages/'+palMessageID)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        assert(res.body.deleted);
        done();
      });
    });
    
    it('Should return 400 on invalid message ID', function(done) {
      request(myApp)
      .delete('/api/messages/nothinghere')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
    });
  });
  
  //Test DELETE /api/messages
  describe('Misc', function() {
    
    it('Should return 404 on non existent endpoint - GET', function(done) {
      request(myApp)
      .get('/api/something')
      .expect(404, done);
    });
  });
  
});