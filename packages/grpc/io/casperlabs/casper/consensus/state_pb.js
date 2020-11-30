/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Account', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.BigInt', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Any', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.FixedList', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.List', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Map', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Option', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Result', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Simple', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Tuple1', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Tuple2', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLType.Tuple3', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValue', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.List', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ContractPackage', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ContractPackage.Group', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ContractPackage.Version', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ContractVersionKey', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ContractWasm', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.IntList', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Key', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Key.Address', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Key.Hash', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Key.URef', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.NamedKey', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.ProtocolVersion', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.SemVer', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.StoredValue', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.StoredValueInstance', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.StringList', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Unit', null, global);
goog.exportSymbol('proto.io.casperlabs.casper.consensus.state.Value', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.SemVer = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.SemVer, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.SemVer.displayName = 'proto.io.casperlabs.casper.consensus.state.SemVer';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.SemVer.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.SemVer} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.toObject = function(includeInstance, msg) {
  var f, obj = {
    major: msg.getMajor(),
    minor: msg.getMinor(),
    patch: msg.getPatch()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.SemVer}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.SemVer;
  return proto.io.casperlabs.casper.consensus.state.SemVer.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.SemVer} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.SemVer}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMajor(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMinor(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPatch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.SemVer} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.SemVer.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMajor();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = this.getMinor();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = this.getPatch();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.SemVer} The clone.
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.SemVer} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional uint32 major = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.getMajor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.setMajor = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 minor = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.getMinor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.setMinor = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional uint32 patch = 3;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.getPatch = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.SemVer.prototype.setPatch = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.Contract.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Contract.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.toObject = function(includeInstance, msg) {
  var f, obj = {
    contractPackageHash: msg.getContractPackageHash_asB64(),
    contractWasmHash: msg.getContractWasmHash_asB64(),
    namedKeysList: jspb.Message.toObjectList(msg.getNamedKeysList(),
    proto.io.casperlabs.casper.consensus.state.NamedKey.toObject, includeInstance),
    entryPointsList: jspb.Message.toObjectList(msg.getEntryPointsList(),
    proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.toObject, includeInstance),
    protocolVersion: (f = msg.getProtocolVersion()) && proto.io.casperlabs.casper.consensus.state.ProtocolVersion.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract}
 */
proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract;
  return proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract}
 */
proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContractPackageHash(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContractWasmHash(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.NamedKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinaryFromReader);
      msg.getNamedKeysList().push(value);
      msg.setNamedKeysList(msg.getNamedKeysList());
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.deserializeBinaryFromReader);
      msg.getEntryPointsList().push(value);
      msg.setEntryPointsList(msg.getEntryPointsList());
      break;
    case 6:
      var value = new proto.io.casperlabs.casper.consensus.state.ProtocolVersion;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ProtocolVersion.deserializeBinaryFromReader);
      msg.setProtocolVersion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getContractPackageHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getContractWasmHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getNamedKeysList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.NamedKey.serializeBinaryToWriter
    );
  }
  f = this.getEntryPointsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.serializeBinaryToWriter
    );
  }
  f = this.getProtocolVersion();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.casperlabs.casper.consensus.state.ProtocolVersion.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes contract_package_hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractPackageHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes contract_package_hash = 1;
 * This is a type-conversion wrapper around `getContractPackageHash()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractPackageHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContractPackageHash()));
};


/**
 * optional bytes contract_package_hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractPackageHash()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractPackageHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContractPackageHash()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.setContractPackageHash = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes contract_wasm_hash = 2;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractWasmHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes contract_wasm_hash = 2;
 * This is a type-conversion wrapper around `getContractWasmHash()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractWasmHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContractWasmHash()));
};


/**
 * optional bytes contract_wasm_hash = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractWasmHash()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getContractWasmHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContractWasmHash()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.setContractWasmHash = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * repeated NamedKey named_keys = 3;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getNamedKeysList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.NamedKey, 3));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>} value  */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.setNamedKeysList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.prototype.clearNamedKeysList = function() {
  this.setNamedKeysList([]);
};


/**
 * repeated EntryPoint entry_points = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint>}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getEntryPointsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint, 4));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint>} value  */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.setEntryPointsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.prototype.clearEntryPointsList = function() {
  this.setEntryPointsList([]);
};


/**
 * optional ProtocolVersion protocol_version = 6;
 * @return {proto.io.casperlabs.casper.consensus.state.ProtocolVersion}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.getProtocolVersion = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ProtocolVersion} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ProtocolVersion, 6));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ProtocolVersion|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.setProtocolVersion = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.prototype.clearProtocolVersion = function() {
  this.setProtocolVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.prototype.hasProtocolVersion = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.repeatedFields_, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.repeatedFields_ = [2];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_ = [[4,5],[6,7]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.AccessCase = {
  ACCESS_NOT_SET: 0,
  PUBLIC: 4,
  GROUPS: 5
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.AccessCase}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getAccessCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.AccessCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[0]));
};

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.EntryPointTypeCase = {
  ENTRY_POINT_TYPE_NOT_SET: 0,
  SESSION: 6,
  CONTRACT: 7
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.EntryPointTypeCase}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getEntryPointTypeCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.EntryPointTypeCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[1]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName(),
    argsList: jspb.Message.toObjectList(msg.getArgsList(),
    proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.toObject, includeInstance),
    ret: (f = msg.getRet()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    pb_public: (f = msg.getPublic()) && proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.toObject(includeInstance, f),
    groups: (f = msg.getGroups()) && proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.toObject(includeInstance, f),
    session: (f = msg.getSession()) && proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.toObject(includeInstance, f),
    contract: (f = msg.getContract()) && proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.deserializeBinaryFromReader);
      msg.getArgsList().push(value);
      msg.setArgsList(msg.getArgsList());
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setRet(value);
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.deserializeBinaryFromReader);
      msg.setPublic(value);
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.deserializeBinaryFromReader);
      msg.setGroups(value);
      break;
    case 6:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.deserializeBinaryFromReader);
      msg.setSession(value);
      break;
    case 7:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.deserializeBinaryFromReader);
      msg.setContract(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getArgsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.serializeBinaryToWriter
    );
  }
  f = this.getRet();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getPublic();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.serializeBinaryToWriter
    );
  }
  f = this.getGroups();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.serializeBinaryToWriter
    );
  }
  f = this.getSession();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.serializeBinaryToWriter
    );
  }
  f = this.getContract();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated Arg args = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg>}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getArgsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg, 2));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg>} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setArgsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearArgsList = function() {
  this.setArgsList([]);
};


/**
 * optional CLType ret = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getRet = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setRet = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearRet = function() {
  this.setRet(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.hasRet = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Public public = 4;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getPublic = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public, 4));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setPublic = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearPublic = function() {
  this.setPublic(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.hasPublic = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Groups groups = 5;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getGroups = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups, 5));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setGroups = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearGroups = function() {
  this.setGroups(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.hasGroups = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SessionType session = 6;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getSession = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType, 6));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setSession = function(value) {
  jspb.Message.setOneofWrapperField(this, 6, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[1], value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearSession = function() {
  this.setSession(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.hasSession = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ContractType contract = 7;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.getContract = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType, 7));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.setContract = function(value) {
  jspb.Message.setOneofWrapperField(this, 7, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.oneofGroups_[1], value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.clearContract = function() {
  this.setContract(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.prototype.hasContract = function() {
  return jspb.Message.getField(this, 7) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName(),
    clType: (f = msg.getClType()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setClType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getClType();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional CLType cl_type = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.getClType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.setClType = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.clearClType = function() {
  this.setClType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Arg.prototype.hasClType = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Public} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.SessionType} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.ContractType} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.displayName = 'proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.toObject = function(includeInstance, msg) {
  var f, obj = {
    groupsList: jspb.Message.toObjectList(msg.getGroupsList(),
    proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups;
  return proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.deserializeBinaryFromReader);
      msg.getGroupsList().push(value);
      msg.setGroupsList(msg.getGroupsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getGroupsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated Group groups = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group>}
 */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.getGroupsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group, 1));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group>} value  */
proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.setGroupsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Groups.prototype.clearGroupsList = function() {
  this.setGroupsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ContractVersionKey, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ContractVersionKey.displayName = 'proto.io.casperlabs.casper.consensus.state.ContractVersionKey';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ContractVersionKey.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.toObject = function(includeInstance, msg) {
  var f, obj = {
    protocolVersionMajor: msg.getProtocolVersionMajor(),
    contractVersion: msg.getContractVersion()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ContractVersionKey;
  return proto.io.casperlabs.casper.consensus.state.ContractVersionKey.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setProtocolVersionMajor(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setContractVersion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getProtocolVersionMajor();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = this.getContractVersion();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ContractVersionKey} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional uint32 protocol_version_major = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.getProtocolVersionMajor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.setProtocolVersionMajor = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 contract_version = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.getContractVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.ContractVersionKey.prototype.setContractVersion = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.ContractPackage.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ContractPackage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ContractPackage.displayName = 'proto.io.casperlabs.casper.consensus.state.ContractPackage';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.repeatedFields_ = [2,3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.toObject = function(includeInstance, msg) {
  var f, obj = {
    accessKey: (f = msg.getAccessKey()) && proto.io.casperlabs.casper.consensus.state.Key.URef.toObject(includeInstance, f),
    activeVersionsList: jspb.Message.toObjectList(msg.getActiveVersionsList(),
    proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.toObject, includeInstance),
    disabledVersionsList: jspb.Message.toObjectList(msg.getDisabledVersionsList(),
    proto.io.casperlabs.casper.consensus.state.ContractVersionKey.toObject, includeInstance),
    groupsList: jspb.Message.toObjectList(msg.getGroupsList(),
    proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ContractPackage;
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.URef;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader);
      msg.setAccessKey(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractPackage.Version;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.deserializeBinaryFromReader);
      msg.getActiveVersionsList().push(value);
      msg.setActiveVersionsList(msg.getActiveVersionsList());
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractVersionKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractVersionKey.deserializeBinaryFromReader);
      msg.getDisabledVersionsList().push(value);
      msg.setDisabledVersionsList(msg.getDisabledVersionsList());
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractPackage.Group;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.deserializeBinaryFromReader);
      msg.getGroupsList().push(value);
      msg.setGroupsList(msg.getGroupsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAccessKey();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter
    );
  }
  f = this.getActiveVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.serializeBinaryToWriter
    );
  }
  f = this.getDisabledVersionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractVersionKey.serializeBinaryToWriter
    );
  }
  f = this.getGroupsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ContractPackage} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Key.URef access_key = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.getAccessKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.URef} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.URef, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.URef|undefined} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.setAccessKey = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.clearAccessKey = function() {
  this.setAccessKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.hasAccessKey = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated Version active_versions = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version>}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.getActiveVersionsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractPackage.Version, 2));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version>} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.setActiveVersionsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.clearActiveVersionsList = function() {
  this.setActiveVersionsList([]);
};


/**
 * repeated ContractVersionKey disabled_versions = 3;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.ContractVersionKey>}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.getDisabledVersionsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.ContractVersionKey>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractVersionKey, 3));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.ContractVersionKey>} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.setDisabledVersionsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.clearDisabledVersionsList = function() {
  this.setDisabledVersionsList([]);
};


/**
 * repeated Group groups = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group>}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.getGroupsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractPackage.Group, 4));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group>} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.setGroupsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.prototype.clearGroupsList = function() {
  this.setGroupsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ContractPackage.Version, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.displayName = 'proto.io.casperlabs.casper.consensus.state.ContractPackage.Version';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.toObject = function(includeInstance, msg) {
  var f, obj = {
    version: (f = msg.getVersion()) && proto.io.casperlabs.casper.consensus.state.ContractVersionKey.toObject(includeInstance, f),
    contractHash: msg.getContractHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ContractPackage.Version;
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractVersionKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractVersionKey.deserializeBinaryFromReader);
      msg.setVersion(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setContractHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getVersion();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractVersionKey.serializeBinaryToWriter
    );
  }
  f = this.getContractHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Version} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional ContractVersionKey version = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.ContractVersionKey}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.getVersion = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ContractVersionKey} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractVersionKey, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ContractVersionKey|undefined} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.setVersion = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.clearVersion = function() {
  this.setVersion(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.hasVersion = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes contract_hash = 2;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.getContractHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes contract_hash = 2;
 * This is a type-conversion wrapper around `getContractHash()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.getContractHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getContractHash()));
};


/**
 * optional bytes contract_hash = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getContractHash()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.getContractHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getContractHash()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Version.prototype.setContractHash = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ContractPackage.Group, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.displayName = 'proto.io.casperlabs.casper.consensus.state.ContractPackage.Group';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.toObject = function(includeInstance, msg) {
  var f, obj = {
    group: (f = msg.getGroup()) && proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.toObject(includeInstance, f),
    urefsList: jspb.Message.toObjectList(msg.getUrefsList(),
    proto.io.casperlabs.casper.consensus.state.Key.URef.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ContractPackage.Group;
  return proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.deserializeBinaryFromReader);
      msg.setGroup(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.URef;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader);
      msg.getUrefsList().push(value);
      msg.setUrefsList(msg.getUrefsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getGroup();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group.serializeBinaryToWriter
    );
  }
  f = this.getUrefsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ContractPackage.Group} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Contract.EntryPoint.Group group = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.getGroup = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract.EntryPoint.Group|undefined} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.setGroup = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.clearGroup = function() {
  this.setGroup(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.hasGroup = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated Key.URef urefs = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.Key.URef>}
 */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.getUrefsList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.Key.URef>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.URef, 2));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.Key.URef>} value  */
proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.setUrefsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.ContractPackage.Group.prototype.clearUrefsList = function() {
  this.setUrefsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_ = [[1,2,3,4,5,6,7,8,9,10]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.CLType.VariantsCase = {
  VARIANTS_NOT_SET: 0,
  SIMPLE_TYPE: 1,
  OPTION_TYPE: 2,
  LIST_TYPE: 3,
  FIXED_LIST_TYPE: 4,
  RESULT_TYPE: 5,
  MAP_TYPE: 6,
  TUPLE1_TYPE: 7,
  TUPLE2_TYPE: 8,
  TUPLE3_TYPE: 9,
  ANY_TYPE: 10
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.VariantsCase}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getVariantsCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.CLType.VariantsCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.toObject = function(includeInstance, msg) {
  var f, obj = {
    simpleType: jspb.Message.getField(msg, 1),
    optionType: (f = msg.getOptionType()) && proto.io.casperlabs.casper.consensus.state.CLType.Option.toObject(includeInstance, f),
    listType: (f = msg.getListType()) && proto.io.casperlabs.casper.consensus.state.CLType.List.toObject(includeInstance, f),
    fixedListType: (f = msg.getFixedListType()) && proto.io.casperlabs.casper.consensus.state.CLType.FixedList.toObject(includeInstance, f),
    resultType: (f = msg.getResultType()) && proto.io.casperlabs.casper.consensus.state.CLType.Result.toObject(includeInstance, f),
    mapType: (f = msg.getMapType()) && proto.io.casperlabs.casper.consensus.state.CLType.Map.toObject(includeInstance, f),
    tuple1Type: (f = msg.getTuple1Type()) && proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.toObject(includeInstance, f),
    tuple2Type: (f = msg.getTuple2Type()) && proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.toObject(includeInstance, f),
    tuple3Type: (f = msg.getTuple3Type()) && proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.toObject(includeInstance, f),
    anyType: (f = msg.getAnyType()) && proto.io.casperlabs.casper.consensus.state.CLType.Any.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType;
  return proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Simple} */ (reader.readEnum());
      msg.setSimpleType(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Option;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Option.deserializeBinaryFromReader);
      msg.setOptionType(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.List;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.List.deserializeBinaryFromReader);
      msg.setListType(value);
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.FixedList;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.FixedList.deserializeBinaryFromReader);
      msg.setFixedListType(value);
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Result;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Result.deserializeBinaryFromReader);
      msg.setResultType(value);
      break;
    case 6:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Map;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Map.deserializeBinaryFromReader);
      msg.setMapType(value);
      break;
    case 7:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple1;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.deserializeBinaryFromReader);
      msg.setTuple1Type(value);
      break;
    case 8:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple2;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.deserializeBinaryFromReader);
      msg.setTuple2Type(value);
      break;
    case 9:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple3;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.deserializeBinaryFromReader);
      msg.setTuple3Type(value);
      break;
    case 10:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType.Any;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.Any.deserializeBinaryFromReader);
      msg.setAnyType(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = jspb.Message.getField(this, 1);
  if (f != null) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = this.getOptionType();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Option.serializeBinaryToWriter
    );
  }
  f = this.getListType();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.List.serializeBinaryToWriter
    );
  }
  f = this.getFixedListType();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.FixedList.serializeBinaryToWriter
    );
  }
  f = this.getResultType();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Result.serializeBinaryToWriter
    );
  }
  f = this.getMapType();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Map.serializeBinaryToWriter
    );
  }
  f = this.getTuple1Type();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.serializeBinaryToWriter
    );
  }
  f = this.getTuple2Type();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.serializeBinaryToWriter
    );
  }
  f = this.getTuple3Type();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.serializeBinaryToWriter
    );
  }
  f = this.getAnyType();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.Any.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Simple simple_type = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Simple}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getSimpleType = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.CLType.Simple} */ (!this.hasSimpleType() ? 0 : jspb.Message.getField(this, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Simple|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setSimpleType = function(value) {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearSimpleType = function() {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasSimpleType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Option option_type = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getOptionType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Option} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Option, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Option|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setOptionType = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearOptionType = function() {
  this.setOptionType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasOptionType = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional List list_type = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.List}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getListType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.List} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.List, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.List|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setListType = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearListType = function() {
  this.setListType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasListType = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional FixedList fixed_list_type = 4;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getFixedListType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.FixedList} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.FixedList, 4));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.FixedList|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setFixedListType = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearFixedListType = function() {
  this.setFixedListType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasFixedListType = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Result result_type = 5;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getResultType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Result} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Result, 5));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Result|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setResultType = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearResultType = function() {
  this.setResultType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasResultType = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Map map_type = 6;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getMapType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Map} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Map, 6));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Map|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setMapType = function(value) {
  jspb.Message.setOneofWrapperField(this, 6, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearMapType = function() {
  this.setMapType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasMapType = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional Tuple1 tuple1_type = 7;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getTuple1Type = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Tuple1, 7));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Tuple1|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setTuple1Type = function(value) {
  jspb.Message.setOneofWrapperField(this, 7, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearTuple1Type = function() {
  this.setTuple1Type(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasTuple1Type = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Tuple2 tuple2_type = 8;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getTuple2Type = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Tuple2, 8));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Tuple2|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setTuple2Type = function(value) {
  jspb.Message.setOneofWrapperField(this, 8, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearTuple2Type = function() {
  this.setTuple2Type(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasTuple2Type = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional Tuple3 tuple3_type = 9;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getTuple3Type = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Tuple3, 9));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Tuple3|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setTuple3Type = function(value) {
  jspb.Message.setOneofWrapperField(this, 9, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearTuple3Type = function() {
  this.setTuple3Type(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasTuple3Type = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional Any any_type = 10;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType.Any}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.getAnyType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType.Any} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType.Any, 10));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType.Any|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.setAnyType = function(value) {
  jspb.Message.setOneofWrapperField(this, 10, proto.io.casperlabs.casper.consensus.state.CLType.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLType.prototype.clearAnyType = function() {
  this.setAnyType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.prototype.hasAnyType = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Simple = {
  BOOL: 0,
  I32: 1,
  I64: 2,
  U8: 3,
  U32: 4,
  U64: 5,
  U128: 6,
  U256: 7,
  U512: 8,
  UNIT: 9,
  STRING: 10,
  KEY: 11,
  UREF: 12
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Option, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Option.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Option';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Option.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Option} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.toObject = function(includeInstance, msg) {
  var f, obj = {
    inner: (f = msg.getInner()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Option;
  return proto.io.casperlabs.casper.consensus.state.CLType.Option.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Option} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setInner(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Option} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getInner();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Option} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Option} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType inner = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.getInner = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.setInner = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.clearInner = function() {
  this.setInner(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Option.prototype.hasInner = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.List = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.List, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.List.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.List';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.List.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.List} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.toObject = function(includeInstance, msg) {
  var f, obj = {
    inner: (f = msg.getInner()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.List}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.List;
  return proto.io.casperlabs.casper.consensus.state.CLType.List.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.List} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.List}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setInner(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.List} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getInner();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.List} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.List} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType inner = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.getInner = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.setInner = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.clearInner = function() {
  this.setInner(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.List.prototype.hasInner = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.FixedList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.FixedList.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.FixedList';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.FixedList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.toObject = function(includeInstance, msg) {
  var f, obj = {
    inner: (f = msg.getInner()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    len: msg.getLen()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.FixedList;
  return proto.io.casperlabs.casper.consensus.state.CLType.FixedList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setInner(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setLen(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getInner();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getLen();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.FixedList} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType inner = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.getInner = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.setInner = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.clearInner = function() {
  this.setInner(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.hasInner = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint32 len = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.getLen = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.CLType.FixedList.prototype.setLen = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Result, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Result.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Result';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Result.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Result} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.toObject = function(includeInstance, msg) {
  var f, obj = {
    ok: (f = msg.getOk()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    err: (f = msg.getErr()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Result;
  return proto.io.casperlabs.casper.consensus.state.CLType.Result.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Result} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setOk(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setErr(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Result} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getOk();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getErr();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Result} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Result} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType ok = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.getOk = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.setOk = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.clearOk = function() {
  this.setOk(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.hasOk = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CLType err = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.getErr = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.setErr = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.clearErr = function() {
  this.setErr(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Result.prototype.hasErr = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Map, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Map.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Map';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Map.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Map} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: (f = msg.getKey()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    value: (f = msg.getValue()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Map;
  return proto.io.casperlabs.casper.consensus.state.CLType.Map.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Map} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setKey(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Map} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getKey();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Map} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Map} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType key = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.getKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.setKey = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.clearKey = function() {
  this.setKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.hasKey = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CLType value = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.getValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.clearValue = function() {
  this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Map.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Tuple1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Tuple1';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.toObject = function(includeInstance, msg) {
  var f, obj = {
    type0: (f = msg.getType0()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple1;
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType0(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getType0();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple1} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType type0 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.getType0 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.setType0 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.clearType0 = function() {
  this.setType0(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple1.prototype.hasType0 = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Tuple2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Tuple2';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.toObject = function(includeInstance, msg) {
  var f, obj = {
    type0: (f = msg.getType0()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    type1: (f = msg.getType1()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple2;
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType0(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType1(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getType0();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getType1();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple2} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType type0 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.getType0 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.setType0 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.clearType0 = function() {
  this.setType0(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.hasType0 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CLType type1 = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.getType1 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.setType1 = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.clearType1 = function() {
  this.setType1(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple2.prototype.hasType1 = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Tuple3, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Tuple3';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.toObject = function(includeInstance, msg) {
  var f, obj = {
    type0: (f = msg.getType0()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    type1: (f = msg.getType1()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    type2: (f = msg.getType2()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Tuple3;
  return proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType0(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType1(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setType2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getType0();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getType1();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getType2();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Tuple3} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType type0 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.getType0 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.setType0 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.clearType0 = function() {
  this.setType0(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.hasType0 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CLType type1 = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.getType1 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.setType1 = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.clearType1 = function() {
  this.setType1(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.hasType1 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional CLType type2 = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.getType2 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.setType2 = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.clearType2 = function() {
  this.setType2(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Tuple3.prototype.hasType2 = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLType.Any, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLType.Any.displayName = 'proto.io.casperlabs.casper.consensus.state.CLType.Any';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLType.Any.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Any} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Any}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLType.Any;
  return proto.io.casperlabs.casper.consensus.state.CLType.Any.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Any} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Any}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLType.Any} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLType.Any} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLType.Any.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLType.Any} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValue.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValue';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValue} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.toObject = function(includeInstance, msg) {
  var f, obj = {
    clType: (f = msg.getClType()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    serializedValue: msg.getSerializedValue_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValue}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValue;
  return proto.io.casperlabs.casper.consensus.state.CLValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValue}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setClType(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSerializedValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValue} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValue.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClType();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getSerializedValue_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValue} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValue} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType cl_type = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.getClType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.setClType = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValue.prototype.clearClType = function() {
  this.setClType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.hasClType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes serialized_value = 2;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.getSerializedValue = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes serialized_value = 2;
 * This is a type-conversion wrapper around `getSerializedValue()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.getSerializedValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSerializedValue()));
};


/**
 * optional bytes serialized_value = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSerializedValue()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.getSerializedValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSerializedValue()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.CLValue.prototype.setSerializedValue = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.toObject = function(includeInstance, msg) {
  var f, obj = {
    clType: (f = msg.getClType()) && proto.io.casperlabs.casper.consensus.state.CLType.toObject(includeInstance, f),
    value: (f = msg.getValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLType;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLType.deserializeBinaryFromReader);
      msg.setClType(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClType();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLType.serializeBinaryToWriter
    );
  }
  f = this.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLType cl_type = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLType}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.getClType = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLType} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLType, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLType|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.setClType = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.clearClType = function() {
  this.setClType(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.hasClType = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Value value = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.getValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.clearValue = function() {
  this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_ = [[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.ValueCase = {
  VALUE_NOT_SET: 0,
  BOOL_VALUE: 1,
  I32: 2,
  I64: 3,
  U8: 4,
  U32: 5,
  U64: 6,
  U128: 7,
  U256: 8,
  U512: 9,
  UNIT: 10,
  STR_VALUE: 11,
  KEY: 12,
  UREF: 13,
  OPTION_VALUE: 14,
  LIST_VALUE: 15,
  FIXED_LIST_VALUE: 16,
  RESULT_VALUE: 17,
  MAP_VALUE: 18,
  TUPLE1_VALUE: 19,
  TUPLE2_VALUE: 20,
  TUPLE3_VALUE: 21,
  BYTES_VALUE: 22
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.ValueCase}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getValueCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject = function(includeInstance, msg) {
  var f, obj = {
    boolValue: jspb.Message.getField(msg, 1),
    i32: jspb.Message.getField(msg, 2),
    i64: jspb.Message.getField(msg, 3),
    u8: jspb.Message.getField(msg, 4),
    u32: jspb.Message.getField(msg, 5),
    u64: jspb.Message.getField(msg, 6),
    u128: (f = msg.getU128()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.toObject(includeInstance, f),
    u256: (f = msg.getU256()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.toObject(includeInstance, f),
    u512: (f = msg.getU512()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.toObject(includeInstance, f),
    unit: (f = msg.getUnit()) && proto.io.casperlabs.casper.consensus.state.Unit.toObject(includeInstance, f),
    strValue: jspb.Message.getField(msg, 11),
    key: (f = msg.getKey()) && proto.io.casperlabs.casper.consensus.state.Key.toObject(includeInstance, f),
    uref: (f = msg.getUref()) && proto.io.casperlabs.casper.consensus.state.Key.URef.toObject(includeInstance, f),
    optionValue: (f = msg.getOptionValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.toObject(includeInstance, f),
    listValue: (f = msg.getListValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.toObject(includeInstance, f),
    fixedListValue: (f = msg.getFixedListValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.toObject(includeInstance, f),
    resultValue: (f = msg.getResultValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.toObject(includeInstance, f),
    mapValue: (f = msg.getMapValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.toObject(includeInstance, f),
    tuple1Value: (f = msg.getTuple1Value()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.toObject(includeInstance, f),
    tuple2Value: (f = msg.getTuple2Value()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.toObject(includeInstance, f),
    tuple3Value: (f = msg.getTuple3Value()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.toObject(includeInstance, f),
    bytesValue: msg.getBytesValue_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setBoolValue(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setI32(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setI64(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setU8(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setU32(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setU64(value);
      break;
    case 7:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.deserializeBinaryFromReader);
      msg.setU128(value);
      break;
    case 8:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.deserializeBinaryFromReader);
      msg.setU256(value);
      break;
    case 9:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.deserializeBinaryFromReader);
      msg.setU512(value);
      break;
    case 10:
      var value = new proto.io.casperlabs.casper.consensus.state.Unit;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Unit.deserializeBinaryFromReader);
      msg.setUnit(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setStrValue(value);
      break;
    case 12:
      var value = new proto.io.casperlabs.casper.consensus.state.Key;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.deserializeBinaryFromReader);
      msg.setKey(value);
      break;
    case 13:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.URef;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader);
      msg.setUref(value);
      break;
    case 14:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.deserializeBinaryFromReader);
      msg.setOptionValue(value);
      break;
    case 15:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.List;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.deserializeBinaryFromReader);
      msg.setListValue(value);
      break;
    case 16:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.deserializeBinaryFromReader);
      msg.setFixedListValue(value);
      break;
    case 17:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.deserializeBinaryFromReader);
      msg.setResultValue(value);
      break;
    case 18:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.deserializeBinaryFromReader);
      msg.setMapValue(value);
      break;
    case 19:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.deserializeBinaryFromReader);
      msg.setTuple1Value(value);
      break;
    case 20:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.deserializeBinaryFromReader);
      msg.setTuple2Value(value);
      break;
    case 21:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.deserializeBinaryFromReader);
      msg.setTuple3Value(value);
      break;
    case 22:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBytesValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = jspb.Message.getField(this, 1);
  if (f != null) {
    writer.writeBool(
      1,
      f
    );
  }
  f = jspb.Message.getField(this, 2);
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = jspb.Message.getField(this, 3);
  if (f != null) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = jspb.Message.getField(this, 4);
  if (f != null) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = jspb.Message.getField(this, 5);
  if (f != null) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = jspb.Message.getField(this, 6);
  if (f != null) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = this.getU128();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.serializeBinaryToWriter
    );
  }
  f = this.getU256();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.serializeBinaryToWriter
    );
  }
  f = this.getU512();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.serializeBinaryToWriter
    );
  }
  f = this.getUnit();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.io.casperlabs.casper.consensus.state.Unit.serializeBinaryToWriter
    );
  }
  f = jspb.Message.getField(this, 11);
  if (f != null) {
    writer.writeString(
      11,
      f
    );
  }
  f = this.getKey();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.serializeBinaryToWriter
    );
  }
  f = this.getUref();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter
    );
  }
  f = this.getOptionValue();
  if (f != null) {
    writer.writeMessage(
      14,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.serializeBinaryToWriter
    );
  }
  f = this.getListValue();
  if (f != null) {
    writer.writeMessage(
      15,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.serializeBinaryToWriter
    );
  }
  f = this.getFixedListValue();
  if (f != null) {
    writer.writeMessage(
      16,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.serializeBinaryToWriter
    );
  }
  f = this.getResultValue();
  if (f != null) {
    writer.writeMessage(
      17,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.serializeBinaryToWriter
    );
  }
  f = this.getMapValue();
  if (f != null) {
    writer.writeMessage(
      18,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.serializeBinaryToWriter
    );
  }
  f = this.getTuple1Value();
  if (f != null) {
    writer.writeMessage(
      19,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.serializeBinaryToWriter
    );
  }
  f = this.getTuple2Value();
  if (f != null) {
    writer.writeMessage(
      20,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.serializeBinaryToWriter
    );
  }
  f = this.getTuple3Value();
  if (f != null) {
    writer.writeMessage(
      21,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.serializeBinaryToWriter
    );
  }
  f = jspb.Message.getField(this, 22);
  if (f != null) {
    writer.writeBytes(
      22,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bool bool_value = 1;
 * Note that Boolean fields may be set to 0/1 when serialized from a Java server.
 * You should avoid comparisons like {@code val === true/false} in those cases.
 * @return {boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getBoolValue = function() {
  return /** @type {boolean} */ (!this.hasBoolValue() ? false : jspb.Message.getField(this, 1));
};


/** @param {boolean?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setBoolValue = function(value) {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearBoolValue = function() {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasBoolValue = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 i32 = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getI32 = function() {
  return /** @type {number} */ (!this.hasI32() ? 0 : jspb.Message.getField(this, 2));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setI32 = function(value) {
  jspb.Message.setOneofField(this, 2, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearI32 = function() {
  jspb.Message.setOneofField(this, 2, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasI32 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional int64 i64 = 3;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getI64 = function() {
  return /** @type {number} */ (!this.hasI64() ? 0 : jspb.Message.getField(this, 3));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setI64 = function(value) {
  jspb.Message.setOneofField(this, 3, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearI64 = function() {
  jspb.Message.setOneofField(this, 3, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasI64 = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional int32 u8 = 4;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU8 = function() {
  return /** @type {number} */ (!this.hasU8() ? 0 : jspb.Message.getField(this, 4));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU8 = function(value) {
  jspb.Message.setOneofField(this, 4, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU8 = function() {
  jspb.Message.setOneofField(this, 4, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU8 = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional uint32 u32 = 5;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU32 = function() {
  return /** @type {number} */ (!this.hasU32() ? 0 : jspb.Message.getField(this, 5));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU32 = function(value) {
  jspb.Message.setOneofField(this, 5, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU32 = function() {
  jspb.Message.setOneofField(this, 5, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU32 = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional uint64 u64 = 6;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU64 = function() {
  return /** @type {number} */ (!this.hasU64() ? 0 : jspb.Message.getField(this, 6));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU64 = function(value) {
  jspb.Message.setOneofField(this, 6, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU64 = function() {
  jspb.Message.setOneofField(this, 6, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU64 = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional U128 u128 = 7;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU128 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128, 7));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU128 = function(value) {
  jspb.Message.setOneofWrapperField(this, 7, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU128 = function() {
  this.setU128(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU128 = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional U256 u256 = 8;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU256 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256, 8));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU256 = function(value) {
  jspb.Message.setOneofWrapperField(this, 8, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU256 = function() {
  this.setU256(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU256 = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional U512 u512 = 9;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getU512 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512, 9));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setU512 = function(value) {
  jspb.Message.setOneofWrapperField(this, 9, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearU512 = function() {
  this.setU512(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasU512 = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional Unit unit = 10;
 * @return {proto.io.casperlabs.casper.consensus.state.Unit}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getUnit = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Unit} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Unit, 10));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Unit|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setUnit = function(value) {
  jspb.Message.setOneofWrapperField(this, 10, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearUnit = function() {
  this.setUnit(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasUnit = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional string str_value = 11;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getStrValue = function() {
  return /** @type {string} */ (!this.hasStrValue() ? "" : jspb.Message.getField(this, 11));
};


/** @param {string?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setStrValue = function(value) {
  jspb.Message.setOneofField(this, 11, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearStrValue = function() {
  jspb.Message.setOneofField(this, 11, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasStrValue = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional Key key = 12;
 * @return {proto.io.casperlabs.casper.consensus.state.Key}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key, 12));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setKey = function(value) {
  jspb.Message.setOneofWrapperField(this, 12, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearKey = function() {
  this.setKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasKey = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional Key.URef uref = 13;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getUref = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.URef} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.URef, 13));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.URef|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setUref = function(value) {
  jspb.Message.setOneofWrapperField(this, 13, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearUref = function() {
  this.setUref(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasUref = function() {
  return jspb.Message.getField(this, 13) != null;
};


/**
 * optional Option option_value = 14;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getOptionValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option, 14));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setOptionValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 14, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearOptionValue = function() {
  this.setOptionValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasOptionValue = function() {
  return jspb.Message.getField(this, 14) != null;
};


/**
 * optional List list_value = 15;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.List}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getListValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.List, 15));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.List|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setListValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 15, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearListValue = function() {
  this.setListValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasListValue = function() {
  return jspb.Message.getField(this, 15) != null;
};


/**
 * optional FixedList fixed_list_value = 16;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getFixedListValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList, 16));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setFixedListValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 16, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearFixedListValue = function() {
  this.setFixedListValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasFixedListValue = function() {
  return jspb.Message.getField(this, 16) != null;
};


/**
 * optional Result result_value = 17;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getResultValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result, 17));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setResultValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 17, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearResultValue = function() {
  this.setResultValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasResultValue = function() {
  return jspb.Message.getField(this, 17) != null;
};


/**
 * optional Map map_value = 18;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getMapValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map, 18));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setMapValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 18, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearMapValue = function() {
  this.setMapValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasMapValue = function() {
  return jspb.Message.getField(this, 18) != null;
};


/**
 * optional Tuple1 tuple1_value = 19;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getTuple1Value = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1, 19));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setTuple1Value = function(value) {
  jspb.Message.setOneofWrapperField(this, 19, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearTuple1Value = function() {
  this.setTuple1Value(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasTuple1Value = function() {
  return jspb.Message.getField(this, 19) != null;
};


/**
 * optional Tuple2 tuple2_value = 20;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getTuple2Value = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2, 20));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setTuple2Value = function(value) {
  jspb.Message.setOneofWrapperField(this, 20, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearTuple2Value = function() {
  this.setTuple2Value(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasTuple2Value = function() {
  return jspb.Message.getField(this, 20) != null;
};


/**
 * optional Tuple3 tuple3_value = 21;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getTuple3Value = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3, 21));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setTuple3Value = function(value) {
  jspb.Message.setOneofWrapperField(this, 21, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearTuple3Value = function() {
  this.setTuple3Value(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasTuple3Value = function() {
  return jspb.Message.getField(this, 21) != null;
};


/**
 * optional bytes bytes_value = 22;
 * @return {(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getBytesValue = function() {
  return /** @type {(string|Uint8Array)} */ (!this.hasBytesValue() ? "" : jspb.Message.getField(this, 22));
};


/**
 * optional bytes bytes_value = 22;
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getBytesValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBytesValue()));
};


/**
 * optional bytes bytes_value = 22;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.getBytesValue_asU8 = function() {
  return /** @type {Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBytesValue()));
};


/** @param {(string|Uint8Array)|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.setBytesValue = function(value) {
  jspb.Message.setOneofField(this, 22, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.clearBytesValue = function() {
  jspb.Message.setOneofField(this, 22, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.prototype.hasBytesValue = function() {
  return jspb.Message.getField(this, 22) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: msg.getValue()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string value = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U128.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: msg.getValue()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string value = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U256.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: msg.getValue()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string value = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.U512.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: (f = msg.getValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value value = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.getValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.clearValue = function() {
  this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Option.prototype.hasValue = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.List, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.List';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.toObject = function(includeInstance, msg) {
  var f, obj = {
    valuesList: jspb.Message.toObjectList(msg.getValuesList(),
    proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.List;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.getValuesList().push(value);
      msg.setValuesList(msg.getValuesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValuesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.List} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated Value values = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.getValuesList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.setValuesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.List.prototype.clearValuesList = function() {
  this.setValuesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.toObject = function(includeInstance, msg) {
  var f, obj = {
    length: msg.getLength(),
    valuesList: jspb.Message.toObjectList(msg.getValuesList(),
    proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setLength(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.getValuesList().push(value);
      msg.setValuesList(msg.getValuesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getLength();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = this.getValuesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional uint32 length = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.getLength = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.setLength = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated Value values = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.getValuesList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value>} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.setValuesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.FixedList.prototype.clearValuesList = function() {
  this.setValuesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.ValueCase = {
  VALUE_NOT_SET: 0,
  OK: 1,
  ERR: 2
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.ValueCase}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.getValueCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.toObject = function(includeInstance, msg) {
  var f, obj = {
    ok: (f = msg.getOk()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f),
    err: (f = msg.getErr()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setOk(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setErr(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getOk();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
  f = this.getErr();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value ok = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.getOk = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.setOk = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.clearOk = function() {
  this.setOk(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.hasOk = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Value err = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.getErr = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.setErr = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.clearErr = function() {
  this.setErr(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Result.prototype.hasErr = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.toObject = function(includeInstance, msg) {
  var f, obj = {
    valuesList: jspb.Message.toObjectList(msg.getValuesList(),
    proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.deserializeBinaryFromReader);
      msg.getValuesList().push(value);
      msg.setValuesList(msg.getValuesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValuesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated MapEntry values = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry>}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.getValuesList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry, 1));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry>} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.setValuesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Map.prototype.clearValuesList = function() {
  this.setValuesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: (f = msg.getKey()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f),
    value: (f = msg.getValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setKey(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getKey();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
  f = this.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value key = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.getKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.setKey = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.clearKey = function() {
  this.setKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.hasKey = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Value value = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.getValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.clearValue = function() {
  this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.MapEntry.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.toObject = function(includeInstance, msg) {
  var f, obj = {
    value1: (f = msg.getValue1()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue1(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue1();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value value_1 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.getValue1 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.setValue1 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.clearValue1 = function() {
  this.setValue1(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple1.prototype.hasValue1 = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.toObject = function(includeInstance, msg) {
  var f, obj = {
    value1: (f = msg.getValue1()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f),
    value2: (f = msg.getValue2()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue1(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue2(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue1();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
  f = this.getValue2();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value value_1 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.getValue1 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.setValue1 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.clearValue1 = function() {
  this.setValue1(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.hasValue1 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Value value_2 = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.getValue2 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.setValue2 = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.clearValue2 = function() {
  this.setValue2(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple2.prototype.hasValue2 = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.displayName = 'proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.toObject = function(includeInstance, msg) {
  var f, obj = {
    value1: (f = msg.getValue1()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f),
    value2: (f = msg.getValue2()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f),
    value3: (f = msg.getValue3()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3;
  return proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue1(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue2(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.deserializeBinaryFromReader);
      msg.setValue3(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue1();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
  f = this.getValue2();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
  f = this.getValue3();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} The clone.
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Value value_1 = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.getValue1 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.setValue1 = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.clearValue1 = function() {
  this.setValue1(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.hasValue1 = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Value value_2 = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.getValue2 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.setValue2 = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.clearValue2 = function() {
  this.setValue2(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.hasValue2 = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Value value_3 = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.getValue3 = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance.Value|undefined} value  */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.setValue3 = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.clearValue3 = function() {
  this.setValue3(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.CLValueInstance.Tuple3.prototype.hasValue3 = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ContractWasm, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ContractWasm.displayName = 'proto.io.casperlabs.casper.consensus.state.ContractWasm';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ContractWasm.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractWasm} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.toObject = function(includeInstance, msg) {
  var f, obj = {
    wasm: msg.getWasm_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractWasm}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ContractWasm;
  return proto.io.casperlabs.casper.consensus.state.ContractWasm.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractWasm} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractWasm}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setWasm(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ContractWasm} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getWasm_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ContractWasm} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ContractWasm} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes wasm = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.getWasm = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes wasm = 1;
 * This is a type-conversion wrapper around `getWasm()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.getWasm_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getWasm()));
};


/**
 * optional bytes wasm = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getWasm()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.getWasm_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getWasm()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.ContractWasm.prototype.setWasm = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.StoredValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.StoredValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.StoredValue.displayName = 'proto.io.casperlabs.casper.consensus.state.StoredValue';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_ = [[1,2,3,4,5]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.VariantsCase = {
  VARIANTS_NOT_SET: 0,
  CL_VALUE: 1,
  ACCOUNT: 2,
  CONTRACT: 3,
  CONTRACT_PACKAGE: 4,
  CONTRACT_WASM: 5
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.StoredValue.VariantsCase}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getVariantsCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.StoredValue.VariantsCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.StoredValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValue} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.toObject = function(includeInstance, msg) {
  var f, obj = {
    clValue: (f = msg.getClValue()) && proto.io.casperlabs.casper.consensus.state.CLValue.toObject(includeInstance, f),
    account: (f = msg.getAccount()) && proto.io.casperlabs.casper.consensus.state.Account.toObject(includeInstance, f),
    contract: (f = msg.getContract()) && proto.io.casperlabs.casper.consensus.state.Contract.toObject(includeInstance, f),
    contractPackage: (f = msg.getContractPackage()) && proto.io.casperlabs.casper.consensus.state.ContractPackage.toObject(includeInstance, f),
    contractWasm: (f = msg.getContractWasm()) && proto.io.casperlabs.casper.consensus.state.ContractWasm.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValue}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.StoredValue;
  return proto.io.casperlabs.casper.consensus.state.StoredValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValue}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValue;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValue.deserializeBinaryFromReader);
      msg.setClValue(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Account;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Account.deserializeBinaryFromReader);
      msg.setAccount(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinaryFromReader);
      msg.setContract(value);
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractPackage;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractPackage.deserializeBinaryFromReader);
      msg.setContractPackage(value);
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractWasm;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractWasm.deserializeBinaryFromReader);
      msg.setContractWasm(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValue} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClValue();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValue.serializeBinaryToWriter
    );
  }
  f = this.getAccount();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Account.serializeBinaryToWriter
    );
  }
  f = this.getContract();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.serializeBinaryToWriter
    );
  }
  f = this.getContractPackage();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractPackage.serializeBinaryToWriter
    );
  }
  f = this.getContractWasm();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractWasm.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValue} The clone.
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.StoredValue} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLValue cl_value = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValue}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getClValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValue} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValue, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValue|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.setClValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.clearClValue = function() {
  this.setClValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.hasClValue = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Account account = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.Account}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getAccount = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Account} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Account, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Account|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.setAccount = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.clearAccount = function() {
  this.setAccount(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.hasAccount = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Contract contract = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getContract = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.setContract = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.clearContract = function() {
  this.setContract(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.hasContract = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ContractPackage contract_package = 4;
 * @return {proto.io.casperlabs.casper.consensus.state.ContractPackage}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getContractPackage = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ContractPackage} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractPackage, 4));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ContractPackage|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.setContractPackage = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.clearContractPackage = function() {
  this.setContractPackage(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.hasContractPackage = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ContractWasm contract_wasm = 5;
 * @return {proto.io.casperlabs.casper.consensus.state.ContractWasm}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.getContractWasm = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ContractWasm} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractWasm, 5));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ContractWasm|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.setContractWasm = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.io.casperlabs.casper.consensus.state.StoredValue.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.clearContractWasm = function() {
  this.setContractWasm(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValue.prototype.hasContractWasm = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.StoredValueInstance, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.StoredValueInstance.displayName = 'proto.io.casperlabs.casper.consensus.state.StoredValueInstance';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_ = [[1,2,3,4,5]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.ValueCase = {
  VALUE_NOT_SET: 0,
  CL_VALUE: 1,
  ACCOUNT: 2,
  CONTRACT: 3,
  CONTRACT_PACKAGE: 4,
  CONTRACT_WASM: 5
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.StoredValueInstance.ValueCase}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getValueCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.StoredValueInstance.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.StoredValueInstance.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.toObject = function(includeInstance, msg) {
  var f, obj = {
    clValue: (f = msg.getClValue()) && proto.io.casperlabs.casper.consensus.state.CLValueInstance.toObject(includeInstance, f),
    account: (f = msg.getAccount()) && proto.io.casperlabs.casper.consensus.state.Account.toObject(includeInstance, f),
    contract: (f = msg.getContract()) && proto.io.casperlabs.casper.consensus.state.Contract.toObject(includeInstance, f),
    contractPackage: (f = msg.getContractPackage()) && proto.io.casperlabs.casper.consensus.state.ContractPackage.toObject(includeInstance, f),
    contractWasm: (f = msg.getContractWasm()) && proto.io.casperlabs.casper.consensus.state.ContractWasm.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.StoredValueInstance;
  return proto.io.casperlabs.casper.consensus.state.StoredValueInstance.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.CLValueInstance;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.CLValueInstance.deserializeBinaryFromReader);
      msg.setClValue(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Account;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Account.deserializeBinaryFromReader);
      msg.setAccount(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinaryFromReader);
      msg.setContract(value);
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractPackage;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractPackage.deserializeBinaryFromReader);
      msg.setContractPackage(value);
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.ContractWasm;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.ContractWasm.deserializeBinaryFromReader);
      msg.setContractWasm(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClValue();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.CLValueInstance.serializeBinaryToWriter
    );
  }
  f = this.getAccount();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Account.serializeBinaryToWriter
    );
  }
  f = this.getContract();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.serializeBinaryToWriter
    );
  }
  f = this.getContractPackage();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractPackage.serializeBinaryToWriter
    );
  }
  f = this.getContractWasm();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.ContractWasm.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance} The clone.
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.StoredValueInstance} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional CLValueInstance cl_value = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.CLValueInstance}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getClValue = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.CLValueInstance} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.CLValueInstance, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.CLValueInstance|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.setClValue = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.clearClValue = function() {
  this.setClValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.hasClValue = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Account account = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.Account}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getAccount = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Account} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Account, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Account|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.setAccount = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.clearAccount = function() {
  this.setAccount(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.hasAccount = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Contract contract = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getContract = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.setContract = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.clearContract = function() {
  this.setContract(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.hasContract = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ContractPackage contract_package = 4;
 * @return {proto.io.casperlabs.casper.consensus.state.ContractPackage}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getContractPackage = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ContractPackage} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractPackage, 4));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ContractPackage|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.setContractPackage = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.clearContractPackage = function() {
  this.setContractPackage(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.hasContractPackage = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional ContractWasm contract_wasm = 5;
 * @return {proto.io.casperlabs.casper.consensus.state.ContractWasm}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.getContractWasm = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.ContractWasm} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.ContractWasm, 5));
};


/** @param {proto.io.casperlabs.casper.consensus.state.ContractWasm|undefined} value  */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.setContractWasm = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.io.casperlabs.casper.consensus.state.StoredValueInstance.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.clearContractWasm = function() {
  this.setContractWasm(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.StoredValueInstance.prototype.hasContractWasm = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Value = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Value, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Value.displayName = 'proto.io.casperlabs.casper.consensus.state.Value';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_ = [[1,2,3,4,5,6,7,8,9,10,11,12]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.Value.ValueCase = {
  VALUE_NOT_SET: 0,
  INT_VALUE: 1,
  BYTES_VALUE: 2,
  INT_LIST: 3,
  STRING_VALUE: 4,
  ACCOUNT: 5,
  CONTRACT: 6,
  STRING_LIST: 7,
  NAMED_KEY: 8,
  BIG_INT: 9,
  KEY: 10,
  UNIT: 11,
  LONG_VALUE: 12
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.Value.ValueCase}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getValueCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.Value.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Value.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Value} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Value.toObject = function(includeInstance, msg) {
  var f, obj = {
    intValue: jspb.Message.getField(msg, 1),
    bytesValue: msg.getBytesValue_asB64(),
    intList: (f = msg.getIntList()) && proto.io.casperlabs.casper.consensus.state.IntList.toObject(includeInstance, f),
    stringValue: jspb.Message.getField(msg, 4),
    account: (f = msg.getAccount()) && proto.io.casperlabs.casper.consensus.state.Account.toObject(includeInstance, f),
    contract: (f = msg.getContract()) && proto.io.casperlabs.casper.consensus.state.Contract.toObject(includeInstance, f),
    stringList: (f = msg.getStringList()) && proto.io.casperlabs.casper.consensus.state.StringList.toObject(includeInstance, f),
    namedKey: (f = msg.getNamedKey()) && proto.io.casperlabs.casper.consensus.state.NamedKey.toObject(includeInstance, f),
    bigInt: (f = msg.getBigInt()) && proto.io.casperlabs.casper.consensus.state.BigInt.toObject(includeInstance, f),
    key: (f = msg.getKey()) && proto.io.casperlabs.casper.consensus.state.Key.toObject(includeInstance, f),
    unit: (f = msg.getUnit()) && proto.io.casperlabs.casper.consensus.state.Unit.toObject(includeInstance, f),
    longValue: jspb.Message.getField(msg, 12)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Value}
 */
proto.io.casperlabs.casper.consensus.state.Value.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Value;
  return proto.io.casperlabs.casper.consensus.state.Value.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Value} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Value}
 */
proto.io.casperlabs.casper.consensus.state.Value.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setIntValue(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBytesValue(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.IntList;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.IntList.deserializeBinaryFromReader);
      msg.setIntList(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setStringValue(value);
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.Account;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Account.deserializeBinaryFromReader);
      msg.setAccount(value);
      break;
    case 6:
      var value = new proto.io.casperlabs.casper.consensus.state.Contract;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Contract.deserializeBinaryFromReader);
      msg.setContract(value);
      break;
    case 7:
      var value = new proto.io.casperlabs.casper.consensus.state.StringList;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.StringList.deserializeBinaryFromReader);
      msg.setStringList(value);
      break;
    case 8:
      var value = new proto.io.casperlabs.casper.consensus.state.NamedKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinaryFromReader);
      msg.setNamedKey(value);
      break;
    case 9:
      var value = new proto.io.casperlabs.casper.consensus.state.BigInt;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.BigInt.deserializeBinaryFromReader);
      msg.setBigInt(value);
      break;
    case 10:
      var value = new proto.io.casperlabs.casper.consensus.state.Key;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.deserializeBinaryFromReader);
      msg.setKey(value);
      break;
    case 11:
      var value = new proto.io.casperlabs.casper.consensus.state.Unit;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Unit.deserializeBinaryFromReader);
      msg.setUnit(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setLongValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Value} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Value.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = jspb.Message.getField(this, 1);
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = jspb.Message.getField(this, 2);
  if (f != null) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getIntList();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.IntList.serializeBinaryToWriter
    );
  }
  f = jspb.Message.getField(this, 4);
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
  f = this.getAccount();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.Account.serializeBinaryToWriter
    );
  }
  f = this.getContract();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.casperlabs.casper.consensus.state.Contract.serializeBinaryToWriter
    );
  }
  f = this.getStringList();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.io.casperlabs.casper.consensus.state.StringList.serializeBinaryToWriter
    );
  }
  f = this.getNamedKey();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.io.casperlabs.casper.consensus.state.NamedKey.serializeBinaryToWriter
    );
  }
  f = this.getBigInt();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.io.casperlabs.casper.consensus.state.BigInt.serializeBinaryToWriter
    );
  }
  f = this.getKey();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.serializeBinaryToWriter
    );
  }
  f = this.getUnit();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.io.casperlabs.casper.consensus.state.Unit.serializeBinaryToWriter
    );
  }
  f = jspb.Message.getField(this, 12);
  if (f != null) {
    writer.writeUint64(
      12,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Value} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Value} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional int32 int_value = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getIntValue = function() {
  return /** @type {number} */ (!this.hasIntValue() ? 0 : jspb.Message.getField(this, 1));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setIntValue = function(value) {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearIntValue = function() {
  jspb.Message.setOneofField(this, 1, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasIntValue = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes bytes_value = 2;
 * @return {(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getBytesValue = function() {
  return /** @type {(string|Uint8Array)} */ (!this.hasBytesValue() ? "" : jspb.Message.getField(this, 2));
};


/**
 * optional bytes bytes_value = 2;
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getBytesValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBytesValue()));
};


/**
 * optional bytes bytes_value = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytesValue()`
 * @return {Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getBytesValue_asU8 = function() {
  return /** @type {Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBytesValue()));
};


/** @param {(string|Uint8Array)|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setBytesValue = function(value) {
  jspb.Message.setOneofField(this, 2, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearBytesValue = function() {
  jspb.Message.setOneofField(this, 2, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasBytesValue = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional IntList int_list = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.IntList}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getIntList = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.IntList} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.IntList, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.IntList|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setIntList = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearIntList = function() {
  this.setIntList(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasIntList = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string string_value = 4;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getStringValue = function() {
  return /** @type {string} */ (!this.hasStringValue() ? "" : jspb.Message.getField(this, 4));
};


/** @param {string?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setStringValue = function(value) {
  jspb.Message.setOneofField(this, 4, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearStringValue = function() {
  jspb.Message.setOneofField(this, 4, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasStringValue = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Account account = 5;
 * @return {proto.io.casperlabs.casper.consensus.state.Account}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getAccount = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Account} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Account, 5));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Account|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setAccount = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearAccount = function() {
  this.setAccount(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasAccount = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Contract contract = 6;
 * @return {proto.io.casperlabs.casper.consensus.state.Contract}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getContract = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Contract} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Contract, 6));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Contract|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setContract = function(value) {
  jspb.Message.setOneofWrapperField(this, 6, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearContract = function() {
  this.setContract(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasContract = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional StringList string_list = 7;
 * @return {proto.io.casperlabs.casper.consensus.state.StringList}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getStringList = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.StringList} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.StringList, 7));
};


/** @param {proto.io.casperlabs.casper.consensus.state.StringList|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setStringList = function(value) {
  jspb.Message.setOneofWrapperField(this, 7, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearStringList = function() {
  this.setStringList(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasStringList = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional NamedKey named_key = 8;
 * @return {proto.io.casperlabs.casper.consensus.state.NamedKey}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getNamedKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.NamedKey} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.NamedKey, 8));
};


/** @param {proto.io.casperlabs.casper.consensus.state.NamedKey|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setNamedKey = function(value) {
  jspb.Message.setOneofWrapperField(this, 8, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearNamedKey = function() {
  this.setNamedKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasNamedKey = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional BigInt big_int = 9;
 * @return {proto.io.casperlabs.casper.consensus.state.BigInt}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getBigInt = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.BigInt} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.BigInt, 9));
};


/** @param {proto.io.casperlabs.casper.consensus.state.BigInt|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setBigInt = function(value) {
  jspb.Message.setOneofWrapperField(this, 9, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearBigInt = function() {
  this.setBigInt(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasBigInt = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional Key key = 10;
 * @return {proto.io.casperlabs.casper.consensus.state.Key}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key, 10));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setKey = function(value) {
  jspb.Message.setOneofWrapperField(this, 10, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearKey = function() {
  this.setKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasKey = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional Unit unit = 11;
 * @return {proto.io.casperlabs.casper.consensus.state.Unit}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getUnit = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Unit} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Unit, 11));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Unit|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setUnit = function(value) {
  jspb.Message.setOneofWrapperField(this, 11, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearUnit = function() {
  this.setUnit(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasUnit = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional uint64 long_value = 12;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.getLongValue = function() {
  return /** @type {number} */ (!this.hasLongValue() ? 0 : jspb.Message.getField(this, 12));
};


/** @param {number?|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Value.prototype.setLongValue = function(value) {
  jspb.Message.setOneofField(this, 12, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Value.prototype.clearLongValue = function() {
  jspb.Message.setOneofField(this, 12, proto.io.casperlabs.casper.consensus.state.Value.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Value.prototype.hasLongValue = function() {
  return jspb.Message.getField(this, 12) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.IntList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.IntList.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.IntList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.IntList.displayName = 'proto.io.casperlabs.casper.consensus.state.IntList';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.IntList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.IntList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.IntList} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.IntList.toObject = function(includeInstance, msg) {
  var f, obj = {
    valuesList: jspb.Message.getField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.IntList}
 */
proto.io.casperlabs.casper.consensus.state.IntList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.IntList;
  return proto.io.casperlabs.casper.consensus.state.IntList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.IntList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.IntList}
 */
proto.io.casperlabs.casper.consensus.state.IntList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array.<number>} */ (reader.readPackedInt32());
      msg.setValuesList(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.IntList} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.IntList.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValuesList();
  if (f.length > 0) {
    writer.writePackedInt32(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.IntList} The clone.
 */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.IntList} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated int32 values = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<number>}
 */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.getValuesList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getField(this, 1));
};


/** @param {Array.<number>} value  */
proto.io.casperlabs.casper.consensus.state.IntList.prototype.setValuesList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


proto.io.casperlabs.casper.consensus.state.IntList.prototype.clearValuesList = function() {
  jspb.Message.setField(this, 1, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.StringList = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.StringList.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.StringList, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.StringList.displayName = 'proto.io.casperlabs.casper.consensus.state.StringList';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.StringList.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.StringList.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.StringList} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.StringList.toObject = function(includeInstance, msg) {
  var f, obj = {
    valuesList: jspb.Message.getField(msg, 1)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.StringList}
 */
proto.io.casperlabs.casper.consensus.state.StringList.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.StringList;
  return proto.io.casperlabs.casper.consensus.state.StringList.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.StringList} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.StringList}
 */
proto.io.casperlabs.casper.consensus.state.StringList.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.getValuesList().push(value);
      msg.setValuesList(msg.getValuesList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.StringList} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StringList.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValuesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.StringList} The clone.
 */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.StringList} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated string values = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<string>}
 */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.getValuesList = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.getField(this, 1));
};


/** @param {Array.<string>} value  */
proto.io.casperlabs.casper.consensus.state.StringList.prototype.setValuesList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


proto.io.casperlabs.casper.consensus.state.StringList.prototype.clearValuesList = function() {
  jspb.Message.setField(this, 1, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.BigInt = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.BigInt, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.BigInt.displayName = 'proto.io.casperlabs.casper.consensus.state.BigInt';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.BigInt.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.BigInt} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.toObject = function(includeInstance, msg) {
  var f, obj = {
    value: msg.getValue(),
    bitWidth: msg.getBitWidth()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.BigInt}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.BigInt;
  return proto.io.casperlabs.casper.consensus.state.BigInt.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.BigInt} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.BigInt}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setValue(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBitWidth(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.BigInt} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.BigInt.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getValue();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getBitWidth();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.BigInt} The clone.
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.BigInt} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string value = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.getValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.setValue = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 bit_width = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.getBitWidth = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.BigInt.prototype.setBitWidth = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Key = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Key, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Key.displayName = 'proto.io.casperlabs.casper.consensus.state.Key';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.Key.ValueCase = {
  VALUE_NOT_SET: 0,
  ADDRESS: 1,
  HASH: 2,
  UREF: 3
};

/**
 * @return {proto.io.casperlabs.casper.consensus.state.Key.ValueCase}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.getValueCase = function() {
  return /** @type {proto.io.casperlabs.casper.consensus.state.Key.ValueCase} */(jspb.Message.computeOneofCase(this, proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Key.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Key} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: (f = msg.getAddress()) && proto.io.casperlabs.casper.consensus.state.Key.Address.toObject(includeInstance, f),
    hash: (f = msg.getHash()) && proto.io.casperlabs.casper.consensus.state.Key.Hash.toObject(includeInstance, f),
    uref: (f = msg.getUref()) && proto.io.casperlabs.casper.consensus.state.Key.URef.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key}
 */
proto.io.casperlabs.casper.consensus.state.Key.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Key;
  return proto.io.casperlabs.casper.consensus.state.Key.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key}
 */
proto.io.casperlabs.casper.consensus.state.Key.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.Address;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.Address.deserializeBinaryFromReader);
      msg.setAddress(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.Hash;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.Hash.deserializeBinaryFromReader);
      msg.setHash(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.URef;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader);
      msg.setUref(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAddress();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.Address.serializeBinaryToWriter
    );
  }
  f = this.getHash();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.Hash.serializeBinaryToWriter
    );
  }
  f = this.getUref();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Key} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional Address address = 1;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.Address}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.getAddress = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.Address} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.Address, 1));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.Address|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Key.prototype.setAddress = function(value) {
  jspb.Message.setOneofWrapperField(this, 1, proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Key.prototype.clearAddress = function() {
  this.setAddress(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.hasAddress = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Hash hash = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.Hash}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.getHash = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.Hash} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.Hash, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.Hash|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Key.prototype.setHash = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Key.prototype.clearHash = function() {
  this.setHash(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.hasHash = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional URef uref = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.getUref = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.URef} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.URef, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.URef|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Key.prototype.setUref = function(value) {
  jspb.Message.setOneofWrapperField(this, 3, proto.io.casperlabs.casper.consensus.state.Key.oneofGroups_[0], value);
};


proto.io.casperlabs.casper.consensus.state.Key.prototype.clearUref = function() {
  this.setUref(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Key.prototype.hasUref = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Key.Address = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Key.Address, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Key.Address.displayName = 'proto.io.casperlabs.casper.consensus.state.Key.Address';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Key.Address.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Address} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.toObject = function(includeInstance, msg) {
  var f, obj = {
    account: msg.getAccount_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Address}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Key.Address;
  return proto.io.casperlabs.casper.consensus.state.Key.Address.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Address} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Address}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setAccount(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Address} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAccount_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Address} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Key.Address} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes account = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.getAccount = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes account = 1;
 * This is a type-conversion wrapper around `getAccount()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.getAccount_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getAccount()));
};


/**
 * optional bytes account = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getAccount()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.getAccount_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getAccount()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Key.Address.prototype.setAccount = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Key.Hash, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Key.Hash.displayName = 'proto.io.casperlabs.casper.consensus.state.Key.Hash';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Key.Hash.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Hash} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Hash}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Key.Hash;
  return proto.io.casperlabs.casper.consensus.state.Key.Hash.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Hash} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Hash}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.Hash} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.Hash} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Key.Hash} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Key.Hash.prototype.setHash = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Key.URef = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Key.URef, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Key.URef.displayName = 'proto.io.casperlabs.casper.consensus.state.Key.URef';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Key.URef.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.URef} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.toObject = function(includeInstance, msg) {
  var f, obj = {
    uref: msg.getUref_asB64(),
    accessRights: msg.getAccessRights()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Key.URef;
  return proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.URef} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setUref(value);
      break;
    case 2:
      var value = /** @type {!proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights} */ (reader.readEnum());
      msg.setAccessRights(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Key.URef} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUref_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getAccessRights();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.URef} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Key.URef} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes uref = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.getUref = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes uref = 1;
 * This is a type-conversion wrapper around `getUref()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.getUref_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getUref()));
};


