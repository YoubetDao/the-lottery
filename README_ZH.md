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

> 注意：在开发过程中可能会看到一些 source map 相关的警告，这些警告是无害的，不会影响应用的功能。


如需参与开发或有任何问题，欢迎在 issues 区留言或联系发起人.