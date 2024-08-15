import { OmitType } from '@nestjs/mapped-types';
import { File } from '../entities/file.entity';

/**
 *
 */
export class CreateFileDto extends OmitType(File, ['createdday', 'updatedday', 'id']) {}
