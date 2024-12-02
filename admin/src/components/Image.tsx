import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Icon } from "./icon"

const imageVariants = cva(
  "h-full w-full",
  {
    variants: {},
    defaultVariants: {},
  }
)

const Image = React.forwardRef<
  React.ElementRef<'img'>,
  React.ComponentPropsWithoutRef<'img'> &
  VariantProps<typeof imageVariants>
>(({ className, onError, ...props }, ref) => {
  const [loadError, setLoadError] = useState(false);
  return (
    <>
      <img
        ref={ref}
        onError={(e) => {
          onError?.(e)
          setLoadError(true)
        }}
        className={cn(imageVariants(), className, {
          "hidden": loadError
        })}
        {...props}
      />
      <div className={cn("h-full w-full flex flex-col justify-center items-center", { "hidden": !loadError })}>
        <Icon name="Image" />
      </div>
    </>
  )
})
Image.displayName = 'Image'

export { Image }
