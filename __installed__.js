define("plugins/language.typescript/__installed__", [],[
    {
        "language.typescript": {},
        "packagePath": "plugins/language.typescript/typescript"
    },
    {
        "packagePath": "plugins/language.typescript/__static__"
    }
]);

define("plugins/language.typescript/typescript",[], function(require, exports, module) {
    main.consumes = ["Plugin", "jsonalyzer"];
    main.provides = ["typescript"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        console.log("==============================")
        
        var plugin = new Plugin("typescript.z.me", main.consumes);
        var jsonalyzer = imports.jsonalyzer;

        var emit = plugin.getEmitter();
        
        function load() {
            console.log('loading typescript plugin');
            jsonalyzer.registerServerHandler(
                "plugins/language.typescript/lib/server/typescript_handler"
            );
        }
        
        
        
        
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
            jsonalyzer.registerServerHandler("plugins/language.typescript/lib/server/typescript_handler");
        });
        
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "typescript": plugin
        });
    }
});

define("plugins/language.typescript/__static__",[], function(require, exports, module) {
    main.consumes = [
        "Plugin", "plugin.debug"
    ];
    main.provides = [];
    return main;
    function main(options, imports, register) {
        var debug = imports["plugin.debug"];
        var Plugin = imports.Plugin;
        var plugin = new Plugin();
        plugin.version = "0.0.1";
        plugin.on("load", function load() {
            [
                {
                    "type": "installer",
                    "filename": "install.js",
                    "data": "2"
                }
            ].forEach(function(x) {
                debug.addStaticPlugin(x.type, "language.typescript", x.filename, x.data, plugin);
            });
        });
        
        plugin.load("language.typescript.bundle");
        
        register(null, {});
    }
});
