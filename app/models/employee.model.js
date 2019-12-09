const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    surName: String,
    telephone:String,
    email:String,
    image:String

}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);