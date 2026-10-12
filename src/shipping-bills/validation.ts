import { s } from 'core/form'
import { ShippingBillFormValues } from './model'

export const positiveNumber = s.string().refine((value) => (Number(value) > 0 ? undefined : 'Enter a number above zero'))

export const nonNegativeNumber = s.string().refine((value) => (!value || Number(value) >= 0 ? undefined : 'Cannot be negative'))

// Leaf names are deliberate: fe-zen-arch resolves nested RHF field rules by their final path segment.
export const billSchema = s.object({
  jobNumber: s.string().optional(),
  jobDate: s.string(),
  exporterId: s.string(),
  exporterBranchId: s.string(),
  consigneeId: s.string(),
  consigneeBranchId: s.string(),
  loadingPort: s.string(),
  finalDestinationPort: s.string(),
  dischargePort: s.string().optional(),
  originStateCode: s.string().optional(),
  nfeiCategory: s.string().optional(),
  rbiWaiverNumber: s.string().optional(),
  rbiWaiverDate: s.string().optional(),
  sealType: s.string().optional(),
  numberOfContainers: s.string().optional(),
  natureOfCargo: s.string().optional(),
  grossWeight: s.string().optional(),
  netWeight: s.string().optional(),
  measurementUnit: s.string().optional(),
  totalPackages: s.string().optional(),
  marksAndNumbers: s.string().optional(),
  loosePackets: s.string().optional(),
  mawbNumber: s.string().optional(),
  hawbNumber: s.string().optional(),
  invoiceNumber: s.string(),
  invoiceDate: s.string(),
  currency: s.string(),
  invoiceTotal: nonNegativeNumber.optional(),
  contractType: s.string(),
  buyerId: s.string().optional(),
  buyerBranchId: s.string().optional(),
  thirdPartyId: s.string().optional(),
  thirdPartyBranchId: s.string().optional(),
  ritcCode: s.string(),
  goodsDescription1: s.string(),
  quantity: positiveNumber,
  unitOfMeasurement: s.string(),
  unitPrice: positiveNumber,
  containerNumber: s.string().optional(),
  packingNumberFrom: s.string().optional(),
  packingNumberTo: s.string().optional(),
  documentTypeCode: s.string().optional(),
  documentReferenceNumber: s.string().optional(),
  registrationNumber: s.string().optional()
})

/**
 * Validates whether a date string is not in the future.
 */
export function validateDateNotInFuture(dateStr?: string): boolean {
  if (!dateStr) return true
  const inputDate = new Date(dateStr)
  if (isNaN(inputDate.getTime())) return false
  const now = new Date()
  // Compare by calendar date (end of today)
  now.setHours(23, 59, 59, 999)
  return inputDate.getTime() <= now.getTime()
}

/**
 * Validates cross-field integrity on a shipping bill values payload.
 * Returns array of validation error messages, or empty array if valid.
 */
export function validateCrossFieldIntegrity(values: ShippingBillFormValues): string[] {
  const errors: string[] = []

  if (!values.exporterId) {
    errors.push('Exporter is required')
  }
  if (!values.consigneeId) {
    errors.push('Consignee is required')
  }
  if (!values.loadingPort) {
    errors.push('Port of Loading is required')
  }
  if (!values.finalDestinationPort) {
    errors.push('Final Destination Port is required')
  }

  if (values.jobDate && !validateDateNotInFuture(values.jobDate)) {
    errors.push('Job Date cannot be in the future')
  }

  // Weight sanity check: net weight cannot exceed gross weight if both are provided
  const gross = Number(values.grossWeight)
  const net = Number(values.netWeight)
  if (gross > 0 && net > 0 && net > gross) {
    errors.push('Net Weight cannot exceed Gross Weight')
  }

  return errors
}
