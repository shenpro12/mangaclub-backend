import { BaseEntity } from './base/base.entity';
import { Rating } from './rating.entity';
import { Bookmark } from './bookmark.entity';
export declare class Account extends BaseEntity {
    id: string;
    userName: string;
    password: string;
    avatar: string;
    email: string;
    isAdmin: boolean;
    ratings: Rating[];
    bookmarks: Bookmark[];
}
