import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "@/components/Pagination";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

const mockFn = jest.fn();

describe("Pagination", () => {
  it("1ページ目を表示", async () => {
    render(<Pagination currentPage={1} pages={100} onPageChange={mockFn} />);
    expect(screen.getByText("1/100")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("次のページへ");
    const lastPageButton = screen.getByLabelText("最後のページへ");
    const firstPageButton = screen.getByLabelText("最初のページへ");
    const previousPageButton = screen.getByLabelText("前のページへ");

    expect(firstPageButton).toBeDisabled();
    expect(previousPageButton).toBeDisabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();

    await user.click(nextPageButton);
    expect(mockFn).toHaveBeenCalledWith(2);

    await user.click(lastPageButton);
    expect(mockFn).toHaveBeenCalledWith(100);
  });

  it("2ページ目を表示", async () => {
    render(<Pagination currentPage={2} pages={100} onPageChange={mockFn} />);
    expect(screen.getByText("2/100")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("次のページへ");
    const lastPageButton = screen.getByLabelText("最後のページへ");
    const firstPageButton = screen.getByLabelText("最初のページへ");
    const previousPageButton = screen.getByLabelText("前のページへ");

    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();

    await user.click(previousPageButton);
    expect(mockFn).toHaveBeenCalledWith(1);

    await user.click(nextPageButton);
    expect(mockFn).toHaveBeenCalledWith(3);

    await user.click(lastPageButton);
    expect(mockFn).toHaveBeenCalledWith(100);

    await user.click(firstPageButton);
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it("3ページ目を表示", async () => {
    render(<Pagination currentPage={3} pages={100} onPageChange={mockFn} />);
    expect(screen.getByText("3/100")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("次のページへ");
    const lastPageButton = screen.getByLabelText("最後のページへ");
    const firstPageButton = screen.getByLabelText("最初のページへ");
    const previousPageButton = screen.getByLabelText("前のページへ");

    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();

    await user.click(previousPageButton);
    expect(mockFn).toHaveBeenCalledWith(2);

    await user.click(nextPageButton);
    expect(mockFn).toHaveBeenCalledWith(4);

    await user.click(lastPageButton);
    expect(mockFn).toHaveBeenCalledWith(100);

    await user.click(firstPageButton);
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it("99ページ目を表示", async () => {
    render(<Pagination currentPage={99} pages={100} onPageChange={mockFn} />);
    expect(screen.getByText("99/100")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("次のページへ");
    const lastPageButton = screen.getByLabelText("最後のページへ");
    const firstPageButton = screen.getByLabelText("最初のページへ");
    const previousPageButton = screen.getByLabelText("前のページへ");

    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeEnabled();
    expect(lastPageButton).toBeEnabled();

    await user.click(previousPageButton);
    expect(mockFn).toHaveBeenCalledWith(98);

    await user.click(nextPageButton);
    expect(mockFn).toHaveBeenCalledWith(100);

    await user.click(lastPageButton);
    expect(mockFn).toHaveBeenCalledWith(100);

    await user.click(firstPageButton);
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it("100ページ目を表示", async () => {
    render(<Pagination currentPage={100} pages={100} onPageChange={mockFn} />);

    expect(screen.getByText("100/100")).toBeInTheDocument();

    const nextPageButton = screen.getByLabelText("次のページへ");
    const lastPageButton = screen.getByLabelText("最後のページへ");
    const firstPageButton = screen.getByLabelText("最初のページへ");
    const previousPageButton = screen.getByLabelText("前のページへ");

    expect(firstPageButton).toBeEnabled();
    expect(previousPageButton).toBeEnabled();
    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();

    await user.click(previousPageButton);
    expect(mockFn).toHaveBeenCalledWith(99);

    await user.click(firstPageButton);
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  // it("5ページ目を表示", async () => {
  //   render(
  //     <Pagination
  //       currentPage={5}
  //       pages={100}
  //       path={"/result"}
  //       queryParams={{ hoge: "hoge", fuga: "fuga" }}
  //     />,
  //   );
  //   expect(screen.getByText("1")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
  //   );
  //   expect(screen.getAllByText("...")).toHaveLength(2);
  //   expect(screen.getByText("4")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=4",
  //   );
  //   expect(screen.getByText("5")).toBeInTheDocument();
  //   expect(screen.getByText("6")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=6",
  //   );
  //   expect(screen.getByText("100")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
  //   );
  // });

  // it("99ページ目を表示", async () => {
  //   render(
  //     <Pagination
  //       currentPage={99}
  //       pages={100}
  //       path={"/result"}
  //       queryParams={{ hoge: "hoge", fuga: "fuga" }}
  //     />,
  //   );
  //   expect(screen.getByText("1")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
  //   );
  //   expect(screen.getByText("...")).toBeInTheDocument();
  //   expect(screen.getByText("98")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=98",
  //   );
  //   expect(screen.getByText("99")).toBeInTheDocument();
  //   expect(screen.getByText("100")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
  //   );
  // });

  // it("100ページ目を表示", async () => {
  //   render(
  //     <Pagination
  //       currentPage={100}
  //       pages={100}
  //       path={"/result"}
  //       queryParams={{ hoge: "hoge", fuga: "fuga" }}
  //     />,
  //   );
  //   expect(screen.getByText("1")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
  //   );
  //   expect(screen.getByText("...")).toBeInTheDocument();
  //   expect(screen.getByText("99")).toHaveProperty(
  //     "href",
  //     "http://localhost/result?hoge=hoge&fuga=fuga&page=99",
  //   );
  //   expect(screen.getByText("100")).toBeInTheDocument();
  // });
});
