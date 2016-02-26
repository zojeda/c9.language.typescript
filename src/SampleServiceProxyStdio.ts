import ServiceProxy from "./ServiceProxy";
import ServiceConnection from "./ServiceConnection";


ServiceConnection.connect("stdio", (connenction) => {
	let tsservice = new ServiceProxy(connenction);
    let fileName = __dirname + "sample/Test.ts";
	tsservice.open(fileName);
	tsservice.projectInfo(fileName, true)
		.then(console.log);
});
