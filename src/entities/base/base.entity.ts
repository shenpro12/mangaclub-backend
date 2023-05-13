import { Column } from 'typeorm';

export abstract class BaseEntity {
  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  deleteAt: Date;
}
