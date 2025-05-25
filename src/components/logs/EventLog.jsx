import React, { useState, useEffect } from 'react';
import { 
    AlertCircle, 
    CheckCircle, 
    XCircle, 
    Info,
    Filter,
    Download,
    Search,
    Calendar
} from 'lucide-react';

const EventLog = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Datos simulados para demostración
    const generateMockLogs = () => {
        return [
            {
                id: 1,
                fecha: new Date().toISOString(),
                nivel: 'error',
                mensaje: 'Error al procesar domiciliación - Cuenta bloqueada',
                resultado: 'Fallido - Reintento programado'
            },
            {
                id: 2,
                fecha: new Date(Date.now() - 300000).toISOString(),
                nivel: 'success',
                mensaje: 'Domiciliación exitosa BBVA - Cliente #12345',
                resultado: 'Exitoso - $18,500 MXN'
            },
            {
                id: 3,
                fecha: new Date(Date.now() - 600000).toISOString(),
                nivel: 'warning',
                mensaje: 'Tiempo de respuesta alto en Santander H2H',
                resultado: 'Completado con advertencias'
            },
            {
                id: 4,
                fecha: new Date(Date.now() - 900000).toISOString(),
                nivel: 'info',
                mensaje: 'Inicio de proceso batch nocturno',
                resultado: 'En progreso'
            },
            {
                id: 5,
                fecha: new Date(Date.now() - 1200000).toISOString(),
                nivel: 'error',
                mensaje: 'Fallo en conexión con Banamex - Timeout',
                resultado: 'Fallido - Escalado a soporte'
            },
            {
                id: 6,
                fecha: new Date(Date.now() - 1500000).toISOString(),
                nivel: 'success',
                mensaje: 'Reconciliación completada - 1,250 transacciones',
                resultado: 'Exitoso'
            },
            {
                id: 7,
                fecha: new Date(Date.now() - 1800000).toISOString(),
                nivel: 'warning',
                mensaje: 'Límite de reintentos alcanzado para cliente #67890',
                resultado: 'Pendiente revisión manual'
            },
            {
                id: 8,
                fecha: new Date(Date.now() - 2100000).toISOString(),
                nivel: 'info',
                mensaje: 'Actualización de estrategias de cobranza aplicada',
                resultado: 'Completado'
            },
            {
                id: 9,
                fecha: new Date(Date.now() - 2400000).toISOString(),
                nivel: 'success',
                mensaje: 'Domiciliación exitosa Banorte - Cliente #24681',
                resultado: 'Exitoso - $22,100 MXN'
            },
            {
                id: 10,
                fecha: new Date(Date.now() - 2700000).toISOString(),
                nivel: 'error',
                mensaje: 'Error en validación de cuenta - Datos inconsistentes',
                resultado: 'Fallido - Requiere actualización'
            }
        ];
    };

    useEffect(() => {
        // Simular carga de datos
        setTimeout(() => {
            const mockLogs = generateMockLogs();
            setLogs(mockLogs);
            setFilteredLogs(mockLogs);
            setLoading(false);
        }, 800);
    }, []);

    useEffect(() => {
        // Filtrar logs basado en nivel y término de búsqueda
        let filtered = logs;

        if (selectedLevel !== 'all') {
            filtered = filtered.filter(log => log.nivel === selectedLevel);
        }

        if (searchTerm) {
            filtered = filtered.filter(log => 
                log.mensaje.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.resultado.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredLogs(filtered);
    }, [selectedLevel, searchTerm, logs]);

    const getLevelIcon = (nivel) => {
        switch (nivel) {
            case 'error':
                return <XCircle className="w-4 h-4 text-red-600" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-yellow-600" />;
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'info':
                return <Info className="w-4 h-4 text-blue-600" />;
            default:
                return <Info className="w-4 h-4 text-gray-600" />;
        }
    };

    const getLevelBadge = (nivel) => {
        const badges = {
            error: 'bg-red-100 text-red-800 border-red-200',
            warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            success: 'bg-green-100 text-green-800 border-green-200',
            info: 'bg-blue-100 text-blue-800 border-blue-200'
        };

        return badges[nivel] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-MX', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const exportLogs = () => {
        const csvContent = [
            ['ID', 'Fecha', 'Nivel', 'Mensaje', 'Resultado'].join(','),
            ...filteredLogs.map(log => 
                [log.id, log.fecha, log.nivel, `"${log.mensaje}"`, `"${log.resultado}"`].join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `registro_eventos_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-16 bg-gray-100 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Registro de Eventos</h1>
                <p className="text-gray-600 mt-1">
                    Monitoreo en tiempo real de eventos del sistema de domiciliación
                </p>
            </div>

            {/* Main Log Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                        Eventos del Sistema
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar eventos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                            />
                        </div>

                        {/* Level Filter */}
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Todos los niveles</option>
                            <option value="error">Errores</option>
                            <option value="warning">Advertencias</option>
                            <option value="success">Éxitos</option>
                            <option value="info">Información</option>
                        </select>

                        {/* Export Button */}
                        <button
                            onClick={exportLogs}
                            className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-1" />
                            Exportar
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center">
                            <XCircle className="w-4 h-4 text-red-600 mr-2" />
                            <span className="text-sm font-medium text-red-800">Errores</span>
                        </div>
                        <p className="text-xl font-bold text-red-900 mt-1">
                            {logs.filter(l => l.nivel === 'error').length}
                        </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center">
                            <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                            <span className="text-sm font-medium text-yellow-800">Advertencias</span>
                        </div>
                        <p className="text-xl font-bold text-yellow-900 mt-1">
                            {logs.filter(l => l.nivel === 'warning').length}
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-800">Éxitos</span>
                        </div>
                        <p className="text-xl font-bold text-green-900 mt-1">
                            {logs.filter(l => l.nivel === 'success').length}
                        </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center">
                            <Info className="w-4 h-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-800">Info</span>
                        </div>
                        <p className="text-xl font-bold text-blue-900 mt-1">
                            {logs.filter(l => l.nivel === 'info').length}
                        </p>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nivel
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Mensaje
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Resultado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredLogs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                        No se encontraron eventos que coincidan con los filtros
                                    </td>
                                </tr>
                            ) : (
                                filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-2 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getLevelIcon(log.nivel)}
                                                <span className={`ml-2 px-2 py-1 text-xs rounded-full border ${getLevelBadge(log.nivel)}`}>
                                                    {log.nivel}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                                                {formatDate(log.fecha)}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900">
                                            <div className="max-w-md" title={log.mensaje}>
                                                {log.mensaje}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className={`inline-flex items-center text-xs ${
                                                log.resultado.toLowerCase().includes('exitoso') 
                                                    ? 'text-green-700' 
                                                    : log.resultado.toLowerCase().includes('fallido')
                                                        ? 'text-red-700'
                                                        : 'text-gray-700'
                                            }`}>
                                                {log.resultado}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600">
                        <div>
                            Mostrando {filteredLogs.length} de {logs.length} eventos
                        </div>
                        <div className="mt-2 sm:mt-0">
                            Última actualización: {new Date().toLocaleTimeString('es-MX')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventLog;