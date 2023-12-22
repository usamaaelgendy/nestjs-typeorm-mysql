import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts: PostEntity[];
}
