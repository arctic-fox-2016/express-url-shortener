'use strict';
module.exports = function(sequelize, DataTypes) {
  var url = sequelize.define('url', {
    name: DataTypes.STRING,
    click_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return url;
};