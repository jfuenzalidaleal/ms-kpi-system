import { Injectable } from '@nestjs/common';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';

@Injectable()
export class KpisService {
  // Este es el método que consultará tu Frontend
  findAll() {
    return {
      mainMetrics: [
        { id: 1, label: 'Ventas Totales', value: '$99,999,999', trend: 12, isPositive: true },
        { id: 2, label: 'Nuevos Clientes', value: '145', trend: -3, isPositive: false },
        { id: 3, label: 'Sesiones Activas', value: '42', trend: 8, isPositive: true },
      ],
      chartData: [
        { name: 'Ene', valor: 400 },
        { name: 'Feb', valor: 700 },
        { name: 'Mar', valor: 600 },
        { name: 'Abr', valor: 800 },
        { name: 'May', valor: 1100 },
      ]
    };
  }

  // Los demás métodos los dejamos por si decides usarlos luego
  create(createKpiDto: CreateKpiDto) {
    return 'This action adds a new kpi';
  }

  findOne(id: number) {
    return `This action returns a #${id} kpi`;
  }

  update(id: number, updateKpiDto: UpdateKpiDto) {
    return `This action updates a #${id} kpi`;
  }

  remove(id: number) {
    return `This action removes a #${id} kpi`;
  }
}