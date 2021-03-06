###
 # @Author: vickiWu
 # @Date: 2022-02-18 10:04:00
 # @LastEditTime: 2022-04-20 10:27:14
 # @LastEditors: vickiWu
 # @Description: 网站发布部署， 用于faas deploy 配置
 # @FilePath: \d5c-ui\build\deploy-faas.sh
### 
#! /bin/sh
# -e 当命令发生错误的时候，停止脚本执行
# -x 运行的命令用一个+标记之后显示出来
set -ex
mkdir temp_web
# 网站构建
npm run deploy:build
cd temp_web
# 拷贝gh-pages 分支仓库到本地 进入该项目 
git clone --depth 1 -b gh-pages --single-branch https://github.com/vickiwu/d5c-ui.git && cd d5c-ui

# build sub folder 创建子目录
SUB_FOLDER='2.15'
mkdir -p $SUB_FOLDER
# 清除文件
rm -rf *.js *.css *.map static
rm -rf $SUB_FOLDER/**
# /examples/d5c-ui 目录下网站静态文件copy到 temp_web/d5c-ui
cp -rf ../../examples/d5c-ui/** .
cp -rf ../../examples/d5c-ui/** $SUB_FOLDER/
cd ../..

# deploy domestic site 发布
faas deploy daily -P d5c-ui
rm -rf temp_web
