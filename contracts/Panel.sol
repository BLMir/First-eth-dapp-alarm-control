pragma solidity >=0.4.21 <0.6.0;

contract Panel {

    uint public controlPointCount;

    struct ControlPoint {
        uint id;
        string desc;
        uint temp;
        bool isPositive;
        address owner;
    }

    mapping(uint => ControlPoint) public controlPoints;

    struct Trigger {
        bool positive;
        uint temp;
    }
    constructor() public{
        addControlPoint("con1",30,true);
    }

    function addControlPoint(string memory _desc, uint _temp,bool _isPositive) public {
        controlPointCount++;
        controlPoints[controlPointCount] = ControlPoint(controlPointCount,_desc,_temp,_isPositive, msg.sender);
    }
}
