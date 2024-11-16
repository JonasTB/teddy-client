import { Test, TestingModule } from '@nestjs/testing';
import { FindAllService } from '../services/findall.service';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FindAllService', () => {
    let service: FindAllService;
    let repository: Repository<Client>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllService,
                {
                    provide: getRepositoryToken(Client),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<FindAllService>(FindAllService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return an array of clients', async () => {
        const clients = [{ id: 1, name: 'Test Client' } as Client];
        jest.spyOn(repository, 'find').mockResolvedValue(clients);

        expect(await service.findAll()).toEqual(clients);
    });
});
