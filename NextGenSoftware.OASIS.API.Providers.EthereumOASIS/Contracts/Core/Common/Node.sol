// SPDX-License-Identifier: UNLICENSED
// compiler version must be greater than or equal to 0.8.3 and less than 0.9.0
pragma solidity ^0.8.9;

import "../Entities/Holon.sol";
import "../Enums/NodeType.sol";

struct Node {
    string Id;
    string ParentId;
    Holon Parent;
    string NodeName;
    NodeType NodeType;
}