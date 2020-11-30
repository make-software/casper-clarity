// package: io.casperlabs.node.api.casper
// file: io/casperlabs/node/api/casper.proto

var io_casperlabs_node_api_casper_pb = require("../../../../io/casperlabs/node/api/casper_pb");
var google_protobuf_empty_pb = require("google-protobuf/google/protobuf/empty_pb");
var io_casperlabs_casper_consensus_consensus_pb = require("../../../../io/casperlabs/casper/consensus/consensus_pb");
var io_casperlabs_casper_consensus_info_pb = require("../../../../io/casperlabs/casper/consensus/info_pb");
var io_casperlabs_casper_consensus_state_pb = require("../../../../io/casperlabs/casper/consensus/state_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CasperService = (function () {
  function CasperService() {}
  CasperService.serviceName = "io.casperlabs.node.api.casper.CasperService";
  return CasperService;
}());

CasperService.Deploy = {
  methodName: "Deploy",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.DeployRequest,
  responseType: google_protobuf_empty_pb.Empty
};

CasperService.GetBlockInfo = {
  methodName: "GetBlockInfo",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.GetBlockInfoRequest,
  responseType: io_casperlabs_casper_consensus_info_pb.BlockInfo
};

CasperService.StreamBlockInfos = {
  methodName: "StreamBlockInfos",
  service: CasperService,
  requestStream: false,
  responseStream: true,
  requestType: io_casperlabs_node_api_casper_pb.StreamBlockInfosRequest,
  responseType: io_casperlabs_casper_consensus_info_pb.BlockInfo
};

CasperService.GetDeployInfo = {
  methodName: "GetDeployInfo",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.GetDeployInfoRequest,
  responseType: io_casperlabs_casper_consensus_info_pb.DeployInfo
};

CasperService.StreamBlockDeploys = {
  methodName: "StreamBlockDeploys",
  service: CasperService,
  requestStream: false,
  responseStream: true,
  requestType: io_casperlabs_node_api_casper_pb.StreamBlockDeploysRequest,
  responseType: io_casperlabs_casper_consensus_consensus_pb.Block.ProcessedDeploy
};

CasperService.StreamEvents = {
  methodName: "StreamEvents",
  service: CasperService,
  requestStream: false,
  responseStream: true,
  requestType: io_casperlabs_node_api_casper_pb.StreamEventsRequest,
  responseType: io_casperlabs_casper_consensus_info_pb.Event
};

CasperService.GetBlockState = {
  methodName: "GetBlockState",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.GetBlockStateRequest,
  responseType: io_casperlabs_casper_consensus_state_pb.StoredValueInstance
};

CasperService.BatchGetBlockState = {
  methodName: "BatchGetBlockState",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.BatchGetBlockStateRequest,
  responseType: io_casperlabs_node_api_casper_pb.BatchGetBlockStateResponse
};

CasperService.ListDeployInfos = {
  methodName: "ListDeployInfos",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.ListDeployInfosRequest,
  responseType: io_casperlabs_node_api_casper_pb.ListDeployInfosResponse
};

CasperService.GetLastFinalizedBlockInfo = {
  methodName: "GetLastFinalizedBlockInfo",
  service: CasperService,
  requestStream: false,
  responseStream: false,
  requestType: io_casperlabs_node_api_casper_pb.GetLastFinalizedBlockInfoRequest,
  responseType: io_casperlabs_casper_consensus_info_pb.BlockInfo
};

exports.CasperService = CasperService;

function CasperServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CasperServiceClient.prototype.deploy = function deploy(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.Deploy, {
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

CasperServiceClient.prototype.getBlockInfo = function getBlockInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.GetBlockInfo, {
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

CasperServiceClient.prototype.streamBlockInfos = function streamBlockInfos(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CasperService.StreamBlockInfos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CasperServiceClient.prototype.getDeployInfo = function getDeployInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.GetDeployInfo, {
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

CasperServiceClient.prototype.streamBlockDeploys = function streamBlockDeploys(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CasperService.StreamBlockDeploys, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CasperServiceClient.prototype.streamEvents = function streamEvents(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(CasperService.StreamEvents, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

CasperServiceClient.prototype.getBlockState = function getBlockState(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.GetBlockState, {
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

CasperServiceClient.prototype.batchGetBlockState = function batchGetBlockState(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.BatchGetBlockState, {
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

CasperServiceClient.prototype.listDeployInfos = function listDeployInfos(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.ListDeployInfos, {
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

CasperServiceClient.prototype.getLastFinalizedBlockInfo = function getLastFinalizedBlockInfo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CasperService.GetLastFinalizedBlockInfo, {
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

exports.CasperServiceClient = CasperServiceClient;

