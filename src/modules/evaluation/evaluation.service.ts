import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
/**
 *
 */
@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>
  ) {}

  /**
   * Metodo para crear una evaluación
   * @param {CreateEvaluationDto} createEvaluationDto - Datos de la evaluación a crear
   * @returns {Promise<number>} - Id de la evaluación creada
   */
  async create(createEvaluationDto: CreateEvaluationDto): Promise<number> {
    const result = await this.evaluationRepository.insert(createEvaluationDto);
    return result.identifiers[0].id;
  }

  /**
   * Metodo para obtener todas las evaluaciones
   * @returns {Promise<Evaluation[]>} - Evaluaciones encontradas
   */
  findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find();
  }

  /**
   * Metodo para obtener una evaluación
   * @param {FindOptionsWhere<Evaluation> | FindOptionsWhere<Evaluation>[]} where - Condiciones de busqueda
   * @returns {Promise<Evaluation>} - Evaluación encontrada
   */
  findOne(where: FindOptionsWhere<Evaluation> | FindOptionsWhere<Evaluation>[]): Promise<Evaluation> {
    return this.evaluationRepository.findOne({ where });
  }

  /**
   * Metodo para actualizar una evaluación
   * @param {number} id - Id de la evaluación a actualizar
   * @param {UpdateEvaluationDto} updateEvaluationDto - Datos de la evaluación a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  async update(id: number, updateEvaluationDto: UpdateEvaluationDto): Promise<boolean> {
    const result = await this.evaluationRepository.update(id, updateEvaluationDto);
    return result.affected > 0;
  }

  /**
   * Metodo para eliminar una evaluación
   * @param {number} id - Id de la evaluación a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  async remove(id: number): Promise<boolean> {
    const result = await this.evaluationRepository.delete(id);
    return result.affected > 0;
  }
}
