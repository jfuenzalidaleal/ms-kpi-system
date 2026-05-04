import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
export declare class KpisService {
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
    create(createKpiDto: CreateKpiDto): string;
    findOne(id: number): string;
    update(id: number, updateKpiDto: UpdateKpiDto): string;
    remove(id: number): string;
}
