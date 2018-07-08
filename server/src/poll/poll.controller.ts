
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';

import { Poll } from './models/poll.model';

import { AppExceptionFilter } from '../core/filters/app-exception.filter';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {

    constructor(private readonly pollService: PollService) { }

    @UseFilters(new AppExceptionFilter('Erro ao buscar dados da enquete.'))
    @Get()
    private async getCurrentPoll(): Promise<Poll> {
        return this.pollService.getCurrentPoll();
    }

    @UseFilters(new AppExceptionFilter('Erro ao criar enquete.'))
    @Post()
    private async createPoll(@Body() newPoll: Poll): Promise<Poll> {
        return this.pollService.createPoll(newPoll);
    }

    @UseFilters(new AppExceptionFilter('Erro ao finalizar enquete.'))
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete()
    private async endPoll(): Promise<void> {
        await this.pollService.endPoll();
    }

}
