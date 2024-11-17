import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../controllers/client.controller';
import { FindOneService } from '../services/findone.service';
import { FindAllService } from '../services/findall.service';
import { CreateService } from '../services/create.service';
import { UpdateService } from '../services/update.service';
import { DeleteService } from '../services/delete.service';
import { NotFoundException } from '@nestjs/common';
import { CreateClientDto } from '../dtos/create.dto';
import { UpdateClientDto } from '../dtos/update.dto';
import { Client } from '../../../../domain/entities/client.entity';

describe('ClientController', () => {
    let controller: ClientController;
    let findOneService: FindOneService;
    let findAllService: FindAllService;
    let createService: CreateService;
    let updateService: UpdateService;
    let deleteService: DeleteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClientController],
            providers: [
                {
                    provide: FindOneService,
                    useValue: { findOne: jest.fn() },
                },
                {
                    provide: FindAllService,
                    useValue: { findAll: jest.fn() },
                },
                {
                    provide: CreateService,
                    useValue: { create: jest.fn() },
                },
                {
                    provide: UpdateService,
                    useValue: { update: jest.fn() },
                },
                {
                    provide: DeleteService,
                    useValue: { delete: jest.fn() },
                },
            ],
        }).compile();

        controller = module.get<ClientController>(ClientController);
        findOneService = module.get<FindOneService>(FindOneService);
        findAllService = module.get<FindAllService>(FindAllService);
        createService = module.get<CreateService>(CreateService);
        updateService = module.get<UpdateService>(UpdateService);
        deleteService = module.get<DeleteService>(DeleteService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of clients', async () => {
            const clients: Client[] = [{ id: 1, name: 'Test Client', wage: 5000, enterprise: 101 }];
            jest.spyOn(findAllService, 'findAll').mockResolvedValue(clients);

            expect(await controller.getAll()).toEqual(clients);
        });
    });

    describe('getById', () => {
        it('should return a client by ID', async () => {
            const client: Client = { id: 1, name: 'Test Client', wage: 5000, enterprise: 101 };
            jest.spyOn(findOneService, 'findOne').mockResolvedValue(client);

            expect(await controller.getById(1)).toEqual(client);
        });

        it('should throw NotFoundException if client is not found', async () => {
            jest.spyOn(findOneService, 'findOne').mockRejectedValue(new NotFoundException());

            await expect(controller.getById(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('createNew', () => {
        it('should create a new client', async () => {
            const createClientDto: CreateClientDto = { name: 'New Client', wage: 5000, enterprise: 101 };
            const createdClient: Client = { id: 1, ...createClientDto };
            jest.spyOn(createService, 'create').mockResolvedValue(createdClient);

            expect(await controller.createNew(createClientDto)).toEqual(createdClient);
        });
    });

    describe('updateById', () => {
        it('should update a client by ID', async () => {
            const updateClientDto: UpdateClientDto = { name: 'Updated Client', wage: 6000, enterprise: 102 };
            const updatedClient: Client = { id: 1, name: 'Updated Client', wage: 6000, enterprise: 102 };
            jest.spyOn(updateService, 'update').mockResolvedValue(updatedClient);

            expect(await controller.updateById(1, updateClientDto)).toEqual(updatedClient);
        });

        it('should throw NotFoundException if client to update is not found', async () => {
            jest.spyOn(updateService, 'update').mockRejectedValue(new NotFoundException());

            await expect(controller.updateById(999, { name: 'Nonexistent Client', wage: 0, enterprise: 0 })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should delete a client by ID', async () => {
            jest.spyOn(deleteService, 'delete').mockResolvedValue(undefined);

            expect(await controller.remove(1)).toBeUndefined();
        });

        it('should throw NotFoundException if client to delete is not found', async () => {
            jest.spyOn(deleteService, 'delete').mockRejectedValue(new NotFoundException());

            await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});
