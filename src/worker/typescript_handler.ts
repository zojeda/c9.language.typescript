import module = require("module");

import ServiceProxy from "../ServiceProxy";

var baseHandler = require("plugins/c9.ide.language/base_handler");
var workerUtil = require("plugins/c9.ide.language/worker_util");
var handler = module.exports = Object.create(baseHandler);
var tsService = new ServiceProxy();

handler.handlesLanguage = function(language) {
  return language === "typescript";
};

handler.onDocumentOpen = function(path, doc, oldPath, callback) {
  let workspaceDir = "/home/zaca/Development/c9-ws";
  let filePath = workspaceDir + path;
  tsService.open(filePath);
};

handler.analyze = function(value, ast, options, callback) {
  let markers = [];
  let workspaceDir = "/home/zaca/Development/c9-ws";
  let filePath = workspaceDir + options.path;
  tsService.projectInfo(filePath, false)
    .then((projectInfo) => {
      console.log(projectInfo.configFileName);
      callback(null, markers); });
};
