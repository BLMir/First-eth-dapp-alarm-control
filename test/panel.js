var Panel = artifacts.require("./Panel.sol");

contract("Panel", function(accounts) {
    var electionInstance;

    it("initializes with two control points", function () {
        return Panel.deployed().then(function (instance) {
            return instance.controlPointCount();
        }).then(function (count) {
            assert.equal(count, 1);
        });
    });
});