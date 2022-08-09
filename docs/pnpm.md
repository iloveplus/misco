---
  title: pnpm
  order: 1
  toc: content
---

## 节省磁盘空间
> 只存储不同版本间差异文件，不复制整个版本包内容
> 不同项目共享同一版本依赖，所有文件存储在磁盘同一位置

## 创建非扁平化node_modules文件夹
使用 npm 或 Yarn Classic 安装依赖项时，所有包都被提升到模块目录的根目录。 因此，项目可以访问到未被添加进当前项目的依赖。默认情况下，pnpm 使用软链的方式将项目的直接依赖添加进模块文件夹的根目录

当然也可以通过修改`node-linker`配置，来定义应该使用什么链接器来安装 Node 包。

`isolated` - 依赖项从虚拟存储 `node_modules/.pnpm` 中建立符号链接

`hoisted` - 创建一个没有符号链接的扁平的 node_modules。 与 npm 或 Yarn Classic 创建 node_modules 一致。 使用此设置的正当理由：
* 您的工具不适用于符号链接。 React Native 项目很可能只有在你使用提升的 node_modules 才能工作。
* 您的项目会被部署到 serverless 服务提供商。 一些 serverless 提供商（例如 AWS Lambda）不支持符号链接。 此问题的另一种解决方案是在部署之前打包您的应用程序。
* 如果你想用 "bundledDependencies" 发布你的包。
* 如果您使用 --preserve-symlinks 标志运行 Node.js。

`pnp` - 没有 node_modules。 Plug'n'Play 是一种 Yarn Berry 使用的创新的 Node 依赖策略。 当使用 pnp 作为您的链接器时，建议同时将 symlink 设置为 false。

`pnpm`使用软链与平铺目录来构建一个嵌套结构。`node_modules` 中每个包的每个文件都是来自内容可寻址存储的硬链接

## pnpm 安装nodejs
```bash
pnpm env use --global latest
pnpm env use --global lts
pnpm env use --global 16
```

## 执行指定目录命令
```bash
pnpm --filter @misro/core build
pnpm --filter './packages/**' build
```

Command	Meaning
```bash
pnpm add sax	#保存到 dependencies
pnpm add -D sax	#保存到 devDependencies
pnpm add -O sax	#保存到 optionalDependencies
pnpm add -g sax	#Install package globally
pnpm add sax@next	#从 next 标签下安装
pnpm add sax@3.0.0	#安装指定版本 3.0.0

# 将每个包中的 typescript 更新为最新版本
pnpm --recursive update typescript@latest

pnpm audit #检查已安装包的已知安全问题, --fix: 强制将不易受攻击的版本，添加覆盖到 package.json 文件中
pnpm outdated #检查过期的 packages。 此命令可以通过提供参数来限制为已安装 packages的一个子集(支持 patterns)。
pnpm list -r #以一个树形结构输出所有的已安装package的版本及其依赖，执行该命令于子目录所有package 中，或者如果执行在一个工作空间时，在工作空间的所有package执行
```

## 锁定依赖包版本号
package.json
```js
{
  "pnpm": {
    "overrides": {
      "lodash@<2.1.0": "^2.1.0"
    }
  }
}
```

