import { TBlogPost } from '@/type/blog-post';
import request from '@/utils/axios';
import { generateAPI } from './utils';

const createConfiguration = (versionId: number, values: any) =>
  request.post(`/configuration/${versionId}`, values);

const activeConfiguration = (versionId: number) =>
  request.post(`/configuration/${versionId}/activate`);

const configurationApi = {
  ...generateAPI<TBlogPost>('configuration'),
  createConfiguration,
  activeConfiguration,
};

export default configurationApi;
