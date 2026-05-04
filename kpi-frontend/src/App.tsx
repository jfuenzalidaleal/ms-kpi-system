import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const getIcon = (label: string) => {
  if (label.includes('Ventas')) return <DollarSign className="text-blue-400" size={24} />;
  if (label.includes('Clientes')) return <Users className="text-purple-400" size={24} />;
  return <Activity className="text-emerald-400" size={24} />;
};

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['kpis'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/kpis');
      if (!response.ok) throw new Error('Error al conectar con el BFF');
      return response.json();
    }
  });

  if (isLoading) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-white">
      <div className="text-xl animate-pulse">Cargando métricas del servidor...</div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-red-400 p-4 text-center">
      <div>
        <p className="text-2xl mb-2">⚠️ Error de Conexión</p>
        <p className="opacity-70">Asegúrate de que el bff-service esté corriendo en el puerto 3000</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 p-6 md:p-12 overflow-x-hidden">
      <header className="max-w-7xl mx-auto mb-10 text-left">
        <h1 className="text-4xl font-bold text-white tracking-tight">Dashboard de KPIs</h1>
        <p className="text-slate-400 mt-2 text-lg">Monitoreo activo de microservicios</p>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data?.mainMetrics?.map((item: any) => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-400 font-semibold uppercase tracking-wider text-xs">{item.label}</p>
                <div className="p-3 bg-slate-900/50 rounded-xl">{getIcon(item.label)}</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{item.value}</h3>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-md text-xs font-bold ${item.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {item.isPositive ? '+' : ''}{item.trend}%
                </span>
                <span className="text-slate-500 text-xs italic">vs. último mes</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gráfico */}
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-blue-500" />
            <h2 className="text-xl font-bold text-white">Tendencia de Rendimiento</h2>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }} />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorValor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;