'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');

_.mixin(_.str.exports());

var DrupalBootstrapThemeGenerator = module.exports = function DrupalBootstrapThemeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // determine theme name from cwd and form a theme name according to Drupal standards
  this.dirName = path.basename(process.cwd());
  this.themeName = _(_.slugify(this.dirName)).underscored();

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
      message: 'Do you want to use super awesome Coffee Script instead of plain old Javascript?',
      type: 'confirm',
      default: true
    },
    {
      name: 'themeUsesCDN',
      message: 'Do you want to use the Bootstrap CDN? By default this theme uses local files.',
      type: 'confirm',
      default: false
    }
  ];

  this.prompt(prompts, function (props) {
    
    this.themeDescription = props.themeDescription;
    this.themeDrupalVersion = props.themeDrupalVersion;
    // the prompts aren't actually going to do anything for now.
    this.themeUsesLESS = true;
    this.themeUsesCoffee = true;
    this.themeUsesCDN = false;

    cb();
  }.bind(this));
};

DrupalBootstrapThemeGenerator.prototype.app = function app() {

  this.mkdir('css');
  this.mkdir('less');
  this.mkdir('less/base');
  this.mkdir('images');
  this.mkdir('js');
  this.mkdir('coffee');
  this.mkdir('templates');

  this.template('_gruntfile.js', 'Gruntfile.js');

  this.template('bootstrap_subtheme/_bootstrap_subtheme.info', this.themeName + '.info');

  this.copy('bootstrap_subtheme/less/bootstrap.less', 'less/base/bootstrap.less');
  this.copy('bootstrap_subtheme/less/responsive.less', 'less/base/responsive.less');

  this.copy('bootstrap_subtheme/less/variables.less', 'less/variables.less');
  this.copy('bootstrap_subtheme/less/overrides.less', 'less/overrides.less');
  this.copy('bootstrap_subtheme/less/style.less', 'less/style.less');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

DrupalBootstrapThemeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
