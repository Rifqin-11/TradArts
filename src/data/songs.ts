import { Song } from '../types';

export const songs: Song[] = [
  {
    id: 'rasa-sayange',
    title: 'Rasa Sayange',
    description: 'A traditional folk song from Maluku that expresses feelings of love and affection.',
    region: 'Maluku',
    imageUrl: 'https://images.pexels.com/photos/2156311/pexels-photo-2156311.jpeg',
    instruments: ['tifa', 'suling'],
    lyrics: 'Rasa sayange, rasa sayang sayange...',
  },
  {
    id: 'yamko-rambe',
    title: 'Yamko Rambe Yamko',
    description: 'A traditional song from Papua that tells the story of tribal warfare and reconciliation.',
    region: 'Papua',
    imageUrl: 'https://images.pexels.com/photos/8154468/pexels-photo-8154468.jpeg',
    instruments: ['tifa', 'gong'],
    lyrics: 'Yamko rambe yamko aronawa kombe...',
  },
  {
    id: 'bubuy-bulan',
    title: 'Bubuy Bulan',
    description: 'A Sundanese folk song about the moon and its beauty.',
    region: 'West Java',
    imageUrl: 'https://images.pexels.com/photos/13278440/pexels-photo-13278440.jpeg',
    instruments: ['angklung', 'suling'],
    lyrics: 'Bubuy bulan bubuy bulan sangray bentang...',
  },
  {
    id: 'gundul-pacul',
    title: 'Gundul Pacul',
    description: 'A Javanese children\'s song that teaches about humility and responsibility.',
    region: 'Central Java',
    imageUrl: 'https://images.pexels.com/photos/7857717/pexels-photo-7857717.jpeg',
    instruments: ['gamelan'],
    lyrics: 'Gundul gundul pacul cul, gembelengan...',
  },
  {
    id: 'soleram',
    title: 'Soleram',
    description: 'A traditional Malay song from Riau about young love.',
    region: 'Riau',
    imageUrl: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg',
    instruments: ['accordion', 'violin'],
    lyrics: 'Soleram soleram, soleram anak yang manis...',
  },
  {
    id: 'ampar-ampar-pisang',
    title: 'Ampar Ampar Pisang',
    description: 'A folk song from South Kalimantan about preparing banana-based dishes.',
    region: 'South Kalimantan',
    imageUrl: 'https://images.pexels.com/photos/2321536/pexels-photo-2321536.jpeg',
    instruments: ['panting', 'babun'],
    lyrics: 'Ampar ampar pisang, pisangku belum masak...',
  }
];