/**
 * optional bytes uref = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getUref()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.getUref_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getUref()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.setUref = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional AccessRights access_rights = 2;
 * @return {!proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.getAccessRights = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {!proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights} value  */
proto.io.casperlabs.casper.consensus.state.Key.URef.prototype.setAccessRights = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * @enum {number}
 */
proto.io.casperlabs.casper.consensus.state.Key.URef.AccessRights = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  ADD: 4,
  READ_ADD: 5,
  READ_WRITE: 3,
  ADD_WRITE: 6,
  READ_ADD_WRITE: 7
};


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.NamedKey = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.NamedKey, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.NamedKey.displayName = 'proto.io.casperlabs.casper.consensus.state.NamedKey';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.NamedKey.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.NamedKey} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName(),
    key: (f = msg.getKey()) && proto.io.casperlabs.casper.consensus.state.Key.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.NamedKey}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.NamedKey;
  return proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.NamedKey} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.NamedKey}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.io.casperlabs.casper.consensus.state.Key;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.deserializeBinaryFromReader);
      msg.setKey(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.NamedKey} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = this.getKey();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.NamedKey} The clone.
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.NamedKey} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/** @param {string} value  */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional Key key = 2;
 * @return {proto.io.casperlabs.casper.consensus.state.Key}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.getKey = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key, 2));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key|undefined} value  */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.setKey = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.clearKey = function() {
  this.setKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.NamedKey.prototype.hasKey = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Account = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.io.casperlabs.casper.consensus.state.Account.repeatedFields_, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Account, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Account.displayName = 'proto.io.casperlabs.casper.consensus.state.Account';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.io.casperlabs.casper.consensus.state.Account.repeatedFields_ = [4,5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Account.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Account} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.toObject = function(includeInstance, msg) {
  var f, obj = {
    publicKey: msg.getPublicKey_asB64(),
    mainPurse: (f = msg.getMainPurse()) && proto.io.casperlabs.casper.consensus.state.Key.URef.toObject(includeInstance, f),
    namedKeysList: jspb.Message.toObjectList(msg.getNamedKeysList(),
    proto.io.casperlabs.casper.consensus.state.NamedKey.toObject, includeInstance),
    associatedKeysList: jspb.Message.toObjectList(msg.getAssociatedKeysList(),
    proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.toObject, includeInstance),
    actionThresholds: (f = msg.getActionThresholds()) && proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account}
 */
proto.io.casperlabs.casper.consensus.state.Account.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Account;
  return proto.io.casperlabs.casper.consensus.state.Account.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account}
 */
proto.io.casperlabs.casper.consensus.state.Account.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPublicKey(value);
      break;
    case 3:
      var value = new proto.io.casperlabs.casper.consensus.state.Key.URef;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Key.URef.deserializeBinaryFromReader);
      msg.setMainPurse(value);
      break;
    case 4:
      var value = new proto.io.casperlabs.casper.consensus.state.NamedKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.NamedKey.deserializeBinaryFromReader);
      msg.getNamedKeysList().push(value);
      msg.setNamedKeysList(msg.getNamedKeysList());
      break;
    case 5:
      var value = new proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.deserializeBinaryFromReader);
      msg.getAssociatedKeysList().push(value);
      msg.setAssociatedKeysList(msg.getAssociatedKeysList());
      break;
    case 6:
      var value = new proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds;
      reader.readMessage(value,proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.deserializeBinaryFromReader);
      msg.setActionThresholds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getPublicKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getMainPurse();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.io.casperlabs.casper.consensus.state.Key.URef.serializeBinaryToWriter
    );
  }
  f = this.getNamedKeysList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.io.casperlabs.casper.consensus.state.NamedKey.serializeBinaryToWriter
    );
  }
  f = this.getAssociatedKeysList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.serializeBinaryToWriter
    );
  }
  f = this.getActionThresholds();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Account} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes public_key = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getPublicKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes public_key = 1;
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getPublicKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPublicKey()));
};


