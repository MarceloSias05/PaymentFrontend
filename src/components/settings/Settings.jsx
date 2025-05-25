import React, { useState, useEffect } from 'react';
import {
    User,
    Shield,
    Bell,
    Database,
    Globe,
    Palette,
    Save,
    CheckCircle,
    Eye,
    EyeOff,
    Upload,
    Download,
    Trash2,
    RefreshCw,
    AlertTriangle,
    Info
} from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [settings, setSettings] = useState({
        // Profile settings
        profile: {
            name: 'Juan Pérez',
            email: 'juan.perez@credifiel.com',
            role: 'Administrador',
            phone: '+52 55 1234 5678',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        // Security settings
        security: {
            twoFactorAuth: true,
            sessionTimeout: 30,
            loginNotifications: true,
            ipWhitelist: ['192.168.1.100', '10.0.0.50'],
            passwordExpiry: 90
        },
        // Notification settings
        notifications: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            paymentAlerts: true,
            systemAlerts: true,
            weeklyReports: true,
            monthlyReports: true
        },
        // Database settings
        database: {
            backupFrequency: 'daily',
            retentionPeriod: 365,
            compressionEnabled: true,
            encryptionEnabled: true,
            autoCleanup: true
        },
        // API settings
        api: {
            rateLimit: 1000,
            timeout: 30000,
            retryAttempts: 3,
            loggingLevel: 'info',
            corsEnabled: true
        },
        // Theme settings
        theme: {
            darkMode: false,
            language: 'es',
            timezone: 'America/Mexico_City',
            dateFormat: 'DD/MM/YYYY',
            currency: 'MXN'
        }
    });

    const sections = [
        { id: 'profile', name: 'Perfil', icon: User },
        { id: 'security', name: 'Seguridad', icon: Shield },
        { id: 'notifications', name: 'Notificaciones', icon: Bell },
        { id: 'database', name: 'Base de Datos', icon: Database },
        { id: 'api', name: 'API', icon: Globe },
        { id: 'theme', name: 'Apariencia', icon: Palette }
    ];

    useEffect(() => {
        if (saved) {
            const timer = setTimeout(() => setSaved(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [saved]);

    const handleInputChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaved(true);
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setSaving(false);
        }
    };

    const renderProfileSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={settings.profile.name}
                            onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={settings.profile.email}
                            onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            value={settings.profile.phone}
                            onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rol
                        </label>
                        <input
                            type="text"
                            value={settings.profile.role}
                            disabled
                            className="input-field bg-gray-50"
                        />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar Contraseña</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña actual
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={settings.profile.currentPassword}
                                onChange={(e) => handleInputChange('profile', 'currentPassword', e.target.value)}
                                className="input-field pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            value={settings.profile.newPassword}
                            onChange={(e) => handleInputChange('profile', 'newPassword', e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            value={settings.profile.confirmPassword}
                            onChange={(e) => handleInputChange('profile', 'confirmPassword', e.target.value)}
                            className="input-field"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Seguridad</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Autenticación de dos factores</label>
                            <p className="text-sm text-gray-500">Agrega una capa extra de seguridad</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.security.twoFactorAuth}
                                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tiempo de sesión (minutos)
                        </label>
                        <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="input-field"
                        >
                            <option value={15}>15 minutos</option>
                            <option value={30}>30 minutos</option>
                            <option value={60}>1 hora</option>
                            <option value={120}>2 horas</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lista blanca de IPs
                        </label>
                        <textarea
                            value={settings.security.ipWhitelist.join('\n')}
                            onChange={(e) => handleInputChange('security', 'ipWhitelist', e.target.value.split('\n').filter(ip => ip.trim()))}
                            rows={3}
                            className="input-field"
                            placeholder="Una IP por línea"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNotificationsSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Notificaciones</h3>
                
                <div className="space-y-4">
                    {Object.entries({
                        emailNotifications: 'Notificaciones por email',
                        smsNotifications: 'Notificaciones por SMS',
                        pushNotifications: 'Notificaciones push',
                        paymentAlerts: 'Alertas de pagos',
                        systemAlerts: 'Alertas del sistema',
                        weeklyReports: 'Reportes semanales',
                        monthlyReports: 'Reportes mensuales'
                    }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications[key]}
                                    onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderDatabaseSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Base de Datos</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frecuencia de respaldo
                        </label>
                        <select
                            value={settings.database.backupFrequency}
                            onChange={(e) => handleInputChange('database', 'backupFrequency', e.target.value)}
                            className="input-field"
                        >
                            <option value="hourly">Cada hora</option>
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Período de retención (días)
                        </label>
                        <input
                            type="number"
                            value={settings.database.retentionPeriod}
                            onChange={(e) => handleInputChange('database', 'retentionPeriod', parseInt(e.target.value))}
                            className="input-field"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Compresión habilitada</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.database.compressionEnabled}
                                onChange={(e) => handleInputChange('database', 'compressionEnabled', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderApiSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de API</h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Límite de solicitudes por hora
                        </label>
                        <input
                            type="number"
                            value={settings.api.rateLimit}
                            onChange={(e) => handleInputChange('api', 'rateLimit', parseInt(e.target.value))}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timeout (ms)
                        </label>
                        <input
                            type="number"
                            value={settings.api.timeout}
                            onChange={(e) => handleInputChange('api', 'timeout', parseInt(e.target.value))}
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nivel de logging
                        </label>
                        <select
                            value={settings.api.loggingLevel}
                            onChange={(e) => handleInputChange('api', 'loggingLevel', e.target.value)}
                            className="input-field"
                        >
                            <option value="debug">Debug</option>
                            <option value="info">Info</option>
                            <option value="warn">Warning</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderThemeSection = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Apariencia</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Modo oscuro</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.theme.darkMode}
                                onChange={(e) => handleInputChange('theme', 'darkMode', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Idioma
                        </label>
                        <select
                            value={settings.theme.language}
                            onChange={(e) => handleInputChange('theme', 'language', e.target.value)}
                            className="input-field"
                        >
                            <option value="es">Español</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Zona horaria
                        </label>
                        <select
                            value={settings.theme.timezone}
                            onChange={(e) => handleInputChange('theme', 'timezone', e.target.value)}
                            className="input-field"
                        >
                            <option value="America/Mexico_City">Ciudad de México</option>
                            <option value="America/Cancun">Cancún</option>
                            <option value="America/Tijuana">Tijuana</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Formato de fecha
                        </label>
                        <select
                            value={settings.theme.dateFormat}
                            onChange={(e) => handleInputChange('theme', 'dateFormat', e.target.value)}
                            className="input-field"
                        >
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'security':
                return renderSecuritySection();
            case 'notifications':
                return renderNotificationsSection();
            case 'database':
                return renderDatabaseSection();
            case 'api':
                return renderApiSection();
            case 'theme':
                return renderThemeSection();
            default:
                return renderProfileSection();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
                <p className="text-gray-600 mt-1">
                    Personaliza tu experiencia y configura el sistema de domiciliación
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <nav className="space-y-2">
                            {sections.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            activeSection === section.id
                                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4 mr-3" />
                                        {section.name}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        {renderSection()}

                        {/* Save Button */}
                        <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                            {saved && (
                                <div className="flex items-center text-green-600">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span className="text-sm">Configuración guardada exitosamente</span>
                                </div>
                            )}
                            
                            <div className="flex space-x-3 ml-auto">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {saving ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Guardar cambios
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;