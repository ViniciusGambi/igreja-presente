import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Event from '@modules/events/infra/typeorm/entities/Event';
import Reserve from './Reserve';

@Entity('reserve_groups')
class ReserveGroup {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  event_id: string;

  @Column()
  whatsapp: string;

  @ManyToOne(() => Event, event => event.reserve_group, { eager: true })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @OneToMany(() => Reserve, reserve => reserve.reserve_group)
  reserve: Reserve;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ReserveGroup;
