class ServiceConnection {
	ws : WebSocket;
	ready = false;
	callbacks: {[seq: number] : (resp: ts.server.protocol.Response)=>any} = {};
	constructor() {
		this.ws = new WebSocket("ws://localhost:8001");
		this.ws.onopen = () => {this.ready = true};
		this.ws.onmessage = (message) => {
			try{
				var re = /{.*}/g;
				
				var matches = message.data.match(re)
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
		};
	}

	sendRequest<Resp extends ts.server.protocol.Response>(request: ts.server.protocol.Request) {
		this.ready && this.ws.send(JSON.stringify(request)+"\n");
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
		this.ready && this.ws.send(JSON.stringify(request)+"\n");
		return new Promise<Resp>(executor);
	}


	private clear(seq: number) {
		delete this.callbacks[seq];
	}
}

export default ServiceConnection;