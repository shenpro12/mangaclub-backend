import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Account } from './account.entity';
import { Manga } from './manga.entity';

@Entity()
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Manga, (manga) => manga.bookmarks)
  manga: Manga;

  @ManyToOne(() => Account, (account) => account.bookmarks)
  account: Account;
}
