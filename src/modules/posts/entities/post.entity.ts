import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { BaseEntity } from '../../../core/entities/base.entity';
import { CommentEntity } from '../../comments/entities/comment.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.post)
  comments: CommentEntity[];
}
