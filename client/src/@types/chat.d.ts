export interface IChat {
  id: string;
  name: string;
  messages: IUserChat[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserChat {
  id: string;
  name: string;
  profilePicture?: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}