/**
 * optional bytes public_key = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getPublicKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPublicKey()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Account.prototype.setPublicKey = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional Key.URef main_purse = 3;
 * @return {proto.io.casperlabs.casper.consensus.state.Key.URef}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getMainPurse = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Key.URef} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Key.URef, 3));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Key.URef|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Account.prototype.setMainPurse = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.io.casperlabs.casper.consensus.state.Account.prototype.clearMainPurse = function() {
  this.setMainPurse(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.hasMainPurse = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * repeated NamedKey named_keys = 4;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getNamedKeysList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.NamedKey, 4));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.NamedKey>} value  */
proto.io.casperlabs.casper.consensus.state.Account.prototype.setNamedKeysList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 4, value);
};


proto.io.casperlabs.casper.consensus.state.Account.prototype.clearNamedKeysList = function() {
  this.setNamedKeysList([]);
};


/**
 * repeated AssociatedKey associated_keys = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey>}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getAssociatedKeysList = function() {
  return /** @type{!Array.<!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey, 5));
};


/** @param {Array.<!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey>} value  */
proto.io.casperlabs.casper.consensus.state.Account.prototype.setAssociatedKeysList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


proto.io.casperlabs.casper.consensus.state.Account.prototype.clearAssociatedKeysList = function() {
  this.setAssociatedKeysList([]);
};


