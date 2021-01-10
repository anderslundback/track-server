const mongoogse = require('mongoose');

const userSchema = new mongoogse.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoogse.model('User', userSchema);