module.exports=function(sequelize,DataTypes){
   return sequelize.define('User',{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty : {msg: 'Empty username'}}
        },
        passwd: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty : {msg: 'Empty password'}}
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty : {msg: 'Empty name'}}
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {notEmpty : {msg: 'Empty email'}}
        },
        
   });   
};