App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Panel.json", function(panel) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Panel = TruffleContract(panel);
      // Connect provider to interact with contract
      App.contracts.Panel.setProvider(App.web3Provider);

      return App.render();
    });
  },

render: function() {
    var panelInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Panel.deployed().then(function(instance) {
      panelInstance = instance;
      return panelInstance.controlPointCount();
    }).then(function(controlPointCount) {
      var PointsResults = $("#candidatesResults");
      PointsResults.empty();

      for (var i = 1; i <= controlPointCount; i++) {
        panelInstance.controlPoints(i).then(function(controlPoint) {
          var id = controlPoint[0];
          var name = controlPoint[1];
          var desc = controlPoint[2];
          var temp = controlPoint[3];
          var owner = controlPoint[4];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + desc + "</td><td>" + temp + "</td><td>" + owner + "</td></tr>";
          PointsResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  addControlPoint: function() {
      var name = $('#pointName').val();
      var desc = $('#pointDesc').val();
      var temp = $('#pointTemp').val();

      App.contracts.Panel.deployed().then(function(instance) {
    return instance.addControlPoint(name, desc, temp);
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});