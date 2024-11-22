const Input = ({ inputType = "text", inputHolder = "" }) => {
  return (
    <input
      className='bg-[#F5F5F5] px-3 rounded-md'
      type={inputType}
      placeholder={inputHolder}
    />
  );
};
export default Input;
