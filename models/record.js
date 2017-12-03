var mongoose = require("mongoose");

var recordSchema = new mongoose.Schema({
    hospital: String,
    doctor: String,
    username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tablets: [],
    disease: String,
    bloodTest: {
        hemoglobin: Number,
        totalCount: Number,
        platelet: Number
    },
    totalCost: Number()
    
})
module.exports = mongoose.model('Record', recordSchema);