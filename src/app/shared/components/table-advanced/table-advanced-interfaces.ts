export interface TableConfig {
  paging?: boolean;
  initSort?: any;
  filter?: any;
  hideTotalRecord?: boolean;
  isLoading?: boolean;
}

export interface TableSort {
  column: string | null;
  direction: boolean | 'asc' | 'desc';
}

export interface TableColumn {
  key: string;
  label: string;
  canSort?: boolean;
  dateFormat?: string,
  currency?: Currency,
  placeholder?: string
}
export interface Currency {
  decimalFormat?: string,
  appendText?: string
}

