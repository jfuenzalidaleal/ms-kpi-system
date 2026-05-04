export declare class AppService {
    getKpis(): Promise<{
        mainMetrics: {
            id: number;
            label: string;
            value: string;
            trend: number;
        }[];
        chartData: {
            name: string;
            valor: number;
        }[];
    }>;
}
