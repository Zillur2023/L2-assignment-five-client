export type TSortOptions = { name: string; value: string; current: boolean };

export type TClassValue = string | undefined | null | false;

export type TFilter = {
  searchTerm: string;
  sort: string;
  limit: number;
  page: number;
  priceMin?: number;
  priceMax?: number;
  fields: string;
};

export type TFilterOptions = {
  value: string;
  label: string;
  checked: boolean;
};

export type TFilterOptionsValue = {
  id: string;
  name: string;
  options: TFilterOptions[];
};

export type TMobileFilterProps = {
  filter: TFilter;
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterOptionsValue: TFilterOptionsValue[];
  handleClearFilters: () => void;
};

export type TDesktopFilterProps = {
  filter: TFilter;
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterOptionsValue: TFilterOptionsValue[];
  handleClearFilters: () => void;
};

export type TPriceProps = {
  filter: TFilter;
  setFilter: React.Dispatch<React.SetStateAction<TFilter>>;
};

