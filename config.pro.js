const path = require('path');

function timeformat(time) {
  return {
		time: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}(${time.getHours()}:${time.getMinutes()})`,
		timeValue: time.valueOf()
	}
}

const BUILD_TIME = timeformat(new Date());

const CONFIG = {
  name: 'example-js',
  version: '0.0.1',
  author: 'xiaoYown',
  timeStamp: BUILD_TIME.time,

  templateSuffix: 'ejs',
  templateFileSuffix: 'ejs',
  templatePath: path.resolve(__dirname, `./src/htmls`),
  assetsRoot: path.resolve(__dirname, './dist'),
  assetsFileDirectory: 'static/react', // 文件生成到 dist 下的路径
  assetsPublicPath: '/', // 打包后路径资源前缀
}

module.exports = CONFIG;
