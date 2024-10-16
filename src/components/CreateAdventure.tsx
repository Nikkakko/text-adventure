"use client";
import * as React from "react";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import { useRouter } from "next/navigation";

interface CreateAdventureProps {}

const CreateAdventure: React.FC<CreateAdventureProps> = ({}) => {
  const [isPending, startTransition] = React.useTransition();
  const createAdventure = useMutation(api.adventures.createAdventure);
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      type="button"
      onClick={() => {
        startTransition(async () => {
          const adventureId = await createAdventure({
            character: "warrior",
          });
          router.push(`/adventures/${adventureId}`);
        });
      }}
      disabled={isPending}
    >
      Create an Adventure
    </Button>
  );
};

export default CreateAdventure;
