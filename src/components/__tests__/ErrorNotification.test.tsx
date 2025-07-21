import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorNotification } from "../ErrorNotification";

describe("ErrorNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("メッセージが表示される", () => {
    render(
      <ErrorNotification
        visible={true}
        message="テストエラーメッセージ"
        onClose={jest.fn()}
      />,
    );
    expect(screen.getByText("テストエラーメッセージ")).toBeInTheDocument();
  });

  it("閉じるボタンをクリックするとonCloseが呼ばれる", () => {
    const onClose = jest.fn();
    render(
      <ErrorNotification
        visible={true}
        message="テストエラーメッセージ"
        onClose={onClose}
      />,
    );

    const closeButton = screen.getByRole("button", { name: "閉じる" });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("visibleがfalseの場合は表示されない", () => {
    render(
      <ErrorNotification
        visible={false}
        message="テストエラーメッセージ"
        onClose={jest.fn()}
      />,
    );
    expect(
      screen.queryByText("テストエラーメッセージ"),
    ).not.toBeInTheDocument();
  });
});
