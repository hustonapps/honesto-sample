const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
},
{ collection: 'user' });

const User = mongoose.model(UserSchema.options.collection, UserSchema);

exports.User = User;
