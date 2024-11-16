import { Test, TestingModule } from '@nestjs/testing';
import { CreateService } from '../services/create.service';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateClientDto } from '../dtos/create.dto';

describe('CreateService', () => {
    let service: CreateService;
    let repository: Repository<Client>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateService,
                {
                    provide: getRepositoryToken(Client),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<CreateService>(CreateService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new client', async () => {
        const createClientDto: CreateClientDto = {
            name: 'Test Client',
            wage: 0,
            enterprise: 0
        };
        const client = { id: 1, ...createClientDto } as Client;

        jest.spyOn(repository, 'save').mockResolvedValue(client);
        jest.spyOn(repository, 'create').mockReturnValue(client);

        expect(await service.create(createClientDto)).toEqual(client);
    });
});
