import { Injectable } from '@nestjs/common';
/**
 *
 */
@Injectable()
export class EvaluationService {
  /**
   *
   * @param createEvaluationDto
   */
  create() {
    return 'This action adds a new evaluation';
  }

  /**
   *
   */
  findAll() {
    return `This action returns all evaluation`;
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return `This action returns a #${id} evaluation`;
  }

  /**
   *
   * @param id
   * @param updateEvaluationDto
   */
  update(id: number) {
    return `This action updates a #${id} evaluation`;
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return `This action removes a #${id} evaluation`;
  }
}
