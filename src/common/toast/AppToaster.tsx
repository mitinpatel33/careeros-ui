import { Toaster } from "react-hot-toast";

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3500,

        style: {
          borderRadius: "16px",
          padding: "14px 18px",
          fontSize: "15px",
          fontWeight: 500,
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.12)",
          background: "#fff",
          color: "#222",
        },

        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#fff",
          },
          style: {
            border: "1px solid #16a34a",
          },
        },

        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
          style: {
            border: "1px solid #ef4444",
          },
        },

        loading: {
          style: {
            border: "1px solid #2563eb",
          },
        },
      }}
    />
  );
};

export default AppToaster;