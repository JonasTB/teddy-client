import { Test, TestingModule } from '@nestjs/testing';
import { UpdateService } from '../services/update.service';
import { Repository } from 'typeorm';
import { Client } from '../../../../domain/entities/client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateClientDto } from '../dtos/update.dto';
import { NotFoundException } from '@nestjs/common';

describe('UpdateService', () => {
  let service: UpdateService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateService,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UpdateService>(UpdateService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a client', async () => {
    const updateClientDto: UpdateClientDto = { name: 'Updated Client' };
    const client = { id: 1, name: 'Test Client' } as Client;
    const updatedClient = { ...client, ...updateClientDto };

    jest.spyOn(repository, 'preload').mockResolvedValue(updatedClient);
    jest.spyOn(repository, 'save').mockResolvedValue(updatedClient);

    expect(await service.update(client.id, updateClientDto)).toEqual(updatedClient);
  });

  it('should throw NotFoundException if client does not exist', async () => {
    jest.spyOn(repository, 'preload').mockResolvedValue(null);

    await expect(service.update(999, { name: 'Updated Client' })).rejects.toThrow(NotFoundException);
  });
});
