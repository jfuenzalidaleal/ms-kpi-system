import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  LayoutDashboard, Activity, Users, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCcw 
} from 'lucide-react';

// Datos de ejemplo (Esto vendrá de tu BFF después)
const data = [
  { name: '00:00', kpi: 400 },
  { name: '04:00', kpi: 300 },
  { name: '08:00', kpi: 900 },
  { name: '12:00', kpi: 1500 },
  { name: '16:00', kpi: 1200 },
  { name: '20:00', kpi: 1700 },
];

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Barra Lateral */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Activity size={28} />
            <span>KPI Manager</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="flex items-center gap-3 w-full p-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Activity size={20} /> Microservicios
          </button>
        </nav>
      </aside>

      {/* Main Content - Contenido Principal */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Resumen de Gestión</h1>
            <p className="text-slate-500">Métricas consolidadas de tus servicios</p>
          </div>
          <button 
            onClick={() => setLoading(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </header>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KpiCard 
            title="Ingresos Totales" 
            value="$45,231.89" 
            trend="+20.1%" 
            isPositive={true}
            icon={<DollarSign className="text-blue-600" />}
          />
          <KpiCard 
            title="Sesiones Activas" 
            value="+2,350" 
            trend="+180.1%" 
            isPositive={true}
            icon={<Users className="text-purple-600" />}
          />
          <KpiCard 
            title="Latencia Media" 
            value="12.5 ms" 
            trend="-4.3%" 
            isPositive={true} 
            icon={<Activity className="text-orange-600" />}
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Rendimiento en Tiempo Real</h3>
            <p className="text-sm text-slate-500">Tráfico procesado por el BFF en las últimas 24h</p>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorKpi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#005fce" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="kpi" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorKpi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-componente para las Tarjetas
function KpiCard({ title, value, trend, isPositive, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl">
          {icon}
        </div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </div>
  );
}

export default App;