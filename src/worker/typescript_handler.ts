var PluginBase = require("plugins/c9.ide.language/base_handler");
var workerUtil = require("plugins/c9.ide.language/worker_util");
var handler = Object.create(PluginBase);
export = handler;

handler.handlesLanguage = function(language) {
  return language === "typescript";
};

import TSService = require("tsserver-client");
let tsservice: TSService;

handler.init = function(options) {
  // workerUtil.spawn("tsserver-client", [], function(err, process) {
  //   if (err) {
  //     throw err;
  //   } ;
  //   console.log(process.pid);
  //   process.stdout.on("data", function(chunk) {
  //       console.log(chunk);
  //   });
  TSService.connect("websocket", (service) => {
    tsservice = service;
  });
  // });

};

handler.analyze = function(doc, ast, options, callback) {
  let path = this.workspaceDir + options.path;
  tsservice.open(path, doc);
  tsservice.geterr([path], 1)
    .subscribe(diagnostics => {
      var markers = [];
      diagnostics.forEach(diag => {
        markers.push({
          pos: {
            sl: diag.start.line - 1,
            sc: diag.start.offset - 1,
            el: diag.end.line - 1,
            ec: diag.end.offset - 1
          },
          message: diag.text,
          level: "error"
        });
      });
      callback(null, markers);
    },
    error => {
      console.error(error);
      callback(error);
    });
};

handler.complete = function(doc, ast, pos, options, callback) {
  let file = this.workspaceDir + options.path;
  let line = pos.row + 1;
  let offset = pos.column + 1;

  tsservice.open(file, doc.getValue());
  tsservice.completions(file, line, offset)
    .then(completions => {
      let allCompletions = [];
      let completionNames = completions.map(comp=> comp.name);
      tsservice.completionEntryDetails(file, line, offset, completionNames)
        .then(completionsDetails  => {
          completionsDetails.forEach(completion => {
            allCompletions.push({
              name: completion.name,
              replaceText: completion.name + (completion.kind === "method" ? "(^^)" : ""),
              icon: completion.kind + (completion.kindModifiers === "private" ? "2" : ""),
              doc: completion.documentation.map(dp => dp.text).join(""),
              docHead: completion.displayParts.map(dp => dp.text).join(""),
              meta: completion.displayParts.map(dp => dp.text).join(""),
              isContextual: true,
              guessTooltip: getCompletionTooltips(file, line, offset, completion),
              priority: 1
            });
          });
          callback(null, allCompletions);
        });
    });
};

function getCompletionTooltips(file, line, offset, completion: ts.server.protocol.CompletionEntryDetails) {
  let guessTooltip = completion.name;
  if(completion.kind=="method") {
    tsservice.signatureHelp(file, line, offset+completion.name.length+2).then( signatureHelperItems => {
      guessTooltip = signatureHelperItems.items.map((item) => item.parameters.map(param=>param.displayParts.map(dp=>dp.text)).join("")).join(" ");
      console.log(guessTooltip);
    });
  }
}


handler.jumpToDefinition = function(doc, ast, pos, options, callback) {
  let file = this.workspaceDir + options.path;
  let line = pos.row + 1;
  let offset = pos.column + 1;
  tsservice.open(file, doc.getValue());
  tsservice.definition(file, line, offset).then((spans) => {
    let definition = spans[0];
    callback(null, {
      row: definition.start.line - 1,
      column: definition.start.offset - 1,
      path: definition.file
    });
  });
};


