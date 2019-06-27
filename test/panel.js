var Panel = artifacts.require("./Panel.sol");

contract("Panel", function(accounts) {
    var electionInstance;

    it("initializes with 1 control points", function () {
        return Panel.deployed().then(function (instance) {
            return instance.controlPointCount();
        }).then(function (count) {
            assert.equal(count, 1);
        });
    });

    it("it initializes the points with correct data", function() {
        return Panel.deployed().then(function (instance) {
            panelInstance = instance;
            return panelInstance.controlPoints(1);
        }).then(function (controlPoint) {
            assert.equal(controlPoint[0], 1, "correct id");
            assert.equal(controlPoint[1], "con1", "correct name");
            assert.equal(controlPoint[2], "first connection", "correct id");
            assert.equal(controlPoint[3], 30, "correct temp");
        })
    });


});