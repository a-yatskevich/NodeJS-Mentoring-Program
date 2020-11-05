import createError from 'http-errors';
import UserController from '../../src/controllers/user.controller';
import { getInternalError } from '../../src/helpers';

jest.mock('http-errors', () => jest.fn());
jest.mock('../../src/helpers', () => ({
    getInternalError: jest.fn()
}));

describe('UserController', () => {
    let UserCtrl;
    const serviceResponse = { user: {} };
    const serviceEmptyResponse = null;
    const nextMock = jest.fn();
    const resMock = { json: jest.fn() };
    const reqMock = {
        body: {},
        params: { id: 1 },
        query: { login: 'value', limit: 2 }
    };
    const UserServiceMock = {
        addUser: jest.fn(),
        getUserById: jest.fn(),
        updateUser: jest.fn(),
        removeUser: jest.fn(),
        getUsers: jest.fn()
    };

    beforeEach(() => {
        UserCtrl = new UserController(UserServiceMock);
    });

    afterEach(() => {
        resMock.json.mockReset();
        nextMock.mockReset();
        createError.mockReset();
        getInternalError.mockReset();
        Object.keys(UserServiceMock).forEach((method) => UserServiceMock[method].mockReset());
    });

    describe('addUser', () => {
        it('should send user if service response contains data', async () => {
            UserServiceMock.addUser.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await UserCtrl.addUser(reqMock, resMock, nextMock);
            expect(UserServiceMock.addUser).toHaveBeenCalledWith(reqMock.body);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserServiceMock.addUser.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await UserCtrl.addUser(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserServiceMock.addUser.mockImplementationOnce(() => Promise.reject({}));
            await UserCtrl.addUser(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        it('should send user if user exists in database', async () => {
            UserServiceMock.getUserById.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await UserCtrl.getUserById(reqMock, resMock, nextMock);
            expect(UserServiceMock.getUserById).toHaveBeenCalledWith(reqMock.params.id);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserServiceMock.updateUser.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await UserCtrl.updateUser(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserServiceMock.getUserById.mockImplementationOnce(() => Promise.reject({}));
            await UserCtrl.getUserById(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('updateUser', () => {
        it('should send user if user was updated and received from service', async () => {
            UserServiceMock.updateUser.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await UserCtrl.updateUser(reqMock, resMock, nextMock);
            expect(UserServiceMock.updateUser).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserServiceMock.updateUser.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await UserCtrl.updateUser(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserServiceMock.updateUser.mockImplementationOnce(() => Promise.reject({}));
            await UserCtrl.updateUser(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('removeUser', () => {
        it('should send user if user was deleted and received from service', async () => {
            UserServiceMock.removeUser.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await UserCtrl.removeUser(reqMock, resMock, nextMock);
            expect(UserServiceMock.removeUser).toHaveBeenCalledWith(reqMock.params.id);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserServiceMock.removeUser.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await UserCtrl.removeUser(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserServiceMock.removeUser.mockImplementationOnce(() => Promise.reject({}));
            await UserCtrl.removeUser(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('getUsers', () => {
        it('should send users if it was received from service', async () => {
            UserServiceMock.getUsers.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await UserCtrl.getUsers(reqMock, resMock, nextMock);
            expect(UserServiceMock.getUsers).toHaveBeenCalledWith(reqMock.query.login, reqMock.query.limit);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserServiceMock.getUsers.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await UserCtrl.getUsers(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserServiceMock.getUsers.mockImplementationOnce(() => Promise.reject({}));
            await UserCtrl.getUsers(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });
});
