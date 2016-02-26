import ServiceConnection from "./ServiceConnection";

class ServiceProxy {
	seq = 0;

	constructor(private connection : ServiceConnection) {}

	open(file: string, fileContent?: string) {
		let openRequest : ts.server.protocol.OpenRequest = {
			command: "open",
			type: "request",
			seq: this.increase_seq(),
			arguments: {
				file: file,
				fileContent: fileContent
			}
		};
		this.connection.sendRequest(openRequest);
	}
	projectInfo(file: string, needFileNameList: boolean) : Promise<ts.server.protocol.ProjectInfo>{
		let projectInfoRequest : ts.server.protocol.ProjectInfoRequest = {
			command: "projectInfo",
			type: "request",
			seq: this.increase_seq(),
			arguments: {
				file: file,
				needFileNameList: needFileNameList
			}
		};

		return this.connection.sendRequestResp(projectInfoRequest);
	}

	exit() {
		let exitRequest : ts.server.protocol.ExitRequest = {
			command: "exit",
			type: "request",
			seq: this.increase_seq()
		};
	}
	
	private increase_seq() {
		let temp = this.seq;
		this.seq += 1;
		return temp;
	}

}

export default ServiceProxy;