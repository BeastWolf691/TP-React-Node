// scripts/seed.js
import Bar from '../models/bar.js';
import Biere from '../models/biere.js';

const barsData = [
  {
    name: 'Bar\'aka',
    address: '35 rue Baker Street',
    tel: '02-47-XX-XX-XX',
    email: 'zinedinezidaneestmonroi@outlook.fr',
    description: 'le meilleur bar du quartier de guillotière',
  },
  {
    name: 'Baroque',
    address: '48 rue Baker Street',
    tel: '02-47-XX-XX-XX',
    email: 'unpourtousettouspourmoi@outlook.fr',
    description: 'Un lieu d\'exception',
  },
  {
    name: 'Las Ketchup',
    address: '118 rue de Nazareth',
    tel: '02-47-XX-XX-XX',
    email: 'nazarethketchup@outlook.fr',
    description: 'Situé dans la rue de Jesus, néanmoins nous ne faisons pas de miracle',
  },
  {
    name: 'Bratislaboys',
    address: '45 rue du papa pingouin',
    tel: '09-47-XX-XX-XX',
    email: 'anneeso2000@outlook.fr',
    description: 'revivez les meilleurs décennies dans cette ambiance de folie',
  },
  {
    name: 'Crazy Frog',
    address: '20 000 lieux sous la mer',
    tel: '02-47-XX-XX-XX',
    email: 'underwater@outlook.fr',
    description: 'Cet établissement est la copie conforme d\'un navire, entre marée haute et basse. Tenez vous bien pour les odeurs',
  },
  {
    name: 'Destinyz',
    address: '25 rue des divas',
    tel: '02-47-XX-XX-XX',
    email: 'divaqueen@outlook.fr',
    description: 'le bar où une seule reine peut survivre, challenge et Karaoké permanent dans ce bar. Venez montrer au monde vos vocalises',
  },
  {
    name: 'RaouBar',
    address: '8 rue du perdu',
    tel: '02-47-XX-XX-XX',
    email: 'unpetitcoinpaume@outlook.fr',
    description: 'si vous trouvez ce bar, vous avez gagné un verre de gin de 3L',
  },
  {
    name: 'Shéhérazade',
    address: '354 rue du désert',
    tel: '02-47-XX-XX-XX',
    email: 'tombeedansloubli@outlook.fr',
    description: 'le bar le plus caliente du quartier, revivez les 1000 et une nuit',
  },
];

const bieresData = [ 
  {
    name: "Heineken",
    description:"Biere Blonde qui saura ravir vos papilles",
    degree: 3,
    price: 5,
  },
  {
    name: "Orange Mécanique",
    description:"Bière blonde au miel d'acacia, la bière Orange Mécanique est un vrai bouquet de saveurs ! Du grand art, comme toujours avec la Brasserie Sainte Cru !",
    degree: 5,
    price: 5,
  },
  {
    name: "La Bête",
    description:"La Bête est une bière de caractère qui assume son originalité dans ses recettes.",
    degree: 8,
    price: 5,
  }
];

const seedDatabase = async () => {
  try {
    await Bar.bulkCreate(barsData);
    await Biere.bulkCreate(bieresData);
    console.info('✅ Database seeded!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
};


export default seedDatabase;
