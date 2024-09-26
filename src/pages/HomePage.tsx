import { Carousel } from "antd";
import Banner from "../components/banner/Banner";
import ServiceDetails from "../components/service/ServiceDetails";
import { useGetAllServicesQuery } from "../redux/features/service/serviceApi";
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';

const contentStyle: React.CSSProperties = {
  margin: 0,
  minHeight: '300px', // Adjust the minimum height as needed
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const HomePage = () => {
  const { data, isLoading } = useGetAllServicesQuery("");

  // Group services into chunks of 3
  const groupServices = (services: any[]) => {
    const groups = [];
    for (let i = 0; i < services.length; i += 3) {
      groups.push(services.slice(i, i + 3));
    }
    return groups;
  };

  return (
    <div>
      <Banner />

      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            <h3 className="font-bold text-2xl m-8 text-center text-gray-800 tracking-wide">
              Services
            </h3>
            <div>
              {data?.data?.length > 0 ? (
                <div>
                  <Carousel
                    arrows={true}
                    infinite={false}
                    prevArrow={
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
                        <LeftCircleFilled className=" text-gray-500 text-3xl" />
                      </div>
                    }
                    nextArrow={
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
                        <RightCircleFilled className="text-gray-500 text-2xl" />
                      </div>
                    }
                  >
                    {groupServices(data.data).map((serviceGroup: any[], index: number) => (
                      <div key={index} style={contentStyle}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {serviceGroup.map((service: any) => (
                            <ServiceDetails key={service._id} service={service} page="homePage" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <p className="text-center text-gray-500">No services found.</p>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default HomePage;
