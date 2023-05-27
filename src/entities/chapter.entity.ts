import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Manga } from './manga.entity';
import { Image } from './image.entity';

@Entity()
export class Chapter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'integer' })
  order: number;

  @Column({ type: 'varchar', length: 200 })
  slug: string;

  @ManyToOne(() => Manga, (manga) => manga.chapters)
  manga: Manga;

  @OneToMany(() => Image, (image) => image.chapter)
  images: Image[];
}
