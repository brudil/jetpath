import AT, {
  FETCH_ALL_SECTIONS,
  ORGANISATION_SELECT_SECTION,
  ORGANISATION_SELECT_TOPIC,
  ORGANISATION_SELECT_NEW_SECTION,
  ORGANISATION_SELECT_NEW_TOPIC,
  ORGANISATION_SAVE_SECTION,
  ORGANISATION_SAVE_TOPIC,
  ORGANISATION_FETCH_TOPICS_FOR_SECTION,
} from '../constants/ActionTypes';
import { sequence } from './utils';

const initialState = {
  sectionList: [],
  topicListMap: {},
  loading: false,
  selectedSectionId: null,
  selectedTopicId: null,
  blankOf: null,
};

export default function OrganisationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_SECTIONS.REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ALL_SECTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        sectionList: action.payload.result,
      };
    }
    case AT.ORGANISATION_CREATE_TOPIC:
      return sequence(state, action, {
        done() {
          return {
            ...state,
            selectedTopicId: action.payload.result,
            blankOf: null,
            topicListMap: {
              ...state.topicListMap,
              [action.sequence.sectionId]: [
                ...state.topicListMap[action.sequence.sectionId],
                action.payload.result,
              ],
            },
          };
        },
      });
    case ORGANISATION_SELECT_SECTION:
      return {
        ...state,
        selectedSectionId: action.id,
        selectedTopicId: null,
        blankOf: null,
      };
    case ORGANISATION_SELECT_TOPIC:
      return {
        ...state,
        selectedTopicId: action.id,
        blankOf: null,
      };
    case ORGANISATION_SELECT_NEW_TOPIC:
      return {
        ...state,
        blankOf: 'topic',
        selectedTopicId: null,
      };
    case ORGANISATION_SELECT_NEW_SECTION:
      return {
        ...state,
        blankOf: 'section',
        selectedSectionId: null,
        selectedTopicId: null,
      };
    case ORGANISATION_SAVE_SECTION.SUCCESS: {
      const savedId = action.payload.result;
      if (state.sectionList.indexOf(savedId) > -1) {
        return state;
      }

      return {
        ...state,
        selectedSectionId: savedId,
        topicListMap: {
          ...state.topicListMap,
          [savedId]: {}.hasOwnProperty.call(state.topicListMap, savedId)
            ? state.topicListMap[savedId]
            : [],
        },
        sectionList: [...state.sectionList, savedId],
        blankOf: null,
      };
    }
    case ORGANISATION_SAVE_TOPIC.SUCCESS: {
      const savedId = action.payload.result;
      const savedTopic = action.payload.entities.topics[savedId];
      const sectionId = savedTopic.section;
      const topicList = state.topicListMap[sectionId];
      const hasIdAlready = topicList.indexOf(savedId) > -1;
      return {
        ...state,
        selectedTopicId: savedId,
        topicListMap: {
          ...state.topicListMap,
          [sectionId]: hasIdAlready ? topicList : [...topicList, savedId],
        },
        blankOf: null,
      };
    }
    case ORGANISATION_FETCH_TOPICS_FOR_SECTION.SUCCESS: {
      return {
        ...state,
        topicListMap: {
          ...state.topicListMap,
          [action.id]: action.payload.result,
        },
      };
    }
    default:
      return state;
  }
}
