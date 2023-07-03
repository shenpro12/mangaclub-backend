import { BaseEntity } from './base/base.entity';
import { Account } from './account.entity';
import { Manga } from './manga.entity';
export declare class Rating extends BaseEntity {
    id: string;
    point: number;
    account: Account;
    manga: Manga;
}
