import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Pagination from "@/components/Pagination";

const user = userEvent.setup();

describe("Pagination", () => {
  it("1ページ目を表示", async () => {
    render(
      <Pagination
        currentPage={1}
        pages={100}
        path={"/result"}
        queryParams={{ hoge: "hoge", fuga: "fuga" }}
      />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=2",
    );
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("100")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
    );
  });

  it("2ページ目を表示", async () => {
    render(
      <Pagination
        currentPage={2}
        pages={100}
        path={"/result"}
        queryParams={{ hoge: "hoge", fuga: "fuga" }}
      />,
    );

    expect(screen.getByText("1")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=3",
    );
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("100")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
    );
  });

  it("5ページ目を表示", async () => {
    render(
      <Pagination
        currentPage={5}
        pages={100}
        path={"/result"}
        queryParams={{ hoge: "hoge", fuga: "fuga" }}
      />,
    );
    expect(screen.getByText("1")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
    );
    expect(screen.getAllByText("...")).toHaveLength(2);
    expect(screen.getByText("4")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=4",
    );
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=6",
    );
    expect(screen.getByText("100")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
    );
  });

  it("99ページ目を表示", async () => {
    render(
      <Pagination
        currentPage={99}
        pages={100}
        path={"/result"}
        queryParams={{ hoge: "hoge", fuga: "fuga" }}
      />,
    );
    expect(screen.getByText("1")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
    );
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("98")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=98",
    );
    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getByText("100")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=100",
    );
  });

  it("100ページ目を表示", async () => {
    render(
      <Pagination
        currentPage={100}
        pages={100}
        path={"/result"}
        queryParams={{ hoge: "hoge", fuga: "fuga" }}
      />,
    );
    expect(screen.getByText("1")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=1",
    );
    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByText("99")).toHaveProperty(
      "href",
      "http://localhost/result?hoge=hoge&fuga=fuga&page=99",
    );
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
