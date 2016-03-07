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

let MIN_CALL_INTERVAL = 3000;
handler.analyze = function(doc, ast, options, callback) {
  if (options.minimalAnalysis)
      return callback();
	
  let file = this.workspaceDir + options.path;
  let nowTime = new Date();
  if(!this.lastCallTime || (nowTime.getTime() - this.lastCallTime)>MIN_CALL_INTERVAL ) {
    this.lastCallTime = nowTime.getTime();
    console.log("analyzeCurrent : ",  nowTime)
    tsservice.open(file, doc);
    tsservice.geterr([file], 2000)
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
        this.lastMarkers = markers;
        console.log(markers.length);
        callback(null, markers);
      },
      error => {
        console.error(error);
        callback(error);
      });
  } else {
      return callback(null, this.lastMarkers);
  }
};

//{"command":"open","type":"request","seq":82,"arguments":{"file":"/home/zaca/Development/c9-ws/sample/app.ts"}}
//{"command":"open","type":"request","seq":82,"arguments":{"file":"/home/zaca/Development/c9-ws/sample/Colab.ts"}}
//{"command":"completions","type":"request","seq":78,"arguments":{"file":"/home/zaca/Development/c9-ws/sample/app.ts","line":14,"offset":23}}
//{"command":"completionEntryDetails","type":"request","seq":78,"arguments":{"file":"/home/zaca/Development/c9-ws/sample/app.ts","line":14,"offset":23,"entryNames":["someMethod"]}}
handler.complete = function(doc, ast, pos, options, callback) {
  let file = this.workspaceDir + options.path;
  let line = pos.row + 1;
  let offset = pos.column + 1;

  tsservice.open(file, doc.getValue());
  tsservice.completions(file, line, offset)
    .subscribe(completions => {
      let allCompletions = [];
      let consideredCompletions = completions.slice(0, 15);
      consideredCompletions.forEach(completion => {
        allCompletions.push({
          name: completion.name,
          replaceText: completion.name + (completion.kind === "method" ? "(^^)" : ""),
          icon: completion.kind + (completion.kindModifiers === "private" ? "2" : ""),
          isContextual: true,
          priority: 1
        });
      });
      tsservice.completionEntryDetails(file, line, offset, consideredCompletions.map(c=> c.name))
        .subscribe(completions => {
          let index = 0;
          completions.forEach(completion => {
            allCompletions[index] = {
              name: completion.name,
              replaceText: completion.name + (completion.kind === "method" ? "(^^)" : ""),
              icon: completion.kind + (completion.kindModifiers === "private" ? "2" : ""),
              doc: completion.documentation && completion.documentation.map(dp => dp.text).join(""),
              docHead: completion.displayParts.map(dp => dp.text).join(""),
              meta: completion.name,
              isContextual: true,
              guessTooltip: getCompletionTooltips(file, line, offset, completion),
              priority: 1
            };
            index++;
          });
        }, error => console.debug(error) ),
      callback(null, allCompletions);
    },
    (error) => callback(error)
    );
};

//

function getCompletionTooltips(file, line, offset, completion: ts.server.protocol.CompletionEntryDetails) {
  let guessTooltip = completion.name;
  if (completion.kind === "method") {
    tsservice.signatureHelp(file, line, offset + completion.name.length + 2)
      .subscribe(signatureHelperItems => {
        guessTooltip = signatureHelperItems.items.map((item) => item.parameters.map(param=> param.displayParts.map(dp=> dp.text)).join("")).join(" ");
        console.log(guessTooltip);
      }, err => console.debug(err));
  }
  return guessTooltip;
}


handler.jumpToDefinition = function(doc, ast, pos, options, callback) {
  let file = this.workspaceDir + options.path;
  let line = pos.row + 1;
  let offset = pos.column + 1;
  tsservice.open(file, doc.getValue());
  tsservice.definition(file, line, offset)
    .subscribe((spans) => {
      let definition = spans[0];
      callback(null, {
        row: definition.start.line - 1,
        column: definition.start.offset - 1,
        path: definition.file
      });
    },
    (error) => console.error(error)
    );
};


