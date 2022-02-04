import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@ApiTags('legacy')
@Controller('sgps')
export class SgpsController {
    private readonly logger = new Logger(SgpsController.name);

    @UseGuards(JwtAuthGuard)
    @Get()
    async sgpss() {
        return [{
            "IDProduto": 0,
            "Nome": "Siringa",
            "Quantidade": 100,
            "Disponível": "Sim"
        }, {
            "IDProduto": 1,
            "Nome": "Máscara Cirúrgica",
            "Quantidade": 5000,
            "Disponível": "Sim"
        }, {
            "IDProduto": 2,
            "Nome": "Bisturí",
            "Quantidade": 100,
            "Disponível": "Não"
        }];
    }
}