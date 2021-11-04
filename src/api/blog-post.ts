import { TBlogPost } from '@/type/blog-post';
import { generateAPIWithPaging } from './utils';

const blogPostApi = {
  ...generateAPIWithPaging<TBlogPost>('posts'),
};

export default blogPostApi;
