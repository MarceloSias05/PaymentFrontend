import React, { useState, useEffect } from 'react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import { 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle, 
    XCircle, 
    DollarSign,
    Clock,
    Users,
    BarChart3
} from 'lucide-react';
import MoneyAccumulationChart from '../charts/MoneyAccumulationChart';

const DomiciliationAnalysis = () => {
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('overview');

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Datos basados en el caso de estudio de Credifiel
    const ecaHistoryData = [
        { month: 'Ene 22', eca: 69.2, target: 70 },
        { month: 'Feb 22', eca: 69.4, target: 70 },
        { month: 'Mar 22', eca: 69.3, target: 70 },
        { month: 'Abr 22', eca: 69.6, target: 70 },
        { month: 'May 22', eca: 69.8, target: 70 },
        { month: 'Jun 22', eca: 69.5, target: 70 },
        { month: 'Jul 22', eca: 69.9, target: 70 },
        { month: 'Ago 22', eca: 70.1, target: 70 },
        { month: 'Sep 22', eca: 70.3, target: 70 },
        { month: 'Oct 22', eca: 70.8, target: 70 },
        { month: 'Nov 22', eca: 72.2, target: 70 },
        { month: 'Dic 22', eca: 72.6, target: 70 },
        { month: 'Ene 23', eca: 72.8, target: 70 },
        { month: 'Feb 23', eca: 72.9, target: 70 },
        { month: 'Mar 23', eca: 72.4, target: 70 },
        { month: 'Abr 23', eca: 72.7, target: 70 },
        { month: 'May 23', eca: 72.5, target: 70 }
    ];

    const paymentAttemptsByBank = [
        { bank: 'BBVA', successful: 9400, failed: 3100, total: 12500, rate: 75.2 },
        { bank: 'Santander', failed: 3504, successful: 7696, total: 11200, rate: 68.7 },
        { bank: 'Banorte', successful: 7722, failed: 3078, total: 10800, rate: 71.5 },
        { bank: 'Banamex', successful: 7007, failed: 3723, total: 10730, rate: 65.3 }
    ];

    const responseTypesData = [
        { name: 'Domiciliación Exitosa', value: 32765, color: '#10b981' },
        { name: 'Insuficiencia Fondos', value: 8420, color: '#ef4444' },
        { name: 'Cuenta Bloqueada', value: 2156, color: '#f59e0b' },
        { name: 'Cuenta Cancelada', value: 1889, color: '#6b7280' }
    ];

    const keyInsights = [
        {
            type: 'critical',
            icon: AlertTriangle,
            title: 'Segundo Pago Crítico',
            description: 'Los créditos sin segundo pago tienen 5x más probabilidad de quiebre',
            metric: '5x',
            color: 'red'
        },
        {
            type: 'opportunity', 
            icon: TrendingUp,
            title: 'Mejora en ECA',
            description: 'ECA histórica mejoró del 69% al 72.5% en el último año',
            metric: '+3.5%',
            color: 'green'
        },
        {
            type: 'warning',
            icon: Clock,
            title: 'Tiempo de Respuesta',
            description: 'Estrategias con respuesta 24h limitan intentos adicionales',
            metric: '24h',
            color: 'yellow'
        },
        {
            type: 'info',
            icon: DollarSign,
            title: 'Comisiones Fijas',
            description: 'Comisiones constantes sugieren falta de optimización',
            metric: '$1M/mes',
            color: 'blue'
        }
    ];

    const StatCard = ({ title, value, change, icon: Icon, color }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change}% vs anterior
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const InsightCard = ({ insight }) => {
        const Icon = insight.icon;
        const colorClasses = {
            red: 'bg-red-50 border-red-200 text-red-800',
            green: 'bg-green-50 border-green-200 text-green-800',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            blue: 'bg-blue-50 border-blue-200 text-blue-800'
        };

        return (
            <div className={`rounded-lg border p-4 ${colorClasses[insight.color]}`}>
                <div className="flex items-start">
                    <Icon className={`w-5 h-5 mt-0.5 mr-3 text-${insight.color}-600`} />
                    <div className="flex-1">
                        <h4 className="font-semibold text-sm">{insight.title}</h4>
                        <p className="text-sm mt-1 opacity-90">{insight.description}</p>
                        <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${insight.color}-100 text-${insight.color}-800`}>
                                {insight.metric}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="h-80 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Análisis de Domiciliación</h1>
                    <p className="text-gray-600 mt-1">
                        Análisis completo del comportamiento y efectividad de cobranza domiciliada
                    </p>
                </div>
                
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeView === 'overview' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Resumen
                    </button>
                    <button
                        onClick={() => setActiveView('banks')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeView === 'banks' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Por Banco
                    </button>
                    <button
                        onClick={() => setActiveView('trends')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeView === 'trends' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Tendencias
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    title="ECA Actual"
                    value="72.5%"
                    change={3.5}
                    icon={TrendingUp}
                    color="green"
                />
                <StatCard
                    title="Intentos Totales"
                    value="45,230"
                    change={2.1}
                    icon={BarChart3}
                    color="blue"
                />
                <StatCard
                    title="Pagos Exitosos"
                    value="32,765"
                    change={4.2}
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Tasa de Fallo"
                    value="27.6%"
                    change={-1.8}
                    icon={XCircle}
                    color="red"
                />
            </div>

            {/* Content based on active view */}
            {activeView === 'overview' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* ECA History Chart */}
                    <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Evolución ECA Histórica
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={ecaHistoryData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis domain={['65', '75']} />
                                    <Tooltip 
                                        formatter={(value, name) => [`${value}%`, name === 'eca' ? 'ECA Real' : 'Meta']}
                                    />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="eca" 
                                        stroke="#2563eb" 
                                        strokeWidth={3}
                                        name="ECA Real"
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="target" 
                                        stroke="#dc2626" 
                                        strokeDasharray="5 5"
                                        name="Meta"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Response Types Pie Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Tipos de Respuesta
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={responseTypesData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {responseTypesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => value.toLocaleString()} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {responseTypesData.map((item, index) => (
                                <div key={index} className="flex items-center text-sm">
                                    <div 
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-gray-600">{item.name}</span>
                                    <span className="ml-auto font-medium">{item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'banks' && (
                <div className="space-y-6">
                    {/* Bank Performance Chart */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Rendimiento por Banco
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={paymentAttemptsByBank}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="bank" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="successful" name="Exitosos" fill="#10b981" />
                                    <Bar dataKey="failed" name="Fallidos" fill="#ef4444" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Money Accumulation Chart */}
                    <MoneyAccumulationChart />
                </div>
            )}

            {activeView === 'trends' && (
                <div className="space-y-6">
                    <MoneyAccumulationChart 
                        title="Tendencia de Acumulación por Emisor"
                        period="12months"
                    />

                    {/* Key Insights */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Insights Clave
                        </h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Insight 1: Detalle importante sobre la tendencia.</li>
                            <li>Insight 2: Otro detalle relevante.</li>
                            <li>Insight 3: Más información que podría ser útil.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DomiciliationAnalysis;