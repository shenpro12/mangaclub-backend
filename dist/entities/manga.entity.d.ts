import { BaseEntity } from './base/base.entity';
import { Chapter } from './chapter.entity';
import { Category } from './category.entity';
import { Rating } from './rating.entity';
import { Bookmark } from './bookmark.entity';
export declare class Manga extends BaseEntity {
    id: string;
    name: string;
    alternative: string;
    author: string;
    status: boolean;
    slug: string;
    description: string;
    views: number;
    thumb_url: string;
    chapters: Chapter[];
    categories: Category[];
    ratings: Rating[];
    bookmarks: Bookmark[];
}
