var $ = require('jquery');
var leveljs = require('level-js');
var db = leveljs('account');

db.open(function() {
  db.put('user', 'james', function() {
    console.log("Added user");
  })

  db.get('user', function(data) {
    console.log("Found: user=" + "james");
  });
});
