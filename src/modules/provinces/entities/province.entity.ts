import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { District } from 'src/modules/districts/entities/district.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('provinces')
export class Province extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_province_id', ['id'], { unique: true })
  id: string;

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
  @Index('pk_province_code', ['code'], { unique: true })
  @Column({ type: 'varchar', nullable: true, length: 50 })
  @Exclude({ toPlainOnly: true })
  code: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @OneToMany(() => Ward, (ward) => ward.province)
  wards: Ward[];

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
}
