import { TBlogPost } from '@/type/blog-post';
import { generateAPI } from './utils';

const configurationApi = {
  ...generateAPI<TBlogPost>('configuration'),
};

export default configurationApi;
