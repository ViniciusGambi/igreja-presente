import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import ReserveGroup from './ReserveGroup';

@Entity('reserves')
class Reserve {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  reserve_group_id: string;

  @ManyToOne(() => ReserveGroup, reserve_group => reserve_group.reserve, {
    eager: true,
  })
  @JoinColumn({ name: 'reserve_group_id' })
  reserve_group: ReserveGroup;

  @Column()
  presence: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reserve;
