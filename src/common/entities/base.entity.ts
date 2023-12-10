import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ApiProperty({
    type: String,
    description: 'createdAt',
  })
  @CreateDateColumn({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'updatedAt',
  })
  @UpdateDateColumn({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
