import React, { useState, useEffect } from 'react';
import { Registration } from '../types/Registration';
import * as api from '../services/api';
import toastr from 'toastr'; 

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

interface RegistrationFormProps {
  registration: Registration | null;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ registration, onSuccess }) => {
  const [formData, setFormData] = useState<Registration>({
    email: ''
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (registration) {
      setFormData(registration);
    }
  }, [registration]);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !isEmailValid(formData.email)) {
      toastr.error('Por favor, insira um email válido.', 'Erro'); 
      return;
    }

    try {
      if (registration) {
        await api.updateRegistration(registration.id!, formData);
        toastr.success('Registro atualizado com sucesso!', 'Sucesso'); 
      } else {
        await api.addRegistration(formData);
        toastr.success('Registro adicionado com sucesso!', 'Sucesso'); 
      }
      setError(null);
      onSuccess();
    } catch (error: any) {
      toastr.error(error.response?.data?.message || 'Erro ao processar o registro.', 'Erro'); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>       
        <div className="row mb-3">
          <div className="col-md-12">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary w-100">
              {registration ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
