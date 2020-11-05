import createError from 'http-errors';
import GroupController from '../../src/controllers/group.controller';
import { getInternalError } from '../../src/helpers';

jest.mock('http-errors', () => jest.fn());
jest.mock('../../src/helpers', () => ({
    getInternalError: jest.fn()
}));

describe('GroupController', () => {
    let GroupCtrl;
    const serviceResponse = { group: {} };
    const serviceEmptyResponse = null;
    const nextMock = jest.fn();
    const resMock = { json: jest.fn(), send: jest.fn() };
    const reqMock = {
        body: {},
        params: { id: 1 },
        query: { id: 2 }
    };
    const GroupServiceMock = {
        addNewGroup: jest.fn(),
        getAllGroups: jest.fn(),
        getGroup: jest.fn(),
        removeGroup: jest.fn(),
        updateGroup: jest.fn()
    };
    const UserGroupServiceMock = {
        addUsersToGroup: jest.fn()
    };

    beforeEach(() => {
        GroupCtrl = new GroupController(GroupServiceMock, UserGroupServiceMock);
    });

    afterEach(() => {
        resMock.json.mockReset();
        resMock.send.mockReset();
        nextMock.mockReset();
        createError.mockReset();
        getInternalError.mockReset();
        Object.keys(GroupServiceMock).forEach((method) => GroupServiceMock[method].mockReset());
        Object.keys(UserGroupServiceMock).forEach((method) => UserGroupServiceMock[method].mockReset());
    });

    describe('addNewGroup', () => {
        it('should send created group', async () => {
            GroupServiceMock.addNewGroup.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.addNewGroup(reqMock, resMock, nextMock);
            expect(GroupServiceMock.addNewGroup).toHaveBeenCalledWith(reqMock.body);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            GroupServiceMock.addNewGroup.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.addNewGroup(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('getAllGroups', () => {
        it('should send groups from service', async () => {
            GroupServiceMock.getAllGroups.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.getAllGroups(reqMock, resMock, nextMock);
            expect(GroupServiceMock.getAllGroups).toHaveBeenCalledWith();
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            GroupServiceMock.getAllGroups.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.getAllGroups(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('getGroup', () => {
        it('should send group if it was received from service', async () => {
            GroupServiceMock.getGroup.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.getGroup(reqMock, resMock, nextMock);
            expect(GroupServiceMock.getGroup).toHaveBeenCalledWith(reqMock.params.id);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            GroupServiceMock.getGroup.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await GroupCtrl.getGroup(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            GroupServiceMock.getGroup.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.getGroup(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('removeGroup', () => {
        it('should send group if it was deleted and received from service', async () => {
            GroupServiceMock.removeGroup.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.removeGroup(reqMock, resMock, nextMock);
            expect(GroupServiceMock.removeGroup).toHaveBeenCalledWith(reqMock.params.id);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            GroupServiceMock.removeGroup.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await GroupCtrl.removeGroup(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            GroupServiceMock.removeGroup.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.removeGroup(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('updateGroup', () => {
        it('should send group if it was updated and received from service', async () => {
            GroupServiceMock.updateGroup.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.updateGroup(reqMock, resMock, nextMock);
            expect(GroupServiceMock.updateGroup).toHaveBeenCalledWith(reqMock.params.id, reqMock.body);
            expect(resMock.json).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            GroupServiceMock.updateGroup.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await GroupCtrl.updateGroup(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            GroupServiceMock.updateGroup.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.updateGroup(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });

    describe('addUsersToGroup', () => {
        it('should send added users if user was added to group', async () => {
            UserGroupServiceMock.addUsersToGroup.mockImplementationOnce(() => Promise.resolve(serviceResponse));
            await GroupCtrl.addUsersToGroup(reqMock, resMock, nextMock);
            expect(UserGroupServiceMock.addUsersToGroup).toHaveBeenCalledWith(reqMock.params.id, reqMock.query.id);
            expect(resMock.send).toHaveBeenCalledWith(serviceResponse);
        });

        it('should call next with error if service response is empty', async () => {
            UserGroupServiceMock.addUsersToGroup.mockImplementationOnce(() => Promise.resolve(serviceEmptyResponse));
            await GroupCtrl.addUsersToGroup(reqMock, resMock, nextMock);
            expect(createError).toHaveBeenCalledWith(404, expect.any(String));
            expect(nextMock).toHaveBeenCalled();
        });

        it('should catch error and call next with internal error in case of any error', async () => {
            UserGroupServiceMock.addUsersToGroup.mockImplementationOnce(() => Promise.reject({}));
            await GroupCtrl.addUsersToGroup(reqMock, resMock, nextMock);
            expect(getInternalError).toHaveBeenCalled();
            expect(nextMock).toHaveBeenCalled();
        });
    });
});
