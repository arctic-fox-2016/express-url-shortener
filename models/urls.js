'use strict';
module.exports = function(sequelize, DataTypes) {
  var urls = sequelize.define('urls', {
    short: DataTypes.STRING,
    long: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return urls;
};