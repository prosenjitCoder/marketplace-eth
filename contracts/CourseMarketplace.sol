// SPDX-License-Identifier: MIT
pragma solidity >=0.4.2 <0.9.0;

contract CourseMarketplace {
    enum State {
        purchased,
        activated,
        deactivated
    }

    struct Course {
        uint256 id; //32
        uint256 price; //32
        bytes32 proof; //32
        address owner; //20
        State state; //1
    }
}
