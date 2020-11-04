import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Church from '@modules/churchs/infra/typeorm/entities/Church';
import ReserveGroup from '@modules/reserves/infra/typeorm/entities/ReserveGroup';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  church_id: string;

  @ManyToOne(() => Church, church => church.event, { eager: true })
  @JoinColumn({ name: 'church_id' })
  church: Church;

  @OneToMany(() => ReserveGroup, reserve_group => reserve_group.event)
  reserve_group: ReserveGroup;

  @Column()
  date: Date;

  @Column()
  max_reservations: number;

  event_reserves: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Event;
