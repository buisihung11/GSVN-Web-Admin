import { TBlogPost } from '@/type/blog-post';
import { generateAPI } from './utils';

const blogPostApi = {
  ...generateAPI<TBlogPost>('posts'),
};

export default blogPostApi;
