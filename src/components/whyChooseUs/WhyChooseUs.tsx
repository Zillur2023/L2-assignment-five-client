import { Divider } from "antd";
import { useGetAllWhyChooseUsQuery } from "../../redux/features/whyChooseUs/whyChooseUsApi";

const WhyChooseUs = () => {
  const { data } = useGetAllWhyChooseUsQuery("");
  // console.log({ data });

  return (
    <div>
      <div>
        <h3 className=" text-3xl font-bold text-center mt-10">Why Choose Us</h3>
        <Divider />
      </div>
      {data?.data?.map((item: any, index: number) => (
        <div
          key={item?.title}
          className={`flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Image section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-center">
            <img
              src={item?.image}
              alt="Banner"
              className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 object-fill rounded-full mb-4 md:mb-0"
            />
          </div>

          {/* Content section */}
          <div className="w-full md:w-1/2 flex flex-col text-center md:text-left md:ml-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {item?.title}
            </h1>
            <p className="text-gray-600 mt-2">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseUs;
