import { File } from './tutor';

export enum PostType {
  AboutMe = 'aboutMe',
  HowItWorks = 'howItWorks',
  Privacy = 'privacy',
  Blog = 'blog',
  Recruit = 'recruit',
  Partnership = 'partnership',
  Intro = 'intro',
}

export type TBlogPost = {
  id: number;
  content: string;
  title: string;
  detail: string;
  banner?: File;
  tags: string;
  class: PostType;
  slug: string;
};
