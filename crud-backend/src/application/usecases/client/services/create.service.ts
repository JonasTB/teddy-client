import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../../../../domain/entities/client.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from "../../../dtos/create.dto";

@Injectable()
export class CreateService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) {}

    async create(data: CreateClientDto) {
        try {
            const client = this.clientRepository.create(data);
            return this.clientRepository.save(client);
        } catch (err) {
            throw err;
        }
    }
}