# npx 使用笔记：比 npm 更香的命令执行器

> npx 是 npm v5.2 之后自带的工具，刚开始我以为它只是 `npm run` 的替代品，后来才发现它解决了好几个实际痛点。这里记录一下我的理解和使用场景。

## 痛点场景：不用 npx 时有多麻烦

以 ESLint 为例，如果我想在项目里用它：

```bash
npm install eslint --save-dev
./node_modules/.bin/eslint --init
./node_modules/.bin/eslint yourfile.js
```

每次都要敲 `./node_modules/.bin/xxx` 很烦。当然也可以在 `package.json` 里配 script：

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

然后 `npm run lint`。但为了一个临时命令去改 `package.json` 也嫌重。

另一个场景：我想临时用一下 `create-react-app` 创建一个项目，但又不想全局安装它（全局装太多包会乱）。

## **npx 的解决方案**

### **1. 自动找命令**

npx 会自动去 `node_modules/.bin` 和系统 `$PATH` 里找命令。所以：

```bash
npx eslint --init
npx eslint yourfile.js
```

无需 `./node_modules/.bin/`，也不用配 script。

### **2. 临时安装 + 用完即删**

最让我喜欢的功能：**npx 会先下载模块到一个临时目录，执行完后自动删除**。

比如：

```bash
npx create-react-app my-app
```

这条命令会：

- 临时安装 `create-react-app`
- 用它创建项目
- 执行完后删除该临时包，不会污染全局环境

这样既省去了全局安装的步骤，也不会留下无用的包。

## **一些日常的实用场景**

| **场景** | **命令示例** | **说明** |
| --- | --- | --- |
| 运行不同版本的工具 | `npx eslint@8 .` | 临时指定版本，不修改本地依赖 |
| 初始化新项目 | `npx create-vite@latest` | 临时用脚手架创建项目 |
| 执行一次性脚本 | `npx cowsay "hello"` | 用完即删，不用全局安装 |

## **小结**

- npx 的核心是两个能力：**自动查找 `node_modules/.bin` 中的命令** + **临时安装并自动清理**。
- 适合场景：运行项目内的 CLI 工具、临时体验某个 npm 包、快速初始化项目。
- 替代了 `npm run` + 全局安装的很多场景，让命令行更轻量。

**参考资料**

- [npx npm package](https://www.npmjs.com/package/npx)
- [npx npm docs](https://docs.npmjs.com/cli/v8/commands/npx)