import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { MangaComment } from './manga_comment.entity';
import { ChapterComment } from './chapter_comment.entity';
import { Rating } from './rating.entity';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 500 })
  avatar: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'boolean' })
  isAdmin: boolean;

  @OneToMany(() => MangaComment, (comment) => comment.account)
  manga_comments: MangaComment[];

  @OneToMany(() => ChapterComment, (comment) => comment.account)
  chapter_comments: ChapterComment[];

  @OneToMany(() => Rating, (rating) => rating.account)
  ratings: Rating[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.manga)
  bookmarks: Bookmark[];
}
