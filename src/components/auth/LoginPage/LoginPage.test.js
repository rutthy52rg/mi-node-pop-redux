import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { stateDefault } from "../../../store/reducer";
import LoginPage from "./LoginPage";

jest.mock("../../../store/actions");

//snapshot
describe("loginPage", () => {
  const store = {
    getState: () => stateDefault,
    dispatch: () => {},
    subscribe: () => {},
  };
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
