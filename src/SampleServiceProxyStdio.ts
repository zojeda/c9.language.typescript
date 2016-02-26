import ServiceProxy from "./ServiceProxy";


ServiceProxy.connect("stdio", (tsservice) => {
    let fileName = __dirname + "/../sample/Test.ts";
	tsservice.open(fileName);
	tsservice.projectInfo(fileName, false)
		.then(console.log);
    tsservice.geterr([fileName], 20)
});
