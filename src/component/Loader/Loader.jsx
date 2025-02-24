import { useState } from "react";
import { HashLoader } from "react-spinners";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading h-screen flex justify-center items-center">
      <HashLoader
        color={"#0aad0a"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

