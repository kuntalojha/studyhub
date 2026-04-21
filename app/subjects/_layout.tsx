import { Slot } from "expo-router";
import { router } from "expo-router";
import PageLayout from "../page_layout/PageLayout";

export default function SubjectsLayout() {
  return (
    <PageLayout onLogout={() => router.replace("/auth_screen/login")}>
      <Slot />
    </PageLayout>
  );
}