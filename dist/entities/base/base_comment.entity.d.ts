import { BaseEntity } from './base.entity';
export declare abstract class BaseCommentEntity extends BaseEntity {
    id: string;
    content: string;
    type: string;
}
