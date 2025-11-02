export type Root = CreateCommentInterface[];

export interface CreateCommentInterface {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  createdAt: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}
