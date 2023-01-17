import { fireEvent, render } from "@testing-library/react";
import { authLogin } from "../../../store/actions";
import LoginForm from "./LoginForm";

jest.mock("../../../store/actions");

//snapshot
describe("loginForm", () => {
  //test acciones con test-library-react
  test("shoul dispatch authLogin action", () => {
    const onSubmit = jest.fn();
    const { getByTestId } = render(<LoginForm onSubmit={onSubmit} />);
    const credentials = {
      email: "user@user.com",
      password: "12345",
      remember: false,
    };

    fireEvent.submit(getByTestId("form"));
    expect(onSubmit).toHaveBeenCalled();
    expect(credentials).toEqual({
      email: "user@user.com",
      password: "12345",
      remember: false,
    });
  });
});
