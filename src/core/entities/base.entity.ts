import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /// We need to learn database migrations
  // @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  // createdIn?: Date;
}
