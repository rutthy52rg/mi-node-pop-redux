import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { authLogin } from "../../../store/actions";
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
  //test acciones con test-library-react
  test("shoul dispatch authLogin action", () => {
    const credentials = {
      email: "user@user.com",
      password: "12345",
      remember: false,
    };
    renderComponent();
    expect(authLogin).toBeTruthy();
  });
});
