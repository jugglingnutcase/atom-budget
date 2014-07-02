var $ = require('jquery');
var leveljs = require('level-js');
var db = leveljs('budget');

function get (attr) {
  return function (object) { return object[attr]; }
}

function addAccount() {
  var accounts = getAccountsFromUI();
  var newAccountName = $('#accountName').val();
  var newAccount = { name: newAccountName }
  var accountNames = accounts.map(get('name'));
  if(accountNames.indexOf(newAccountName) == -1) {
    accounts.push(newAccount);
    storeAccounts(accounts);
  }
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
    return '<li class="account" data-name="' + account.name + '">' + account.name +
      ' | <a class="select" href="#">Select</a> | <a class="remove" href="#">Remove</a></li>'
  })
  $('.accounts').html(accountsHTML)
  $('.accounts a.select').on('click', selectAccount)
  $('.accounts a.remove').on('click', removeAccount)
}

function selectAccount(ev) {
  var accountName = $(this).parent().data('name')
  console.info('Selecting account: ' + accountName)
  $('#current-account .name').text(accountName);
}

function removeAccount(ev) {
  var accountName = $(this).parent().data('name')
  console.warn('Removing account: ' + accountName)
  $(this).parent().remove()

  var accounts = getAccountsFromUI();
  accounts = accounts.filter(function(account) {
    return account.name !== accountName
  })

  storeAccounts(accounts);
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
