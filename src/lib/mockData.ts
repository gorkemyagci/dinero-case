export interface City {
  id: number;
  name: string;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
  cityId: number;
}

export const mockCities: City[] = [
  {
    id: 1,
    name: "Istanbul",
    districts: [
      { id: 1, name: "Kadıköy", cityId: 1 },
      { id: 2, name: "Beşiktaş", cityId: 1 },
      { id: 3, name: "Şişli", cityId: 1 },
      { id: 4, name: "Beyoğlu", cityId: 1 },
      { id: 5, name: "Fatih", cityId: 1 },
      { id: 6, name: "Üsküdar", cityId: 1 },
      { id: 7, name: "Bakırköy", cityId: 1 },
      { id: 8, name: "Sarıyer", cityId: 1 },
      { id: 9, name: "Maltepe", cityId: 1 },
      { id: 10, name: "Kartal", cityId: 1 },
    ],
  },
  {
    id: 2,
    name: "Izmir",
    districts: [
      { id: 11, name: "Konak", cityId: 2 },
      { id: 12, name: "Bornova", cityId: 2 },
      { id: 13, name: "Karşıyaka", cityId: 2 },
      { id: 14, name: "Buca", cityId: 2 },
      { id: 15, name: "Çiğli", cityId: 2 },
      { id: 16, name: "Bayraklı", cityId: 2 },
      { id: 17, name: "Gaziemir", cityId: 2 },
      { id: 18, name: "Alsancak", cityId: 2 },
      { id: 19, name: "Göztepe", cityId: 2 },
      { id: 20, name: "Urla", cityId: 2 },
    ],
  },
  {
    id: 3,
    name: "Ankara",
    districts: [
      { id: 21, name: "Çankaya", cityId: 3 },
      { id: 22, name: "Keçiören", cityId: 3 },
      { id: 23, name: "Mamak", cityId: 3 },
      { id: 24, name: "Yenimahalle", cityId: 3 },
      { id: 25, name: "Etimesgut", cityId: 3 },
      { id: 26, name: "Sincan", cityId: 3 },
      { id: 27, name: "Altındağ", cityId: 3 },
      { id: 28, name: "Gölbaşı", cityId: 3 },
      { id: 29, name: "Polatlı", cityId: 3 },
      { id: 30, name: "Kızılcahamam", cityId: 3 },
    ],
  },
  {
    id: 4,
    name: "Antalya",
    districts: [
      { id: 31, name: "Muratpaşa", cityId: 4 },
      { id: 32, name: "Kepez", cityId: 4 },
      { id: 33, name: "Döşemealtı", cityId: 4 },
      { id: 34, name: "Aksu", cityId: 4 },
      { id: 35, name: "Konyaaltı", cityId: 4 },
      { id: 36, name: "Manavgat", cityId: 4 },
      { id: 37, name: "Alanya", cityId: 4 },
      { id: 38, name: "Kaş", cityId: 4 },
      { id: 39, name: "Fethiye", cityId: 4 },
      { id: 40, name: "Kemer", cityId: 4 },
    ],
  },
  {
    id: 5,
    name: "Bursa",
    districts: [
      { id: 41, name: "Nilüfer", cityId: 5 },
      { id: 42, name: "Osmangazi", cityId: 5 },
      { id: 43, name: "Yıldırım", cityId: 5 },
      { id: 44, name: "Mudanya", cityId: 5 },
      { id: 45, name: "Gemlik", cityId: 5 },
      { id: 46, name: "İnegöl", cityId: 5 },
      { id: 47, name: "Mustafakemalpaşa", cityId: 5 },
      { id: 48, name: "Orhangazi", cityId: 5 },
      { id: 49, name: "Karacabey", cityId: 5 },
      { id: 50, name: "İznik", cityId: 5 },
    ],
  },
  {
    id: 6,
    name: "Adana",
    districts: [
      { id: 51, name: "Seyhan", cityId: 6 },
      { id: 52, name: "Çukurova", cityId: 6 },
      { id: 53, name: "Sarıçam", cityId: 6 },
      { id: 54, name: "Yüreğir", cityId: 6 },
      { id: 55, name: "Kozan", cityId: 6 },
      { id: 56, name: "İmamoğlu", cityId: 6 },
      { id: 57, name: "Aladağ", cityId: 6 },
      { id: 58, name: "Karaisalı", cityId: 6 },
      { id: 59, name: "Pozantı", cityId: 6 },
      { id: 60, name: "Tufanbeyli", cityId: 6 },
    ],
  },
  {
    id: 7,
    name: "Konya",
    districts: [
      { id: 61, name: "Selçuklu", cityId: 7 },
      { id: 62, name: "Meram", cityId: 7 },
      { id: 63, name: "Karatay", cityId: 7 },
      { id: 64, name: "Ereğli", cityId: 7 },
      { id: 65, name: "Akşehir", cityId: 7 },
      { id: 66, name: "Beyşehir", cityId: 7 },
      { id: 67, name: "Çumra", cityId: 7 },
      { id: 68, name: "Seydişehir", cityId: 7 },
      { id: 69, name: "Ilgın", cityId: 7 },
      { id: 70, name: "Cihanbeyli", cityId: 7 },
    ],
  },
  {
    id: 8,
    name: "Gaziantep",
    districts: [
      { id: 71, name: "Şahinbey", cityId: 8 },
      { id: 72, name: "Şehitkamil", cityId: 8 },
      { id: 73, name: "Oğuzeli", cityId: 8 },
      { id: 74, name: "Nizip", cityId: 8 },
      { id: 75, name: "İslahiye", cityId: 8 },
      { id: 76, name: "Araban", cityId: 8 },
      { id: 77, name: "Yavuzeli", cityId: 8 },
      { id: 78, name: "Nurdağı", cityId: 8 },
      { id: 79, name: "Karkamış", cityId: 8 },
      { id: 80, name: "Kilis", cityId: 8 },
    ],
  },
  {
    id: 9,
    name: "Mersin",
    districts: [
      { id: 81, name: "Akdeniz", cityId: 9 },
      { id: 82, name: "Yenişehir", cityId: 9 },
      { id: 83, name: "Toroslar", cityId: 9 },
      { id: 84, name: "Mezitli", cityId: 9 },
      { id: 85, name: "Tarsus", cityId: 9 },
      { id: 86, name: "Erdemli", cityId: 9 },
      { id: 87, name: "Silifke", cityId: 9 },
      { id: 88, name: "Anamur", cityId: 9 },
      { id: 89, name: "Mut", cityId: 9 },
      { id: 90, name: "Gülnar", cityId: 9 },
    ],
  },
  {
    id: 10,
    name: "Diyarbakır",
    districts: [
      { id: 91, name: "Bağlar", cityId: 10 },
      { id: 92, name: "Kayapınar", cityId: 10 },
      { id: 93, name: "Sur", cityId: 10 },
      { id: 94, name: "Yenişehir", cityId: 10 },
      { id: 95, name: "Ergani", cityId: 10 },
      { id: 96, name: "Bismil", cityId: 10 },
      { id: 97, name: "Silvan", cityId: 10 },
      { id: 98, name: "Çermik", cityId: 10 },
      { id: 99, name: "Çınar", cityId: 10 },
      { id: 100, name: "Dicle", cityId: 10 },
    ],
  },
];

export const getCities = (): string[] => {
  return mockCities.map(city => city.name);
};

export const getDistrictsByCity = (cityName: string): string[] => {
  const city = mockCities.find(c => c.name === cityName);
  return city ? city.districts.map(d => d.name) : [];
};

export const getDistrictsByCityId = (cityId: number): string[] => {
  const city = mockCities.find(c => c.id === cityId);
  return city ? city.districts.map(d => d.name) : [];
};
