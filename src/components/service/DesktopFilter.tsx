import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { TDesktopFilterProps } from '../../types'
import Price from '../price/Price'
import { Button } from 'antd'
import { FilterOutlined } from '@ant-design/icons';

const DesktopFilter: React.FC<TDesktopFilterProps> = ({
    filter,
    setFilter,
    handleFilterChange,
    filterOptionsValue,
    handleClearFilters,
  }) => {
    

  return (
    <form className="hidden lg:block">
      {/* Existing DesktopFilter code */}
      
      <Button
      type="default"
      icon={<FilterOutlined />}
      onClick={handleClearFilters}
      className="ml-4 flex items-center space-x-2 text-gray-700 hover:text-gray-900"
    >
      <span>Clear Filters</span>
    </Button>
    <Price filter={filter} setFilter={setFilter} />

    {filterOptionsValue.map((section) => (
      <Disclosure
        key={section.id}
        as="div"
        className="border-b border-gray-200 py-6"
      >
        <h3 className="-my-3 flow-root">
          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">
              {section.name}
            </span>
            <span className="ml-6 flex items-center">
              <PlusIcon
                aria-hidden="true"
                className="h-5 w-5 group-data-[open]:hidden"
              />
              <MinusIcon
                aria-hidden="true"
                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
              />
            </span>
          </DisclosureButton>
        </h3>
        <DisclosurePanel className="pt-6">
          <div className="space-y-4">
            {section?.options?.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                <input
                  defaultValue={option.value}
                  defaultChecked={option.checked}
                  id={`filter-${section.id}-${optionIdx}`}
                  name={`${section.id}[]`}
                  type="checkbox"
                  onChange={(e) => handleFilterChange(e)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`filter-${section.id}-${optionIdx}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    ))}
  </form>
  )
}

export default DesktopFilter