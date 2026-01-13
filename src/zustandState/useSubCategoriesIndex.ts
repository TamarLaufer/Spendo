import { create } from 'zustand';
import { SubCategoryType } from '../shared/categoryType';

type SubIndex = Record<string, Record<string, SubCategoryType>>;
type CountsIndex = Record<string, number>;

type SubcatIndexState = {
  index: SubIndex; // index[categoryId][subId] = SubCategory
  counts: CountsIndex; // counts[categoryId] = num of subs
  putMany: (categoryId: string, subs: SubCategoryType[]) => void;
  removeCategory: (categoryId: string) => void;
  clear: () => void;
};

export const useSubcatIndex = create<SubcatIndexState>(set => ({
  index: {},
  counts: {},

  putMany: (categoryId, subs) =>
    set(state => ({
      index: {
        ...state.index,
        [categoryId]: Object.fromEntries(subs.map(s => [s.id, s])),
      },
      counts: { ...state.counts, [categoryId]: subs.length },
    })),

  removeCategory: categoryId =>
    set(state => {
      const { [categoryId]: _1, ...restIdx } = state.index;
      const { [categoryId]: _2, ...restCnt } = state.counts;
      return { index: restIdx, counts: restCnt };
    }),

  clear: () => set({ index: {}, counts: {} }),
}));
