import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { stateDefault } from "../../../store/reducer";
import { AdvertsPage } from "./AdvertsPage";

jest.mock("../../../store/actions");
describe("AdvertsPage", () => {
  const defaultProps = {
    onAdvertsLoaded: jest.fn(),
    adverts: [],
  };
  const store = {
    getState: () => stateDefault,
    dispatch: () => {},
    subscribe: () => {},
  };

  const renderComponent = (props) =>
    render(
      <Provider store={store}>
        <Router>
          <AdvertsPage {...defaultProps} {...props} />
        </Router>
      </Provider>
    );

  test("snapshot without adverts", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("snapshot with adverts", () => {
    const adverts = [
      {
        id: "89621cd7-91f5-457b-b9d8-e358dff3657f",
        createdAt: "2023-01-15T23:00:15.000Z",
        name: "asdfdasf",
        sale: true,
        price: 0,
        tags: ["mobile"],
        photo: null,
      },
    ];
    const { container } = renderComponent({ adverts });
    expect(container).toMatchSnapshot();
  });

  test("should call onAdvertsLoaded", () => {
    renderComponent();
    expect(defaultProps.onAdvertsLoaded).toHaveBeenCalled();
  });
});
