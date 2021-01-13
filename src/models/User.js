const mongoogse = require('mongoose');
const bcrypt = require('bcrypt');

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

/* if it's a plain text password
    we will hash the password
    then we will add a salt to the hash

    the value of this is going to be equal to
    the user we are operating on, that's why
    we want to use a regular function rather than
    an arror function.

    If we use an arrow function, the value of this
    will be set to the context of this file,
    which is not what we want.
*/

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
});
/* whenever we create a promise, we pass it a callback function.
    that function will be invoked automatically with
    resolve and reject.

    We want to use async/await syntax here.
*/
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
}

mongoogse.model('User', userSchema);