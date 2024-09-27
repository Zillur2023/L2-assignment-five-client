import { Divider } from "antd";
import { useGetAllWhyChooseUsQuery } from "../../redux/features/whyChooseUs/whyChooseUsApi";

const WhyChooseUs = () => {
  const { data } = useGetAllWhyChooseUsQuery("");
  // console.log({ data });

  return (
    <div className=" my-10">
      <div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center mt-10">
  <h3 className="text-3xl sm:text-3xl md:text-4xl font-semibold text-center mt-5 md:mt-0 md:mr-6">
    Why Choose GO Car Wash?
  </h3>
  <img
    src="https://i.ibb.co/wCxPXc4/gocarwashcar.png"
    alt="Banner"
    className="w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4"
  />
</div>

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
            <h1 className="text-xl sm:text-xl md:text-2xl font-semibold">
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
