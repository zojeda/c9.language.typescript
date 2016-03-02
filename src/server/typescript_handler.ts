var PluginBase = require("plugins/c9.ide.language.jsonalyzer/worker/jsonalyzer_base_handler");
var handler = module.exports = Object.create(PluginBase);

handler.extensions = ["ts"];

handler.languages = ["typescript"];

handler.maxCallInterval = handler.CALL_INTERVAL_BASIC;

var TSService = require(process.env.HOME + "/.c9/node_modules/tsserver-client/lib/TSService").default;
let tsservice;
// import TSService from "tsserver-client";
// let tsservice: TSService;
handler.init = function(options, callback) {
  TSService.connect("stdio", (serviceProxy) => {
    tsservice = serviceProxy;
    callback();
  });
};


handler.analyzeCurrent = function(path, doc, ast, options, callback) {
  // console.log(Object.keys(doc));
  if(options.isSave) {
    tsservice.open(path);
  } else {
    tsservice.open(path, doc);
  }
  tsservice.geterr([path], 1)
    .subscribe(diagnostics => {
      setTimeout(()=> {
        let markers = [];
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
        callback(null, {
            name: "foo()",
            replaceText: "foo",
            icon: "method",
        }, markers);
      }, 20);
    });
};