import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Item from '../Item';
import InputForm from '../InputForm';
import NAVITEMS from '../Record/NavItems.json';
import productSeeder from '../../data/productSeeder';
import locationSeeder from '../../data/locationSeeder';

const NewRecord = () => {
  const formMethod = useForm({ mode: 'onChange' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethod;

  const atSubmit = (data) => {
    console.log('form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(atSubmit)} className="h-full w-full p-3">
      <header className="flex justify-between">
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 flex sm:m-2 sm:flex-col">
            <label>
              日期：
              <input
                type="date"
                {...register('date', { required: '日期為必填' })}
                className="rounded-md border-2 bg-gray-100 p-1"
              />
            </label>
            <small className="mt-auto text-red-400">
              {errors.date?.message}
            </small>
          </div>
          <div className="mb-2 flex sm:m-2 sm:flex-col">
            <label>
              地點：
              <select
                {...register('location', { required: '請選擇地點' })}
                className="rounded-md border-2 bg-gray-100 p-1"
              >
                <option value="">請選擇地點</option>
                {locationSeeder.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <small className="mt-auto text-red-400">
              {errors.location?.message}
            </small>
          </div>
        </div>
        <div className="my-auto flex ">
          <button type="submit" className="btn mx-2 bg-success text-white">
            儲存
          </button>
          <Link to="/" className="btn mx-2 bg-light text-white">
            取消
          </Link>
        </div>
      </header>
      <div className="grid grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[86%] overflow-y-scroll shadow-md">
        {productSeeder.map((product) => (
          <InputForm
            product={product}
            key={product.id}
            formMethod={formMethod}
          />
        ))}
      </div>
    </form>
  );
};

export default React.memo(NewRecord);