import React from 'react';
import RemoteForm from './RemoteForm';
import { useForm } from 'react-hook-form';

export default function RemoteApp() {
  const form = useForm();

  return (
    <div style={{ padding: 20 }}>
      <h3>Remote (standalone)</h3>
      <RemoteForm props={{ form: form, item: {
        label: { en: 'First Name', id: 'Nama Depan' },
        name: 'firstName',
        placeholder: 'Enter your first name',
        form_field_type: 'text',
        ui_type: 'input',
        defaultValue: null,
        tooltip: { enable: false, message: '' },
        disabled: false,
        constraints: { required: true }
      } }} />
    </div>
  );
}