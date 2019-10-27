const mongoose = require('mongoose');

// Load Models
require('../models/BetaTester');
const BetaTester = mongoose.model('betatesters');

const check = (code) => {
    BetaTester.findOne({}, (err, res) => {
        if(!err){
            return console.log('Good to Go')
        }
        else{
            return console.log('KAALI WAALI GIF')
        }
    })
}

check('BETA123')