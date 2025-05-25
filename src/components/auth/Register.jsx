import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const Register = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        }
        
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        const result = await register({
            name: formData.name.trim(),
            email: formData.email,
            password: formData.password
        });
        
        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrors({ general: result.error });
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Registration Form */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-sm">C</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900">CREDI</span>
                            <span className="text-2xl font-bold text-blue-600">FIEL</span>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Registro</h2>
                        <p className="text-gray-600">Crea tu cuenta para acceder al sistema</p>
                    </div>

                    {/* Error General */}
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                            {errors.general}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre:
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                                        errors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="Escribe tu nombre completo"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email:
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                                        errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="usuario@credifiel.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña:
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                                        errors.password ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirmar Contraseña:
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                                        errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                Acepto los{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-500">
                                    términos y condiciones
                                </a>
                            </label>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creando cuenta...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center pt-4">
                        <p className="text-sm text-gray-600">
                            ¿Ya tienes cuenta?{' '}
                            <Link 
                                to="/login" 
                                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                                        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                        backgroundSize: '100px 100px'
                    }}></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
                    {/* Phone Mockup */}
                    <div className="relative mb-8">
                        <div className="w-64 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                {/* Phone Screen Content */}
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">C</span>
                                        </div>
                                    </div>
                                    <div className="text-white font-bold text-lg mb-2">CREDIFIEL</div>
                                    <div className="text-blue-100 text-sm px-4">
                                        Tu plataforma de confianza
                                    </div>
                                </div>
                                
                                {/* Floating Elements */}
                                <div className="absolute top-4 right-4 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-8 left-4 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                        
                        {/* Floating Circle */}
                        <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-white border-opacity-30 rounded-full animate-spin-slow"></div>
                    </div>

                    {/* Text Content */}
                    <div className="text-white max-w-md">
                        <h3 className="text-2xl font-bold mb-4">
                            Únete a CREDIFIEL
                        </h3>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            Descubre una nueva forma de gestionar tu identidad digital de manera segura y confiable.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 gap-4 text-left">
                        <div className="flex items-center text-white">
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            <span className="text-sm">Seguridad avanzada</span>
                        </div>
                        <div className="flex items-center text-white">
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            <span className="text-sm">Fácil de usar</span>
                        </div>
                        <div className="flex items-center text-white">
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            <span className="text-sm">Soporte 24/7</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 border border-white border-opacity-20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-lg transform rotate-45"></div>
            </div>

            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Register;