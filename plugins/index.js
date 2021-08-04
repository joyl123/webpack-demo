const chalk = require("chalk");
var slog = require("single-line-log");

class RuxConsolePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.watchRun.tap("RuxConsolePlugin", (watching) => {
      const modifiedFiles = watching.modifiedFiles;
      if (!modifiedFiles) return;
      for (let file of modifiedFiles.values()) {
        console.log(chalk.green("当前改动文件：" + file));
      }
    });
    compiler.hooks.compile.tap("RuxConsolePlugin", () => {
      this.beginCompile();
    });
    compiler.hooks.done.tap("RuxConsolePlugin", () => {
      this.timer && clearInterval(this.timer);
      console.log(chalk.yellow(" 编译完成"));
    });
  }
  beginCompile() {
    const lineSlog = slog.stdout;
    let text = "开始编译：";
    this.timer = setInterval(() => {
      text += "=";
      lineSlog(chalk.green(text));
    }, 50);
  }
}
module.exports = RuxConsolePlugin;
