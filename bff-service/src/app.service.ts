import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getKpis() {
    return {
      mainMetrics: [
        { id: 1, label: 'Ventas Totales', value: '$12,450', trend: 12 },
        { id: 2, label: 'Nuevos Clientes', value: '145', trend: -3 },
      ],
      chartData: [
        { name: 'Ene', valor: 400 },
        { name: 'Feb', valor: 700 },
        { name: 'Mar', valor: 600 },
      ]
    };
  }
}