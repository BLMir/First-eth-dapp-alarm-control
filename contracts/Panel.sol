pragma solidity >=0.4.21 <0.6.0;

contract Panel {

    uint public controlPointCount;

    struct ControlPoint {
        uint id;
        string name;
        string desc;
        uint temp;
        address owner;
    }

    mapping(uint => ControlPoint) public controlPoints;

    struct Trigger {
        bool positive;
        uint temp;
    }
    constructor() public{
        addControlPoint("con1","first connection",30);
    }

    function addControlPoint(string memory _name,string memory _desc, uint _temp) public {
        controlPointCount++;
        controlPoints[controlPointCount] = ControlPoint(controlPointCount,_name,_desc,_temp,msg.sender);
    }
}
