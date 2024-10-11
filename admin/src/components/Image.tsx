import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Icon } from "./Icon"

const imageVariants = cva(
  ""
)

const Image = React.forwardRef<
  React.ElementRef<'img'>,
  React.ComponentPropsWithoutRef<'img'> &
  VariantProps<typeof imageVariants>
>(({ className, onError, ...props }, ref) => {
  const [loadError, setLoadError] = useState(false);
  if (loadError) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Icon name="Image" />
      </div>
    )
  }
  return (
    <img
      ref={ref}
      onError={(e) => {
        onError?.(e)
        setLoadError(true)
      }}
      className={cn(imageVariants(), className)}
      {...props}
    />
  )
})
Image.displayName = 'Image'

export { Image }
