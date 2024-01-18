import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { PostEntity } from '../../posts/entities/post.entity';
import { BaseEntity } from '../../../core/entities/base.entity';
import { EncryptionService } from '../../../core/services/encryption.service';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../../common/roles/entities/role.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty({
    example: 'u@gmail.com',
    description: 'Email of the user',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'Usama',
    description: 'Username of the user',
  })
  @Column()
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of the user',
  })
  @Column()
  password: string;

  @ApiProperty({
    example: 'local',
    description: 'Auth strategy of the user',
  })
  @Column({ nullable: true })
  authStrategy: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts: PostEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    this.password = await EncryptionService.encrypt(this.password);
  }
}
