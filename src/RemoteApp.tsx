  import React from 'react';
import { useForm } from 'react-hook-form';
import PilihLokasi from './PilihLokasi';

export function RemoteApp() {
  const form = useForm();
  const watchedValues = form.watch();

  return (
    <div style={{ padding: 20 }}>
      <h3>Remote (standalone)</h3>
      <PilihLokasi props={{ form: form, item: {
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

      <pre>
        {JSON.stringify(watchedValues, null, 2)}
      </pre>
    </div>
  );
}