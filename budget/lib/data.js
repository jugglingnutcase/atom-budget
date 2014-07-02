var leveljs = require('level-js');
var db = leveljs('budget');

// Prefill any accounts we know about
exports.open = function(cb) {
    db.open(cb);
};

// Optional callback
exports.storeAccounts = function (accounts, cb) {
  db.put('accounts', JSON.stringify(accounts), function(err) {
    if (err) {
      console.error('Error saving accounts: ' + err);
    }

    if (cb) {
      cb(err, accounts);
    }
  });
}

// Not so optional callback
exports.getAccounts = function(cb) {
  db.get('accounts', function(err, data) {
    if (err) {
      cb(err, null);
    }
    else {
      cb(err, JSON.parse(data.toString()))
    }
  });
}
