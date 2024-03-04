import VillageFortuneModal from "@/components/VillageFortuneModal";

export default function Page() {
  return (
    <>
      <h1 className="text-center">秘境集落占い</h1>
      <p className="text-center">
        今日のラッキー秘境集落を占います。
      </p>

      <VillageFortuneModal />
    </>
  );
}