const Button = ({
  children,
  className = "text-white bg-indigo-600 hover:bg-indigo-700",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`disabled:cursor-not-allowed disabled:opacity-50 px-8 py-3 border text-base cursor-pointer font-medium rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
