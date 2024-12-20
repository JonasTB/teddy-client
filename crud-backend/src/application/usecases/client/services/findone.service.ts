import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../../../../domain/entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class FindOneService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async findOne(id: number) {
        try {
            const client = await this.clientRepository.findOne({
                where: { id },
            });

            if (!client) {
                throw new NotFoundException(`Client ID ${id} not found!`);
            }

            return client;
        } catch (err) {
            throw err;
        }
    }
}