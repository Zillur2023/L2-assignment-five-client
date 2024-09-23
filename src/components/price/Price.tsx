import React, { useState } from "react";
import { Slider, Input, Typography, Row, Col } from "antd";
import { TPriceProps } from "../../types";
import { useMaxPriceQuery } from "../../redux/features/service/serviceApi";

const { Title } = Typography;

const Price: React.FC<TPriceProps> = ({ filter, setFilter }) => {
  const { data } = useMaxPriceQuery("");
console.log({data})
  const [maxPrice, setMaxPrice] = useState(100);
  console.log({maxPrice})


  // Derive maxPrice from the fetched data
  if (data) {
    const calculatedMaxPrice = Number(data?.data);
    if (maxPrice !== calculatedMaxPrice) {
      setMaxPrice(calculatedMaxPrice);
    }
  }

 
  const handleSliderChange = (value: number | [number, number]) => {
    // Ensure the value is a tuple (array with exactly two numbers)
    if (Array.isArray(value) && value.length === 2) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        priceMin: value[0],
        priceMax: value[1],
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setFilter((prevFilter) => {
        const updatedFilter = { ...prevFilter };
        if (index === 0) {
          updatedFilter.priceMin = newValue;
        } else if (index === 1) {
          updatedFilter.priceMax = newValue;
        }
        return updatedFilter;
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={4}>Price Range Filter</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            type="number"
            value={filter.priceMin ?? ""}
            onChange={(e) => handleInputChange(e, 0)}
            style={{ marginBottom: 20 }}
            placeholder="Min Price"
          />
        </Col>
        <Col span={12}>
          <Input
            type="number"
            value={filter.priceMax ?? ""}
            onChange={(e) => handleInputChange(e, 1)}
            style={{ marginBottom: 20 }}
            placeholder="Max Price"
          />
        </Col>
      </Row>
      {/* @ts-ignore */}
      <Slider  range  draggableTrack
        min={0}
        max={maxPrice}
        step={1}
        value={[filter.priceMin ?? 0, filter.priceMax ?? maxPrice]}
        onChange={handleSliderChange}
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};

export default Price;
