import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { setCountdown, setUser } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "zillur@gmail.com",
      password: "1234",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // Get the location state or default to the home page
  const from = (location.state as { from: string })?.from || "/";

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const toastId = toast.loading("Logging in...")
    //  toast.promise(
    //   login(formData).unwrap(),
    //   {
    //     loading: "Logging in...",
    //     success: ({data}) => {
    //       console.log({data})
    //       const { token } = data;
    //       const user:any = jwtDecode(token);
  
    //       dispatch(setUser({ user, token }));
    //       navigate(from, { replace: true });
  
    //       return `${user?.email} has been logged in successfully!`;
    //     },
        
    //     error: "Error occurred while logging in",
    //   }
    // );
  try {
    const res = await login(formData).unwrap()
    console.log({res})
    if(res) {
     const { token } = res.data;
           const user:any = jwtDecode(token);
           console.log({user})
           dispatch(setUser({ user, token }));
           navigate(from, { replace: true });
     toast.success(res?.message, {id: toastId})
    }
    
  } catch (error:any) {
    console.log({error})
    toast.error(error?.data?.message,{id: toastId} || "Something went wrong")
  }
  };
  

  const goToRegister = () => {
    navigate("/auth/register");
  };

  return (
    <div className="flex items-center justify-center m-10 bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  {...field}
                  placeholder="Enter your email"
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input.Password
                  id="password"
                  {...field}
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  status={errors.password ? "error" : ""}
                />
              )}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            size="large"
          >
            Login
          </Button>
        </form>
        <Button
          type="link"
          onClick={goToRegister}
          className="w-full text-center mt-4"
        >
          Don't have an account? Register
        </Button>
      </div>
    </div>
  );
};

export default Login;
