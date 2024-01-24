import { ComputerIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'

interface AlertErrorProps {
  name: string
  message: string
}

function NetworkError({ message, name }: AlertErrorProps) {
  return (
    <Alert
      variant={'destructive'}
      className="flex justify-between items-center"
    >
      <div>
        <div className="flex gap-2">
          <ComputerIcon className="h-4 w-4" />
          <AlertTitle>{name}</AlertTitle>
        </div>
        <AlertDescription>{message}</AlertDescription>
      </div>
      <Button variant={'destructive'} onClick={() => location.reload()}>
        Reconsultar
      </Button>
    </Alert>
  )
}

export default NetworkError
