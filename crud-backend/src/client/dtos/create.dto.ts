import {
    IsNotEmpty,
    IsNumber,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateClientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    wage: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    enterprise: number;
  }
  