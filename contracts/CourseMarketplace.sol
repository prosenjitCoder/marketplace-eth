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
    // owner of the contract
    address payable private owner;
    // mapping of courseHash to course data
    mapping(bytes32 => Course) private ownedCourses;
    // mapping of courseID to courseHash
    mapping(uint256 => bytes32) private ownedCourseHash;
    // number of all courses + id of the courses
    uint256 private totalOwnedCourses;

    /// Course has already a owner!
    error CourseHasOwner();
    /// Only owner has as access!
    error OnlyOwner();

    constructor() {
        setContractOwner(msg.sender);
    }

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        if (hasCourseOwnership(courseHash)) {
            revert CourseHasOwner();
        }
        uint256 id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.purchased
        });
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getCourseCount() external view returns (uint256) {
        return totalOwnedCourses;
    }

    function getCourseHashAtIndex(uint256 index)
        external
        view
        returns (bytes32)
    {
        return ownedCourseHash[index];
    }

    function getCourseByHash(bytes32 courseHash)
        external
        view
        returns (Course memory)
    {
        return ownedCourses[courseHash];
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function hasCourseOwnership(bytes32 courseHash)
        private
        view
        returns (bool)
    {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}

// 0x00000000000000000000000000003130
// 0x0000000000000000000000000000313000000000000000000000000000003130
