import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Manga } from './manga.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  slug: string;

  @ManyToMany(() => Manga, (manga) => manga.categories)
  manga: Manga[];
}
