
// interface AvailableSlotsProps {
//   slots: { time: string; isBooked: boolean }[];
//   selectedSlot: { time: string } | null;
//   onSlotSelect: (slot: { time: string }) => void;
// }

// const AvailableSlots: React.FC<AvailableSlotsProps> = ({
const AvailableSlots= ({
  slots,
  selectedSlot,
  onSlotSelect,
}:any) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Available Time Slots</h2>
      <div className="grid grid-cols-3 gap-4">
        {slots.map((slot:any) => (
          <button
            key={slot._id}
            disabled={slot.isBooked}
            onClick={() => onSlotSelect(slot)}
            className={`py-2 px-4 rounded-lg text-sm font-medium ${
              slot.isBooked
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : selectedSlot?.time === slot.time
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableSlots;
