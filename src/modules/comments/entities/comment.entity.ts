import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column()
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post: PostEntity;
}
