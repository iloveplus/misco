# misco

## 新建安装包
```bash
$ npx create-father test
```

执行构建：

 执行全量构建并 watch 变更做增量构建，仅支持 esm/cjs 产物
```bash
$ npx father dev
```

# 执行全量构建
```bash
$ npx father build
```

# 执行依赖预打包
```bash
$ npx father prebundle
```

执行项目检查：

# 检查项目的潜在问题
```bash
$ npx father doctor
```
验证产物并发布 NPM 包。

# 发包
 ```bash
 nrm use npm
 pnpm --filter './packages/**' publish --tag test
 ```