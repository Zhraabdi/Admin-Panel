import * as yup from "yup";

const loginSchema = yup.object({
    username: yup.string().required("نام کاربری الزامی است").min(3, "حداقل ۳ کاراکتر وارد کنید"),
    password: yup.string().required("رمز عبور الزامی است").min(6, "رمز عبور حداقل 6 کاراکتر باشد"),
  });


const registerSchema = yup.object({
    username: yup
      .string()
      .required("نام کاربری الزامی است")
      .matches(/^(?=.*[A-Za-z])[A-Za-z0-9]+$/, "فقط حروف انگلیسی و اعداد مجاز است ")
      .min(3, "حداقل ۳ کاراکتر وارد کنید"),
      
      password: yup
      .string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
      .matches(/[a-z]/, "باید حداقل یک حرف کوچک انگلیسی داشته باشد")
      .matches(/[A-Z]/, "باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
      .matches(/\d/, "باید حداقل یک عدد داشته باشد")
      .matches(/[@$!%*?&]/, "باید حداقل یک کاراکتر خاص (@$!%*?&) داشته باشد"),
      
      confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "رمز عبور یکسان نیست")
      .required("تکرار رمز عبور الزامی است"),
  });

const addProductSchema = yup.object({
    name: yup
      .string()
      .required("نام کالا الزامی است")
      .min(2, "حداقل ۲ کاراکتر وارد کنید"),
    quantity: yup
      .number()
      .typeError("باید عدد باشد")
      .required("موجودی الزامی است")
      .min(1, "حداقل ۱ عدد موجودی لازم است"),
    price: yup
      .number()
      .typeError("باید عدد باشد")
      .required("قیمت الزامی است")
      .min(1, "قیمت باید بیشتر از صفر باشد"),
  });

  const editProductSchema = yup.object({
    name: yup.string().required("نام کالا الزامی است").min(2, "حداقل ۲ کاراکتر وارد کنید"),
    quantity: yup
      .number()
      .typeError("باید عدد باشد")
      .required("موجودی الزامی است")
      .min(1, "موجودی حداقل باید ۱ باشد"),
    price: yup
      .number()
      .typeError("باید عدد باشد")
      .required("قیمت الزامی است")
      .min(1, "قیمت باید بیشتر از صفر باشد"),
  });


  export {loginSchema, registerSchema, addProductSchema, editProductSchema}