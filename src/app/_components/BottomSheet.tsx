import { Sheet } from "react-modal-sheet";

const snapPoints = [0.9, 0.5, 0.1];

export const BottomSheet = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => {}}
      snapPoints={snapPoints}
      initialSnap={1}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content style={{ paddingBottom: 0 }}>
          <Sheet.Scroller>{children}</Sheet.Scroller>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
