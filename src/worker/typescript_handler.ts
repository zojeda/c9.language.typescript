var PluginBase = require("plugins/c9.ide.language/base_handler");
var workerUtil = require("plugins/c9.ide.language/worker_util");
var handler = Object.create(PluginBase);
export = handler;



// var engineio = require("engine.io");
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
        console.log(markers);
        callback(null, markers);
    },
    error => {
      console.error(error);
      callback(error);
    });
};


handler.complete = function(doc, ast, pos, options, callback) {
  console.log("-------------------------");
  var line = doc.getLine(pos.row);
  var identifier = options.identifierPrefix;
  callback(null, [
    {
      name: "foo()",
      replaceText: "foo(^^)",
      icon: "method",
      meta: "FooClass",
      doc: "The foo() method",
      docHead: "FooClass.foo",
      priority: 1
    }
  ]);
};




  // handler.analyzeCurrent = function(path, doc, ast, options, callback) {
  //   // console.log(Object.keys(doc));
  //   if (options.isSave) {
  //     tsservice.open(path);
  //   } else {
  //     tsservice.open(path, doc);
  //   }
  //   tsservice.geterr([path], 1)
  //     .subscribe(diagnostics => {
  //       setTimeout(() => {
  //         let markers = [];
  //         diagnostics.forEach(diag => {
  //           markers.push({
  //             pos: {
  //               sl: diag.start.line - 1,
  //               sc: diag.start.offset - 1,
  //               el: diag.end.line - 1,
  //               ec: diag.end.offset - 1
  //             },
  //             message: diag.text,
  //             level: "error"
  //           });
  //         });
  //         callback(null, {
  //           name: "foo()",
  //           replaceText: "foo",
  //           icon: "method",
  //         }, markers);
  //       }, 20);
  //     });
  // };
