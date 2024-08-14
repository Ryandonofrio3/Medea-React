import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { FC, useRef } from "react"


interface StepContainerProps {
  stepDescription: string
  stepTitle: string
  onShouldProceed: () => void
  children?: React.ReactNode
  showBackButton?: boolean
}

export const StepContainer: FC<StepContainerProps> = ({
  stepDescription,
  stepTitle,
  onShouldProceed,
  children,
  showBackButton = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (buttonRef.current) {
        buttonRef.current.click()
      }
    }
  }

  return (
    <Card
      className="max-h-[calc(100vh-60px)] w-[600px] overflow-auto"
      onKeyDown={handleKeyDown}
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{stepTitle}</div>


        </CardTitle>

        <CardDescription>{stepDescription}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>

      <CardFooter className="flex justify-between">
        <div>
          {showBackButton && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onShouldProceed()}
            >
              Back
            </Button>
          )}
        </div>

        <div>
            <Button
              ref={buttonRef}
              size="sm"
              onClick={onShouldProceed}
            >
              Next
            </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
