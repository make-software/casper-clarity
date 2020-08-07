import { grpc } from '@improbable-eng/grpc-web';

export class GrpcError extends Error {
  constructor(
    public readonly code: grpc.Code,
    public readonly message: string
  ) {
    super(`gRPC error: ${code}: ${message}`);
  }
}
