import type {Types} from 'mongoose';
import {model, SchemaTypes, Schema} from 'mongoose';
import type {User} from '../user/model';

/**
 * Type definition for Community in Fritter
 */
export type Community = {
  _id: Types.ObjectId;
  /** The name of the community. Must be all lowercase, and unique. */
  name: string;
  /** Community members */
  members: Types.ObjectId[];
  /** Moderators for the community, which have special permissions. */
  moderators: Types.ObjectId[];
  /** Banned users for the community */
  banned: Types.ObjectId[];
};

export type PopulatedCommunity = {
  _id: Types.ObjectId;
  /** The name of the community. Must be all lowercase, and unique. */
  name: string;
  /** Community members */
  members: User[];
  /** Moderators for the community, which have special permissions. */
  moderators: User[];
  /** Banned users for the community */
  banned: User[];
};

const CommunitySchema = new Schema<Community>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    lowercase: true
  },
  members: [{type: SchemaTypes.ObjectId, ref: 'User'}],
  moderators: [{type: SchemaTypes.ObjectId, ref: 'User'}],
  banned: [{type: SchemaTypes.ObjectId, ref: 'User'}]
});

const CommunityModel = model<Community>('Community', CommunitySchema);
export default CommunityModel;
