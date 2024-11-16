import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeleteService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async delete(id: number) {
        try {
            const client = await this.clientRepository.findOne({
                where: { id }
            });

            if (!client) {
                throw new NotFoundException(`Client ID ${id} not found!`);
            }

            return this.clientRepository.remove(client);
        } catch (err) {
            throw err;
        }
    }
}