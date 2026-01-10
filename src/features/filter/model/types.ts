import { BASIC_FILTERS, HASHTAG_FILTERS } from './mocks';

export type BasicFilterId = (typeof BASIC_FILTERS)[number]['id'];
export type HashtagFilterId = (typeof HASHTAG_FILTERS)[number]['id'];

export type FilterId = BasicFilterId | HashtagFilterId;

