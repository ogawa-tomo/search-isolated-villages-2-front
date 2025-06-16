import { createContext, Dispatch, useContext, useReducer } from "react";
import VillageSearchParams, {
  defaultVillageSearchParams,
} from "@/types/VillageSearchParams";
import { VillageSearchModal } from "../_components/VillageSearchModal";

const VillageSearchParamsContext = createContext<VillageSearchParams>(
  defaultVillageSearchParams,
);
const VillageSearchParamsDispatchContext = createContext<
  Dispatch<VillageSearchParams>
>(() => {});

const ShowVillageSearchModalContext = createContext<boolean>(false);
const ShowVillageSearchModalDispatchContext = createContext<Dispatch<boolean>>(
  () => {},
);

const CurrentPageContext = createContext<number>(1);
const CurrentPageDispatchContext = createContext<Dispatch<number>>(() => {});

export const VillageSearchParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useReducer(
    villageSearchParamsReducer,
    defaultVillageSearchParams,
  );
  const [showModal, setShowModal] = useReducer(
    showVillageSearchModalReducer,
    true,
  );
  const [currentPage, setCurrentPage] = useReducer(currentPageReducer, 1);

  return (
    <VillageSearchParamsContext.Provider value={searchParams}>
      <VillageSearchParamsDispatchContext.Provider value={setSearchParams}>
        <ShowVillageSearchModalContext.Provider value={showModal}>
          <ShowVillageSearchModalDispatchContext.Provider value={setShowModal}>
            <CurrentPageContext.Provider value={currentPage}>
              <CurrentPageDispatchContext.Provider value={setCurrentPage}>
                <VillageSearchModal
                  searchParams={searchParams}
                  isOpen={showModal}
                  onSearch={(searchParams) => {
                    setSearchParams(searchParams);
                    setShowModal(false);
                    setCurrentPage(1);
                  }}
                  onClose={() => {
                    setShowModal(false);
                  }}
                />
                {children}
              </CurrentPageDispatchContext.Provider>
            </CurrentPageContext.Provider>
          </ShowVillageSearchModalDispatchContext.Provider>
        </ShowVillageSearchModalContext.Provider>
      </VillageSearchParamsDispatchContext.Provider>
    </VillageSearchParamsContext.Provider>
  );
};

export const useVillageSearchParams = (): [
  VillageSearchParams,
  Dispatch<VillageSearchParams>,
] => {
  return [
    useContext(VillageSearchParamsContext),
    useContext(VillageSearchParamsDispatchContext),
  ];
};

export const useShowVillageSearchModal = () => {
  return useContext(ShowVillageSearchModalContext);
};

export const useSetShowVillageSearchModal = () => {
  return useContext(ShowVillageSearchModalDispatchContext);
};

export const useCurrentPage = () => {
  return useContext(CurrentPageContext);
};

export const useSetCurrentPage = () => {
  return useContext(CurrentPageDispatchContext);
};

const villageSearchParamsReducer = (
  old: VillageSearchParams,
  saved: VillageSearchParams,
) => {
  return {
    ...old,
    ...saved,
  };
};

const showVillageSearchModalReducer = (old: boolean, saved: boolean) => {
  return saved;
};

const currentPageReducer = (old: number, saved: number) => {
  return saved;
};
