let lockCount = 0
let previousBodyOverflow = ''

export function lockLoadingScroll() {
  if (typeof document === 'undefined') return
  if (lockCount === 0) previousBodyOverflow = document.body.style.overflow
  lockCount += 1
  document.body.style.overflow = 'hidden'
}

export function unlockLoadingScroll() {
  if (typeof document === 'undefined' || lockCount === 0) return
  lockCount -= 1
  if (lockCount === 0) document.body.style.overflow = previousBodyOverflow
}
