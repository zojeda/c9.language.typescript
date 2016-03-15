define(function (require, exports, module) {
  main.consumes = ["Plugin", "language", "jsonalyzer"];
  main.provides = ["typescript"];
  return main;

  function main(options, imports, register) {
    var Plugin = imports.Plugin;
    console.log("===========   ==============")
    /***** Initialization *****/

    var plugin = new Plugin("zojeda@gmail.com", main.consumes);
    var language = imports.language;
    var jsonalyzer = imports.jsonalyzer;
    var emit = plugin.getEmitter();

        
    /***** Lifecycle 
     * a;sld,claksmdclakmsdc
     * asdcasdlcmasldcalskdmclamsdc
     * alsdcmlaksmdclakmsdc
     * alsdcmalksdmclaksmdclkasmdc
     * alsmkdclaksmdclkamsdlcmlskdcmalsdc
     * asdckmasdjcasjdckasjndckjasndkjcasdc
     * asdc'asd'cajsdcjansdcjnaksdjcnkajsdc
    *****/

    plugin.on("load", function () {
      console.log('== loading typescript plugin ==');
      language.registerLanguageHandler("plugins/language.typescript/lib/worker/typescript_handler");
      // jsonalyzer.registerWorkerHandler("plugins/language.typescript/lib/worker/typescript_handler");
    });
    plugin.on("unload", function () {
      language.unregisterLanguageHandler("plugins/language.typescript/lib/worker/typescript_handler");
      // jsonalyzer.unregisterWorkerHandler("plugins/language.typescript/lib/worker/typescript_handler");
    });
        
    /***** Register and define API *****/

    plugin.freezePublicAPI({

    });

    register(null, {
      "typescript": plugin
    });
  }
});