'use strict';
module.exports = function(sequelize, DataTypes) {
  var Links = sequelize.define('Links', {
    prelink: DataTypes.STRING,
    postlink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Links;
};