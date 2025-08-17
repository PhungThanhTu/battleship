import MockAdapter from "axios-mock-adapter";
import { getProfile } from "./auth.api";
import publicApi from "./instances/public.axios";


describe("auth api", () => {
    it("should get profile on right token", async () => {

        const publicApiGetSpy = jest.spyOn(publicApi, "get");
        const data = {
            username: "bilibili"
        }
        publicApiGetSpy.mockImplementation(async () => {
            return Promise.resolve({
                status: 200,
                data 
            });
        });

        const response = await getProfile("test_token");
        publicApiGetSpy.mockRestore();
        expect(response).toBe(data);
    });

    it("should get profile on right token", async () => {

        const mockAdapter = new MockAdapter(publicApi);
        mockAdapter.onGet("/auth/profile").reply(401);

        expect(async () => {
            await getProfile("test_token");
        }).rejects.toThrow("Request failed with status code 401")

    });
})