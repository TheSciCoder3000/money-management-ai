import React, { ReactNode } from "react";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
  children: ReactNode | ReactNode[];
}
const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
  if (loading)
    return (
      <div className="mt-5 flex items-center justify-center">
        <ClipLoader />
      </div>
    );

  return <>{children}</>;
};

export default Loader;