/**
 * optional ActionThresholds action_thresholds = 6;
 * @return {proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.getActionThresholds = function() {
  return /** @type{proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} */ (
    jspb.Message.getWrapperField(this, proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds, 6));
};


/** @param {proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds|undefined} value  */
proto.io.casperlabs.casper.consensus.state.Account.prototype.setActionThresholds = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.io.casperlabs.casper.consensus.state.Account.prototype.clearActionThresholds = function() {
  this.setActionThresholds(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.io.casperlabs.casper.consensus.state.Account.prototype.hasActionThresholds = function() {
  return jspb.Message.getField(this, 6) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.displayName = 'proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.toObject = function(includeInstance, msg) {
  var f, obj = {
    publicKey: msg.getPublicKey_asB64(),
    weight: msg.getWeight()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey;
  return proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPublicKey(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setWeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getPublicKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getWeight();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes public_key = 1;
 * @return {!(string|Uint8Array)}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.getPublicKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes public_key = 1;
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {string}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.getPublicKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPublicKey()));
};


/**
 * optional bytes public_key = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPublicKey()`
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.getPublicKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPublicKey()));
};


/** @param {!(string|Uint8Array)} value  */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.setPublicKey = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 weight = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.getWeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.Account.AssociatedKey.prototype.setWeight = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.displayName = 'proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.toObject = function(includeInstance, msg) {
  var f, obj = {
    deploymentThreshold: msg.getDeploymentThreshold(),
    keyManagementThreshold: msg.getKeyManagementThreshold()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds;
  return proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setDeploymentThreshold(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setKeyManagementThreshold(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getDeploymentThreshold();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = this.getKeyManagementThreshold();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional uint32 deployment_threshold = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.getDeploymentThreshold = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.setDeploymentThreshold = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 key_management_threshold = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.getKeyManagementThreshold = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.Account.ActionThresholds.prototype.setKeyManagementThreshold = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.Unit = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.Unit, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.Unit.displayName = 'proto.io.casperlabs.casper.consensus.state.Unit';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Unit.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.Unit.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.Unit} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.Unit.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.Unit}
 */
proto.io.casperlabs.casper.consensus.state.Unit.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.Unit;
  return proto.io.casperlabs.casper.consensus.state.Unit.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.Unit} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.Unit}
 */
proto.io.casperlabs.casper.consensus.state.Unit.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.Unit} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Unit.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.Unit.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.Unit.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.Unit} The clone.
 */
