export interface IUser {
  name: string;
  profilePicture?: string;
  email: string;
}

export interface ITheme {
  theme?: string;
}

export interface IPrompt {
  message: string;
}

export type AuthContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};
