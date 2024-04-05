const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const activitySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Category: { type: String, required: true },
    Cost: { type: String, required: true },
    Address: { type: String, required: true },
    Notes: { type: String }
});

const foodSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Category: { type: String, required: true },
    Cost: { type: String, required: true },
    Address: { type: String, required: true },
    Notes: { type: String }
});

const dateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    activity: activitySchema,
    food: foodSchema,
});

const historySchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    count: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    savedDates: [dateSchema],
    history: [historySchema]
});

userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
