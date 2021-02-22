import {
  mount
} from '@vue/test-utils';
import Users from '@/modules/media/views/Users.vue';
import useUsers from '@/modules/media/logic/useUsers';
import axios from 'axios';
import api from '@/config/api';
import flushPromises from 'flush-promises';
import { BackendResult, QueryResult } from 'laravel-query-api-frontend';

const mockUserData: BackendResult = {
  data: {
    users: {
      content: {
        data: [
          { id: 1, name: 'User1' },
          { id: 2, name: 'User2' },
          { id: 3, name: 'User3' },
        ]
      }        
    }
  },
  errors: {},
  warnings: {},
  trace: {}
};

const mockQueryUsersResult = new QueryResult();
mockQueryUsersResult.setResult(mockUserData);

jest.mock('axios', () => ({
  post: jest.fn(() => { 
    return new Promise((resolve, reject) => { 
      resolve({ data: mockUserData });
    })
  }),
  defaults: { baseURL: '', headers: {} },
  interceptors: { request: { use: jest.fn() } }
}));

describe('Users.vue', () => {
  it('renders component', async () => {
    const wrapper = mount(Users);
    
    // Ensure we started with default state
    const { users, fetchUsersQuery } = useUsers();
    expect(users.value).toHaveLength(0);

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.
    const backendUsersQueryData = {
      query_data: [
        fetchUsersQuery.render()
      ],
      query_mode: 'transaction'
    };

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${api.localURL}/api/queries`, 
      backendUsersQueryData
    );
    
    // Wait until the DOM updates.
    await flushPromises();

    // Finally, we make sure we've rendered the content from the API.
    const userItems = wrapper.findAll('ion-item');
    const userData = mockQueryUsersResult.getContent('users').data;

    expect(userItems).toHaveLength(userData.length);
    userData.forEach((user: any, index: number) => {
      expect(userItems[index].text()).toContain(user.name);
    });

    // Test state changes
    expect(users.value).toHaveLength(userData.length);
    users.value.forEach((user: any, index: number) => {
      expect(user).toEqual(userData[index]);
    });

  });

});