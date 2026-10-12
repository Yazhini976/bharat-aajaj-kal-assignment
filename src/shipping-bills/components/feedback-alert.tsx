import { Button } from 'ui/basic/button'

interface FeedbackAlertProps {
  type: 'success' | 'error'
  title: string
  message: string
  referenceNumber?: string
  onRetry?: () => void
  onDismiss?: () => void
}

export function FeedbackAlert({
  type,
  title,
  message,
  referenceNumber,
  onRetry,
  onDismiss
}: FeedbackAlertProps) {
  if (type === 'success') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-emerald-950 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-emerald-200 text-xs text-emerald-800">
                ✓
              </span>
              {title}
            </h3>
            <p className="mt-1 text-sm text-emerald-800">{message}</p>
            {referenceNumber && (
              <div className="mt-2 inline-flex items-center gap-2 rounded bg-emerald-100/70 px-2.5 py-1 text-xs font-mono font-medium text-emerald-950">
                <span>Mock Reference:</span>
                <span className="font-bold underline">{referenceNumber}</span>
                <span className="text-[10px] text-emerald-700 italic">(Simulated mock filing)</span>
              </div>
            )}
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-xs text-emerald-700 hover:text-emerald-950 underline ml-4"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-red-950 flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-red-200 text-xs text-red-800">
              !
            </span>
            {title}
          </h3>
          <p className="mt-1 text-sm text-red-800">{message}</p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {onRetry && (
            <Button
              type="button"
              variant="outline"
              className="border-red-300 bg-white text-xs text-red-900 hover:bg-red-100"
              onClick={onRetry}
            >
              Retry Action
            </Button>
          )}
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-xs text-red-700 hover:text-red-950 underline"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
