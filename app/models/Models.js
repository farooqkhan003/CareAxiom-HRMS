var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var sequelize = new Sequelize('careaxiom_hrms', 'root', 'Devils_+1');

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: [10, 30]
      // startsWithUpper: function (nameStr) {
      //   var first = nameStr.charAt(0);
      //   var startsWithUpper = first === first.toUpperCase();
      //   if(!startsWithUpper)
      //     throw new Error('First letter must be a uppercase letter');
      // }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
    validate: {
      len: [5, 20]
      // is: ["^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{5,}$", 'i']
    }
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  // deletedAt: 'deleted_at',
  // paranoid: true,
  freezeTableName: true,

  hooks: {
    afterValidate: function (user) {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  }
});

var UserInfo = sequelize.define('UserInfo', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING
  },
  designation: {
    type: Sequelize.ENUM("Engineer", "Software Developer", "Senior Software Developer",
      "Quality Assurance Engineer", "Human Resource Manager"),
    // defaultValue: "Employee",
    allowNull: false
  },
  contact_no: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  address: {
    type: Sequelize.STRING
  },
  yearly_increment: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  join_date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  available_leaves: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var UserSupervisor = sequelize.define('UserSupervisor', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  supervisor_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var Department = sequelize.define('Department', {
  department: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  // deletedAt: 'deleted_at',
  // paranoid: true,
  freezeTableName: true
});

var UserDepartment = sequelize.define('UserDepartment', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  department_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Department,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var Module = sequelize.define('Module', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: false,
  // deletedAt: 'deleted_at',
  // paranoid: true,
  freezeTableName: true
});

var UserModule = sequelize.define('UserModule', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  module_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: Module,
      key: 'id'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var SalaryHistory = sequelize.define('SalaryHistory', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  salary_amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  currency: {
    type: Sequelize.ENUM("PKR", "USD"),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("paid", "pending", "rejected"),
    allowNull: false
  },
  month: {
    type: Sequelize.INTEGER,
    defaultValue: new Date().getMonth(),
    allowNull: false,
    validate: {
      len: [0, 11]
    }
  },
  year: {
    type: Sequelize.INTEGER,
    defaultValue: new Date().getFullYear(),
    allowNull: false
  },
  salary_bump: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  bonus: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
});

var LeaveHistory = sequelize.define('LeaveHistory', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  leave_type: {
    type: Sequelize.ENUM("full_day", "half_day", "work_from_home"),
    allowNull: false
  },
  applied_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("applied", "approved", "rejected"),
    defaultValue: "applied",
    allowNull: false
  },
  responded_at: {
    type: Sequelize.DATE
  }
}, {
  timestamps: false,
  freezeTableName: true,

  hooks: {
    beforeCreate: function (userLeave) {
      return UserInfo.find({
        where: {
          user_id: userLeave.user_id
        }
      }).then(function (userInfo) {
        if ((userInfo.available_leaves - 1.0) < 1.0)
          throw new Error("Leaves unavailable");
        else {
          userInfo.available_leaves -= 1.0;

          return userInfo.update({
            available_leaves: userInfo.available_leaves
          });
        }
      }).catch(function (err) {
        throw err;
      });
    }
  }
});

sequelize.sync({
  force: true,
  logging: true
});
// .then(function () {
//   // return User.create({
//   //   name: 'abc',
//   //   email: 'abc@abc.com'
//   // });
// }).catch(function (err) {
//   console.log(err);
// });