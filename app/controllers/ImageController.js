"use strict";

var blueprint = require("@onehilltech/blueprint");
var mongodb = require("@onehilltech/blueprint-mongodb");
var GridFSController = mongodb.GridFSController;

function ImageController () {
  GridFSController.call(this, mongodb.getConnectionManager().defaultConnection, { name: "image" });
}

blueprint.controller(ImageController, GridFSController);

module.exports = ImageController;
