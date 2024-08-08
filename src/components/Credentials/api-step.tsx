import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react"

interface APIStepProps {
  aws_access_key_id: string
  aws_secret_access_key: string
  aws_session_token: string
  aws_region: string
}

export const APIStep: FC<APIStepProps> = ({
  aws_access_key_id,
  aws_secret_access_key,
  aws_session_token,
  aws_region
}) => {
  return (
    <>
      <div className="space-y-1">
        <Label>AWS Access Key ID</Label>
        <Input
          placeholder="AWS Access Key ID"
          type="text"
          value={aws_access_key_id}
          readOnly
        />
      </div>

      <div className="space-y-1">
        <Label>AWS Secret Access Key</Label>
        <Input
          placeholder="AWS Secret Access Key"
          type="password"
          value={aws_secret_access_key}
          readOnly
        />
      </div>

      <div className="space-y-1">
        <Label>AWS Session Token</Label>
        <Input
          placeholder="AWS Session Token"
          type="text"
          value={aws_session_token}
          readOnly
        />
      </div>

      <div className="space-y-1">
        <Label>AWS Region</Label>
        <Input
          placeholder="AWS Region"
          type="text"
          value={aws_region}
          readOnly
        />
      </div>
    </>
  )
}
