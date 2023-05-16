import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export abstract class BaseCommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 2000 })
  content: string;

  @Column({ type: 'varchar', length: 10 })
  type: string;
}
