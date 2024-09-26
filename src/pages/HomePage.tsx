import { useState, useEffect } from "react";
import { Carousel, Divider } from "antd";
import Banner from "../components/banner/Banner";
import ServiceDetails from "../components/service/ServiceDetails";
import { useGetAllServicesQuery } from "../redux/features/service/serviceApi";
import { RightCircleFilled, LeftCircleFilled } from '@ant-design/icons';
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Review from "../components/review/Review";

const contentStyle: React.CSSProperties = {
  margin: 0,
  minHeight: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const HomePage = () => {
  const { data, isLoading } = useGetAllServicesQuery("");
  const [chunkSize, setChunkSize] = useState(3); // Default chunk size

  // Detect screen size and update chunk size accordingly
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768 && screenWidth < 1024) {
        setChunkSize(2); // Medium devices (md)
      } else if (screenWidth >= 1024) {
        setChunkSize(3); // Larger devices (lg and above)
      } else {
        setChunkSize(1); // Small devices (sm)
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Group services based on the current chunk size
  const groupServices = (services: any[]) => {
    const groups = [];
    for (let i = 0; i < services.length; i += chunkSize) {
      groups.push(services.slice(i, i + chunkSize));
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
            <h3 className=" text-3xl font-bold text-center mt-10">Service</h3>
            <Divider />
            <div>
              {data?.data?.length > 0 ? (
                <div className="relative">
                  <Carousel
                    arrows={true}
                    infinite={false}
                    prevArrow={
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
                        <LeftCircleFilled className="text-gray-500 text-3xl" />
                      </div>
                    }
                    nextArrow={
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-full p-2">
                        <RightCircleFilled className="text-gray-500 text-3xl" />
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
      <WhyChooseUs/>
      <Review/>
    </div>
  );
};

export default HomePage;
