import { useState } from 'react'
import { shippingBillService } from '../shipping-bill-service'

interface ServiceTestBarProps {
  onTriggerReload?: () => void
}

export function ServiceTestBar({ onTriggerReload }: ServiceTestBarProps) {
  const [failFetch, setFailFetch] = useState(() => shippingBillService.getSimulateFetchFailure())
  const [failSubmit, setFailSubmit] = useState(() => shippingBillService.getSimulateSubmitFailure())
  const [isOpen, setIsOpen] = useState(false)

  const toggleFailFetch = () => {
    const next = !failFetch
    setFailFetch(next)
    shippingBillService.setSimulateFetchFailure(next)
    if (onTriggerReload) {
      onTriggerReload()
    }
  }

  const toggleFailSubmit = () => {
    const next = !failSubmit
    setFailSubmit(next)
    shippingBillService.setSimulateSubmitFailure(next)
  }

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50/70 p-2.5 text-xs text-amber-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold uppercase tracking-wider text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">
            Dev Test Harness
          </span>
          <span className="text-amber-800">
            Simulate asynchronous service behaviors (configurable latency & error tests)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="font-medium underline hover:text-amber-950"
        >
          {isOpen ? 'Hide Controls' : 'Show Controls'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={failFetch}
              onChange={toggleFailFetch}
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <span>Simulate Fetch Failure (test initial load retry)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={failSubmit}
              onChange={toggleFailSubmit}
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <span>Simulate Submit Failure (test submission retry & state preservation)</span>
          </label>
        </div>
      )}
    </div>
  )
}
