define(function (require, exports, module) {
  main.consumes = ["Plugin", "language"];
  main.provides = ["typescript"];
  return main;

  function main(options, imports, register) {
    var Plugin = imports.Plugin;
    console.log("===========   ==============")
    /***** Initialization *****/

    var plugin = new Plugin("typescript.z.me", main.consumes);
    var language = imports.language;

    var emit = plugin.getEmitter();

        
    /***** Lifecycle *****/

    plugin.on("load", function () {
      console.log('== loading typescript plugin ==');
      language.registerLanguageHandler(
        "plugins/language.typescript/lib/worker/typescript_handler"
        );
    });
    plugin.on("unload", function () {
      language.unregisterLanguageHandler("plugins/language.typescript/lib/worker/typescript_handler");
    });
        
    /***** Register and define API *****/

    plugin.freezePublicAPI({

    });

    register(null, {
      "typescript": plugin
    });
  }
});