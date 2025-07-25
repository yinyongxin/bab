/* eslint-disable @typescript-eslint/no-require-imports */
// 导入webpack-node-externals模块，用于配置webpack的externals
const nodeExternals = require('webpack-node-externals');
// 导入RunScriptWebpackPlugin插件，用于在构建后运行指定脚本
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

/**
 * 配置webpack构建选项
 * @param {Object} options - 原始的webpack配置选项
 * @param {Object} webpack - webpack实例
 * @returns {Object} 返回合并后的webpack配置对象
 */
module.exports = function (options, webpack) {
  // 合并新的配置选项与原始选项
  return {
    ...options,
    // 在入口文件前添加热更新的入口文件
    entry: ['webpack/hot/poll?100', options.entry],
    // 配置externals，避免将某些模块打包到结果bundle中
    externals: [
      nodeExternals({
        // 允许列表，仅打包此热更新入口文件
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    // 插件数组，添加热模块替换和监视插件
    plugins: [
      ...options.plugins,
      // 添加HotModuleReplacementPlugin插件，实现模块热替换
      new webpack.HotModuleReplacementPlugin(),
      // 添加WatchIgnorePlugin插件，忽略特定文件的变动以避免重新构建
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      // 添加RunScriptWebpackPlugin插件，配置构建后运行的脚本文件
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
  };
};
