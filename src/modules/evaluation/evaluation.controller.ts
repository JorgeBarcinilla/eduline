import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { EvaluationService } from './evaluation.service';

/**
 *
 */
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  /**
   * Endpoint para crear una evaluación
   * @param {CreateEvaluationDto} createEvaluationDto - Datos de la evaluación a crear
   * @returns {Promise<number>} - Id de la evaluación creada
   */
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto): Promise<number> {
    return this.evaluationService.create(createEvaluationDto);
  }

  /**
   * Endpoint para obtener todas las evaluaciones
   * @returns {Promise<Evaluation[]>} - Evaluaciones encontradas
   */
  @Get()
  findAll(): Promise<Evaluation[]> {
    return this.evaluationService.findAll();
  }

  /**
   * Endpoint para obtener una evaluación
   * @param {string} id - Id de la evaluación a buscar
   * @returns {Promise<Evaluation>} - Evaluación encontrada
   */
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Evaluation> {
    return this.evaluationService.findOne({ id: +id });
  }

  /**
   * Endpoint para actualizar una evaluación
   * @param {string} id - Id de la evaluación a actualizar
   * @param {UpdateEvaluationDto} updateEvaluationDto - Datos de la evaluación a actualizar
   * @returns {Promise<boolean>} - Resultado de la actualización
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto): Promise<boolean> {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  /**
   * Endpoint para eliminar una evaluación
   * @param {string} id - Id de la evaluación a eliminar
   * @returns {Promise<boolean>} - Resultado de la eliminación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.evaluationService.remove(+id);
  }
}
