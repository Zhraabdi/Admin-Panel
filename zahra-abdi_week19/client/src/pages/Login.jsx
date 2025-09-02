import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "../validations/validationSchema";
import { Link } from "react-router-dom";


function Login() {
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: { token: data.token, user: { username: variables.username } },    
      });
      toast.success(" ورود موفقیت‌آمیز بود");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("نام کاربری یا رمز عبور نامعتبر است "); },
  });
  
  const onSubmit = (data) => {
    setServerError("");
    mutation.reset(); 
     mutation.mutate(data);
  };
  
  return (
    
    <div className="min-h-screen flex items-center justify-center flex-col gap-20 mx-3">
    <div className="flex flex-col justify-between items-center  bg-white w-full sm:w-[470px] md:w-[470px] max-w-[470px] min-h-[523px] rounded-[40px] border border-gray-200 p-6 mx-4 ">
      <div>
      <img className="w-20 h-20" src="/images/logo.svg" alt="لوگو" />
      <h1 className="text-2xl font-medium pb-4 pt-4">فرم ورود</h1>
      </div>
      <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input className="inputs" type="text" placeholder="نام کاربری" {...register("username")}/>
      <p className="errors">{errors.username?.message}</p>

      <input className="inputs" type="password" placeholder="رمز عبور" {...register("password")}/>
      <p className="errors">{errors.password?.message}</p>
      
      <button className="w-full bg-bluecustom text-white  transition rounded-[15px] p-3" type="submit" disabled={mutation.isLoading}>
      {mutation.isLoading ? "در حال ورود..." : "ورود"}
      </button>
      </form>
      <Link to="/register" className="block w-full text-right text-bluecustom text-base font-normal">ایجاد حساب کاربری!</Link>
    </div>
    </div>
  );
}

export default Login;
