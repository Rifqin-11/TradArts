import { Instrument } from '../types';

export const instruments: Instrument[] = [
  {
    id: 'gamelan',
    name: 'Gamelan',
    description: 'A traditional ensemble of percussion instruments from Java and Bali, featuring metallophones, xylophones, gongs, and drums.',
    region: 'Java',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/7857717/pexels-photo-7857717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['bonang', 'kenong', 'gong']
  },
  {
    id: 'angklung',
    name: 'Angklung',
    description: 'A musical instrument made of bamboo tubes attached to a bamboo frame, producing sounds when shaken or tapped.',
    region: 'West Java',
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/13278440/pexels-photo-13278440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['angklung-c', 'angklung-d', 'angklung-e']
  },
  {
    id: 'sasando',
    name: 'Sasando',
    description: 'A stringed instrument from Rote Island with strings stretched around a bamboo tube and a fan-like resonator made of palm leaves.',
    region: 'East Nusa Tenggara',
    difficulty: 'Hard',
    imageUrl: 'https://images.pexels.com/photos/15908930/pexels-photo-15908930/free-photo-of-sasando-traditional-musical-instrument-of-rote-island-east-nusa-tenggara-indonesia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['sasando-1', 'sasando-2', 'sasando-3']
  },
  {
    id: 'kolintang',
    name: 'Kolintang',
    description: 'A wooden percussion instrument from North Sulawesi consisting of wooden bars arranged in a row and struck with mallets.',
    region: 'North Sulawesi',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/2321536/pexels-photo-2321536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['kolintang-low', 'kolintang-mid', 'kolintang-high']
  },
  {
    id: 'rebab',
    name: 'Rebab',
    description: 'A bowed string instrument with two or three strings, commonly used in gamelan ensembles and traditional music.',
    region: 'Java',
    difficulty: 'Hard',
    imageUrl: 'https://images.pexels.com/photos/6647119/pexels-photo-6647119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['rebab-low', 'rebab-mid', 'rebab-high']
  },
  {
    id: 'tifa',
    name: 'Tifa',
    description: 'A traditional drum from eastern Indonesia, carved from a single piece of wood with lizard or goat skin stretched over one end.',
    region: 'Papua',
    difficulty: 'Easy',
    imageUrl: 'https://images.pexels.com/photos/8154468/pexels-photo-8154468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['tifa-slow', 'tifa-medium', 'tifa-fast']
  },
  {
    id: 'gendang',
    name: 'Gendang',
    description: 'A double-headed drum popular throughout Indonesia, played with hands or sticks in various musical styles.',
    region: 'Multiple Regions',
    difficulty: 'Medium',
    imageUrl: 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['gendang-tak', 'gendang-dung', 'gendang-pattern']
  },
  {
    id: 'saluang',
    name: 'Saluang',
    description: 'A wind instrument from West Sumatra made from bamboo with four finger holes, often used to accompany traditional singing.',
    region: 'West Sumatra',
    difficulty: 'Hard',
    imageUrl: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    soundSamples: ['saluang-1', 'saluang-2', 'saluang-melody']
  }
];