import { Entity, ManyToOne } from 'typeorm';
import { BaseCommentEntity } from './base/base_comment.entity';
import { Manga } from './manga.entity';
import { Account } from './account.entity';

@Entity()
export class MangaComment extends BaseCommentEntity {
  @ManyToOne(() => Manga, (manga) => manga.comments)
  manga: Manga;

  @ManyToOne(() => Account, (account) => account.manga_comments)
  account: Account;
}
