import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface ProfileStepProps {
  username: string;
}

export const ProfileStep: FC<ProfileStepProps> = ({ username }) => {
  return (
    <div className="space-y-1">
      <Label htmlFor="username">Username (UUID)</Label>
      <Input
        id="username"
        value={username}
        className="mb-4"
        readOnly
      />
    </div>
  );
};

