import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity({ name: 'user_profile' })
export class ProfileEntity extends BaseEntity {
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column()
  age: number;
  @Column()
  dob: string;
}
