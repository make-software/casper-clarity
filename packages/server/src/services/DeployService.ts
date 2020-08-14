import { grpc } from '@improbable-eng/grpc-web';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { ProtobufMessage } from '@improbable-eng/grpc-web/dist/typings/message';
import { Deploy } from 'casperlabs-grpc/io/casperlabs/casper/consensus/consensus_pb';
import { DeployRequest } from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb';
import { CasperService } from 'casperlabs-grpc/io/casperlabs/node/api/casper_pb_service';

// https://github.com/improbable-eng/grpc-web/tree/master/client/grpc-web
// https://www.npmjs.com/package/@improbable-eng/grpc-web-node-http-transport

export default class DeployService {
  private readonly transport: grpc.TransportFactory;

  constructor(private nodeUrls: string[]) {
    // NOTE: To talk to backends with self-signed certificates we either need to copy the code from
    // https://github.com/improbable-eng/grpc-web/blob/master/client/grpc-web-node-http-transport/src/index.ts
    // and add `rejectUnautorized: false` to the HTTP options, or use the `NODE_TLS_REJECT_UNAUTHORIZED` env var.
    const nodeTransport = NodeHttpTransport();
    this.transport = opts => {
      const onEnd = opts.onEnd;
      // We can see more details about the error if we log it here.
      opts.onEnd = err => {
        if (err !== undefined) {
          console.log(`error calling CasperService`, err);
        }
        onEnd(err);
      };
      return nodeTransport(opts);
    };
  }

  public deploy(deploy: Deploy) {
    return new Promise((topResolve, topReject) => {
      const deployRequest = new DeployRequest();
      deployRequest.setDeploy(deploy);

      // Because Promise.any is experiment supported, we have to use Promise.all
      // here we create inverse logic,reject when request succeed,
      // and resolve when request failed
      const inversePromises = this.nodeUrls.map(nodeUrl => {
        return new Promise<string>((resolve, reject) => {
          grpc.unary(CasperService.Deploy, {
            host: nodeUrl,
            request: deployRequest,
            transport: this.transport,
            onEnd: res => {
              if (res.status === grpc.Code.OK) {
                reject();
              } else {
                resolve(this.errorMsg(res, nodeUrl));
              }
            }
          });
        });
      });

      Promise.all(inversePromises)
        .then(res => {
          // when all request return an error, then we return error
          topReject(res[0]);
        })
        .catch(() => {
          // resolve when any request succeed.
          topResolve();
        });
    });
  }

  private errorMsg<T extends ProtobufMessage>(
    res: grpc.UnaryOutput<T>,
    nodeUrl: string
  ) {
    const msg =
      `error calling CasperService at ${nodeUrl}: ` +
      `gRPC error: code=${res.status}, message="${res.statusMessage}"`;
    console.log(msg);
    return msg;
  }
}
