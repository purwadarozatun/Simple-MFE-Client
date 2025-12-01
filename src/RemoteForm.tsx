import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { AlurkerjaInputType } from './alurkerjaType';


export default function RemoteForm({ props }: { props: AlurkerjaInputType }) {
  const { register, control } = props.form || {};

  return (<>
    <h1 className='text-lg font-bold'>ini dari mfe jadinya bisa di edit di runtime</h1>
      <label>
        First name
        <input {...(register ? register('firstName') : {})} placeholder="First name"  className='input border h-11 text-base px-3 focus:ring-main-blue-alurkerja focus-within:ring-main-blue-alurkerja focus-within:border-main-blue-alurkerja focus:border-main-blue-alurkerja rounded-md'/>
      </label>

      <label>
        Email tyang ini di edit dari mfe trus di build dan pagenya di refresh 
          <input {...(register ? register('email') : {})} placeholder="Email"  className='input border h-11 text-base px-3 focus:ring-main-blue-alurkerja focus-within:ring-main-blue-alurkerja focus-within:border-main-blue-alurkerja focus:border-main-blue-alurkerja rounded-md'/>
        
      </label>
      </>

  );
}