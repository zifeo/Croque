// @flow

type Location = {
  id: string,
  name: string,
  details: string,
  plan: string,
};

const locations: Array<Location> = [
  {
    id: 'uni-1',
    name: 'Unithèque',
    details: 'near the water fountain, on the right when entering',
    plan: 'https://planete.unil.ch/plan/?local=%27UTQ-2.226%27',
  },
  {
    id: 'geo-1',
    name: 'Géopolis',
    details: 'in front of the lifts, 1st floor',
    plan: 'https://planete.unil.ch/plan/?local=%27GEO-1000%27',
  },
  {
    id: 'css-1',
    name: 'Centre Sport et Santé',
    details: 'near the BCV cash machine',
    plan: 'https://planete.unil.ch/plan/?local=%27CSS-110%27',
  },
  {
    id: 'uni-2',
    name: 'Unithèque',
    details: 'in front of the stairs near the main entrance (inside)',
    plan: 'https://planete.unil.ch/plan/?local=%27UTQ-2.226%27',
  },
  {
    id: 'geo-2',
    name: 'Géopolis',
    details: 'in front of the stairs, 1st floor',
    plan: 'https://planete.unil.ch/plan/?local=%27GEO-1000%27',
  },
  {
    id: 'amph-1',
    name: 'Amphimax',
    details: 'near the distributors in front of Amphimax entrance, 3rd floor',
    plan: 'https://planete.unil.ch/plan/?local=%27MAX-300%27',
  },
  {
    id: 'anth-1',
    name: 'Anthropole',
    details: 'near the cafeteria water fountain',
    plan: 'https://planete.unil.ch/plan/?local=%27ANT-1084.1%27',
  },
  {
    id: 'uni-3',
    name: 'Unithèque',
    details: 'in front of the library entrance, 4th floor',
    plan: 'https://planete.unil.ch/plan/?local=%27UTQ-1.445%27',
  },
  {
    id: 'geo-3',
    name: 'Géopolis',
    details: 'in front of room 1612, on the right when entering',
    plan: 'https://planete.unil.ch/plan/?local=%27GEO-1000%27',
  },
];

export default locations;
export type { Location };
