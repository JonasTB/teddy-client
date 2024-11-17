import { Test, TestingModule } from '@nestjs/testing';
import { FindOneService } from '../services/findone.service';
import { Repository } from 'typeorm';
import { Client } from '../../../../domain/entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('FindOneService', () => {
    let service: FindOneService;
    let repository: Repository<Client>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindOneService,
                {
                    provide: getRepositoryToken(Client),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<FindOneService>(FindOneService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a client by ID', async () => {
        const client = { id: 1, name: 'Test Client' } as Client;
        jest.spyOn(repository, 'findOne').mockResolvedValue(client);

        expect(await service.findOne(1)).toEqual(client);
    });

    it('should throw NotFoundException if client does not exist', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
});
