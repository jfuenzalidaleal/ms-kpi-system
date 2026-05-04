import { KpisService } from './kpis.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
export declare class KpisController {
    private readonly kpisService;
    constructor(kpisService: KpisService);
    create(createKpiDto: CreateKpiDto): string;
    findAll(): {
        mainMetrics: {
            id: number;
            label: string;
            value: string;
            trend: number;
            isPositive: boolean;
        }[];
        chartData: {
            name: string;
            valor: number;
        }[];
    };
    findOne(id: string): string;
    update(id: string, updateKpiDto: UpdateKpiDto): string;
    remove(id: string): string;
}
