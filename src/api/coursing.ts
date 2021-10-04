import { TCoursing } from '@/type/coursing';
import { generateAPI } from './utils';

const coursingApi = { ...generateAPI<TCoursing>('coursings') };

export default coursingApi;
