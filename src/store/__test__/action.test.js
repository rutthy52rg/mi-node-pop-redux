import {
  advertsLoadedSuccess,
  authLogin,
  authLoginFailure,
  authLoginRequest,
  authLoginSuccess,
} from "../actions";
import { ADVERTS_LOADED_SUCCESS } from "../type";

//sincrono
describe("advertsLoadedSuccess", () => {
  test('should return a "ADVERTS_LOADED_SUCCESS" action', () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    const action = advertsLoadedSuccess(adverts);
    expect(action).toEqual(expectedAction);
  });
});

//thunks y asíncronos
describe("authLogin", () => {
  const credentials = "credentials";
  const redirectionUrl = "redirectionUrl";
  const action = authLogin(credentials);
  //simulación funcion (fx moc) con jest.fn
  const dispatch = jest.fn(); //solo saber si es llamado
  //objeto api
  const api = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from: { pathname: redirectionUrl } } } },
  }; //moc fx

  describe("when login api resolves", () => {
    test("should follow the login flow", async () => {
      api.auth.login = jest.fn().mockResolvedValue();
      await action(dispatch, undefined, { api, router });
      expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
      expect(api.auth.login).toHaveBeenCalledWith(credentials);
      expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
      expect(router.navigate).toHaveBeenCalledWith(redirectionUrl, {
        replace: true,
      });
    });
    describe("when login api rejects", () => {
      const error = "error";
      test("should follow the error flow", async () => {
        api.auth.login = jest.fn().mockRejectedValue(error);
        await action(dispatch, undefined, { api });
        expect(dispatch).toHaveBeenCalledWith(authLoginFailure(error));
      });
    });
  });
});
