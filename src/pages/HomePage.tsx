import Banner from "../components/banner/Banner";
import ServiceDetails from "../components/service/ServiceDetails";
import { useGetAllServicesQuery } from "../redux/features/service/serviceApi";

const HomePage = () => {
  const { data, isLoading } = useGetAllServicesQuery("");
  // console.log("serviceData", data?.data);

  return (
    <div>
      <Banner />

      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            <h3 className="font-bold text-2xl m-8 text-center text-gray-800 tracking-wide">
              Service
            </h3>
            <div className="flex justify-center items-center my-5">
              {data?.data?.length > 0 ? ( // Check if there are any products
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                  {data?.data?.slice(0, 6).map((service: any) => (
                    <div key={service._id}>
                      <ServiceDetails service={service} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No products found.</p> // Message when no products
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default HomePage;
