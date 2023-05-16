import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Chapter } from './chapter.entity';
import { Category } from './category.entity';
import { MangaComment } from './manga_comment.entity';
import { Rating } from './rating.entity';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Manga extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column({ type: 'varchar', length: 500 })
  alternative: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ type: 'varchar', length: 500 })
  slug: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'varchar', length: 500 })
  thumb_url: string;

  @OneToMany(() => Chapter, (chapter) => chapter.manga)
  chapters: Chapter[];

  @ManyToMany(() => Category, (category) => category.manga)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => MangaComment, (comment) => comment.manga)
  comments: Comment[];

  @OneToMany(() => Rating, (rating) => rating.manga)
  ratings: Rating[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.manga)
  bookmarks: Bookmark[];
}
