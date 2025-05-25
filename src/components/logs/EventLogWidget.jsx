import React from 'react';
import { 
    AlertCircle, 
    CheckCircle, 
    XCircle, 
    Info,
    ArrowRight
} from 'lucide-react';

const EventLogWidget = ({ onViewAll }) => {
    // Últimos 5 eventos para el widget
    const recentLogs = [
        {
            id: 1,
            fecha: new Date().toISOString(),
            nivel: 'error',
            mensaje: 'Error al procesar domiciliación - Cuenta bloqueada',
            resultado: 'Fallido'
        },
        {
            id: 2,
            fecha: new Date(Date.now() - 300000).toISOString(),
            nivel: 'success',
            mensaje: 'Domiciliación exitosa BBVA - Cliente #12345',
            resultado: 'Exitoso'
        },
        {
            id: 3,
            fecha: new Date(Date.now() - 600000).toISOString(),
            nivel: 'warning',
            mensaje: 'Tiempo de respuesta alto en Santander H2H',
            resultado: 'Advertencia'
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
            nivel: 'success',
            mensaje: 'Reconciliación completada',
            resultado: 'Exitoso'
        }
    ];

    const getLevelIcon = (nivel) => {
        switch (nivel) {
            case 'error':
                return <XCircle className="w-4 h-4 text-red-500" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'info':
                return <Info className="w-4 h-4 text-blue-500" />;
            default:
                return <Info className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Justo ahora';
        if (diffMins < 60) return `Hace ${diffMins} min`;
        if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)} h`;
        return date.toLocaleDateString('es-MX');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Registro de Eventos
                </h3>
                <span className="text-sm text-gray-500">Últimos eventos</span>
            </div>
            
            <div className="space-y-3">
                {recentLogs.map((log) => (
                    <div 
                        key={log.id} 
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {getLevelIcon(log.nivel)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 truncate" title={log.mensaje}>
                                {log.mensaje}
                            </p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                                <span>{getTimeAgo(log.fecha)}</span>
                                <span className="mx-2">•</span>
                                <span>{log.resultado}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={onViewAll}
                className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center"
            >
                Ver registro completo
                <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};

export default EventLogWidget;