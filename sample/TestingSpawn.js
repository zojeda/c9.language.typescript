var proc = require("child_process");
var tssserver = proc.spawn("tsserver");
tssserver.on("error", console.error)
tssserver.stdout.on("data", function(data) {
    console.log("received : ", data, "--------------" )
});
tssserver.stdin.write('{"command":"open","type":"request","seq":0,"arguments":{"file":"/workspace/c9.language.typescript/src/../sample/Test.ts"}}', "UTF-8", function() {
  console.log("opened file");
  tssserver.stdin.write('{"command":"projectInfo","type":"request","seq":1,"arguments":{"file":"/workspace/c9.language.typescript/src/../sample/Test.ts","needFileNameList":true}}');  
});

setTimeout(function(){
    console.log("saliendo....");
    process.exit();
}, 5000)
//