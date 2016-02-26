import proc = require("child_process");

export default class StdIODriver implements IDriver {
	tssserver: proc.ChildProcess;
	connect(done) {
		this.tssserver = proc.spawn("tssserver", [], {shell: true});
		console.log("connecting StdIO...");
        this.tssserver.on("error", console.error)
        done();
        //setTimeout(done, 100);
	}
	setMessageHandler(onMessage: (message: string) => any): any {
		console.log("setting messageHandler");
		this.tssserver.stdout.on("data", (message)=> {
			console.log("receiving ", message.toString());
			onMessage(message.toString());
		});
	}
	send(message: string) {
		console.log("writing ", message)
		this.tssserver.stdin.write(message);
	}
}