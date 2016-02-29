// Compiled using typings@0.6.8
// Source: node_modules/tsserver-client/lib/ServiceConnection.d.ts
declare module 'tsserver-client/ServiceConnection' {
import { Subject } from 'rxjs';
class ServiceConnection {
    private driver;
    constructor(driver: IDriver, onReady: (ServiceConnection) => any);
    sendRequest<Resp extends ts.server.protocol.Response>(request: ts.server.protocol.Request): void;
    sendRequestResp<Resp>(request: ts.server.protocol.Request): Promise<Resp>;
    private clear(seq);
    private callbacks;
    diagnosticSuject: Subject<ts.server.protocol.Diagnostic[]>;
}
export default ServiceConnection;
}

// Compiled using typings@0.6.8
// Source: node_modules/tsserver-client/lib/TSService.d.ts
declare module 'tsserver-client' {
import { Observable } from 'rxjs';
import ServiceConnection from 'tsserver-client/ServiceConnection';
class TSService {
    private connection;
    seq: number;
    static connect(driverName: string, onReady: (service: TSService) => any): void;
    constructor(connection: ServiceConnection);
    open(file: string, fileContent?: string): void;
    projectInfo(file: string, needFileNameList: boolean): Promise<ts.server.protocol.ProjectInfo>;
    completions(file: string, line: number, offset: number): Promise<ts.server.protocol.CompletionEntry[]>;
    geterr(files: string[], delay: number): Observable<ts.server.protocol.Diagnostic[]>;
    exit(): void;
    private increase_seq();
}
export default TSService;
}