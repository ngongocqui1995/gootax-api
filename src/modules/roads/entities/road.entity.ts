import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique('uq_province_district_ward_road', [
  'province',
  'district',
  'ward',
  'code',
])
@Entity('roads')
export class Road extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_road_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.roads, {
    nullable: false,
  })
  @JoinColumn({
    name: 'province',
    foreignKeyConstraintName: 'fk_province_road',
  })
  province: Province;

  @ApiProperty({
    type: String,
    required: true,
    description: 'District Id',
    example: '1',
  })
  @ManyToOne(() => District, (district) => district.roads, {
    nullable: false,
  })
  @JoinColumn({
    name: 'district',
    foreignKeyConstraintName: 'fk_district_road',
  })
  district: District;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Ward Id',
    example: '1',
  })
  @ManyToOne(() => Ward, (ward) => ward.roads, {
    nullable: false,
  })
  @JoinColumn({
    name: 'ward',
    foreignKeyConstraintName: 'fk_ward_road',
  })
  ward: Ward;

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
  @Index('pk_road_code', ['code'])
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
