const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const ReferrelSchema = new Schema({
     referralCode: {
             type: String,
             default: 'BETA' + Math.floor(Math.random(1000) * 10000)
         },
         referredBy: {
              type: String,
              required: false,
         },
    referelDate: {
        type: Date,
        default: Date.now()
    }

});

// Create collection and add schema
mongoose.model('referel', ReferrelSchema, 'referel');