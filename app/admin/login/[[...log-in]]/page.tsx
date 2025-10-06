import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn
        appearance={{
          elements: {
            footerAction: { display: "none" },
          },
        }}
      />
    </div>
  );
};

export default LoginPage;
