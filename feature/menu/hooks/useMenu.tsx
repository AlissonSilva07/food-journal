import { useMealStore } from "@/core/store/meals.store";
import { useUserStore } from "@/core/store/user.store";
import { useState } from "react";

function useMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleEraseData(redirect: () => void) {
    setIsLoading(true);
    try {
      await useMealStore.getState().deleteAllMeals();
      const user = useUserStore.getState().user;
      if (user) await useUserStore.getState().deleteUser(user?.id);
      redirect();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    dialog: {
      value: isDialogOpen,
      setValue: setIsDialogOpen,
    },
    handleEraseData,
  };
}

export { useMenu };
