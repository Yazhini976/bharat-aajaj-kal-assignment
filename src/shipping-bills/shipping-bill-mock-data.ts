import { loadingPorts, type PortOption, ports, countries } from './model'

export interface ReferenceOption {
  value: string
  label: string
}

export const MOCK_CURRENCY_OPTIONS: ReferenceOption[] = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'AED', label: 'AED - UAE Dirham' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' }
]

export const MOCK_UNIT_OPTIONS: ReferenceOption[] = [
  { value: 'PCS', label: 'PCS - Pieces' },
  { value: 'KGS', label: 'KGS - Kilograms' },
  { value: 'MTR', label: 'MTR - Meters' },
  { value: 'NOS', label: 'NOS - Numbers' },
  { value: 'SET', label: 'SET - Sets' },
  { value: 'BOX', label: 'BOX - Boxes' }
]

export const MOCK_SEAL_TYPES: ReferenceOption[] = [
  { value: '1', label: '1 - Warehouse Sealed' },
  { value: '2', label: '2 - Customs Sealed' },
  { value: '3', label: '3 - Self Sealed' }
]

export const MOCK_CARGO_NATURE_OPTIONS: ReferenceOption[] = [
  { value: '1', label: '1 - Containerized' },
  { value: '2', label: '2 - Non-Containerized' },
  { value: '3', label: '3 - Bulk Cargo' },
  { value: '4', label: '4 - Break Bulk' }
]

export const MOCK_PAYMENT_TYPES: ReferenceOption[] = [
  { value: '1', label: '1 - LC (Letter of Credit)' },
  { value: '2', label: '2 - DA (Documents Against Acceptance)' },
  { value: '3', label: '3 - DP (Documents Against Payment)' },
  { value: '4', label: '4 - Advance Payment' }
]

export const MOCK_CONTRACT_TYPES: ReferenceOption[] = [
  { value: '1', label: '1 - FOB (Free on Board)' },
  { value: '2', label: '2 - CIF (Cost, Insurance & Freight)' },
  { value: '3', label: '3 - CFR (Cost & Freight)' },
  { value: '4', label: '4 - EXW (Ex Works)' }
]

export { loadingPorts, ports, countries }
export type { PortOption }
