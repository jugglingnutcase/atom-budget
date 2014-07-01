var $ = require('jquery');
var leveljs = require('level-js');
var db = leveljs('budget');

function addAccount() {
  var accounts = getAccountsFromUI();
  var newAccount = { name: $('#accountName').val() }
  accounts.push(newAccount);
  storeAccounts(accounts);
}

function getAccountsFromUI() {
  var accounts = [];
  $('.accounts .account').each(function () {
    accounts.push({ name: $(this).data('name') })
  })

  return accounts;
}

// Build up and insert the HTML
function fillAccounts(accounts) {
  var accountsHTML = accounts.map(function (account) {
    return '<li class="account" data-name="' + account.name + '">' + account.name + '</li>'
  })
  $('.accounts').html(accountsHTML)
}

function storeAccounts(accounts) {
  db.put('accounts', JSON.stringify(accounts), function(err) {
    if (err) {
      console.error('Error saving accounts: ' + err);
      return;
    }

    fillAccounts(accounts);
  });
}

function appReady() {
  db.get('accounts', function(err, data) {
    if (err) return;
    fillAccounts(JSON.parse(data.toString()));
  });

  $('.addAccount').on('click', addAccount);
}

// Prefill any accounts we know about
db.open(appReady);
