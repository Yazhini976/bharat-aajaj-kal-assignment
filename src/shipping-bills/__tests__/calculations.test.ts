import { test, expect } from 'vitest'
import {
  calculateLineTotal,
  formatMoney,
  calculateInvoiceTotal,
  calculateGrandTotal,
  calculateTotalPackages,
  parseOptionalNumber
} from '../calculations.ts'
import { BillInvoiceForm, emptyInvoice, emptyItem } from '../model.ts'

test('calculateLineTotal handles standard multiplication and rounding', () => {
  expect(calculateLineTotal(10, 5.5)).toBe(55)
  expect(calculateLineTotal('3', '12.333')).toBe(37)
  expect(calculateLineTotal(100, 0.05)).toBe(5)
})

test('calculateLineTotal handles invalid or non-positive values gracefully', () => {
  expect(calculateLineTotal(0, 100)).toBe(0)
  expect(calculateLineTotal(-5, 100)).toBe(0)
  expect(calculateLineTotal(10, -50)).toBe(0)
  expect(calculateLineTotal('', '')).toBe(0)
  expect(calculateLineTotal(undefined, undefined)).toBe(0)
})

test('formatMoney formats amounts with two decimals', () => {
  expect(formatMoney(10)).toBe('10.00')
  expect(formatMoney(12.3456)).toBe('12.35')
  expect(formatMoney(0)).toBe('0.00')
})

test('calculateInvoiceTotal computes line sums with freight, insurance, and deductions', () => {
  const inv: BillInvoiceForm = {
    ...emptyInvoice(),
    freightAmount: '50',
    insuranceAmount: '25',
    packingCharges: '10',
    discountAmount: '15',
    commissionAmount: '5',
    otherDeductionsAmount: '0',
    items: [
      {
        ...emptyItem(),
        quantity: '10',
        unitPrice: '20' // 200
      },
      {
        ...emptyItem(),
        quantity: '5',
        unitPrice: '10' // 50
      }
    ]
  }

  // Items: 250 + freight(50) + insurance(25) + packing(10) - discount(15) - commission(5) = 315
  const total = calculateInvoiceTotal(inv)
  expect(total).toBe(315)
})

test('calculateGrandTotal sums multiple invoices', () => {
  const inv1: BillInvoiceForm = {
    ...emptyInvoice(),
    items: [{ ...emptyItem(), quantity: '2', unitPrice: '50' }] // 100
  }
  const inv2: BillInvoiceForm = {
    ...emptyInvoice(),
    items: [{ ...emptyItem(), quantity: '3', unitPrice: '100' }] // 300
  }

  expect(calculateGrandTotal([inv1, inv2])).toBe(400)
})

test('calculateTotalPackages sums package counts correctly', () => {
  const items = [
    { ...emptyItem(), totalPackage: '12' },
    { ...emptyItem(), totalPackage: '8' }
  ]
  expect(calculateTotalPackages(items)).toBe(20)
})

test('parseOptionalNumber returns parsed number or undefined', () => {
  expect(parseOptionalNumber('42')).toBe(42)
  expect(parseOptionalNumber(100)).toBe(100)
  expect(parseOptionalNumber('')).toBeUndefined()
  expect(parseOptionalNumber(null)).toBeUndefined()
  expect(parseOptionalNumber('abc')).toBeUndefined()
})
