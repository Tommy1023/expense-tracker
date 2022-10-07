import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Item from '../../components/Item';
import InputForm from '../../components/InputForm';
import NAVITEMS from '../../store/NavItems.json';
import useStore from '../../store';

const NewRecord = () => {
  const formMethod = useForm({ mode: 'onChange' });
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = formMethod;

  const {
    products,
    loading,
    locations,
    getProducts,
    getLocations,
    postNewRecord,
    postRecordSuccess,
  } = useStore((state) => {
    return {
      products: state.products,
      loading: state.loading,
      locations: state.locations,
      getProducts: state.getProducts,
      getLocations: state.getLocations,
      postNewRecord: state.postNewRecord,
      postRecordSuccess: state.postRecordSuccess,
    };
  });

  const atSubmit = (submitData) => {
    const newProducts = Object.values(submitData.product).map((data) => {
      const product = products.find((item) => {
        return item.id === data.id;
      });
      return {
        productId: data.id,
        historyPrice: product.price,
        historyCost: product.cost,
        amount: Number(data.amount),
        sendBack: Number(data.sendBack),
      };
    });
    const newRecord = {
      date: submitData.date,
      locationId: Number(submitData.location),
      products: Object.values(newProducts),
    };
    postNewRecord(newRecord);
  };

  React.useEffect(() => {
    getProducts();
    getLocations();
  }, [getProducts, getLocations]);

  if (postRecordSuccess) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div className="my-spinner">Loading</div>;
  }

  return (
    <form onSubmit={handleSubmit(atSubmit)} className="h-full w-full p-3">
      <header className="flex h-[10%] justify-between">
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 flex sm:m-2 sm:flex-col">
            <label>
              日期：
              <input
                type="date"
                className="rounded-md border-2 bg-gray-100 p-1"
                {...register('date', { required: '日期為必填' })}
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
                className="rounded-md border-2 bg-gray-100 p-1"
                {...register('location', { required: '請選擇地點' })}
              >
                <option value="">請選擇地點</option>
                {locations?.map(({ id, name }) => (
                  <option key={id} value={id}>
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
      <div className="grid h-[8%] grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[83%] overflow-y-scroll shadow-md">
        {products?.map((product) => (
          <InputForm
            product={product}
            control={control}
            setValue={setValue}
            key={product.id}
          />
        ))}
      </div>
    </form>
  );
};

export default React.memo(NewRecord);
