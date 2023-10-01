import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('districts')
export class District extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_district_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.districts, {
    nullable: false,
  })
  @JoinColumn({ name: 'province' })
  province: Province;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Code',
    example: '1',
  })
  @Index('pk_district_code', ['code'], { unique: true })
  @Column({ type: 'varchar', nullable: true, length: 50 })
  @Exclude({ toPlainOnly: true })
  code: string;

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
    description: 'ACTIVE',
    example: 'ACTIVE',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: string;

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];
}
