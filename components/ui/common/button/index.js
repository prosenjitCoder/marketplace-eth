const Button = ({
  children,
  className,
  variant = "purple",
  hoverable = true,
  ...rest
}) => {
  const variants = {
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
  };
  return (
    <button
      {...rest}
      className={`disabled:cursor-not-allowed disabled:opacity-50 px-8 py-3 border text-base cursor-pointer font-medium rounded-md ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;