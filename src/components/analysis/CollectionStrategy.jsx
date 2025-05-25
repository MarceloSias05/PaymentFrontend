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
    Target, 
    Clock, 
    DollarSign, 
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Calendar,
    Settings,
    Zap,
    Brain
} from 'lucide-react';

const CollectionStrategy = () => {
    const [loading, setLoading] = useState(true);
    const [selectedStrategy, setSelectedStrategy] = useState('all');
    const [optimizationMode, setOptimizationMode] = useState('cost'); // 'cost' or 'effectiveness'

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, [selectedStrategy, optimizationMode]);

    // Datos de estrategias basados en el caso de estudio
    const strategies = [
        {
            id: 'bbva_traditional',
            name: 'BBVA Tradicional',
            bank: 'BBVA',
            type: 'Tradicional',
            cost: 8.00,
            successRate: 76.2,
            responseTime: 2.1,
            attempts: 3200,
            successful: 2438,
            avgAmount: 18500,
            timeWindows: ['08:00-15:30'],
            description: 'Estrategia principal con mejor rendimiento general'
        },
        {
            id: 'bbva_parcial',
            name: 'BBVA Parcial',
            bank: 'BBVA',
            type: 'Parcial',
            cost: 1.60,
            successRate: 68.5,
            responseTime: 2.3,
            attempts: 2800,
            successful: 1918,
            avgAmount: 12300,
            timeWindows: ['08:00-15:30'],
            description: 'Permite cobros parciales cuando el monto total no está disponible'
        },
        {
            id: 'santander_h2h',
            name: 'Santander H2H',
            bank: 'Santander',
            type: 'Host to Host',
            cost: 2.82,
            successRate: 69.8,
            responseTime: 24.0,
            attempts: 2650,
            successful: 1850,
            avgAmount: 17200,
            timeWindows: ['08:00-17:30'],
            description: 'Respuesta lenta pero costo-eficiente'
        },
        {
            id: 'banorte_especializado',
            name: 'Banorte Especializado',
            bank: 'Banorte',
            type: 'Especializado',
            cost: 20.00,
            successRate: 78.3,
            responseTime: 4.5,
            attempts: 1900,
            successful: 1488,
            avgAmount: 22100,
            timeWindows: ['03:00-17:30'],
            description: 'Alto costo pero excelente efectividad para montos altos'
        },
        {
            id: 'banamex_interbancario',
            name: 'Banamex Interbancario',
            bank: 'Banamex',
            type: 'Interbancario',
            cost: 1.75,
            successRate: 65.1,
            responseTime: 6.2,
            attempts: 2100,
            successful: 1367,
            avgAmount: 15900,
            timeWindows: ['08:00-14:59'],
            description: 'Bajo costo pero rendimiento limitado'
        }
    ];

    const paymentScheduleData = [
        { payment: 'Primer Pago', successRate: 82.4, attempts: 15420, critical: false },
        { payment: 'Segundo Pago', successRate: 76.8, attempts: 13890, critical: true },
        { payment: 'Tercer Pago', successRate: 71.2, attempts: 12100, critical: false },
        { payment: 'Cuarto Pago', successRate: 68.9, attempts: 10980, critical: false },
        { payment: 'Quinto Pago', successRate: 52.1, attempts: 9650, critical: true },
        { payment: 'Sexto+ Pago', successRate: 35.2, attempts: 8200, critical: true }
    ];

    const optimizationScenarios = {
        cost: {
            title: 'Optimización por Costo',
            description: 'Minimizar comisiones manteniendo efectividad aceptable',
            recommendations: [
                { strategy: 'banamex_interbancario', priority: 1, reason: 'Menor costo por transacción' },
                { strategy: 'bbva_parcial', priority: 2, reason: 'Balance costo-efectividad' },
                { strategy: 'santander_h2h', priority: 3, reason: 'Backup costo-eficiente' }
            ],
            projectedSavings: 'Ahorro proyectado: 32% en comisiones',
            estimatedImpact: 'Reducción ECA: -2.1%'
        },
        effectiveness: {
            title: 'Optimización por Efectividad',
            description: 'Maximizar tasa de cobro sin restricción de costo',
            recommendations: [
                { strategy: 'banorte_especializado', priority: 1, reason: 'Mayor tasa de éxito' },
                { strategy: 'bbva_traditional', priority: 2, reason: 'Consistencia probada' },
                { strategy: 'santander_h2h', priority: 3, reason: 'Volumen complementario' }
            ],
            projectedSavings: 'Mejora proyectada: +4.7% en ECA',
            estimatedImpact: 'Incremento costo: +28%'
        }
    };

    const getStrategyColor = (bank) => {
        const colors = {
            'BBVA': '#004481',
            'Santander': '#EC0000',
            'Banorte': '#C8102E',
            'Banamex': '#DA020E'
        };
        return colors[bank] || '#6b7280';
    };

    const StrategyCard = ({ strategy }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: getStrategyColor(strategy.bank) }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {strategy.type}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-600">Tasa de Éxito</p>
                    <p className="text-xl font-bold text-gray-900">{strategy.successRate}%</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Costo</p>
                    <p className="text-xl font-bold text-gray-900">${strategy.cost}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Tiempo Respuesta</p>
                    <p className="text-lg font-semibold text-gray-900">{strategy.responseTime}h</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Intentos</p>
                    <p className="text-lg font-semibold text-gray-900">{strategy.attempts.toLocaleString()}</p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cobros Exitosos</span>
                    <span className="font-medium">{strategy.successful.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monto Promedio</span>
                    <span className="font-medium">${strategy.avgAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Horarios</span>
                    <span className="font-medium text-xs">{strategy.timeWindows.join(', ')}</span>
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                        width: `${strategy.successRate}%`,
                        backgroundColor: getStrategyColor(strategy.bank)
                    }}
                ></div>
            </div>
        </div>
    );

    const OptimizationPanel = ({ scenario }) => (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center mb-4">
                <Brain className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
            </div>
            
            <p className="text-gray-700 mb-4">{scenario.description}</p>
            
            <div className="space-y-3 mb-4">
                <h4 className="font-medium text-gray-900">Estrategias Recomendadas:</h4>
                {scenario.recommendations.map((rec, index) => {
                    const strategy = strategies.find(s => s.id === rec.strategy);
                    return (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                            <div className="flex items-center">
                                <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center mr-3">
                                    {rec.priority}
                                </span>
                                <div>
                                    <p className="font-medium text-gray-900">{strategy?.name}</p>
                                    <p className="text-sm text-gray-600">{rec.reason}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{strategy?.successRate}%</p>
                                <p className="text-xs text-gray-600">${strategy?.cost}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-green-700">{scenario.projectedSavings}</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                    <p className="text-sm font-medium text-orange-700">{scenario.estimatedImpact}</p>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const filteredStrategies = selectedStrategy === 'all' 
        ? strategies 
        : strategies.filter(s => s.bank === selectedStrategy);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Estrategias de Cobranza</h1>
                    <p className="text-gray-600 mt-1">
                        Análisis y optimización de estrategias de cobro domiciliado
                    </p>
                </div>
                
                <div className="flex space-x-3 mt-4 sm:mt-0">
                    <select
                        value={selectedStrategy}
                        onChange={(e) => setSelectedStrategy(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todas las Estrategias</option>
                        <option value="BBVA">BBVA</option>
                        <option value="Santander">Santander</option>
                        <option value="Banorte">Banorte</option>
                        <option value="Banamex">Banamex</option>
                    </select>
                    
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setOptimizationMode('cost')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                optimizationMode === 'cost' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            Costo
                        </button>
                        <button
                            onClick={() => setOptimizationMode('effectiveness')}
                            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                optimizationMode === 'effectiveness' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Target className="w-4 h-4 inline mr-1" />
                            Efectividad
                        </button>
                    </div>
                </div>
            </div>

            {/* Strategy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStrategies.map((strategy) => (
                    <StrategyCard key={strategy.id} strategy={strategy} />
                ))}
            </div>

            {/* Payment Schedule Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Análisis por Número de Pago
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentScheduleData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="payment" />
                            <YAxis />
                            <Tooltip 
                                formatter={(value, name) => [
                                    name === 'successRate' ? `${value}%` : value.toLocaleString(),
                                    name === 'successRate' ? 'Tasa de Éxito' : 'Intentos'
                                ]}
                            />
                            <Legend />
                            <Bar 
                                dataKey="successRate" 
                                name="Tasa de Éxito (%)"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Critical Payment Alerts */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                        <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium text-gray-900">Pagos Críticos Identificados</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {paymentScheduleData.filter(p => p.critical).map((payment, index) => (
                            <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className="text-sm font-medium text-red-800">{payment.payment}</p>
                                <p className="text-xs text-red-600">
                                    {payment.payment === 'Segundo Pago' && 'Crítico: 5x probabilidad de quiebre'}
                                    {payment.payment === 'Quinto Pago' && 'Punto de no retorno: 52% de recuperación'}
                                    {payment.payment === 'Sexto+ Pago' && 'Recuperación mínima: considerar castigo'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optimization Recommendations */}
            <OptimizationPanel scenario={optimizationScenarios[optimizationMode]} />

            {/* Strategy Comparison Matrix */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Matriz de Comparación de Estrategias
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estrategia
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Banco
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Éxito %
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Costo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tiempo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ratio Costo/Beneficio
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {strategies.map((strategy) => {
                                const costBenefitRatio = (strategy.cost / strategy.successRate * 100).toFixed(2);
                                return (
                                    <tr key={strategy.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div 
                                                    className="w-3 h-3 rounded-full mr-3"
                                                    style={{ backgroundColor: getStrategyColor(strategy.bank) }}
                                                ></div>
                                                <span className="text-sm font-medium text-gray-900">{strategy.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {strategy.bank}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {strategy.successRate}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${strategy.cost}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {strategy.responseTime}h
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                parseFloat(costBenefitRatio) < 0.15 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : parseFloat(costBenefitRatio) < 0.30 
                                                        ? 'bg-yellow-100 text-yellow-800' 
                                                        : 'bg-red-100 text-red-800'
                                            }`}>
                                                {costBenefitRatio}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Implementation Timeline */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cronograma de Implementación Sugerido
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-green-600" />
                            Fase 1 (1-2 meses)
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Implementar alertas segundo pago</li>
                            <li>• Optimizar horarios BBVA</li>
                            <li>• Revisar estrategia Banamex</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Settings className="w-4 h-4 mr-2 text-blue-600" />
                            Fase 2 (3-4 meses)
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Negociar mejores términos</li>
                            <li>• Implementar ML predictivo</li>
                            <li>• Diversificar emisoras</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2 text-purple-600" />
                            Fase 3 (5-6 meses)
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                            <li>• Automatización completa</li>
                            <li>• Análisis en tiempo real</li>
                            <li>• Optimización continua</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionStrategy;

const getStrategyColor = (bank) => {
    const colors = {
        'BBVA': '#004481',
        'Santander': '#EC0000',
        'Banorte': '#C8102E',
        'Banamex': '#DA020E'
    };
    return colors[bank] || '#6b7280';
};

    const StrategyCard = ({ strategy }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: getStrategyColor(strategy.bank) }}
                    ></div>
                    <h3 className="text-lg font-semibold text-gray-900">{strategy.name}</h3>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {strategy.type}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
             <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <p className="text-sm text-gray-600">Tasa de Éxito</p>
                <p className="text-xl font-bold text-gray-900">{strategy.successRate}%</p>
            </div>
            <div>
                <p className="text-sm text-gray-600">Costo</p>
                <p className="text-xl font-bold text-gray-900">${strategy.cost}</p>
            </div>
            <div>
                <p className="text-sm text-gray-600">Tiempo Respuesta</p>
                <p className="text-lg font-semibold text-gray-900">{strategy.responseTime}h</p>
            </div>
            <div>
                <p className="text-sm text-gray-600">Intentos</p>
                <p className="text-lg font-semibold text-gray-900">{strategy.attempts.toLocaleString()}</p>
            </div>
        </div>

        <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cobros Exitosos</span>
                <span className="font-medium">{strategy.successful.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monto Promedio</span>
                <span className="font-medium">${strategy.avgAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-600">Horarios</span>
                <span className="font-medium text-xs">{strategy.timeWindows.join(', ')}</span>
            </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                    width: `${strategy.successRate}%`,
                    backgroundColor: getStrategyColor(strategy.bank)
                }}
            ></div>
        </div>
    </div>
);