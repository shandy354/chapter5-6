'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
    queryInterface.addConstraint('user_biodata',{
      fields:['userId'],
      type: 'foreign key',
      name:'users_biodata_association',
      references:{
      table:'user_games',
      field:'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
     queryInterface.removeConstraint('user_biodata',{
      fields:['userId'],
      type: 'foreign key',
      name:'users_biodata_association',
      references:{
      table:'user_games',
      field:'id'
      }
    });
  }
};
