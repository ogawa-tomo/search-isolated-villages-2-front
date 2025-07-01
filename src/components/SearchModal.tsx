import { useEffect, useRef } from "react";

export const SearchModal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box pb-20">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button className="bg-white/50" onClick={onClose}>
            close
          </button>
        </form>
      </dialog>
    </>
  );
};
