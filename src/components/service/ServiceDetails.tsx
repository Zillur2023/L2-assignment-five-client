import React, { useState } from "react";
import { Calendar, Card } from "antd";
import { useAvailableSlotQuery } from "../../redux/features/slot/slotApi";
import Meta from "antd/es/card/Meta";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs"; // For date formatting
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

type Slot = {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};

type ServiceDetailsProps = {
  service: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  } | null;
};

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const { data: slotData } = useAvailableSlotQuery(service?._id, {
    skip: !service?._id,
  });

  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Initially null
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [showCalendar, setShowCalendar] = useState(false); // Toggle calendar view

  // Function to handle slot selection
  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot); // Set the selected slot
  };

  // Filter slots by selected date
  // const filteredSlots = slotData?.data?.filter((slot: Slot) =>
  //   selectedDate ? dayjs(slot.date).isSame(selectedDate, "day") : true
  // );
  const filteredSlots = slotData?.data?.filter((slot: Slot) =>
    selectedDate
      ? dayjs(slot.date).isSame(selectedDate, "day")
      : dayjs(slot.date).isSame(dayjs(), "day") // Compare with today's date
  );

  return (
    <>
      {/* Service Card */}
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={service?.name}
            src={service?.image}
            style={{ height: 200, width: "100%", objectFit: "contain" }}
          />
        }
      >
        <Meta
          title={service?.name}
          description={`$${service?.price.toFixed(2)}`}
        />
        <button
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-base font-semibold text-white hover:bg-indigo-700"
        >
          View Details
        </button>
      </Card>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
      >
        <div
          className="p-6 space-y-6 bg-white w-full max-w-lg rounded-lg shadow-xl overflow-auto transform transition-all relative"
          style={{ maxHeight: "90vh", width: "480px" }} // Fix width, allow vertical overflow
        >
          {service && (
            <>
              <CloseOutlined
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              />

              {/* Service Information */}
              <h1 className="text-2xl font-bold">{service.name}</h1>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="text-lg font-semibold mb-6">
                Price:{" "}
                <span className="text-green-500">
                  ${service.price.toFixed(2)}
                </span>
              </div>

              {/* Selected Date */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Select Date</h2>
                <div className="border border-gray-300 rounded-md p-3">
                  {selectedDate ? (
                    <div className="flex items-center justify-between">
                      <span>{dayjs(selectedDate).format("MM/DD/YYYY")}</span>
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="text-indigo-600 hover:underline"
                      >
                        Change Date
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{dayjs().format("MM/DD/YYYY")}</span>{" "}
                      {/* Display current date */}
                      <button
                        onClick={() => {
                          setSelectedDate(dayjs().toDate()); // Set current date as selected
                          setShowCalendar(true);
                        }}
                        className="text-indigo-600 hover:underline"
                      >
                        Change Date
                      </button>
                    </div>
                  )}

                  {showCalendar && (
                    <Calendar
                      fullscreen={false}
                      onSelect={(date) => {
                        setSelectedDate(date.toDate());
                        setShowCalendar(false); // Close calendar after selection
                      }}
                      className="mt-3 shadow-md border rounded-md"
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              </div>

              {/* Available Slots */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Available Slots</h2>
                {filteredSlots?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {filteredSlots.map((slot: Slot) => (
                      <button
                        disabled={slot.isBooked === "booked"}
                        key={slot._id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`px-4 py-2 rounded-md border ${
                          selectedSlot?._id === slot._id
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {`${slot.startTime} - ${slot.endTime}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-500">
                    No available slots for the selected date.
                  </p>
                )}
              </div>

              {/* Book Button */}
              {selectedSlot && (
                <Link to="/booking" state={{ service, selectedSlot }}>
                  <button
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    // onClick={handleBookService}
                  >
                    Book This Service
                  </button>
                </Link>
              )}
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default ServiceDetails;
