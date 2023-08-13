# node_modules_killer

## Introduce

help you remove node_modules dir

## Install

```shell
pnpm install
pnpm dev
修改src/index.ts的search_dir函数的第一个参数，为你想要在哪个目录下删除node_modules，包括子目录的node_modules也会删除喔，慎重操作喔~~~~
修改后pnpm start
```

## Usage

```
进入需要分析的项目执行
cai-cli analyze
支持限制分析依赖的层级
cai-cli analyze --depth 3 or cai-cli analyze -d 3
```
