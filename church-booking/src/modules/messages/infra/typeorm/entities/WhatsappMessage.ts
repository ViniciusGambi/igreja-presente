import ReserveGroup from "@modules/reserves/infra/typeorm/entities/ReserveGroup";
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

@Entity('whatsapp_messages')
class WhatsappMessage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  reserve_group_id: string;

  @Column()
  sent: boolean;

  @ManyToOne(() => ReserveGroup, reserve_group => reserve_group.whatsapp_messages, {
    eager: true,
  })
  @JoinColumn({ name: 'reserve_group_id' })
  reserve_group: ReserveGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WhatsappMessage;
