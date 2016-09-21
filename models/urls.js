'use strict';
module.exports = function(sequelize, DataTypes) {
  var urls = sequelize.define('urls', {
    short: DataTypes.STRING,
    long: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return urls;
};