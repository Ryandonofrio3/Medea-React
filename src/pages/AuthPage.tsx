import AuthPage from "@/components/Auth/AuthPage";

const AuthPageWrapper: React.FC = () => {
  console.log("Rendering AuthPageWrapper");
  try {
    return <AuthPage />;
  } catch (error) {
    console.error("Error rendering AuthPage:", error);
    return <div>An error occurred. Please try again.</div>;
  }
};

export default AuthPageWrapper;