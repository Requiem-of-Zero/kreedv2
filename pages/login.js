import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import logo from "../public/static/images/kreed_logo.png";
import loginBackdrop from "../public/static/images/login_backdrop_collage.jpg";

const Login = () => {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Kreed</title>
      </Head>
      {/* Login Page Background */}
      <Image
        src={loginBackdrop}
        alt="kreed login page"
        object-fit="cover"
        className="z-10 !hidden h-screen w-screen opacity-30 sm:!inline"
      />
      {/* Login Page Logo */}
      <Image
        src={logo}
        width={150}
        height={150}
        className="absolute left-4 top-4 cursor-pointer z-20 object-contain md:left-10 md:top-6"
        alt="kreed login page logo"
      />
      {/* Login Form */}
      <form
        className="absolute z-20 mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4-60 characters.
              </p>
            )}
          </label>
        </div>
        <button
          type='submit'
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => {
            setLogin(true)
          }}
        >
          Sign In
        </button>
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => {
            signIn("hello2@hello.com", "abc123");
          }}
        >
          Demo Log In
        </button>
        <div className="text-[gray]">
          New to Kreed?{" "}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign Up Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
