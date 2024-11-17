import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../../../../domain/entities/client.entity";
import { Repository } from "typeorm";
import { UpdateClientDto } from "../../../dtos/update.dto";

@Injectable()
export class UpdateService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async update(id: number, update: UpdateClientDto) {
        try {
            const client = await this.clientRepository.preload({
                id,
                ...update,
            });

            if (!client) {
                throw new NotFoundException(`Client ID ${id} not found!`);
            }

            return this.clientRepository.save(client);
        } catch (err) {
            throw err;
        }
    }
}