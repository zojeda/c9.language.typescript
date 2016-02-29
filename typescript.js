define(function(require, exports, module) {
    main.consumes = ["Plugin", "jsonalyzer"];
    main.provides = ["typescript"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        console.log("==============================")
        /***** Initialization *****/
        
        var plugin = new Plugin("typescript.z.me", main.consumes);
        var jsonalyzer = imports.jsonalyzer;

        var emit = plugin.getEmitter();
        
        function load() {
            console.log('loading typescript plugin');
            jsonalyzer.registerServerHandler(
                "plugins/language.typescript/lib/server/typescript_handler"
            );
        }
        
        /***** Methods *****/
        
        
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
            jsonalyzer.registerServerHandler("plugins/language.typescript/lib/server/typescript_handler");
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "typescript": plugin
        });
    }
});