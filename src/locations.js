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
    name: 'Unimail Tram',
    details: 'underneath the last tree on the right when getting out of Unimail - Tram side',
    plan: 'https://goo.gl/maps/UTc1N8S91UT2',
  },
  {
    id: 'uni-2',
    name: 'Unimail Parc',
    details: 'in front of bakery Poully, on the right when getting out of Unimail - Parc side',
    plan: 'https://goo.gl/maps/Ed8Ra3ERNCv',
  },
  {
    id: 'pla-1',
    name: 'Plainpalais East',
    details: 'at the top of the Plainpalais parking stairs, near the café-buvette',
    plan: 'https://goo.gl/maps/ySUWtPzwUHy',
  },
  {
    id: 'pla-2',
    name: 'Plainpalais South',
    details: 'at the street corner between avenue Henri Dunant and avenue du Mail',
    plan: 'https://goo.gl/maps/L33wXcE7BvE2',
  },
  {
    id: 'pla-3',
    name: 'Plainpalais West',
    details: "by the pedestrian crossing in front of l'Elephant dans la Canette, on the other side of the road",
    plan: 'https://goo.gl/maps/4Ve7uAUcFxr',
  },
  {
    id: 'duf-1',
    name: 'Dufour Entrance',
    details: 'near the blue parking sign by the bike parking in front of the entrance',
    plan: 'https://goo.gl/maps/YWYQZqkTJLL2',
  },
  {
    id: 'pla-4',
    name: 'Plainpalais North - Frankenstein',
    details: 'behind the Skatepark, near the monument of the Frankenstein monster',
    plan: 'https://goo.gl/maps/8C1EvVh1cbq',
  },
  {
    id: 'duf-2',
    name: 'Place Neuve - Général Dufour',
    details: 'on the stairs of the Général Dufour statue at the center of place Neuve',
    plan: 'https://goo.gl/maps/WRseP3Na3o12',
  },
];

export default locations;
export type { Location };
