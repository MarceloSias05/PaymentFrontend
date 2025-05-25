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
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    LineChart,
    Line
} from 'recharts';
import { 
    Building2, 
    TrendingUp, 
    Clock, 
    DollarSign,
    AlertCircle,
    CheckCircle,
    Target,
    Zap
} from 'lucide-react';

const BankPerformance = () => {
    const [loading, setLoading] = useState(true);
    const [selectedBank, setSelectedBank] = useState('all');
    const [timeRange, setTimeRange] = useState('6months');

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, [selectedBank, timeRange]);

    // Datos de rendimiento por banco basados en el caso de estudio
    const bankData = [
        {
            name: 'BBVA',
            code: 'BBVA',
            strategies: 5,
            successRate: 75.2,
            avgResponseTime: 2.3,
            totalAttempts: 12500,
            successfulPayments: 9400,
            failedPayments: 3100,
            avgAmount: 18500,
            commission: 8.00,
            status: 'optimal',
            color: '#004481',
            performance: {
                reliability: 95,
                speed: 88,
                costEfficiency: 85,
                coverage: 92,
                innovation: 78
            }
        },
        {
            name: 'Santander',
            code: 'SANTANDER',
            strategies: 4,
            successRate: 68.7,
            avgResponseTime: 4.1,
            totalAttempts: 11200,
            successfulPayments: 7696,
            failedPayments: 3504,
            avgAmount: 17200,
            commission: 2.82,
            status: 'regular',
            color: '#EC0000',
            performance: {
                reliability: 78,
                speed: 72,
                costEfficiency: 92,
                coverage: 85,
                innovation: 65
            }
        },
        {
            name: 'Banorte',
            code: 'BANORTE',
            strategies: 3,
            successRate: 71.5,
            avgResponseTime: 3.2,
            totalAttempts: 10800,
            successfulPayments: 7722,
            failedPayments: 3078,
            avgAmount: 16800,
            commission: 2.50,
            status: 'good',
            color: '#C8102E',
            performance: {
                reliability: 82,
                speed: 79,
                costEfficiency: 88,
                coverage: 75,
                innovation: 70
            }
        },
        {
            name: 'Banamex',
            code: 'BANAMEX',
            strategies: 3,
            successRate: 65.3,
            avgResponseTime: 5.8,
            totalAttempts: 10730,
            successfulPayments: 7007,
            failedPayments: 3723,
            avgAmount: 15900,
            commission: 1.75,
            status: 'review',
            color: '#DA020E',
            performance: {
                reliability: 72,
                speed: 58,
                costEfficiency: 95,
                coverage: 82,
                innovation: 55
            }
        }
    ];

    const monthlyTrends = [
        { month: 'Ene', BBVA: 74.8, Santander: 67.2, Banorte: 70.1, Banamex: 64.8 },
        { month: 'Feb', BBVA: 75.1, Santander: 68.1, Banorte: 71.0, Banamex: 65.2 },
        { month: 'Mar', BBVA: 75.3, Santander: 68.5, Banorte: 71.2, Banamex: 65.5 },
        { month: 'Abr', BBVA: 75.0, Santander: 68.9, Banorte: 71.8, Banamex: 65.1 },
        { month: 'May', BBVA: 75.4, Santander: 69.2, Banorte: 71.5, Banamex: 65.8 },
        { month: 'Jun', BBVA: 75.2, Santander: 68.7, Banorte: 71.5, Banamex: 65.3 }
    ];

    const getStatusBadge = (status) => {
        const badges = {
            optimal: { color: 'bg-green-100 text-green-800', text: 'Óptimo', icon: CheckCircle },
            good: { color: 'bg-blue-100 text-blue-800', text: 'Bueno', icon: TrendingUp },
            regular: { color: 'bg-yellow-100 text-yellow-800', text: 'Regular', icon: AlertCircle },
            review: { color: 'bg-red-100 text-red-800', text: 'Revisar', icon: AlertCircle }
        };
        
        const badge = badges[status];
        const Icon = badge.icon;
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {badge.text}
            </span>
        );
    };

    const BankCard = ({ bank }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: bank.color }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">{bank.name}</h3>
                </div>
                {getStatusBadge(bank.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-600">Tasa de Éxito</p>
                    <p className="text-2xl font-bold text-gray-900">{bank.successRate}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Estrategias</p>
                    <p className="text-2xl font-bold text-gray-900">{bank.strategies}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tiempo Respuesta</p>
                    <p className="text-lg font-semibold text-gray-900">{bank.avgResponseTime}h</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Comisión</p>
                    <p className="text-lg font-semibold text-gray-900">${bank.commission}</p>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pagos Exitosos</span>
                    <span className="font-medium">{bank.successfulPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Intentos Totales</span>
                    <span className="font-medium">{bank.totalAttempts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monto Promedio</span>
                    <span className="font-medium">${bank.avgAmount.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                            width: `${bank.successRate}%`,
                            backgroundColor: bank.color 
                        }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Efectividad General</p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const filteredData = selectedBank === 'all' ? bankData : bankData.filter(b => b.code === selectedBank);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Rendimiento por Banco</h1>
                    <p className="text-gray-600 mt-1">
                        Análisis comparativo de efectividad y rendimiento por institución bancaria
                    </p>
                </div>
                
                <div className="flex space-x-3 mt-4 sm:mt-0">
                    <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">Todos los Bancos</option>
                        {bankData.map(bank => (
                            <option key={bank.code} value={bank.code}>{bank.name}</option>
                        ))}
                    </select>
                    
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="3months">3 meses</option>
                        <option value="6months">6 meses</option>
                        <option value="12months">12 meses</option>
                    </select>
                </div>
            </div>

            {/* Bank Cards Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredData.map((bank) => (
                    <BankCard key={bank.code} bank={bank} />
                ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Success Rate Comparison */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Comparación de Tasa de Éxito
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={bankData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Éxito']} />
                                <Bar 
                                    dataKey="successRate" 
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Performance Radar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Radar de Performance
                    </h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={[
                                { metric: 'Confiabilidad', ...Object.fromEntries(bankData.map(b => [b.name, b.performance.reliability])) },
                                { metric: 'Velocidad', ...Object.fromEntries(bankData.map(b => [b.name, b.performance.speed])) },
                                { metric: 'Costo-Eficiencia', ...Object.fromEntries(bankData.map(b => [b.name, b.performance.costEfficiency])) },
                                { metric: 'Cobertura', ...Object.fromEntries(bankData.map(b => [b.name, b.performance.coverage])) },
                                { metric: 'Innovación', ...Object.fromEntries(bankData.map(b => [b.name, b.performance.innovation])) }
                            ]}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="metric" />
                                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                                {bankData.map((bank) => (
                                    <Radar
                                        key={bank.name}
                                        name={bank.name}
                                        dataKey={bank.name}
                                        stroke={bank.color}
                                        fill={bank.color}
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                ))}
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Tendencias Mensuales de Efectividad
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis domain={[60, 80]} />
                            <Tooltip formatter={(value) => [`${value}%`, 'Tasa de Éxito']} />
                            <Legend />
                            {bankData.map((bank) => (
                                <Line
                                    key={bank.name}
                                    type="monotone"
                                    dataKey={bank.name}
                                    stroke={bank.color}
                                    strokeWidth={2}
                                    dot={{ fill: bank.color, strokeWidth: 2, r: 4 }}
                                />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recomendaciones por Banco
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-600" />
                            Bancos de Alto Rendimiento
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                <span><strong>BBVA:</strong> Mantener como banco principal, explorar más estrategias</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span><strong>Banorte:</strong> Aumentar volumen, optimizar tiempo de respuesta</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-orange-600" />
                            Oportunidades de Mejora
                        </h4>
                        <div className="space-y-2">
                            <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                                <span><strong>Santander:</strong> Mejorar tiempo de respuesta y nuevas estrategias</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                                <span><strong>Banamex:</strong> Revisar acuerdo comercial o considerar reemplazo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankPerformance;