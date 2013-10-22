'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var DrupalBootstrapThemeGenerator = module.exports = function DrupalBootstrapThemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(DrupalBootstrapThemeGenerator, yeoman.generators.Base);

DrupalBootstrapThemeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'themeName',
      message: 'What would you like to call your theme?'
    },
    {
      name: 'themeDescription',
      message: 'Please provide a description for your theme'
    },
    {
      name: 'themeDrupalVersion',
      type: 'list',
      message: 'What version of Drupal does this theme require?',
      choices: [
        {
          name: 'Drupal 7',
          value: '7'
        }
      ],
      default: 0
    },
    {
      name: 'themeUsesLESS',
      message: 'Do you want to use super awesome LESS instead of plain old CSS?',
      type: 'confirm',
      default: true
    },
    {
      name: 'themeUsesCoffee',
      message: 'Do you want to use super aweseom Coffee Script instead of plain old Javascript?',
      type: 'confirm',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

DrupalBootstrapThemeGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

DrupalBootstrapThemeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
