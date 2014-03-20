'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var _ = require('lodash');
_.str = require('underscore.string');

_.mixin(_.str.exports());

var DrupalBootstrapThemeGenerator = module.exports = function DrupalBootstrapThemeGenerator(args, options, config)
{
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

DrupalBootstrapThemeGenerator.prototype.askFor = function askFor()
{
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts =
  [
    {
      name: 'themeDescription',
      message: 'Please provide a description for your theme'
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
    }
  ];

  this.prompt(prompts, function (props)
  {

    this.themeDescription = props.themeDescription;
    this.themeDrupalVersion = props.themeDrupalVersion;
    this.themeUsesLESS = props.themeUsesLESS;
    this.themeUsesCoffee = props.themeUsesCoffee;

    cb();
  }.bind(this));
};

DrupalBootstrapThemeGenerator.prototype.theme = function theme()
{
  this.mkdir('templates');
  this.template('_template.php', 'template.php');
  this.template('_templates_readme.txt', 'templates/readme.txt');

  this.mkdir('php');
  this.template('_php_readme.txt', 'php/readme.txt');

  this.template('bootstrap_subtheme/_bootstrap_subtheme.info', this.themeName + '.info');
};

DrupalBootstrapThemeGenerator.prototype.images = function images()
{
  this.mkdir('images');
  this.copy('_logo.png', 'logo.png');
  this.copy('bootstrap_subtheme/screenshot.png', 'screenshot.png');
}

DrupalBootstrapThemeGenerator.prototype.gruntfile = function gruntfile()
{
  // don't make a gruntfile if we don't need it
  if(this.themeUsesCoffee || this.themeUsesLESS)
  {
    this.template('_gruntfile.js', 'Gruntfile.js');
  }

  this.template('_package.json', 'package.json');
}

DrupalBootstrapThemeGenerator.prototype.styleFiles = function styleFiles()
{
  this.mkdir('css');
  this.template('_style.css', 'css/style.css');

  if(this.themeUsesLESS)
  {
    //directory structure for LESS
    this.mkdir('less');
    this.mkdir('less/base');

    // bootstrap LESS files
    this.copy('bootstrap_subtheme/less/bootstrap.less', 'less/base/bootstrap.less');
    this.copy('bootstrap_subtheme/less/responsive.less', 'less/base/responsive.less');
    this.copy('bootstrap_subtheme/less/variables.less', 'less/variables.less');
    this.copy('bootstrap_subtheme/less/overrides.less', 'less/overrides.less');

    // primary LESS file
    this.copy('bootstrap_subtheme/less/style.less', 'less/style.less');
  }
  else
  {
    // need to do something about the bootstrap templates if we're just using CSS

  }
}

DrupalBootstrapThemeGenerator.prototype.scriptfiles = function scriptFiles()
{
  this.mkdir('js');
  this.template('_script.js', 'js/script.js');

  if(this.themeUsesCoffee)
  {
    this.mkdir('coffee');
    this.template('_script.coffee', 'coffee/script.coffee');
  }
}

DrupalBootstrapThemeGenerator.prototype.projectfiles = function projectfiles()
{
  this.copy('_bower.json', 'bower.json');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
