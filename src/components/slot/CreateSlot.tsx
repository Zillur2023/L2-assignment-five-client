import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, Card, Typography, Select, TimePicker, Modal } from "antd";
import { toast } from "sonner";
import { useGetAllServicesQuery, useGetServiceQuery } from "../../redux/features/service/serviceApi";
import { useCreateSlotMutation } from "../../redux/features/slot/slotApi";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

type FormValues = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

type CreateSlotModalProps = {
  modalVisible: boolean;
  handleClose: () => void;
};

const CreateSlot: React.FC<CreateSlotModalProps> = ({ modalVisible, handleClose }) => {
  // const navigate = useNavigate();
  const [createSlot] = useCreateSlotMutation();
  const { data: services, isLoading } = useGetAllServicesQuery('');
  const [selectedService, setSelectedService] = useState<string>(''); 
  const { data: service } = useGetServiceQuery(selectedService, { skip: !selectedService });
  const [endTimeOptions, setEndTimeOptions] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue, // Added setValue to update form values programmatically
  } = useForm<FormValues>({
    defaultValues: {
      service: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const startTime = watch("startTime");

  // Effect to generate end times based on service duration
  useEffect(() => {
    if (startTime && service?.data?.duration) {
      // Clear the endTime field when startTime changes
      setValue('endTime', '');

      const startMoment = moment(startTime, "HH:mm");
      const duration = service.data.duration; // duration in minutes
      const generatedOptions: string[] = [];

      let nextTime = startMoment.clone().add(duration, "minutes");

      // Generate end times until the end of the day (24:00)
      while (nextTime.isBefore(moment("24:00", "HH:mm"))) {
        generatedOptions.push(nextTime.format("HH:mm"));
        nextTime = nextTime.clone().add(duration, "minutes");
      }

      setEndTimeOptions(generatedOptions);
    }
  }, [startTime, service, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (dataInfo) => {
    const toastId = toast.loading("Creating slot...");
    const serviceData = {
      service: dataInfo.service,
      date: dataInfo.date,
      startTime: dataInfo.startTime,
      endTime: dataInfo.endTime,
    };
    
    try {
      const res = await createSlot(serviceData).unwrap();
      if (res) {
        toast.success(res?.message, { id: toastId });
        reset();
        // navigate('/');
      } else {
        toast.error(res.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
    // title="Add New Slot"
    visible={modalVisible}
    onCancel={handleClose}
    footer={null}
  >
    <Card className="max-w-xl mx-auto mt-8 p-6 shadow-lg">
      <Title level={3} className="text-center mb-6">Create slot</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-4">
        {/* Service Selection */}
        <Form.Item label="Service" validateStatus={errors.service ? "error" : ""} help={errors.service?.message} required>
          <Controller
            name="service"
            control={control}
            rules={{ required: "Service is required" }}
            render={({ field }) => (
              <Select
                {...field}
                loading={isLoading}
                placeholder="Select a service"
                onChange={(value) => {
                  field.onChange(value);
                  setSelectedService(value);
                }}
              >
                {services?.data?.map((service: { _id: string; name: string }) => (
                  <Option key={service._id} value={service._id}>
                    {service.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        {/* Date Selection */}
        <Form.Item label="Date" validateStatus={errors.date ? "error" : ""} help={errors.date?.message} required>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <Input {...field} type="date" />
            )}
          />
        </Form.Item>

        {/* Start Time Selection */}
        <Form.Item label="Start Time" validateStatus={errors.startTime ? "error" : ""} help={errors.startTime?.message} required>
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <TimePicker
                className=" w-full"
                format={'HH:mm'}
                onChange={(time) => {
                  field.onChange(time ? time.format("HH:mm") : "");
                }}
              />
            )}
          />
        </Form.Item>

        {/* End Time Selection */}
        <Form.Item label="End Time" validateStatus={errors.endTime ? "error" : ""} help={errors.endTime?.message} required>
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "End time is required" }}
            render={({ field }) => (
              <Select {...field} disabled={!startTime || !service?.data?.duration}>
                {endTimeOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create slot
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </Modal>
  );
};

export default CreateSlot;
