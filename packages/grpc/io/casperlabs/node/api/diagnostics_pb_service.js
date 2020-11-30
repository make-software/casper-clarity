// package: io.casperlabs.node.api.diagnostics
// file: io/casperlabs/node/api/diagnostics.proto

var io_casperlabs_node_api_diagnostics_pb = require("../../../../io/casperlabs/node/api/diagnostics_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Diagnostics = (function () {
  function Diagnostics() {}
  Diagnostics.serviceName = "io.casperlabs.node.api.diagnostics.Diagnostics";
  return Diagnostics;
}());

Diagnostics.ListPeers = {
  methodName: "ListPeers",
  service: Diagnostics,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_empty_pb.Empty,
  responseType: io_casperlabs_node_api_diagnostics_pb.Peers
};

exports.Diagnostics = Diagnostics;

function DiagnosticsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DiagnosticsClient.prototype.listPeers = function listPeers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Diagnostics.ListPeers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DiagnosticsClient = DiagnosticsClient;

