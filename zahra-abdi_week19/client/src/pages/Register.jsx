import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify"; 
import { registerSchema } from "../validations/validationSchema";
import { Link } from "react-router-dom";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      dispatch({
        type: "LOGIN_SUCCESS", payload: { token: data.token, user: { username: variables.username } },
      });
      toast.success(" ثبت‌نام با موفقیت انجام شد");
      navigate("/login");
    },
    onError: (error) => {
      toast.error("ثبت نام ناموفق بود");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ username: data.username, password: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-20 mx-3">
    <div className="flex flex-col justify-between items-center  bg-white w-full sm:w-[470px] md:w-[470px] max-w-[470px] min-h-[523px] rounded-[40px] border border-gray-200 p-6 mx-4 ">
    <div>
      <img className="w-20 h-20" src="/images/logo.svg" alt="لوگو" />
      <h1 className="text-2xl font-medium pb-4 pt-4">فرم ثبت نام </h1>
      </div>
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input className="inputs" type="text" placeholder="نام کاربری" {...register("username")} />
        <p className="errors">{errors.username?.message}</p>

        <input className="inputs" type="password" placeholder="رمز عبور" {...register("password")} />
        <p className="errors">{errors.password?.message}</p>

        <input className="inputs" type="password" placeholder="تکرار رمز عبور" {...register("confirmPassword")} />
        <p className="errors">{errors.confirmPassword?.message}</p>

        <button className="w-full bg-bluecustom text-white  transition rounded-[15px] p-3" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>
      <Link to="/login" className="block w-full text-right text-bluecustom text-base font-normal mt-4">حساب کاربری دارید!</Link>
    </div>
    </div>
  );
}

export default Register;