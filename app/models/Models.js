var Sequelize = require('sequelize');

var sequelize = new Sequelize('careaxiom_hrms', 'root', 'password');

var User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false

    // validate: {
    //   len: [10, 50],
    //   startsWithUpper: function (nameStr) {
    //     var first = nameStr.charAt(0);
    //     var startsWithUpper = first === first.toUpperCase();
    //     if(!startsWithUpper)
    //       throw new Error('First letter must be a uppercase letter');
    //   }
    // }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    primaryKey: false,

    validate: {
      isEmail: true
    }
  }
}, {
  timestamps: false,
  freezeTable: true

  // hooks: {
  //   afterValidate: function (user) {
  //     user.password = bcrypt.hashSync(user.password, 8);
  //   }
  // }
});

sequelize.sync();
// sequelize.sync({ logging: true }).then(function () {
//   User.create({
//     name: 'abc',
//     email: 'abc@abc.com'
//   });
// }).catch(function (err) {
//   console.log(err);
// });