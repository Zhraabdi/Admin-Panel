import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../api/products";
import { toast } from "react-toastify";
import { addProductSchema } from "../validations/validationSchema";

function AddProductModal({ onClose }) {
  const queryClient = useQueryClient(); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(addProductSchema),
    defaultValues: { name: "", quantity: "", price: "" },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); 
      reset();
      onClose();
      toast.success("محصول جدید با موفقیت اضافه شد ");
    },
    onError: () => {
      toast.error("خطا در افزودن محصول ");
    },
  });

  const onSubmit = (data) => {
    console.log("form data:", data);
    mutation.mutate(data);
  };
  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm">
      <div className="fixed bg-white rounded-[30px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 w-[460px]   max-w-[90vw]  flex flex-col justify-between gap-12 py-8">
      <h2 className="text-xl text-center">ایجاد محصول جدید</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-[-22px]">
        <label className="mr-1">نام کالا</label>
        <span className="text-redcustom">{errors.name?.message}</span>
        </div>
        <br></br>
        <input className="inputs mt-1 mb-5" type="text" placeholder="نام کالا" {...register("name")} />
        <div className="flex justify-between items-center mb-[-22px]">
        <label className="mr-1">تعداد موجودی</label>
        <span className="text-redcustom">{errors.quantity?.message}</span>
        </div>
        <br></br>
        <input className="inputs mt-1 mb-5" type="number" placeholder="موجودی" {...register("quantity", { valueAsNumber: true })} />
        <div className="flex justify-between items-center mb-[-22px]">
        <label className="mr-1">قیمت </label>
        <span className="text-redcustom">{errors.price?.message}</span>
        </div>        
        <br></br>
        <input className="inputs mt-1 mb-5 " type="number" placeholder="قیمت" {...register("price", { valueAsNumber: true })} />
        <div className="flex gap-4 justify-between  ">
        <button className="px-3 py-2 w-32 md:w-48 rounded-md border bg-bluecustom text-white" type="submit" disabled={mutation.isLoading}>{mutation.isLoading ? "در حال افزودن..." : "ایجاد "}</button>
        <button className="px-3 py-2 w-32 md:w-48 rounded-md border bg-graytwo text-text" type="button" onClick={onClose}>انصراف</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddProductModal

