import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  name: string,
  email: string,
  password_hash: string,
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<UserInterface>('users', UserSchema);
