import { grpc } from '@improbable-eng/grpc-web';
import { Peers } from 'casperlabs-grpc/io/casperlabs/node/api/diagnostics_pb';
import { Diagnostics as GrpcDiagnosticsService } from 'casperlabs-grpc/io/casperlabs/node/api/diagnostics_pb_service';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { GrpcError } from './Errors';

export default class DiagnosticsService {
  /**
   * Constructor
   *
   * @param url Point at either at a URL on a different port where grpcwebproxy is listening, or use nginx to serve the UI files, the API and gRPC all on the same port without CORS.
   */
  constructor(
    private url: string
  ) {
  }

  /**
   * Get the connected peer nodes
   */
  listPeers(): Promise<Peers> {
    return new Promise<Peers>((resolve, reject) => {
      const request = new Empty();

      grpc.unary(GrpcDiagnosticsService.ListPeers, {
        host: this.url,
        request,
        onEnd: res => {
          if (res.status === grpc.Code.OK) {
            resolve(res.message as Peers);
          } else {
            reject(new GrpcError(res.status, res.statusMessage));
          }
        }
      });
    });
  }
};
