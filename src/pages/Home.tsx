import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { Registration } from '../types/Registration';
import RegistrationForm from '../components/RegistrationForm';
import toastr from 'toastr';
import './css/Home.css';

// Configuração do Toastr
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right", 
  "preventDuplicates": true,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn", 
  "hideMethod": "fadeOut"
};

const Home: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const response = await api.getRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      toastr.error('Erro ao buscar registros.', 'Erro');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleEdit = (registration: Registration) => {
    setEditingRegistration(registration);
    setShowForm(true); 
  };

  const handleDelete = async (id: number) => {    
    try {
      await api.deleteRegistration(id);
      fetchRegistrations();
      toastr.success('Registro deletado com sucesso.', 'Sucesso');
    } catch (error) {
      toastr.error('Erro ao deletar o registro.', 'Erro');
    }
  };

  const handleSuccess = () => {
    setEditingRegistration(null);
    setShowForm(true);  
    fetchRegistrations();    
  };

  const handleNewRegistration = () => {
    setEditingRegistration(null);
    setShowForm(true); 
  };

  const getTitle = () => {
    if (showForm) {
      return editingRegistration ? 'Edição de Registro' : 'Cadastro de Registro';
    }
    return 'Lista de Registro';
  };

  return (
    <div>
      <div className="top-menu">
        <h1>{getTitle()}</h1>
      </div>
      <div className="home-container">
        <div className="d-flex pt-5 pb-3 pr-5 flex-row-reverse col-md-6">
          <button className="btn btn-primary" onClick={showForm ? () => setShowForm(false) : handleNewRegistration}>
            {showForm ? 'Voltar à Lista' : '+ Cadastrar Novo'}
          </button>
        </div>

        {showForm ? (
          <div className="form-section">
            <h2>{editingRegistration ? 'Editar Registro' : 'Cadastrar Novo Registro'}</h2>
            <RegistrationForm registration={editingRegistration} onSuccess={handleSuccess} />
          </div>
        ) : registrations.length > 0 ? (
          <div className="content col-md-6">
            <ul className="registration-list">
              {registrations.map((registration) => (
                <li key={registration.id} className="registration-item">
                  {registration.email}
                  <div className="d-flex justify-content-end">
                    <div className="me-2">
                      <button onClick={() => handleEdit(registration)} className="btn btn-primary">
                        Editar
                      </button>
                    </div>
                    <div>
                      <button onClick={() => handleDelete(registration.id!)} className="btn btn-outline-danger">
                        Deletar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="content col-md-6">
            <p className="no-registration">Não há registros disponíveis.</p>
          </div>
        )}
      </div>
      <div className='col-md-12'>
        <footer className="footer">
          <div className="footer-left">
            <p>Guilherme Montovam da Silva</p>
            <p>(11) 95939-6592</p>
            <p>guilhermemsilva16@gmail.com</p>
          </div>
          <div className="footer-right">
            <a href="https://github.com/DevMontovam" target="_blank" rel="noopener noreferrer">
              <button type="button" className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 8 0z"/>
                </svg>
              </button>
            </a>
            <a href="https://www.linkedin.com/in/guilherme-montovam/" target="_blank" rel="noopener noreferrer">
              <button type="button" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </button>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
