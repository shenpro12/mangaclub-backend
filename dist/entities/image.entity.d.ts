import { BaseEntity } from './base/base.entity';
import { Chapter } from './chapter.entity';
export declare class Image extends BaseEntity {
    id: string;
    thumb_url: string;
    order: number;
    chapter: Chapter;
}
