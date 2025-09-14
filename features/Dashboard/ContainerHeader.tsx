import React from "react";

interface ContainerHeaderProps {
  children: string;
}
const ContainerHeader: React.FC<ContainerHeaderProps> = ({ children }) => {
  return <h1 className="mb-2 text-sm text-gray-500">{children}</h1>;
};

export default ContainerHeader;
