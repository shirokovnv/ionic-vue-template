import {
  computed,
  reactive,
  readonly
} from 'vue';
import { instance as axios } from '@/plugins/install/axios';
import api from '@/config/api';

const state = reactive({
  comments: Array<any>()
});

const comments = computed(() => state.comments);

const setComments = (comments: Array<any>) => {
  state.comments = comments;
}

const addComment = (comment: any) => {
  state.comments.push(comment);
}

const fetchComments = async () => {
  try {
    const response = await axios.get(api.baseURL + 'comments?_start=0&_limit=5');
    setComments(response.data);

  } catch (e) {
    console.log(e);
  }

}

export default function useComments() {
  return {
    comments,
    addComment,
    fetchComments,
    setComments,
    state: readonly(state)
  }
}