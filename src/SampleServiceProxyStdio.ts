import ServiceProxy from "./ServiceProxy";
import ServiceConnection from "./ServiceConnection";
import StdIODriver from "./driver/StdIODriver";

let driver = new StdIODriver();
ServiceConnection.connect(driver, (connenction) => {
	let tsservice = new ServiceProxy(connenction);
	tsservice.open("/home/zaca/Development/c9-ws/app.ts");
	tsservice.projectInfo("/home/zaca/Development/c9-ws/app.ts", true)
		.then(console.log);
});
