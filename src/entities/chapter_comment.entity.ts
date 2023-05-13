import { Entity, ManyToOne } from 'typeorm';
import { BaseCommentEntity } from './base/base_comment.entity';
import { Chapter } from './chapter.entity';
import { Account } from './account.entity';

@Entity()
export class ChapterComment extends BaseCommentEntity {
  @ManyToOne(() => Chapter, (chapter) => chapter.comments)
  chapter: Chapter;

  @ManyToOne(() => Account, (account) => account.chapter_comments)
  account: Account;
}
