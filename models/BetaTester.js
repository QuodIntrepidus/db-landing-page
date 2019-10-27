const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BetaTesterSchema = new Schema({
  firstName:{
    type: String,
      // validate: {
      //   isAsync: true,
      //   validator: function (v, cb) {
      //     setTimeout(function () {
      //       var firstNameRegex = /^[a-zA-Z]*$/;
      //       var msg = v + ' allowed only alphabatic character in firstname!';
      //       // First argument is a boolean, whether validator succeeded
      //       // 2nd argument is an optional error message override
      //       cb(firstNameRegex.test(v), msg);
      //     }, 5);
      //   },
      //   // Default error message, overridden by 2nd argument to `cb()` above
      //   message: 'Default error message'
      // },
      //required: [true, 'User firstname required']
       required: true
  },
  lastName:{
        type: String,
          // validate: {
          //   isAsync: true,
          //   validator: function (v, cb) {
          //     setTimeout(function () {
          //       var lastNameRegex = /^[a-zA-Z]*$/;
          //       var msg = v + ' allowed only alphabatic character in lastname!';
          //       // First argument is a boolean, whether validator succeeded
          //       // 2nd argument is an optional error message override
          //       cb(lastNameRegex.test(v), msg);
          //     }, 5);
          //   },
          //   // Default error message, overridden by 2nd argument to `cb()` above
          //   message: 'Default error message'
          // },
         // required: [true, 'User lastname required']
           required: true
  },
  email: {
    type: String,
    unique:true,
    // validate: {
    //   isAsync: true,
    //   validator: function(v, cb) {
    //     setTimeout(function() {
    //       var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //       var msg = v + ' is not a valid email!';
    //       // First argument is a boolean, whether validator succeeded
    //       // 2nd argument is an optional error message override
    //       cb(emailRegex.test(v), msg);
    //     }, 5);
    //   },
    //   // Default error message, overridden by 2nd argument to `cb()` above
    //   message: 'Default error message'
    // },
    // required: [true, 'User email required']
     required: true
  },
 referralCode: {
 type: Schema.Types.ObjectId,
   ref: 'referel',
   required:false
 },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('betatesters', BetaTesterSchema, 'betatesters');