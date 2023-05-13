import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Account } from './account.entity';
import { Manga } from './manga.entity';

@Entity()
export class Rating extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'integer' })
  point: number;

  @ManyToOne(() => Account, (account) => account.ratings)
  account: Account;

  @ManyToOne(() => Manga, (manga) => manga.ratings)
  manga: Manga;
}
