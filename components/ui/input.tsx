import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-12 w-full min-w-0 rounded-md border border-[var(--color-primary-dark)] bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md",
        "focus-visible:border-ring focus-visible:ring-[var(--color-primary-dark)] focus-visible:ring-[2px]",
        "aria-invalid:ring-rose-500/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-rose-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
