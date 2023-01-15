import { authLoginSuccess, authLogout } from "../actions";
import { auth, stateDefault } from "../reducer";

describe("auth", () => {
  test('should manage  "AUTH_LOGIN_SUCCESS" action', () => {
    const state = stateDefault.auth;
    const action = authLoginSuccess();
    const result = auth(state, action);
    expect(result).toBe(true);
  });
  test('should manage  "AUTH_LOGOUT" action', () => {
    const state = stateDefault.auth;
    const action = authLogout();
    const result = auth(state, action);
    expect(result).toBe(false);
  });
  test("should manage any action", () => {
    //const state = stateDefault.auth;
    const state = undefined;
    const action = { type: "noactioncase" };
    const result = auth(state, action);
    // expect(result).toBe(state);
    expect(result).toBe(stateDefault.auth);
  });
}); 
