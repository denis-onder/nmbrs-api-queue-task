const { user, pass } = require("../config");

module.exports = ({ source_app, group, controller }) => {
  return `{'source_app' => '${source_app}',
    'user' => '${user}',
    'pass' => '${pass}',	
    'group' => ${group},
    'controller' => '${controller}',
}`;
};
