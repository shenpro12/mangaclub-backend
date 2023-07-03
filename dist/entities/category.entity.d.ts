import { BaseEntity } from './base/base.entity';
import { Manga } from './manga.entity';
export declare class Category extends BaseEntity {
    id: string;
    name: string;
    slug: string;
    manga: Manga[];
}
