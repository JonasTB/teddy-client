import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientController } from './controllers/client.controller';
import { FindAllService } from './services/findall.service';
import { FindOneService } from './services/findone.service';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [
        FindAllService,
        FindOneService,
        CreateService,
        UpdateService,
        DeleteService,
    ],
})
export class ClientModule { }
