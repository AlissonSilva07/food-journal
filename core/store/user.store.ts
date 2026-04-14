import { db } from "@/core/db/client";
import { User, user as userTable } from "@/core/db/schema";
import { eq } from "drizzle-orm";
import { File, Paths } from "expo-file-system/next";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  isLoading: boolean;
  hasOnboarded: boolean;
  fetchUser: () => Promise<void>;
  setUser: (
    user: Omit<User, "id" | "createdAt">,
  ) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (id: number) => Promise<{ success: boolean; error?: string }>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoading: false,

  hasOnboarded: false,

  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const result = await db.query.user.findFirst();

      if (result) {
        set({
          user: result,
          hasOnboarded: true,
        });
      } else {
        set({
          user: null,
          hasOnboarded: false,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: async (userData) => {
    set({ isLoading: true });
    try {
      const currentUser = get().user;
      let finalImageUri: string | null = null;

      if (userData.avatar) {
        const extension = userData.avatar.split(".").pop() || "jpg";
        const fileName = `user_${Date.now()}.${extension}`;
        const sourceFile = new File(userData.avatar);
        const destinationFile = new File(Paths.document, fileName);
        await sourceFile.copy(destinationFile);
        finalImageUri = fileName;

        if (currentUser?.avatar) {
          const oldFile = new File(Paths.document, currentUser.avatar);
          if (oldFile.exists) oldFile.delete();
        }
      }

      await db.transaction(async (tx) => {
        await tx.delete(userTable);
        await tx.insert(userTable).values({
          name: userData.name,
          avatar: finalImageUri,
        });
      });

      const savedUser = await db.query.user.findFirst();
      set({ user: savedUser ?? null, hasOnboarded: !!savedUser });
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error updating profile." };
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (id: number) => {
    try {
      const userToDelete = get().user;
      await db.delete(userTable).where(eq(userTable.id, id));
      if (userToDelete?.avatar) {
        const file = new File(Paths.document, userToDelete.avatar);
        if (file.exists) {
          file.delete();
        }
      }
      set({
        user: null,
      });
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return { success: false, error: "Falha ao deletar usuário." };
    }
  },
}));
