import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Chapter } from './chapter.entity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  thumb_url: string;

  @Column({ type: 'integer' })
  order: number;

  @ManyToOne(() => Chapter, (chapter) => chapter.images)
  chapter: Chapter;
}
