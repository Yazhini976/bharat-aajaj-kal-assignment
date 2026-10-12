import { BillInvoiceForm, BillItemForm } from './model'

/**
 * Calculates line total for an item row given quantity and unit price.
 * Ensures safe decimal rounding to 2 decimal places.
 */
export function calculateLineTotal(quantity: string | number | undefined, unitPrice: string | number | undefined): number {
  const qty = Number(quantity) || 0
  const price = Number(unitPrice) || 0
  if (qty <= 0 || price <= 0) return 0
  return Math.round(qty * price * 100) / 100
}

/**
 * Formats a numeric value to fixed 2 decimal currency string.
 */
export function formatMoney(amount: number): string {
  return amount.toFixed(2)
}

/**
 * Calculates the total declared value for a single invoice:
 * sum of all line items minus deductions plus freight & insurance.
 */
export function calculateInvoiceTotal(invoice: BillInvoiceForm): number {
  const itemsSum = (invoice.items || []).reduce((sum, item) => {
    return sum + calculateLineTotal(item.quantity, item.unitPrice)
  }, 0)

  const freight = Number(invoice.freightAmount) || 0
  const insurance = Number(invoice.insuranceAmount) || 0
  const discount = Number(invoice.discountAmount) || 0
  const commission = Number(invoice.commissionAmount) || 0
  const packingCharges = Number(invoice.packingCharges) || 0
  const otherDeductions = Number(invoice.otherDeductionsAmount) || 0

  const total = itemsSum + freight + insurance + packingCharges - discount - commission - otherDeductions
  return Math.max(0, Math.round(total * 100) / 100)
}

/**
 * Calculates the grand total across all invoices in a shipping bill.
 */
export function calculateGrandTotal(invoices: BillInvoiceForm[]): number {
  return (invoices || []).reduce((sum, inv) => sum + calculateInvoiceTotal(inv), 0)
}

/**
 * Calculates total packages across items or invoices.
 */
export function calculateTotalPackages(items: BillItemForm[]): number {
  return (items || []).reduce((sum, it) => sum + (Number(it.totalPackage) || 0), 0)
}

/**
 * Safe numeric parser returning undefined when empty.
 */
export function parseOptionalNumber(val: unknown): number | undefined {
  if (val == null || val === '') return undefined
  const num = Number(val)
  return isNaN(num) ? undefined : num
}
