import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationService } from './evaluation.service';

/**
 *
 */
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  /**
   *
   * @param createEvaluationDto
   */
  @Post()
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create();
  }

  /**
   *
   */
  @Get()
  findAll() {
    return this.evaluationService.findAll();
  }

  /**
   *
   * @param id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(+id);
  }

  /**
   *
   * @param id
   * @param updateEvaluationDto
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(+id);
  }

  /**
   *
   * @param id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
