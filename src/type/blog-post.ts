import { File } from './tutor';

export type TBlogPost = {
  id: number;
  content: string;
  title: string;
  detail: string;
  banner?: File;
  tags: string;
};
