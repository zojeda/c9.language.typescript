
require("es6-promise").Promise;

class ServiceConnection {
	callbacks: {[seq: number] : (resp: ts.server.protocol.Response)=>any} = {};

	constructor(private driver : IDriver, onReady: (ServiceConnection)=>any) {
		this.driver.connect(() => {
			this.driver.setMessageHandler((message) => {
			// console.log(message);
			try{
				var re = /{.*}/g;
				var matches = message.match(re);
				if(matches) {
					let msg : ts.server.protocol.Message = JSON.parse(matches[0]);
					if(msg.type === "response") {
						let response = msg as ts.server.protocol.Response;
						this.callbacks[response.request_seq](response.body);
					}
				}
				} catch(error) {
					console.log(error);
				}
			});
			onReady(this);
		});
	}

	sendRequest<Resp extends ts.server.protocol.Response>(request: ts.server.protocol.Request) {
		this.driver.send(JSON.stringify(request)+"\n");
	}

	sendRequestResp<Resp>(request: ts.server.protocol.Request) : Promise<Resp> {
		let executor = (resolve, reject) => {
			this.callbacks[request.seq] = (response)=>{
				resolve(response);
				this.clear(request.seq);
			};
			setTimeout(()=>{
				reject("Timeout");
				this.clear(request.seq);}
			, 2000);
		}
		this.driver.send(JSON.stringify(request)+"\n");
		return new Promise<Resp>(executor);
	}


	private clear(seq: number) {
		delete this.callbacks[seq];
	}
}

export default ServiceConnection;