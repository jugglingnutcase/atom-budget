var $ = require('jquery');
var data = require('./lib/data');

var get = function (attr) {
  return function (object) { return object[attr]; }
}

var addAccount = function () {
  var accounts = getAccountsFromUI();
  var newAccountName = $('#accountName').val();
  var newAccount = { name: newAccountName }
  var accountNames = accounts.map(get('name'));

  if(newAccountName === '') {
    alert("Please provide a name for the account!")
    return;
  }

  if(accountNames.indexOf(newAccountName) == -1) {
    accounts.push(newAccount);
    data.storeAccounts(accounts, fillAccounts);

    // Set the input box back to emptiness
    $('#accountName').val('');
  }
}

var getAccountsFromUI = function () {
  var accounts = [];
  $('.accounts .account').each(function () {
    accounts.push({ name: $(this).data('name') })
  })

  return accounts;
}

// Build up and insert the HTML
var fillAccounts = function(err, accounts) {
  var accountsHTML;
  if (err) {
    accountsHTML = "Error retrieving accounts"
  } else {
    accountsHTML = accounts.map(function (account) {
      return '<li class="account" data-name="' + account.name + '">' +
        '<a class="select" href="#">' + account.name + '</a>' +
        ' | <a class="remove" href="#">Remove</a>' +
        '</li>'
    }).join("");
  }

  $('.accounts').html(accountsHTML)
  $('.accounts a.select').on('click', selectAccount)
  $('.accounts a.remove').on('click', removeAccount)
}

var selectAccount = function(ev) {
  var accountName = $(this).parent().data('name')
  $('#current-account .name').text(accountName);
};

var removeAccount = function(ev) {
  var accountName = $(this).parent().data('name')
  $(this).parent().remove()

  var accounts = getAccountsFromUI();
  accounts = accounts.filter(function(account) {
    return account.name !== accountName
  })

  data.storeAccounts(accounts, fillAccounts);
};

data.open(function() {
  // Add an account adder handler
  $('.addAccount').on('click', addAccount);
  $('#accountName').on('keypress', function(e) {
    if (e.which == 13) addAccount()
  });

  // Fill the accounts from the database
  data.getAccounts(fillAccounts);
})
