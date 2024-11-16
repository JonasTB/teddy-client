import { Test, TestingModule } from '@nestjs/testing';
import { DeleteService } from '../services/delete.service';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DeleteService', () => {
    let service: DeleteService;
    let repository: Repository<Client>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeleteService,
                {
                    provide: getRepositoryToken(Client),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<DeleteService>(DeleteService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should delete a client', async () => {
        const client = { id: 1, name: 'Test Client' } as Client;
        jest.spyOn(repository, 'findOne').mockResolvedValue(client);
        jest.spyOn(repository, 'remove').mockResolvedValue(client);

        expect(await service.delete(client.id)).toEqual(client);
    });

    it('should throw NotFoundException if client does not exist', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
});
