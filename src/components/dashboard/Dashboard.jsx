import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// Import components
import DomiciliationAnalysis from '../analysis/DomiciliationAnalysis';
import BankPerformance from '../analysis/BankPerformance';
import CollectionStrategy from '../analysis/CollectionStrategy';
import EventLogWidget from '../logs/EventLogWidget';
import EventLog from '../logs/EventLog';
import Reports from '../reports/Reports';
import Settings from '../settings/Settings';

import { 
    BarChart3, 
    TrendingUp, 
    DollarSign, 
    Users, 
    Building2, 
    AlertCircle,
    LogOut,
    Menu,
    X,
    Home,
    PieChart,
    FileText,
    Settings as SettingsIcon,
    Target,
    Activity
} from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // Datos simulados basados en el caso de estudio
    const dashboardData = {
        stats: {
            totalCredits: 640000,
            totalClients: 320000,
            branches: 70,
            govAgreements: 90,
            ecaRate: 72.5,
            monthlyCommissions: 1000000
        },
        recentActivity: [
            { id: 1, type: 'payment', description: 'Domiciliación exitosa - BBVA', amount: 15000, time: '10:30 AM' },
            { id: 2, type: 'error', description: 'Cuenta insuficiencia fondos - Santander', amount: 8500, time: '10:15 AM' },
            { id: 3, type: 'payment', description: 'Domiciliación exitosa - Banorte', amount: 22000, time: '09:45 AM' },
            { id: 4, type: 'warning', description: 'Cuenta bloqueada - Banamex', amount: 12000, time: '09:30 AM' }
        ]
    };

    const menuItems = [
        { id: 'overview', name: 'Resumen', icon: Home },
        { id: 'logs', name: 'Registro', icon: Activity }, 
        { id: 'analytics', name: 'Análisis', icon: BarChart3 },
        { id: 'banks', name: 'Bancos', icon: Building2 },
        { id: 'strategies', name: 'Estrategias', icon: Target },
        { id: 'reports', name: 'Reportes', icon: FileText },
        { id: 'settings', name: 'Configuración', icon: SettingsIcon }
    ];

    const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {change > 0 ? '+' : ''}{change}% vs mes anterior
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full bg-${color}-100`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                </div>
            </div>
        </div>
    );

    const ActivityItem = ({ activity }) => {
        const getActivityIcon = (type) => {
            switch (type) {
                case 'payment':
                    return <DollarSign className="w-4 h-4 text-green-600" />;
                case 'error':
                    return <AlertCircle className="w-4 h-4 text-red-600" />;
                case 'warning':
                    return <AlertCircle className="w-4 h-4 text-yellow-600" />;
                default:
                    return <AlertCircle className="w-4 h-4 text-gray-600" />;
            }
        };

        const getBgColor = (type) => {
            switch (type) {
                case 'payment':
                    return 'bg-green-50 border-green-200';
                case 'error':
                    return 'bg-red-50 border-red-200';
                case 'warning':
                    return 'bg-yellow-50 border-yellow-200';
                default:
                    return 'bg-gray-50 border-gray-200';
            }
        };

        return (
            <div className={`flex items-center p-3 rounded-lg border ${getBgColor(activity.type)}`}>
                <div className="flex-shrink-0 mr-3">
                    {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">${activity.amount.toLocaleString()} - {activity.time}</p>
                </div>
            </div>
        );
    };

    const MoneyAccumulationChart = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Acumulación de Dinero por Mes
                </h3>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Recaudado</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Proyectado</span>
                    </div>
                </div>
            </div>
            <div className="h-80 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Gráfico de Acumulación Mensual</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Comisiones proyectadas: $1,000,000 MXN/mes
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">CREDI</span>
                        <span className="text-xl font-bold text-blue-600">FIEL</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="mt-6 px-4">
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setSidebarOpen(false); // Close sidebar on mobile
                                    }}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                                        activeTab === item.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                {/* User Info */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium text-sm">
                                {user?.name?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {user?.name || 'Usuario'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {user?.email || 'usuario@credifiel.com'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:pl-0">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 mr-4"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {menuItems.find(item => item.id === activeTab)?.name || 'Dashboard'}
                            </h1>
                        </div>
                        <div className="text-sm text-gray-500">
                            Último análisis: {new Date().toLocaleDateString('es-ES')}
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Préstamos"
                                    value={dashboardData.stats.totalCredits.toLocaleString()}
                                    icon={FileText}
                                    change={5.2}
                                    color="blue"
                                />
                                <StatCard
                                    title="Total Clientes"
                                    value={dashboardData.stats.totalClients.toLocaleString()}
                                    icon={Users}
                                    change={3.1}
                                    color="green"
                                />
                                <StatCard
                                    title="Sucursales"
                                    value={`+${dashboardData.stats.branches}`}
                                    icon={Building2}
                                    change={0}
                                    color="purple"
                                />
                                <StatCard
                                    title="ECA Histórica"
                                    value={`${dashboardData.stats.ecaRate}%`}
                                    icon={TrendingUp}
                                    change={1.8}
                                    color="orange"
                                />
                            </div>

                            {/* Main Dashboard Grid */}
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                                {/* ECA Performance Chart */}
                                <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Efectividad de Cobranza Acumulada (ECA)
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                            <span className="text-sm text-gray-600">ECA %</span>
                                        </div>
                                    </div>
                                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                                        <div className="text-center">
                                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-500">Gráfico de ECA Histórica</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Evolución del 69% al 72.5% (2022-2025)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Activity */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                        Actividad Reciente
                                    </h3>
                                    <div className="space-y-3">
                                        {dashboardData.recentActivity.map((activity) => (
                                            <ActivityItem key={activity.id} activity={activity} />
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setActiveTab('logs')}
                                        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Ver todas las actividades →
                                    </button>
                                </div>
                            </div>

                            {/* Money Accumulation Chart */}
                            <MoneyAccumulationChart />

                            {/* Event Log Widget */}
                            <EventLogWidget 
                                onViewAll={() => setActiveTab('logs')} 
                            />

                            {/* Key Insights */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Hallazgos Clave
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Crítico: Segundo Pago
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Los créditos sin segundo pago tienen 5x más probabilidad de quiebre
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Oportunidad: Automatización
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Comisiones fijas sugieren falta de estrategia optimizada
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Insight: Recuperación
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Créditos sin quinto pago no se recuperan históricamente
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Bancos y Estrategias
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">BBVA</p>
                                                <p className="text-xs text-gray-600">5 estrategias activas</p>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">Óptimo</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Santander</p>
                                                <p className="text-xs text-gray-600">4 estrategias activas</p>
                                            </div>
                                            <span className="text-sm font-medium text-yellow-600">Regular</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Banorte</p>
                                                <p className="text-xs text-gray-600">3 estrategias activas</p>
                                            </div>
                                            <span className="text-sm font-medium text-blue-600">Bueno</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Banamex</p>
                                                <p className="text-xs text-gray-600">3 estrategias activas</p>
                                            </div>
                                            <span className="text-sm font-medium text-orange-600">Revisar</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other Tabs Content */}
                    {activeTab === 'analytics' && <DomiciliationAnalysis />}
                    {activeTab === 'banks' && <BankPerformance />}
                    {activeTab === 'strategies' && <CollectionStrategy />}
                    {activeTab === 'logs' && <EventLog />}
                    {activeTab === 'reports' && <Reports />}
                    {activeTab === 'settings' && <Settings />}
                </div>
            </div>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Dashboard;