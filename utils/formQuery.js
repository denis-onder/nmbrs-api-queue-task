const { username, pass } = require("../config");

module.exports = ({ source_app, group, controller }) => {
  return `{
    'source_app' => '${source_app}',
    'user' => '${username}',
    'pass' => '${pass}',	
    'group' => ${group},
    'controller' => '${controller}',
}`;
};
