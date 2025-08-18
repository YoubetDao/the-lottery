# YUZU 抽奖项目

## 简介

这是一个 **YUZU 抽奖** 项目，旨在通过链上智能合约实现透明、公正的抽奖活动。

需求的 PRD & 设计稿图, 放在了 [material](./material/) 中, 项目设有**货币奖励**，欢迎感兴趣的朋友前往 [According Work](https://according.work/projects/67e166c587803b11c423a469/) 认领任务并参与开发！

## 技术相关

### 合约

本项目的智能合约部分使用 [Hardhat](https://hardhat.org/) 开发，编程语言为 [Solidity](https://docs.soliditylang.org/)。

- 合约框架：Hardhat
- 语言：Solidity
- 功能：抽奖逻辑、参与记录、开奖流程等
- 测试：支持本地单元测试和测试网部署验证

### 前端

前端使用 React 构建，并集成了现代化的 Web3 库以实现区块链交互。

#### 技术栈
- 框架：React + TypeScript
- 包管理器：pnpm
- Web3 库：wagmi, viem
- UI 框架：TailwindCSS

#### 快速开始

1. 安装依赖（在项目根目录下）：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
cd packages/front-end
pnpm start
```

应用将在 `http://localhost:3000` 运行。

## 合约脚本

项目包含多个用于合约部署和管理的脚本。所有脚本都应该在 `packages/contracts` 目录下运行。

### 前置条件

运行任何脚本之前，请确保：

1. 设置环境变量：
```bash
# 在 packages/contracts/ 目录下创建 .env 文件
PRIVATE_KEY=your_private_key_here
```

2. 安装依赖：
```bash
cd packages/contracts
pnpm install
```

### 可用脚本

**1. 部署抽奖合约**
```bash
# 部署到主网
pnpm hardhat run scripts/deployLottery.ts --network eduMainet

# 部署到测试网
pnpm hardhat run scripts/deployLottery.ts --network eduTestnet
```
此脚本部署抽奖合约并自动在区块链浏览器上验证。

**重要提醒**：部署完成后，请记得在 `scripts/config.ts` 中更新新部署的合约地址。

**2. 创建新抽奖轮次**
```bash
# 在主网创建轮次
pnpm hardhat run scripts/createRound.ts --network eduMainet

# 在测试网创建轮次
pnpm hardhat run scripts/createRound.ts --network eduTestnet
```

此脚本创建新的抽奖轮次，预设奖项等级如下：

- 一等奖：0.03 ETH
- 二等奖：0.02 ETH
- 三等奖：0.01 ETH

**3. 购买抽奖彩票**
```bash
# 在主网购买彩票
pnpm hardhat run scripts/buy.ts --network eduMainet

# 在测试网购买彩票
pnpm hardhat run scripts/buy.ts --network eduTestnet
```
此脚本允许用户使用积分代币购买抽奖彩票（每张彩票需要100积分）。

**4. 执行抽奖开奖**
```bash
# 在主网执行开奖
pnpm hardhat run scripts/drawRound.ts --network eduMainet

# 在测试网执行开奖
pnpm hardhat run scripts/drawRound.ts --network eduTestnet
```
此脚本执行当前轮次的抽奖开奖。只有合约拥有者才能执行此操作。

**5. 验证已部署合约**
```bash
# 在主网验证合约
pnpm hardhat run scripts/verify.ts --network eduMainet

# 在测试网验证合约
pnpm hardhat run scripts/verify.ts --network eduTestnet
```
此脚本在区块链浏览器上验证已部署的合约。

### 网络配置

- **eduMainet**：Open Campus Codex 主网（链ID：41923）
- **eduTestnet**：Open Campus Codex 测试网（链ID：656476）

合约地址在 `scripts/config.ts` 中配置，部署后需要更新。

> 注意：在开发过程中可能会看到一些 source map 相关的警告，这些警告是无害的，不会影响应用的功能。


如需参与开发或有任何问题，欢迎在 issues 区留言或联系发起人.