import type { LessonStructure } from '../../lesson';
import { BaseConverter } from './base-converter';

export abstract class BaseLessonConverter extends BaseConverter<
  LessonStructure[]
> {}
