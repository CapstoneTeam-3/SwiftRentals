import StoreProvider from "@/redux/StoreProvider";
import { RenderOptions, render } from "@testing-library/react";
import { ReactElement } from "react";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: StoreProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };

