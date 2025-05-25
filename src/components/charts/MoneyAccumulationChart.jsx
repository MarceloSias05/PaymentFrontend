import React, { useState, useEffect } from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
    AreaChart,
    Area 
} from 'recharts';
import { TrendingUp, DollarSign, Calendar, Filter } from 'lucide-react';

const MoneyAccumulationChart = ({ title = "Acumulación de Dinero por Emisor", period = "6months" }) => {
    const [data, setData] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(period);
    const [chartType, setChartType] = useState('area'); // 'line' or 'area'
    const [loading, setLoading] = useState(true);

    // Datos simulados basados en el caso de estudio de Credifiel
    const generateData = (months = 6) => {
        const bankColors = {
            'BBVA': '#004481',
            'Santander': '#EC0000', 
            'Banorte': '#C8102E',
            'Banamex': '#DA020E'
        };

        const baseAmounts = {
            'BBVA': 2500000,     // BBVA tiene mejor performance
            'Santander': 2100000, // Performance regular
            'Banorte': 1800000,   // Performance buena
            'Banamex': 1600000    // Necesita revisión
        };

        const monthsData = [];
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - months);

        for (let i = 0; i <= months; i++) {
            const currentDate = new Date(startDate);
            currentDate.setMonth(startDate.getMonth() + i);
            
            const monthData = {
                month: currentDate.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }),
                date: currentDate.toISOString().substring(0, 7),
            };

            // Simular acumulación progresiva con variabilidad realista
            Object.keys(baseAmounts).forEach(bank => {
                const baseAmount = baseAmounts[bank];
                const growthFactor = 1 + (i * 0.08); // 8% crecimiento mensual promedio
                const randomVariation = 0.85 + Math.random() * 0.3; // Variación del 85% al 115%
                const seasonalFactor = 1 + Math.sin(i * 0.5) * 0.1; // Factor estacional
                
                monthData[bank] = Math.round(baseAmount * growthFactor * randomVariation * seasonalFactor);
            });

            monthsData.push(monthData);
        }

        return monthsData;
    };

    useEffect(() => {
        setLoading(true);
        // Simular carga de datos
        setTimeout(() => {
            const months = selectedPeriod === '3months' ? 3 : selectedPeriod === '6months' ? 6 : 12;
            setData(generateData(months));
            setLoading(false);
        }, 800);
    }, [selectedPeriod]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatTooltipCurrency = (value, name) => {
        return [formatCurrency(value), name];
    };

    const getTotalAccumulated = () => {
        if (!data.length) return 0;
        const lastMonth = data[data.length - 1];
        return Object.keys(lastMonth)
            .filter(key => key !== 'month' && key !== 'date')
            .reduce((sum, bank) => sum + lastMonth[bank], 0);
    };

    const getBestPerformer = () => {
        if (!data.length) return null;
        const lastMonth = data[data.length - 1];
        const banks = Object.keys(lastMonth).filter(key => key !== 'month' && key !== 'date');
        return banks.reduce((best, bank) => 
            lastMonth[bank] > lastMonth[best] ? bank : best
        );
    };

    const bankColors = {
        'BBVA': '#004481',
        'Santander': '#EC0000', 
        'Banorte': '#C8102E',
        'Banamex': '#DA020E'
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
                </div>
                <div className="h-80 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-gray-500">Cargando datos...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                
                <div className="flex items-center space-x-3">
                    {/* Period Selector */}
                    <select 
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="3months">3 meses</option>
                        <option value="6months">6 meses</option>
                        <option value="12months">12 meses</option>
                    </select>

                    {/* Chart Type Selector */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setChartType('area')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${
                                chartType === 'area' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Área
                        </button>
                        <button
                            onClick={() => setChartType('line')}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${
                                chartType === 'line' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Línea
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">Total Acumulado</span>
                    </div>
                    <p className="text-xl font-bold text-green-900 mt-1">
                        {formatCurrency(getTotalAccumulated())}
                    </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-800">Período</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-900 mt-1">
                        {selectedPeriod === '3months' ? '3 meses' : selectedPeriod === '6months' ? '6 meses' : '12 meses'}
                    </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                        <Filter className="w-4 h-4 text-purple-600 mr-2" />
                        <span className="text-sm font-medium text-purple-800">Mejor Emisor</span>
                    </div>
                    <p className="text-lg font-semibold text-purple-900 mt-1">
                        {getBestPerformer()}
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                fontSize={12}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                                formatter={formatTooltipCurrency}
                                labelStyle={{ color: '#374151' }}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            {Object.keys(bankColors).map((bank) => (
                                <Area
                                    key={bank}
                                    type="monotone"
                                    dataKey={bank}
                                    stackId="1"
                                    stroke={bankColors[bank]}
                                    fill={bankColors[bank]}
                                    fillOpacity={0.6}
                                    strokeWidth={2}
                                />
                            ))}
                        </AreaChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="month" 
                                stroke="#6b7280"
                                fontSize={12}
                            />
                            <YAxis 
                                stroke="#6b7280"
                                fontSize={12}
                                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                                formatter={formatTooltipCurrency}
                                labelStyle={{ color: '#374151' }}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                            {Object.keys(bankColors).map((bank) => (
                                <Line
                                    key={bank}
                                    type="monotone"
                                    dataKey={bank}
                                    stroke={bankColors[bank]}
                                    strokeWidth={3}
                                    dot={{ fill: bankColors[bank], strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: bankColors[bank], strokeWidth: 2 }}
                                />
                            ))}
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Footer with insights */}
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>
                        BBVA muestra el mejor rendimiento con una tendencia de crecimiento constante del 8.2% mensual
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MoneyAccumulationChart;