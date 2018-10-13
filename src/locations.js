// @flow

type Location = {
  id: string,
  name: string,
  details: string,
  plan: string,
};

/*

Unimail Tram
Sous le dernier arbre en face de la sortie à droite en sortant d'unimail
https://maps.google.com/?q=46.194625,6.140431

Unimail Parc
En sortant d'unimail sur la droite vers la boulangerie poully
https://maps.google.com/?q=46.195478,6.139574

Plainpalais South
À l'angle de l'avenue Henri dunant et de l'avenue du mail
???

Plainpalais West
Sur le trottoir de plainpalais en face de l'éléphant de la cannette (traverser la route depuis l'éléphant et attendre sur le trottoir opposé)
https://maps.google.com/?q=46.197798,6.139269

Plainpalais East
En haut des escaliers du parking de plainpalais, pas loin de la buvette.
https://maps.google.com/?q=46.198235,6.141788

Plainpalais North
Derrière le Skatepark côté route Henri Marc
https://maps.google.com/?q=46.199703,6.140262

Dufour Entrance
vers le panneau parking du parking de vélos pile en face de la sortie
https://maps.google.com/?q=46.199780,6.142794

Grand Théâtre
Sur les escaliers du grand théâtre, à gauche en étant face au théâtre.
https://maps.google.com/?q=46.201440,6.142915
---> plutôt uni bastion ?

 */

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
