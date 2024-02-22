const Divider = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-[95%] bg-indigo-500 h-[2px] mx-auto rounded-xl" />
      </div>
    </div>
  );
};
export default Divider;
