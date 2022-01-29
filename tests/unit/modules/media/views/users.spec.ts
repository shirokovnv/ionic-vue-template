import api from '@/config/api';
import useUsers from '@/modules/media/logic/useUsers';
import Users from '@/modules/media/views/Users.vue';
import { mount } from '@vue/test-utils';
import { instance as axios } from '@/plugins/install/axios';
import flushPromises from 'flush-promises';

const mockUserList = {
  data: [
    { id: 1, name: 'User1', email: 'example1@mail.com' },
    { id: 2, name: 'User2', email: 'example2@mail.com' },
  ],
};

jest.mock('axios', () => ({
  get: jest.fn(() => mockUserList),
  defaults: { baseURL: '', headers: {} },
  interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
}));

describe('Users.vue', () => {
  it('renders component', async () => {
    const wrapper = mount(Users);

    // Ensure we started with default state
    const { users } = useUsers();
    expect(users.value).toHaveLength(0);

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      api.baseURL + 'users?_start=0&_limit=10',
    );

    // Wait until the DOM updates.
    await flushPromises();

    // Finally, we make sure we've rendered the content from the API.
    const userItems = wrapper.findAll('ion-item');

    expect(userItems).toHaveLength(mockUserList.data.length);
    userItems.forEach((user: any, index: number) => {
      expect(user.text()).toContain(mockUserList.data[index].name);
    });

    // Test state changes
    expect(users.value).toHaveLength(mockUserList.data.length);
    users.value.forEach((comment: any, index: number) => {
      expect(comment).toEqual(mockUserList.data[index]);
    });
  });
});
