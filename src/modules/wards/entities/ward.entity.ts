import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('wards')
export class Ward extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_ward_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.wards, {
    nullable: false,
  })
  @JoinColumn({
    name: 'province',
    foreignKeyConstraintName: 'fk_province_ward',
  })
  province: Province;

  @ApiProperty({
    type: String,
    required: true,
    description: 'District Id',
    example: '1',
  })
  @ManyToOne(() => District, (district) => district.wards, {
    nullable: false,
  })
  @JoinColumn({
    name: 'province',
    foreignKeyConstraintName: 'fk_district_ward',
  })
  district: District;

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
  @Index('pk_ward_code', ['code'], { unique: true })
  @Column({ type: 'varchar', nullable: true, length: 50 })
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
}
