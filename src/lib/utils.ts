import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Horizontally centers a child element inside its scroll container without
 * affecting document or ancestor vertical scroll positions.
 */
export function scrollChildCenterX(
  container: HTMLElement | null,
  child: HTMLElement | null
) {
  if (!container || !child || container.scrollWidth <= container.clientWidth) {
    return
  }

  const containerRect = container.getBoundingClientRect()
  const childRect = child.getBoundingClientRect()
  const targetLeft =
    container.scrollLeft +
    (childRect.left - containerRect.left) -
    containerRect.width / 2 +
    childRect.width / 2

  const clampedLeft = Math.max(
    0,
    Math.min(targetLeft, container.scrollWidth - container.clientWidth)
  )

  if (Math.abs(clampedLeft - container.scrollLeft) < 1) {
    return
  }

  container.scrollTo({
    left: clampedLeft,
    behavior: "smooth",
  })
}
