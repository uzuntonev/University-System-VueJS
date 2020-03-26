import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import {
  default as courseState,
  getCourses,
  deleteCourse
} from '../../courses/+store/course-state';
import AppDetail from '../../courses/components/Detail.vue';

Vue.use(Vuetify);

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('Testing AppDetail.vue', () => {
  let store;
  let state;
  let actions;
  let mutations;
  let router;
  let vuetify;
  let wrapper;
  let options;

  beforeEach(() => {
    vuetify = new Vuetify();
    router = new VueRouter();
    state = {
      allCourses: [
        {
          _id: '2d6144c4ca822500155df3b9',
          title: 'Typescript',
          duration: '4',
          startDate: '2020-03-29',
          students: [],
          description: 'Test test',
          available: true,
          imageUrl: 'https://test.test'
        },
        {
          _id: 'e56256c4fg8h8500155df3b9',
          title: 'Javascript',
          duration: '3',
          startDate: '2020-04-20',
          students: [],
          description: 'Demo demo',
          available: true,
          imageUrl: 'https://demo.demo'
        }
      ]
    };

    mutations = courseState.mutations;

    actions = {
      [getCourses]: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        courseState: {
          state,
          actions,
          mutations,
          getters: courseState.getters
        }
      }
    });
    options = {
      store,
      router,
      localVue,
      vuetify,
      propsData: {
        id: '2d6144c4ca822500155df3b9'
      },
    };
    wrapper = shallowMount(AppDetail, options);
  });

  it('Is Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('Dispatched action "getCourses" in created hook', () => {
    expect(actions[getCourses]).toHaveBeenCalled();
  });

  it('Call "next()" when "next" arrow button is clicked', () => {
    const next = jest.fn();
    wrapper.setMethods({
      next
    });
    wrapper.find('.btn-next').trigger('click');
    expect(next).toHaveBeenCalled();
  });

  it('Call "prev()" when "prev" arrow button is clicked', () => {
    const prev = jest.fn();
    wrapper.setMethods({
      prev
    });
    wrapper.find('.btn-prev').trigger('click');
    expect(prev).toHaveBeenCalled();
  });

  // it('test', async () => {
  //   wrapper.find('.btn-prev').trigger('click');
  //   // expect(push).toHaveBeenCalledWith(`/course/e56256c4fg8h8500155df3b9`);
  //   // expect(wrapper.vm.$data.onboarding).toEqual(0);
  // });

  // it('Should render the course, duration and start date title', () => {
  //   const {
  //     title,
  //     duration,
  //     startDate
  //   } = wrapper.vm.$store.getters.allCourses[0];

  //   const htmlElement = wrapper.find('.title').html();
  //   expect(htmlElement).toContain(courseTitle);
  // });

  // it('Direct to "/course/:id" after click button "View"', async () => {
  //   const course = store.getters.allCourses[0];
  //   const route = `/course/${course._id}`;
  //   await wrapper.find('.btn-detail').trigger('click');
  //   await Vue.nextTick(function() {
  //     wrapper.vm.$router.push(route);
  //   });
  //   expect(wrapper.vm.$route.path).toEqual(route);
  // });
});
