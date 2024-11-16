import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FindOneService } from '../services/findone.service';
import { FindAllService } from '../services/findall.service';
import { CreateService } from '../services/create.service';
import { CreateClientDto } from '../dtos/create.dto';
import { UpdateClientDto } from '../dtos/update.dto';
import { UpdateService } from '../services/update.service';
import { DeleteService } from '../services/delete.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(
    private readonly findOneService: FindOneService,
    private readonly findAllService: FindAllService,
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      const result = await this.findOneService.findOne(id);
      return result ? result : null;
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OK',
  })
  @Get()
  async getAll() {
    try {
      return await this.findAllService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable Entity',
  })
  @Post()
  async createNew(@Body() body: CreateClientDto) {
    try {
      return await this.createService.create(body);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable Entity',
  })
  @Put(':id')
  async updateById(@Param('id') id: number, @Body() body: UpdateClientDto) {
    try {
      return await this.updateService.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No Content',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable Entity',
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      return await this.deleteService.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
