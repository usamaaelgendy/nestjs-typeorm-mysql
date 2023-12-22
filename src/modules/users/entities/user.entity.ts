import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts: PostEntity[];
}
