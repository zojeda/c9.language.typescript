
require("es6-promise").Promise;

class ServiceConnection {
	callbacks: {[seq: number] : (resp: ts.server.protocol.Response)=>any} = {};

	constructor(private driver : IDriver, onReady: (ServiceConnection)=>any) {
		this.driver.connect(() => {
            let partialMessage = "";
            let expectedBodyLenght = 0;
            let headerLength = 0;
			this.driver.setMessageHandler((message: string) => {
                // console.log(message);
                if(partialMessage.length === 0) {
                    // console.log(message, "-----------------");
                    //header content expected
                    let matches = message.match(/Content-Length: (\d+)\s*/);
                    expectedBodyLenght = parseInt(matches[1]);
                    headerLength = matches[0].length;
                }
                console.log("message[%d] | partialMessage[%d] | headerLength[%d] | bodylength[%d]",
                    message.length, partialMessage.length, headerLength, expectedBodyLenght );
                if((message.length+partialMessage.length) == (expectedBodyLenght+headerLength)) {
                    try{
                        let completeMsg = (partialMessage+message).substring(headerLength);
                        let msg : ts.server.protocol.Message = JSON.parse(completeMsg);
                        if(msg.type === "response") {
                            let response = msg as ts.server.protocol.Response;
                            this.callbacks[response.request_seq](response.body);
                        } else {
                            console.log("----\n"+completeMsg+"\n----");
                        }
                       partialMessage = "";
                    } catch(error) {
                        console.log(error);
                    }
                } else {
                        partialMessage = partialMessage+message;
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