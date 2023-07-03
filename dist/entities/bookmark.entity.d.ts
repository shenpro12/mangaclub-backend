import { BaseEntity } from './base/base.entity';
import { Account } from './account.entity';
import { Manga } from './manga.entity';
export declare class Bookmark extends BaseEntity {
    id: string;
    manga: Manga;
    account: Account;
}
