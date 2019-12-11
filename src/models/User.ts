import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  notificationToken: {
    type: String,
    required: true,
  },
});

UserSchema.set('toJSON', {
  transform(_doc, returned) {
    const returnedDocument = JSON.stringify(returned);
    const document = JSON.parse(returnedDocument);

    document.id = returned._id;

    delete document._id;
    delete document.__v;

    return document;
  },
});

export default mongoose.model('User', UserSchema);
