define(function(require, exports, module) {
    main.consumes = ["Plugin", "language"];
    main.provides = ["typescript"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        
        /***** Initialization *****/
        
        var plugin = new Plugin("typescript.z.me", main.consumes);
        var language = imports.language;

        var emit = plugin.getEmitter();
        
        function load() {
            console.log('loading typescript plugin');
            language.registerLanguageHandler(
                "plugins/g9.language.typescript/lib/worker/typescript_handler"
            );
        }
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
            language.unregisterLanguageHandler("plugins/g9.language.typescript/worker/typescript_handler");
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "typescript": plugin
        });
    }
});