proto.io.casperlabs.casper.consensus.state.Unit.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.Unit} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.io.casperlabs.casper.consensus.state.ProtocolVersion, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.io.casperlabs.casper.consensus.state.ProtocolVersion.displayName = 'proto.io.casperlabs.casper.consensus.state.ProtocolVersion';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.toObject = function(opt_includeInstance) {
  return proto.io.casperlabs.casper.consensus.state.ProtocolVersion.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion} msg The msg instance to transform.
 * @return {!Object}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.toObject = function(includeInstance, msg) {
  var f, obj = {
    major: msg.getMajor(),
    minor: msg.getMinor(),
    patch: msg.getPatch()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.io.casperlabs.casper.consensus.state.ProtocolVersion;
  return proto.io.casperlabs.casper.consensus.state.ProtocolVersion.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMajor(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setMinor(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setPatch(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMajor();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = this.getMinor();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = this.getPatch();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion} The clone.
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.cloneMessage = function() {
  return /** @type {!proto.io.casperlabs.casper.consensus.state.ProtocolVersion} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional uint32 major = 1;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.getMajor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.setMajor = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional uint32 minor = 2;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.getMinor = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.setMinor = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional uint32 patch = 3;
 * @return {number}
 */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.getPatch = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.io.casperlabs.casper.consensus.state.ProtocolVersion.prototype.setPatch = function(value) {
  jspb.Message.setField(this, 3, value);
};


goog.object.extend(exports, proto.io.casperlabs.casper.consensus.state);
