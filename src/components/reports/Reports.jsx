import React, { useState, useEffect } from 'react';
import { 
    FileText, 
    Download, 
    Calendar, 
    Filter,
    TrendingUp,
    DollarSign,
    Building2,
    Users,
    Clock,
    BarChart3,
    PieChart,
    Eye,
    RefreshCw,
    Mail,
    Printer,
    Search,
    Settings,
    Star,
    Trash2,
    Share2,
    AlertCircle,
    CheckCircle,
    Plus,
    X,
    Shield
} from 'lucide-react';

const Reports = () => {
    const [selectedReport, setSelectedReport] = useState('eca-monthly');
    const [dateRange, setDateRange] = useState('last-month');
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(['eca-monthly', 'bank-performance']);
    const [scheduleConfig, setScheduleConfig] = useState({
        frequency: 'weekly',
        email: '',
        format: 'pdf',
        enabled: false
    });

    // Tipos de reportes disponibles
    const reportTypes = [
        {
            id: 'eca-monthly',
            name: 'Reporte ECA Mensual',
            description: 'Análisis mensual de Efectividad de Cobranza Acumulada',
            icon: TrendingUp,
            category: 'Efectividad',
            estimatedTime: '2-3 min'
        },
        {
            id: 'bank-performance',
            name: 'Rendimiento por Banco',
            description: 'Comparativo de performance entre instituciones bancarias',
            icon: Building2,
            category: 'Bancos',
            estimatedTime: '1-2 min'
        },
        {
            id: 'strategy-analysis',
            name: 'Análisis de Estrategias',
            description: 'Evaluación de efectividad por estrategia de cobranza',
            icon: BarChart3,
            category: 'Estrategias',
            estimatedTime: '3-4 min'
        },
        {
            id: 'client-behavior',
            name: 'Comportamiento de Clientes',
            description: 'Patrones de pago y riesgo por segmento de cliente',
            icon: Users,
            category: 'Clientes',
            estimatedTime: '2-3 min'
        },
        {
            id: 'commission-analysis',
            name: 'Análisis de Comisiones',
            description: 'Detalle de costos por comisiones bancarias',
            icon: DollarSign,
            category: 'Financiero',
            estimatedTime: '1-2 min'
        },
        {
            id: 'response-times',
            name: 'Tiempos de Respuesta',
            description: 'Análisis de tiempos de procesamiento por banco',
            icon: Clock,
            category: 'Operativo',
            estimatedTime: '2-3 min'
        },
        {
            id: 'regulatory-compliance',
            name: 'Cumplimiento Regulatorio',
            description: 'Reporte de cumplimiento CNBV y normativas',
            icon: Shield,
            category: 'Compliance',
            estimatedTime: '4-5 min'
        },
        {
            id: 'risk-analysis',
            name: 'Análisis de Riesgo',
            description: 'Evaluación de riesgo por portfolio y cliente',
            icon: AlertCircle,
            category: 'Riesgo',
            estimatedTime: '3-4 min'
        }
    ];

    // Rangos de fecha disponibles
    const dateRanges = [
        { value: 'today', label: 'Hoy' },
        { value: 'yesterday', label: 'Ayer' },
        { value: 'last-week', label: 'Última semana' },
        { value: 'last-month', label: 'Último mes' },
        { value: 'last-quarter', label: 'Último trimestre' },
        { value: 'last-semester', label: 'Último semestre' },
        { value: 'last-year', label: 'Último año' },
        { value: 'custom', label: 'Personalizado' }
    ];

    // Historial de reportes extendido
    const [reportHistory, setReportHistory] = useState([
        {
            id: 1,
            name: 'Reporte ECA Mensual - Diciembre 2024',
            type: 'eca-monthly',
            generated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            size: '2.4 MB',
            format: 'PDF',
            status: 'completed'
        },
        {
            id: 2,
            name: 'Rendimiento por Banco - Noviembre 2024',
            type: 'bank-performance',
            generated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            size: '1.8 MB',
            format: 'Excel',
            status: 'completed'
        },
        {
            id: 3,
            name: 'Análisis de Comisiones - Q4 2024',
            type: 'commission-analysis',
            generated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            size: '3.1 MB',
            format: 'PDF',
            status: 'completed'
        },
        {
            id: 4,
            name: 'Comportamiento Clientes - Diciembre 2024',
            type: 'client-behavior',
            generated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            size: '4.2 MB',
            format: 'Excel',
            status: 'processing'
        }
    ]);

    // Generar datos de reporte basados en el tipo seleccionado
    const generateReportData = (reportType, range) => {
        const baseData = {
            generatedAt: new Date().toISOString(),
            period: range,
            reportType: reportType,
            metadata: {
                totalRecords: Math.floor(Math.random() * 50000) + 10000,
                processingTime: Math.floor(Math.random() * 300) + 30,
                dataQuality: Math.floor(Math.random() * 20) + 80
            }
        };

        switch (reportType) {
            case 'eca-monthly':
                return {
                    ...baseData,
                    title: 'Reporte ECA Mensual',
                    summary: {
                        ecaActual: 72.5,
                        ecaAnterior: 72.1,
                        variacion: 0.4,
                        tendencia: 'positiva',
                        totalIntentos: 45230,
                        exitosos: 32765,
                        fallidos: 12465
                    },
                    banks: [
                        { name: 'BBVA', eca: 75.2, intentos: 12500, exitosos: 9400, variacion: 1.2 },
                        { name: 'Santander', eca: 68.7, intentos: 11200, exitosos: 7696, variacion: -0.8 },
                        { name: 'Banorte', eca: 71.5, intentos: 10800, exitosos: 7722, variacion: 0.5 },
                        { name: 'Banamex', eca: 65.3, intentos: 10730, exitosos: 7007, variacion: -1.1 }
                    ],
                    insights: [
                        'ECA mejoró 0.4% respecto al mes anterior',
                        'BBVA mantiene el mejor rendimiento con 75.2%',
                        'Banamex requiere atención urgente con 65.3%',
                        'Se procesaron 45,230 intentos de domiciliación',
                        'Tendencia positiva en los últimos 3 meses'
                    ]
                };

            case 'bank-performance':
                return {
                    ...baseData,
                    title: 'Rendimiento por Banco',
                    summary: {
                        mejorBanco: 'BBVA',
                        peorBanco: 'Banamex',
                        promedioIndustria: 70.2,
                        totalComisiones: 1000000,
                        bancosActivos: 4
                    },
                    performance: [
                        { 
                            banco: 'BBVA', 
                            estrategias: 5, 
                            eca: 75.2, 
                            comision: 8.00, 
                            tiempo: 2.3,
                            status: 'Óptimo',
                            volumen: 12500,
                            disponibilidad: 99.8
                        },
                        { 
                            banco: 'Santander', 
                            estrategias: 4, 
                            eca: 68.7, 
                            comision: 2.82, 
                            tiempo: 4.1,
                            status: 'Regular',
                            volumen: 11200,
                            disponibilidad: 98.5
                        },
                        { 
                            banco: 'Banorte', 
                            estrategias: 3, 
                            eca: 71.5, 
                            comision: 2.50, 
                            tiempo: 3.2,
                            status: 'Bueno',
                            volumen: 10800,
                            disponibilidad: 99.2
                        },
                        { 
                            banco: 'Banamex', 
                            estrategias: 3, 
                            eca: 65.3, 
                            comision: 1.75, 
                            tiempo: 5.8,
                            status: 'Revisar',
                            volumen: 10730,
                            disponibilidad: 97.1
                        }
                    ]
                };

            case 'commission-analysis':
                return {
                    ...baseData,
                    title: 'Análisis de Comisiones',
                    summary: {
                        totalMensual: 1000000,
                        promedioPorTransaccion: 4.52,
                        mayorCosto: 'BBVA',
                        menorCosto: 'Banamex',
                        ahorroPotencial: 150000
                    },
                    commissions: [
                        { banco: 'BBVA', total: 470000, promedio: 8.00, transacciones: 12500, porcentaje: 47 },
                        { banco: 'Santander', total: 210000, promedio: 2.82, transacciones: 11200, porcentaje: 21 },
                        { banco: 'Banorte', total: 180000, promedio: 2.50, transacciones: 10800, porcentaje: 18 },
                        { banco: 'Banamex', total: 140000, promedio: 1.75, transacciones: 10730, porcentaje: 14 }
                    ]
                };

            case 'client-behavior':
                return {
                    ...baseData,
                    title: 'Comportamiento de Clientes',
                    summary: {
                        clientesActivos: 320000,
                        clientesNuevos: 15000,
                        tasaRetencion: 85.2,
                        valorPromedio: 5670
                    },
                    segments: [
                        { segmento: 'Premium', clientes: 48000, eca: 88.5, valorPromedio: 15000 },
                        { segmento: 'Gold', clientes: 96000, eca: 76.2, valorPromedio: 8500 },
                        { segmento: 'Silver', clientes: 128000, eca: 68.7, valorPromedio: 4200 },
                        { segmento: 'Basic', clientes: 48000, eca: 52.3, valorPromedio: 1800 }
                    ]
                };

            case 'risk-analysis':
                return {
                    ...baseData,
                    title: 'Análisis de Riesgo',
                    summary: {
                        riesgoPromedio: 'Medio',
                        clientesAltoRiesgo: 5200,
                        provisionRequerida: 2500000,
                        tendenciaRiesgo: 'Estable'
                    },
                    riskCategories: [
                        { categoria: 'Bajo Riesgo', clientes: 240000, porcentaje: 75, provision: 500000 },
                        { categoria: 'Medio Riesgo', clientes: 64000, porcentaje: 20, provision: 1000000 },
                        { categoria: 'Alto Riesgo', clientes: 16000, porcentaje: 5, provision: 1000000 }
                    ]
                };

            default:
                return {
                    ...baseData,
                    title: 'Reporte Genérico',
                    summary: { message: 'Datos en desarrollo' }
                };
        }
    };

    const generateReport = async () => {
        setLoading(true);
        
        // Simular generación de reporte
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const data = generateReportData(selectedReport, dateRange);
        setReportData(data);
        setLoading(false);
    };

    useEffect(() => {
        generateReport();
    }, [selectedReport, dateRange]);

    const downloadReport = (format) => {
        if (!reportData) return;

        let content, fileName, mimeType;

        switch (format) {
            case 'pdf':
                // En un caso real, aquí generarías un PDF
                alert('Función PDF en desarrollo. En producción se generaría un PDF completo.');
                return;

            case 'excel':
                alert('Función Excel en desarrollo. En producción se generaría un archivo .xlsx.');
                return;

            case 'csv':
                // Generar CSV básico
                const csvData = reportData.banks || reportData.performance || reportData.commissions || [];
                const headers = Object.keys(csvData[0] || {});
                const csvContent = [
                    headers.join(','),
                    ...csvData.map(row => headers.map(header => row[header]).join(','))
                ].join('\n');

                content = csvContent;
                fileName = `reporte_${selectedReport}_${new Date().toISOString().split('T')[0]}.csv`;
                mimeType = 'text/csv';
                break;

            default:
                return;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const sendByEmail = () => {
        alert('En desarrollo: Se enviará el reporte por email al destinatario seleccionado.');
    };

    const printReport = () => {
        window.print();
    };

    const toggleFavorite = (reportId) => {
        setFavorites(prev => 
            prev.includes(reportId) 
                ? prev.filter(id => id !== reportId)
                : [...prev, reportId]
        );
    };

    const deleteFromHistory = (historyId) => {
        setReportHistory(prev => prev.filter(item => item.id !== historyId));
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatFileSize = (size) => {
        return size;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            case 'failed':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Completado';
            case 'processing':
                return 'Procesando';
            case 'failed':
                return 'Fallido';
            default:
                return 'Desconocido';
        }
    };

    const filteredReports = reportTypes.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ReportCard = ({ report, isSelected, onClick }) => {
        const Icon = report.icon;
        const isFavorite = favorites.includes(report.id);
        
        return (
            <div
                onClick={onClick}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md relative ${
                    isSelected 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(report.id);
                    }}
                    className={`absolute top-2 right-2 p-1 rounded ${
                        isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                >
                    <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>

                <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg mr-3 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{report.name}</h3>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{report.category}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{report.estimatedTime}</span>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600">{report.description}</p>
            </div>
        );
    };

    // Modal para programar reportes
    const ScheduleModal = () => (
        showScheduleModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Programar Reporte</h3>
                        <button
                            onClick={() => setShowScheduleModal(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Frecuencia
                            </label>
                            <select
                                value={scheduleConfig.frequency}
                                onChange={(e) => setScheduleConfig(prev => ({...prev, frequency: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="daily">Diario</option>
                                <option value="weekly">Semanal</option>
                                <option value="monthly">Mensual</option>
                                <option value="quarterly">Trimestral</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email de envío
                            </label>
                            <input
                                type="email"
                                value={scheduleConfig.email}
                                onChange={(e) => setScheduleConfig(prev => ({...prev, email: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="usuario@credifiel.com"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Formato
                            </label>
                            <select
                                value={scheduleConfig.format}
                                onChange={(e) => setScheduleConfig(prev => ({...prev, format: e.target.value}))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="pdf">PDF</option>
                                <option value="excel">Excel</option>
                                <option value="csv">CSV</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            onClick={() => setShowScheduleModal(false)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                setScheduleConfig(prev => ({...prev, enabled: true}));
                                setShowScheduleModal(false);
                                alert('Reporte programado exitosamente');
                            }}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Programar
                        </button>
                    </div>
                </div>
            </div>
        )
    );

    const ReportSummary = ({ data }) => {
        if (!data) return null;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{data.title}</h3>
                        <p className="text-sm text-gray-500">
                            Generado el {formatDate(new Date(data.generatedAt))}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500">
                            Registros: {data.metadata?.totalRecords?.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">
                            Tiempo: {data.metadata?.processingTime}s
                        </div>
                        <div className="text-sm text-gray-500">
                            Calidad: {data.metadata?.dataQuality}%
                        </div>
                    </div>
                </div>
                
                {data.reportType === 'eca-monthly' && (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-green-800">ECA Actual</span>
                                </div>
                                <p className="text-2xl font-bold text-green-900 mt-1">{data.summary.ecaActual}%</p>
                                <p className="text-xs text-green-600">+{data.summary.variacion}% vs anterior</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-blue-800">Total Intentos</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-900 mt-1">{data.summary.totalIntentos.toLocaleString()}</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                                    <span className="text-sm font-medium text-purple-800">Exitosos</span>
                                </div>
                                <p className="text-2xl font-bold text-purple-900 mt-1">{data.summary.exitosos.toLocaleString()}</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                                    <span className="text-sm font-medium text-red-800">Fallidos</span>
                                </div>
                                <p className="text-2xl font-bold text-red-900 mt-1">{data.summary.fallidos.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banco</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ECA %</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intentos</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exitosos</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variación</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.banks.map((bank, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{bank.name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{bank.eca}%</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{bank.intentos.toLocaleString()}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{bank.exitosos.toLocaleString()}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <span className={`${bank.variacion > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {bank.variacion > 0 ? '+' : ''}{bank.variacion}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {data.reportType === 'bank-performance' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banco</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estrategias</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ECA %</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comisión</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiempo (h)</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disponibilidad</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.performance.map((bank, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{bank.banco}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{bank.estrategias}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{bank.eca}%</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">${bank.comision}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{bank.tiempo}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900">{bank.disponibilidad}%</td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                bank.status === 'Óptimo' ? 'bg-green-100 text-green-800' :
                                                bank.status === 'Bueno' ? 'bg-blue-100 text-blue-800' :
                                                bank.status === 'Regular' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {bank.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {data.reportType === 'commission-analysis' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                                    <span className="text-sm font-medium text-green-800">Total Mensual</span>
                                </div>
                                <p className="text-2xl font-bold text-green-900 mt-1">
                                    ${data.summary.totalMensual.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium text-blue-800">Promedio/Transacción</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-900 mt-1">${data.summary.promedioPorTransaccion}</p>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
                                    <span className="text-sm font-medium text-red-800">Mayor Costo</span>
                                </div>
                                <p className="text-lg font-bold text-red-900 mt-1">{data.summary.mayorCosto}</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center">
                                    <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                                    <span className="text-sm font-medium text-purple-800">Ahorro Potencial</span>
                                </div>
                                <p className="text-lg font-bold text-purple-900 mt-1">
                                    ${data.summary.ahorroPotencial?.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Banco</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Promedio</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transacciones</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">% del Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data.commissions.map((comm, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{comm.banco}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">${comm.total.toLocaleString()}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">${comm.promedio}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{comm.transacciones.toLocaleString()}</td>
                                            <td className="px-4 py-4 text-sm text-gray-900">{comm.porcentaje}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Insights */}
                {data.insights && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-3">Insights Clave</h4>
                        <ul className="space-y-2">
                            {data.insights.map((insight, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Reportes</h1>
                <p className="text-gray-600 mt-1">
                    Genera y analiza reportes detallados del sistema de domiciliación
                </p>
            </div>

            {/* Report Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Seleccionar Reporte</h3>
                    
                    {/* Search */}
                    <div className="relative mt-4 sm:mt-0">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar reportes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {filteredReports.map((report) => (
                        <ReportCard
                            key={report.id}
                            report={report}
                            isSelected={selectedReport === report.id}
                            onClick={() => setSelectedReport(report.id)}
                        />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {dateRanges.map((range) => (
                                    <option key={range.value} value={range.value}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <button
                            onClick={generateReport}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Generando...' : 'Actualizar'}
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => downloadReport('csv')}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            CSV
                        </button>
                        <button
                            onClick={() => downloadReport('excel')}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            Excel
                        </button>
                        <button
                            onClick={() => downloadReport('pdf')}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                        </button>
                        <button
                            onClick={sendByEmail}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                        </button>
                        <button
                            onClick={printReport}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Printer className="w-4 h-4 mr-1" />
                            Imprimir
                        </button>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <div className="text-center">
                        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Generando Reporte</h3>
                        <p className="text-gray-600">Por favor espera mientras se procesa la información...</p>
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                    </div>
                </div>
            ) : (
                <ReportSummary data={reportData} />
            )}

            {/* Report History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Historial de Reportes</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                        Ver todos
                    </button>
                </div>
                <div className="space-y-3">
                    {reportHistory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center">
                                <FileText className="w-4 h-4 text-gray-500 mr-3" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                                        <span>{formatDate(item.generated)}</span>
                                        <span>•</span>
                                        <span>{formatFileSize(item.size)}</span>
                                        <span>•</span>
                                        <span>{item.format}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                                            {getStatusText(item.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {item.status === 'completed' && (
                                    <>
                                        <button className="p-1 text-gray-400 hover:text-gray-600">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-gray-400 hover:text-gray-600">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-gray-400 hover:text-gray-600">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                                <button 
                                    onClick={() => deleteFromHistory(item.id)}
                                    className="p-1 text-gray-400 hover:text-red-600"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Dashboard Ejecutivo</p>
                            <p className="text-sm text-gray-600">Resumen para directivos</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => setShowScheduleModal(true)}
                        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Reporte Automático</p>
                            <p className="text-sm text-gray-600">Configurar envío programado</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => setShowCustomModal(true)}
                        className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="p-2 bg-purple-100 rounded-lg mr-3">
                            <PieChart className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">Análisis Personalizado</p>
                            <p className="text-sm text-gray-600">Crear reporte a medida</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Scheduled Reports Status */}
            {scheduleConfig.enabled && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Reportes Programados</h3>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Reporte {reportTypes.find(r => r.id === selectedReport)?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Frecuencia: {scheduleConfig.frequency} | Formato: {scheduleConfig.format.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setScheduleConfig(prev => ({...prev, enabled: false}))}
                            className="text-red-600 hover:text-red-700"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Schedule Modal */}
            <ScheduleModal />
        </div>
    );
};

export default Reports;