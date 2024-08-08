"use client"

import React from "react"
import { Button, ButtonProps } from "./button"

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {

    return <Button ref={ref} {...props} />
  }
)

SubmitButton.displayName = "SubmitButton"

export { SubmitButton }
