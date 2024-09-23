import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { TMobileFilterProps } from '../../types'
import { Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Price from '../price/Price';

const MobileFilter: React.FC<TMobileFilterProps> = ({
    filter,
    setFilter,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    handleFilterChange,
    filterOptionsValue,
    handleClearFilters,
  }) => {
  return (
    <Dialog
    open={mobileFiltersOpen}
    onClose={setMobileFiltersOpen}
    className="relative z-40 lg:hidden"
  >
    <DialogBackdrop
      transition
      className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
    />

    <div className="fixed inset-0 z-40 flex">
      <DialogPanel
        transition
        className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Filters */}
        <Button
      type="default"
      icon={<FilterOutlined />}
      onClick={handleClearFilters}
      className="ml-4 flex items-center space-x-2 text-gray-700 hover:text-gray-900"
    >
      <span>Clear Filters</span>
    </Button>
        <Price filter={filter} setFilter={setFilter} />
        <form className="mt-4 border-t border-gray-200">       

          {filterOptionsValue?.map((section) => (
            <Disclosure
              key={section.id}
              as="div"
              className="border-t border-gray-200 px-4 py-6"
            >
              <h3 className="-mx-2 -my-3 flow-root">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                <div className="space-y-6">
                  {section?.options?.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        defaultValue={option.value}
                        defaultChecked={option.checked}
                        // 
                        id={`filter-mobile-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        type="checkbox"
                        onChange={(e) => handleFilterChange(e)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                        className="ml-3 min-w-0 flex-1 text-gray-500"
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
      </DialogPanel>
    </div>
  </Dialog>
  )
}

export default MobileFilter