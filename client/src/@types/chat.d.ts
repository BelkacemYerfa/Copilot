export interface IChat {
  id: string;
  name: string;
  messages: IMessage[];
}

export interface IMessage {
  question: string;
  answer: string;
}
