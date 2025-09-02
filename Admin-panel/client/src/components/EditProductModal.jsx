import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/products";
import { useUI } from "../context/UIContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { editProductSchema } from "../validations/validationSchema";

function EditProductModal() {
  const { state, dispatch } = useUI();
  const queryClient = useQueryClient();

  const product = state.editingProduct;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(editProductSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      });
    }
  }, [product, reset]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"], exact: false });
      dispatch({ type: "CLOSE_EDIT_MODAL" });
      toast.success("محصول با موفقیت ویرایش شد ");
    },
    onError: () => {
      toast.error("خطا در ویرایش محصول ");
    },
  });
  

  const onSubmit = (data) => {
    mutation.mutate({ id: product.id, ...data });
  };

  if (!state.isEditModalOpen || !product) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm">
      <div className="fixed bg-white rounded-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 w-[460px]  max-w-[90vw]  flex flex-col justify-between gap-12 py-8">
        <h2 className="text-xl text-center">ویرایش اطلاعات</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mr-1">نام کالا</label>
          <br></br>
          <input className="inputs mt-1 mb-5 placeholder-redcustom" type="text" placeholder={errors.name?.message} {...register("name")} />

          <label className="mr-1">تعداد موجودی</label>
          <br></br>
          <input className="inputs mt-1 mb-5 placeholder-redcustom" type="number" placeholder={errors.quantity?.message} {...register("quantity", { valueAsNumber: true })} />

          <label className="mr-1">قیمت</label>
          <br></br>
          <input className="inputs mt-1  placeholder-redcustom" type="number" placeholder={errors.price?.message} {...register("price", { valueAsNumber: true })} />
          <div className="flex gap-4 justify-between mt-6">
        <button className="px-3 py-2  md:w-48 rounded-md border bg-bluecustom text-white" type="submit">ثبت اطلاعات جدید</button>
        <button className="px-3 py-2 w-32 md:w-48 rounded-md border bg-graytwo text-text " type="button" onClick={() => dispatch({ type: "CLOSE_EDIT_MODAL" })}>  انصراف</button>
        </div>
       </form>
        
      </div>
    </div>
  );
}

export default EditProductModal;
