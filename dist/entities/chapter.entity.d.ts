import { BaseEntity } from './base/base.entity';
import { Manga } from './manga.entity';
import { Image } from './image.entity';
export declare class Chapter extends BaseEntity {
    id: string;
    title: string;
    order: number;
    slug: string;
    manga: Manga;
    images: Image[];
}
