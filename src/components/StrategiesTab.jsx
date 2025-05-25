import React, { useState, useEffect } from 'react';
import '../styles/StrategiesTab.css';

const StrategiesTab = () => {
  const [csvData, setCsvData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [comparisonMatrix, setComparisonMatrix] = useState([]);

  useEffect(() => {
    // Cargar datos del CSV desde localStorage o API
    const loadCsvData = () => {
      const storedData = localStorage.getItem('importedCsvData');
      if (storedData) {
        const data = JSON.parse(storedData);
        setCsvData(data);
        generateStrategies(data);
      }
    };

    loadCsvData();
  }, []);

  const generateStrategies = (data) => {
    // Agrupar por TipoEnvio y BancoSimplificado para crear estrategias
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
          successRate: 0
        };
      }
      strategiesMap[key].records.push(record);
      strategiesMap[key].totalMonto += parseFloat(record.montoCobrar || 0);
      strategiesMap[key].totalCobrado += parseFloat(record.montoCobrado || 0);
    });

    // Calcular métricas para cada estrategia
    const strategiesList = Object.values(strategiesMap).map(strategy => {
      const successfulPayments = strategy.records.filter(r => r.CobroExitoso === 'true' || r.CobroExitoso === true).length;
      strategy.successRate = (successfulPayments / strategy.records.length * 100).toFixed(2);
      strategy.averageAmount = (strategy.totalMonto / strategy.records.length).toFixed(2);
      strategy.collectionRate = ((strategy.totalCobrado / strategy.totalMonto) * 100).toFixed(2);
      return strategy;
    });

    setStrategies(strategiesList);
    generateComparisonMatrix(strategiesList);
  };

  const generateComparisonMatrix = (strategiesList) => {
    const matrix = strategiesList.map(strategy => ({
      strategy: strategy.name,
      successRate: strategy.successRate,
      collectionRate: strategy.collectionRate,
      totalRecords: strategy.records.length,
      averageAmount: strategy.averageAmount,
      totalCobrado: strategy.totalCobrado.toFixed(2)
    }));

    setComparisonMatrix(matrix);
  };

  return (
    <div className="strategies-tab">
      <h2>Matriz de Comparación de Estrategias</h2>
      
      {csvData.length === 0 ? (
        <div className="no-data">
          <p>No hay datos importados. Por favor, importe un archivo CSV primero.</p>
        </div>
      ) : (
        <>
          <div className="summary-cards">
            <div className="summary-card">
              <h3>Total Registros</h3>
              <span className="metric">{csvData.length}</span>
            </div>
            <div className="summary-card">
              <h3>Estrategias Detectadas</h3>
              <span className="metric">{strategies.length}</span>
            </div>
            <div className="summary-card">
              <h3>Tasa Promedio Éxito</h3>
              <span className="metric">
                {strategies.length > 0 
                  ? (strategies.reduce((sum, s) => sum + parseFloat(s.successRate), 0) / strategies.length).toFixed(2)
                  : 0}%
              </span>
            </div>
          </div>

          <div className="comparison-matrix">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th>Estrategia</th>
                  <th>Tasa de Éxito (%)</th>
                  <th>Tasa de Cobranza (%)</th>
                  <th>Total Registros</th>
                  <th>Monto Promedio</th>
                  <th>Total Cobrado</th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((row, index) => (
                  <tr key={index}>
                    <td className="strategy-name">{row.strategy}</td>
                    <td className={`success-rate ${parseFloat(row.successRate) > 50 ? 'high' : 'low'}`}>
                      {row.successRate}%
                    </td>
                    <td className={`collection-rate ${parseFloat(row.collectionRate) > 70 ? 'high' : 'low'}`}>
                      {row.collectionRate}%
                    </td>
                    <td>{row.totalRecords}</td>
                    <td>${row.averageAmount}</td>
                    <td>${row.totalCobrado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detailed-strategies">
            <h3>Detalle por Estrategia</h3>
            {strategies.map(strategy => (
              <div key={strategy.id} className="strategy-detail">
                <h4>{strategy.name}</h4>
                <div className="strategy-metrics">
                  <span>Registros: {strategy.records.length}</span>
                  <span>Éxito: {strategy.successRate}%</span>
                  <span>Cobranza: {strategy.collectionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StrategiesTab;