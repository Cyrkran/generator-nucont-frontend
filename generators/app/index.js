"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-class ${chalk.red(
          "generator-nucont-frontend"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "module",
        message: "Qual o nome do módulo?"
      },
      {
        type: "input",
        name: "url",
        message: "Qual a url para acessa este mó"
      },
      {
        type: "input",
        name: "controller",
        message: "Qual o nome do controller?"
      },
      {
        type: "confirm",
        name: "extends",
        message: "Extende a classe Controller?",
        default: false
      },
      {
        type: "input",
        name: "providers",
        message: "Quais providers do angular ela utiliza?"
      },
      {
        type: "input",
        name: "imports",
        message: "Quais são os arquivos de importação?"
      },
      {
        type: "input",
        name: "description",
        message: "Comentário de documentação",
        default: ""
      }
    ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * @private
   * Escreve um novo arquivo na pasta server
   * @param {String} template template base
   * @param {String} file String arquivo que serÃ¡ inserido
   */
  _write(template, file) {
    this.fs.copyTpl(
      this.templatePath(template),
      this.destinationPath(`client/modules/${this.props.module}/${file}`),
      this.data
    );
  }

  /**
   * Public
   *
   * Cria os arquivos básicos de módulo e controllers
   *
   */
  writing() {
    /*
    diretório
      %diretorio%.controller.js
      %diretorio%.html
      %diretorio%.module.js
      %diretorio%.sass
      %diretorio%.test.js
    */
    let module = this._getModuleName(this.props.module);

    // this._write("module-html-template.txt", `${module}.html`);
    // this._write("module-sass-template.txt", `${module}.sass`);
    this._write("module-controller-template.txt", `${module}.sass`);
    // this._write("module-template.txt", `${module}.sass`);
    // this._write("module-test-template.txt", `${module}.sass`);
  }

  install() {
    this.installDependencies();
  }
};
