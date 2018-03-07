// @flow

type Location = {
  id: string,
  name: string,
  details: string,
  plan: string,
};

const locations: Array<Location> = [
  {
    id: 'sv-1',
    name: 'SV hall',
    details: 'near the camipro loader',
    plan: 'https://plan.epfl.ch/?room=SV1204',
  },
  {
    id: 'co-1',
    name: 'Esplanade',
    details: 'near the double doors',
    plan: 'https://plan.epfl.ch/?room=CO194.6',
  },
  {
    id: 'cm-1',
    name: 'Info point',
    details: 'near the camipro loader',
    plan: 'https://plan.epfl.ch/?room=CM194.6',
  },
  {
    id: 'sg-1',
    name: 'Archi hall',
    details: 'near the camipro loader',
    plan: 'https://plan.epfl.ch/?room=SG194.18',
  },
  {
    id: 'rlc-1',
    name: 'Rolex',
    details: 'near the sofas at main entry',
    plan: 'https://plan.epfl.ch/?room=RLCC1330',
  },
  {
    id: 'ce-1',
    name: 'CE hall',
    details: 'near the working tables',
    plan: 'https://plan.epfl.ch/?room=CE194.3',
  },
  {
    id: 'in-1',
    name: 'IN library',
    details: 'near the sofa',
    plan: 'https://plan.epfl.ch/?room=INM194.1',
  },
  {
    id: 'sv-2',
    name: 'Cybercafé SV',
    details: 'near the first "high" tables',
    plan: 'https://plan.epfl.ch/?room=SV1604',
  },
  {
    id: 'co-2',
    name: 'CO hall',
    details: 'near the double sliding doors',
    plan: 'https://plan.epfl.ch/?room=CO194.7',
  },
  {
    id: 'cm-2',
    name: 'CM hall',
    details: 'near the photocopiers',
    plan: 'https://plan.epfl.ch/?room=CM194.1',
  },
];

export default locations;
export type { Location };
