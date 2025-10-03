// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {OkidoToken} from "../src/OkidoToken.sol";

contract Deploy is Script {
    function run() external returns (address) {
        // This is the core of the deployment script.
        // It tells Foundry to deploy the OkidoToken contract.

        // Start broadcasting transactions.
        vm.startBroadcast();

        // Create a new instance of the OkidoToken contract.
        OkidoToken token = new OkidoToken();

        // Stop broadcasting.
        vm.stopBroadcast();

        // Return the address of the deployed contract.
        return address(token);
    }
}