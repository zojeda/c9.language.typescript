//var ServiceProxy = require("plugins/c9.language.typescript/lib/ServiceProxy");
var PluginBase = require("plugins/c9.ide.language.jsonalyzer/worker/jsonalyzer_base_handler");

var handler = module.exports = Object.create(PluginBase);

handler.extensions = ["ts"];

handler.languages = ["typescript"];

handler.maxCallInterval = handler.CALL_INTERVAL_BASIC;

// let tsservice: ServiceProxy;
// handler.init = function(options, callback) {
//   ServiceProxy.connect("stdio", (serviceProxy) => {
//     tsservice = serviceProxy;
//     callback();
//   })
// };

handler.analyzeCurrent = function(path, doc, ast, options, callback) {
  let projectInfo = "aaaaaa";
//   tsservice.open(path);
//   tsservice.projectInfo(path, true).then(pi => projectInfo = JSON.stringify(pi));
  var errors = [{
    pos: { sl: 0, sc: 0, el: 0, ec: 10 },
    message: "some error " + projectInfo,
    level: "error"
  }];
  callback(null, null, errors);
}