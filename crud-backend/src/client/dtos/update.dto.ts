import {
    IsNumber,
    IsString,
    IsOptional,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UpdateClientDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;
    
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    wage?: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    enterprise?: number;
  }
  