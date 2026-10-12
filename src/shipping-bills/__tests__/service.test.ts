import { test, expect } from 'vitest'
import { shippingBillService } from '../shipping-bill-service.ts'
import { emptyBill } from '../model.ts'

test('shippingBillService initializes with seed bills and getInitialBills works', () => {
  const initial = shippingBillService.getInitialBills()
  expect(Array.isArray(initial)).toBe(true)
  expect(initial.length).toBeGreaterThan(0)
  expect(initial[0].id).toBeDefined()
})

test('shippingBillService.getShippingBillFormData retrieves reference options asynchronously', async () => {
  shippingBillService.setMockDelay(10)
  shippingBillService.setSimulateFetchFailure(false)

  const data = await shippingBillService.getShippingBillFormData()
  expect(Array.isArray(data.exporters)).toBe(true)
  expect(Array.isArray(data.consignees)).toBe(true)
  expect(Array.isArray(data.loadingPorts)).toBe(true)
  expect(Array.isArray(data.destinationPorts)).toBe(true)
  expect(data.currencies.length).toBeGreaterThanOrEqual(4)
  expect(data.units.length).toBeGreaterThanOrEqual(3)
})

test('shippingBillService.getShippingBillFormData throws error when failure simulation is enabled', async () => {
  shippingBillService.setMockDelay(5)
  shippingBillService.setSimulateFetchFailure(true)

  await expect(async () => {
    await shippingBillService.getShippingBillFormData()
  }).rejects.toThrow(/Simulated network error: Failed to fetch shipping bill reference data/)

  // Reset flag
  shippingBillService.setSimulateFetchFailure(false)
})

test('shippingBillService.submitShippingBill succeeds and returns mock reference number', async () => {
  shippingBillService.setMockDelay(10)
  shippingBillService.setSimulateSubmitFailure(false)

  const formValues = {
    ...emptyBill(),
    jobDate: '2026-10-12',
    exporterId: '1000',
    consigneeId: '2000',
    loadingPort: 'INMUN1',
    finalDestinationPort: 'USMSY'
  }

  const result = await shippingBillService.submitShippingBill(formValues)
  expect(result.success).toBe(true)
  expect(result.referenceNumber.startsWith('SB-MOCK-')).toBe(true)
  expect(result.savedBill).toBeDefined()
  expect(result.savedBill.values.exporterId).toBe('1000')
})

test('shippingBillService.submitShippingBill fails deterministically when simulation toggle is active', async () => {
  shippingBillService.setMockDelay(5)
  shippingBillService.setSimulateSubmitFailure(true)

  const formValues = {
    ...emptyBill(),
    jobDate: '2026-10-12'
  }

  await expect(async () => {
    await shippingBillService.submitShippingBill(formValues)
  }).rejects.toThrow(/Simulated network error: Service rejected shipping bill submission/)

  // Reset flag
  shippingBillService.setSimulateSubmitFailure(false)
})
