const PendingRequest2 = () => {
  return (
    <>
      <div className="p-10 bg-blue-gray-100">
        <div className=" text-2xl font-bold ">Stock Report Card</div>
        <div className="flex justify-around mt-10">
          <div className="flex flex-col items-center">
            <div className="text-5xl text-orange-500 font-[latto]">5</div>
            <div className="text-xl font-[latto]">Active</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl text-green-400 font-[latto]">0</div>
            <div className="text-xl font-[latto]">Not Listed</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl text-green-400 font-[latto]">0</div>
            <div className="text-xl font-[latto]">WithOut Images</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl text-red-500 font-[latto]">1</div>
            <div className="text-xl font-[latto]">Old Stock</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingRequest2;
