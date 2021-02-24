
# 安装并运行IPFS
- brew cask install ipfs
- 第一次运行`ipfs init`
- 否则`ipfs daemon`
- /ip4/127.0.0.1/tcp/5001 默认在5001端口监听
-  查看 http://localhost:5001/webui
- 允许跨域请求
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000", "http://127.0.0.1:5001", "https://webui.ipfs.io"]'
  ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST"]'


# 安装并运行BigchainDB
- 事先安装docker-compose
- git clone https://github.com/bigchaindb/bigchaindb.git
-(这个更快)git clone https://github.com.cnpmjs.org/bigchaindb/bigchaindb.git
- cd bigchaindb
- docker更换镜像源
  preferences->docker engine ->编辑json文件
  {
    "registry-mirrors": [
      "https://hub-mirror.c.163.com",
      "https://mirror.baidubce.com",
      "https://0aorl2gr.mirror.aliyuncs.com"
    ]
  }
- 开启`make run`


cd /Users/apple/Desktop/毕设

# 运行后端
- 安装依赖
 	cd backend
 	 npm install --dependencies  --registry=https://registry.npm.taobao.org

    cnpm install --devDependencies --registry=https://registry.npm.taobao.org
- node backend/bin/www

# 运行前端
- 开发环境构建`npm run serve`
- 生产环境构建 `npm run build`


//查看上传的照片
http://127.0.0.1:3000/images/{}
http://localhost:8080/ipfs/[hash]

//查看交易
http://127.0.0.1:9984/api/v1/transactions/{transaction_id}
