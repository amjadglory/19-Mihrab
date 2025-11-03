export interface CommentResInterceptor {
  message: string;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
  post: string;
  createdAt: string;
  id: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}
