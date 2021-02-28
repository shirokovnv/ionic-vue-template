import api from '@/config/api';
import useComments from '@/modules/media/logic/useComments';
import Comments from '@/modules/media/views/Comments.vue';
import { instance as axios } from '@/plugins/install/axios';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

const mockCommentList = {
  data: [
    { id: 1, name: 'Comment1' },
    { id: 2, name: 'Comment2' },
  ],
};

jest.mock('axios', () => ({
  get: jest.fn(() => mockCommentList),
  defaults: { baseURL: '', headers: {} },
  interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
}));

describe('Comments.vue', () => {
  it('renders component and fetch comments', async () => {
    const wrapper = mount(Comments);

    // Ensure we started with default state
    const { comments } = useComments();
    expect(comments.value).toHaveLength(0);

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      api.baseURL + 'comments?_start=0&_limit=5',
    );

    // Wait until the DOM updates.
    await flushPromises();

    // Finally, we make sure we've rendered the content from the API.
    const commentItems = wrapper.findAll('ion-item');

    expect(commentItems).toHaveLength(mockCommentList.data.length);
    commentItems.forEach((comment: any, index: number) => {
      expect(comment.text()).toContain(mockCommentList.data[index].name);
    });

    // Test state changes
    expect(comments.value).toHaveLength(mockCommentList.data.length);
    comments.value.forEach((comment: any, index: number) => {
      expect(comment).toEqual(mockCommentList.data[index]);
    });
  });
});
