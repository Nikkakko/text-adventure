"use client";
import * as React from "react";
import { Button } from "./ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import { useRouter } from "next/navigation";

interface CreateAdventureProps {}

const CreateAdventure: React.FC<CreateAdventureProps> = ({}) => {
  const [isPending, startTransition] = React.useTransition();
  const createAdventure = useMutation(api.adventure.createAdventure);
  const router = useRouter();
  return (
    <Button
      variant="secondary"
      type="button"
      onClick={() => {
        startTransition(async () => {
          await createAdventure({
            characterClass: "warrior",
          });
          router.push("/adventure");
        });
      }}
      disabled={isPending}
    >
      Create an Adventure
    </Button>
  );
};

export default CreateAdventure;
