// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 导入我们刚刚手动安装的 OpenZeppelin 库里的 ERC20 标准合约
// 注意这个路径，它会从 lib 文件夹开始寻找
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

/**
 * @title OkidoToken
 * @dev 一个用来代表房地产股份的简单 ERC20 代币
 */
contract OkidoToken is ERC20 {
    /**
     * @dev 构造函数，设置了代币的名称和符号。
     * 初始供应的代币会铸造给部署合约的地址。
     */
    constructor() ERC20("Okido Real Estate Share", "ORES") {
        // _mint(接收地址, 数量)
        // 部署合约的人 (msg.sender) 会得到 1000 个完整的代币。
        // 10**18 是因为 ERC20 代币默认有 18 位小数。
        _mint(msg.sender, 1000 * 10**18);
    }
}