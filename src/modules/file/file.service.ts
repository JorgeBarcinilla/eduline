import { Injectable } from '@nestjs/common';

/**
 *
 */
@Injectable()
export class FileService {
  /**
   *
   * @param createFileDto
   */
  create() {
    return 'This action adds a new file';
  }

  /**
   *
   */
  findAll() {
    return `This action returns all file`;
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  /**
   *
   * @param id
   * @param updateFileDto
   */
  update(id: number) {
    return `This action updates a #${id} file`;
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
