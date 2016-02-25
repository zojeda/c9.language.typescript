var PluginBase = require("plugins/c9.ide.language.jsonalyzer/worker/jsonalyzer_base_handler");

var handler = module.exports = Object.create(PluginBase);

handler.extensions = ["ts"];

handler.languages = ["typescript"];

handler.maxCallInterval = handler.CALL_INTERVAL_BASIC;

handler.init = function(options, callback) {
    console.log(process.release);
    callback();
    
};

handler.analyzeCurrent = function(path, doc, ast, options, callback) {
     var errors = [{
        pos: { sl: 0, sc: 0, el:0, ec:10 },
        message: "some error",
        level: "error"
    }]

    callback(null, null, errors);
}