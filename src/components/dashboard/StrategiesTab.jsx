import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, Target, AlertTriangle, Upload, FileText, CheckCircle } from 'lucide-react';

const StrategiesTab = () => {
  const [csvData, setCsvData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [comparisonMatrix, setComparisonMatrix] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    loadCsvData();
  }, []);

  const loadCsvData = () => {
    try {
      // Primero intentar cargar desde localStorage
      const storedData = localStorage.getItem('importedCsvData');
      
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data && data.length > 0) {
          setCsvData(data);
          generateStrategies(data);
          setDataSource('localStorage');
          setDebugInfo(`Datos cargados desde localStorage: ${data.length} registros`);
          setLoading(false);
          return;
        }
      }

      // Si no hay datos en localStorage, intentar cargar desde la ruta específica
      loadCsvFromFile();
      
    } catch (error) {
      console.error('Error loading CSV data:', error);
      setDebugInfo(`Error al cargar datos: ${error.message}`);
      generateExampleData();
    }
  };

  const loadCsvFromFile = async () => {
    try {
      // Intentar cargar el archivo CSV desde la ruta del proyecto
      const response = await fetch('/pruebaDatos.csv');
      
      if (response.ok) {
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        
        if (parsedData && parsedData.length > 0) {
          setCsvData(parsedData);
          generateStrategies(parsedData);
          setDataSource('archivo CSV');
          setDebugInfo(`Datos cargados desde pruebaDatos.csv: ${parsedData.length} registros`);
          
          // Guardar en localStorage para futuras cargas
          localStorage.setItem('importedCsvData', JSON.stringify(parsedData));
        } else {
          throw new Error('Archivo CSV vacío o mal formateado');
        }
      } else {
        throw new Error(`No se pudo cargar el archivo CSV: ${response.status}`);
      }
    } catch (error) {
      console.error('Error loading CSV file:', error);
      setDebugInfo(`Error al cargar archivo CSV: ${error.message}. Mostrando datos de ejemplo.`);
      generateExampleData();
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values.length === headers.length) {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        data.push(row);
      }
    }

    return data;
  };

  const generateExampleData = () => {
    const exampleData = [
      { 
        idListaCobro: '001', 
        idEmisora: 'EM001',
        TipoEnvio: 'ACH', 
        BancoSimplificado: 'BBVA', 
        idCredito: 'CR001',
        consecutivoCobro: '1',
        idBanco: 'B001',
        montoExigible: '15000',
        montoCobrar: '15000', 
        montoCobrado: '15000', 
        fechaCobroBanco: '2024-01-15',
        idRespuestaBanco: 'OK',
        CobroExitoso: 'true' 
      },
      { 
        idListaCobro: '002', 
        idEmisora: 'EM002',
        TipoEnvio: 'SPEI', 
        BancoSimplificado: 'Santander', 
        idCredito: 'CR002',
        consecutivoCobro: '1',
        idBanco: 'B002',
        montoExigible: '8500',
        montoCobrar: '8500', 
        montoCobrado: '0', 
        fechaCobroBanco: '2024-01-15',
        idRespuestaBanco: 'ERROR_FONDOS',
        CobroExitoso: 'false' 
      },
      { 
        idListaCobro: '003', 
        idEmisora: 'EM003',
        TipoEnvio: 'ACH', 
        BancoSimplificado: 'Banorte', 
        idCredito: 'CR003',
        consecutivoCobro: '2',
        idBanco: 'B003',
        montoExigible: '22000',
        montoCobrar: '22000', 
        montoCobrado: '22000', 
        fechaCobroBanco: '2024-01-16',
        idRespuestaBanco: 'OK',
        CobroExitoso: 'true' 
      },
      { 
        idListaCobro: '004', 
        idEmisora: 'EM004',
        TipoEnvio: 'TEF', 
        BancoSimplificado: 'Banamex', 
        idCredito: 'CR004',
        consecutivoCobro: '1',
        idBanco: 'B004',
        montoExigible: '12000',
        montoCobrar: '12000', 
        montoCobrado: '0', 
        fechaCobroBanco: '2024-01-16',
        idRespuestaBanco: 'CUENTA_BLOQUEADA',
        CobroExitoso: 'false' 
      }
    ];
    setCsvData(exampleData);
    generateStrategies(exampleData);
    setDataSource('datos de ejemplo');
    setDebugInfo('Mostrando datos de ejemplo para demostración');
    setLoading(false);
  };

  const generateStrategies = (data) => {
    const strategiesMap = {};
    
    data.forEach(record => {
      const key = `${record.TipoEnvio}_${record.BancoSimplificado}`;
      if (!strategiesMap[key]) {
        strategiesMap[key] = {
          id: key,
          name: `${record.TipoEnvio} - ${record.BancoSimplificado}`,
          tipoEnvio: record.TipoEnvio,
          banco: record.BancoSimplificado,
          records: [],
          totalMonto: 0,
          totalCobrado: 0,
          successCount: 0
        };
      }
      strategiesMap[key].records.push(record);
      
      // Usar montoCobrar como base para el total
      const montoBase = parseFloat(record.montoCobrar || record.montoExigible || 0);
      const montoCobrado = parseFloat(record.montoCobrado || 0);
      
      strategiesMap[key].totalMonto += montoBase;
      strategiesMap[key].totalCobrado += montoCobrado;
      
      // Verificar múltiples condiciones para determinar éxito
      // Un cobro es exitoso si:
      // 1. CobroExitoso es explícitamente 'true', true, o '1'
      // 2. O si montoCobrado > 0 (significa que se cobró algo)
      // 3. O si idRespuestaBanco indica éxito (como 'OK', 'SUCCESS', etc.)
      const isSuccessful = (
        record.CobroExitoso === 'true' || 
        record.CobroExitoso === true || 
        record.CobroExitoso === '1' ||
        record.CobroExitoso === 1 ||
        montoCobrado > 0 ||
        (record.idRespuestaBanco && 
         ['OK', 'SUCCESS', 'EXITOSO', 'APROBADO'].includes(record.idRespuestaBanco.toUpperCase()))
      );
      
      if (isSuccessful) {
        strategiesMap[key].successCount++;
      }
    });

    const strategiesList = Object.values(strategiesMap).map(strategy => {
      // Calcular tasa de éxito: (cobros exitosos / total de intentos) * 100
      strategy.successRate = strategy.records.length > 0 
        ? ((strategy.successCount / strategy.records.length) * 100).toFixed(2)
        : '0.00';
      
      // Calcular tasa de cobranza: (monto cobrado / monto total) * 100
      strategy.collectionRate = strategy.totalMonto > 0 
        ? ((strategy.totalCobrado / strategy.totalMonto) * 100).toFixed(2) 
        : '0.00';
      
      strategy.averageAmount = strategy.records.length > 0
        ? (strategy.totalMonto / strategy.records.length).toFixed(0)
        : '0';
      
      return strategy;
    });

    // Agregar información de depuración
    const totalRecords = data.length;
    const totalSuccessful = strategiesList.reduce((sum, s) => sum + s.successCount, 0);
    const overallSuccessRate = totalRecords > 0 ? ((totalSuccessful / totalRecords) * 100).toFixed(2) : '0.00';
    
    console.log('Debug - Cálculo de tasa de éxito:');
    console.log(`Total registros: ${totalRecords}`);
    console.log(`Total exitosos: ${totalSuccessful}`);
    console.log(`Tasa general de éxito: ${overallSuccessRate}%`);
    
    strategiesList.forEach(strategy => {
      console.log(`${strategy.name}: ${strategy.successCount}/${strategy.records.length} = ${strategy.successRate}%`);
    });

    setStrategies(strategiesList);
    setComparisonMatrix(strategiesList);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvText = e.target.result;
          const parsedData = parseCSV(csvText);
          
          if (parsedData && parsedData.length > 0) {
            setCsvData(parsedData);
            generateStrategies(parsedData);
            setDataSource('archivo subido');
            setDebugInfo(`Archivo CSV cargado exitosamente: ${parsedData.length} registros`);
            
            // Guardar en localStorage
            localStorage.setItem('importedCsvData', JSON.stringify(parsedData));
          } else {
            throw new Error('Archivo CSV vacío o mal formateado');
          }
        } catch (error) {
          setDebugInfo(`Error al procesar archivo: ${error.message}`);
        }
      };
      reader.readAsText(file);
    }
  };

  const getSuccessRateColor = (rate) => {
    const numRate = parseFloat(rate);
    // Ajustar los umbrales para tasas más bajas
    if (numRate >= 10) return 'text-green-600 bg-green-50';
    if (numRate >= 5) return 'text-yellow-600 bg-yellow-50';
    if (numRate >= 1) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getCollectionRateColor = (rate) => {
    const numRate = parseFloat(rate);
    // Ajustar los umbrales para tasas más bajas
    if (numRate >= 20) return 'text-green-600 bg-green-50';
    if (numRate >= 10) return 'text-blue-600 bg-blue-50';
    if (numRate >= 5) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando estrategias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Debug Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Matriz de Comparación de Estrategias</h2>
            <p className="text-gray-600 mt-1">Análisis basado en datos reales de cobranza</p>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        {/* Debug Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm font-medium text-blue-900">Estado de los datos:</p>
              <p className="text-sm text-blue-700">{debugInfo}</p>
              <p className="text-xs text-blue-600 mt-1">Fuente: {dataSource}</p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Subir nuevo archivo CSV</p>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Registros</p>
              <p className="text-2xl font-bold text-gray-900">{csvData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estrategias</p>
              <p className="text-2xl font-bold text-gray-900">{strategies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasa General Éxito</p>
              <p className="text-2xl font-bold text-gray-900">
                {strategies.length > 0 
                  ? ((strategies.reduce((sum, s) => sum + s.successCount, 0) / csvData.length) * 100).toFixed(2)
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Cobrado</p>
              <p className="text-2xl font-bold text-gray-900">
                ${strategies.reduce((sum, s) => sum + s.totalCobrado, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sample Preview */}
      {csvData.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Muestra de Datos (Primeros 3 registros)</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(csvData[0]).slice(0, 8).map((key) => (
                    <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 3).map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {Object.values(row).slice(0, 8).map((value, i) => (
                      <td key={i} className="px-4 py-2 text-sm text-gray-900">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparison Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Matriz de Comparación</h3>
          <p className="text-sm text-gray-600">Rendimiento por estrategia de cobranza</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estrategia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo Envío
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banco
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa Éxito
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tasa Cobranza
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Cobrado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonMatrix.map((strategy, index) => (
                <tr key={strategy.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{strategy.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {strategy.tipoEnvio}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {strategy.banco}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {strategy.records.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSuccessRateColor(strategy.successRate)}`}>
                      {strategy.successRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCollectionRateColor(strategy.collectionRate)}`}>
                      {strategy.collectionRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(strategy.averageAmount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${strategy.totalCobrado.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy Details */}
      {strategies.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Estrategias por Éxito</h3>
            <div className="space-y-3">
              {strategies
                .sort((a, b) => parseFloat(b.successRate) - parseFloat(a.successRate))
                .slice(0, 3)
                .map((strategy, index) => (
                  <div key={strategy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{strategy.name}</p>
                      <p className="text-xs text-gray-600">{strategy.records.length} registros</p>
                    </div>
                    <span className={`text-sm font-medium ${getSuccessRateColor(strategy.successRate).split(' ')[0]}`}>
                      {strategy.successRate}%
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Estrategias por Cobranza</h3>
            <div className="space-y-3">
              {strategies
                .sort((a, b) => b.totalCobrado - a.totalCobrado)
                .slice(0, 3)
                .map((strategy, index) => (
                  <div key={strategy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{strategy.name}</p>
                      <p className="text-xs text-gray-600">{strategy.collectionRate}% de cobranza</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${strategy.totalCobrado.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategiesTab;
