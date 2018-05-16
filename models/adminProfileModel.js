const mongoose = require('mongoose');
const AdminProfileSchema = mongoose.Schema({
    id: String,
    image: String,
    email: String,
    password: String,
    name: String,
    eName: String,
    timeZone: String
});

const AdminProfileModel = mongoose.model('AdminProfileModel', AdminProfileSchema);
module.exports = AdminProfileModel;