const {DataTypes} = require("sequelize");
const sequelize=require("../config/database");

const Questions=sequelize.define("Questions",{
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        primaryKey:true
       },
      userid:{
        type:DataTypes.INTEGER,
        allowNull:false
      },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },

    description:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    tags:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true
    },

    status :{
        type :DataTypes.BOOLEAN,
        allowNull:false
    },
    
})
module.exports=Questions;