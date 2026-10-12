import { test, expect } from 'vitest'
import {
  validateDateNotInFuture,
  validateCrossFieldIntegrity
} from '../validation.ts'
import { emptyBill } from '../model.ts'

test('validateDateNotInFuture accepts today and past dates', () => {
  const today = new Date().toISOString().split('T')[0]
  expect(validateDateNotInFuture(today)).toBe(true)
  expect(validateDateNotInFuture('2020-01-01')).toBe(true)
  expect(validateDateNotInFuture('')).toBe(true)
})

test('validateDateNotInFuture rejects dates in the future', () => {
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 2)
  const futureStr = nextYear.toISOString().split('T')[0]
  expect(validateDateNotInFuture(futureStr)).toBe(false)
})

test('validateCrossFieldIntegrity detects missing mandatory fields', () => {
  const empty = emptyBill()
  const errors = validateCrossFieldIntegrity(empty)
  expect(errors).toContain('Exporter is required')
  expect(errors).toContain('Consignee is required')
  expect(errors).toContain('Port of Loading is required')
  expect(errors).toContain('Final Destination Port is required')
})

test('validateCrossFieldIntegrity flags net weight exceeding gross weight', () => {
  const bill = {
    ...emptyBill(),
    exporterId: '1000',
    consigneeId: '2000',
    loadingPort: 'INMUN1',
    finalDestinationPort: 'USMSY',
    grossWeight: '500',
    netWeight: '600' // Net cannot exceed Gross
  }
  const errors = validateCrossFieldIntegrity(bill)
  expect(errors).toContain('Net Weight cannot exceed Gross Weight')
})

test('validateCrossFieldIntegrity passes for fully valid shipping bill', () => {
  const validBill = {
    ...emptyBill(),
    exporterId: '1000',
    consigneeId: '2000',
    loadingPort: 'INMUN1',
    finalDestinationPort: 'USMSY',
    grossWeight: '1000',
    netWeight: '950',
    jobDate: '2026-10-12'
  }
  const errors = validateCrossFieldIntegrity(validBill)
  expect(errors.length).toBe(0)
})
