export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  city?: string;
  address?: string;
  state?: string;
  zip?: string;
  notificationSubscriptions?: string[];
}

export interface IMarker {
  longitude: number;
  latitude: number;
  type:
    | 'default'
    | 'pothole'
    | 'sbump'
    | 'closure'
    | 'xwalk'
    | 'roadDamage'
    | 'cone'
    | 'carAccident'
    | 'warningSign';
}

export interface Auth {
  user_id: string;
  access_token: string;
}

export interface ISendNotificationRequestBody {
  id: string;
  title: string;
  options?: NotificationOptions;
}

export interface ISubscription {
  id: string;
  subscription: PushSubscription;
}

/** Defines fields that are applicable *only* to text-based posts (default). */
interface ITextPost {
  type: 'text';
}

/** Defines fields that are applicable *only* to marker-based posts. */
interface IMarkerPost {
  type: 'marker';
  marker: IMarker;
}

/** Defines the fields required for every reply in the Community page. */
export interface Reply {
  id: string;
  user: User;
  content: string;
  // ... other properties of a reply
}

/** Defines the fields required for every post in the Community page. */
export interface IUniversalPost {
  id: string;
  _id?: string;
  community?: ICommunity;
  user: User;
  marker?: IMarker; // Only defining this here so it can also be defined in the Schema.
  likeCount?: number; // Optional because the default is zero.
  content: {
    title: string;
    body: string;
  };
  replies: Reply[];
}

/**
 * Defines the types for the `Post` model.
 *
 * If the value for `type` is set to `'marker'`, the field `marker` will
 * then become required.
 */
export type TPost = IUniversalPost & (ITextPost | IMarkerPost);

export interface ICommunity {
  id: string;
  name: string;
  street: string;
  longitude: number;
  latitude: number;
  radius: number;
  users: string[];
  image?: string;
  posts: TPost[];
}
