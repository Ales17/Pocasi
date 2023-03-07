const weatherCodes = [
  { code: 0, description: "Jasno", icon: "sun-fill" },
  { code: 1, description: "Polojasno", icon: "cloud-sun-fill" },
  {
    code: 2,
    description: "Oblačno s převahou jasného",
    icon: "cloud-sun-fill",
  },
  { code: 3, description: "Oblačno", icon: "cloud-fill" },
  { code: 45, description: "Mlha s námrazou", icon: "thermometer-low" },
  { code: 48, description: "Mlha", icon: "cloud-fog-fill" },
  { code: 51, description: "Déšť - slabá intenzita", icon: "cloud-rain-fill" },
  {
    code: 53,
    description: "Déšť - střední intenzita",
    icon: "cloud-rain-fill",
  },
  {
    code: 55,
    description: "Déšť - silná intenzita",
    icon: "cloud-rain-heavy-fill",
  },
  {
    code: 56,
    description: "Mrznoucí déšť - slabá intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 57,
    description: "Mrznoucí déšť - silná intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 61,
    description: "Déšť - velmi slabá intenzita",
    icon: "cloud-drizzle-fill",
  },
  {
    code: 63,
    description: "Déšť - slabá až střední intenzita",
    icon: "cloud-drizzle-fill",
  },
  {
    code: 65,
    description: "Déšť - střední až silná intenzita",
    icon: "cloud-rain-heavy-fill",
  },
  {
    code: 66,
    description: "Mrznoucí déšť - slabá intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 67,
    description: "Mrznoucí déšť - silná intenzita",
    icon: "cloud-sleet-fill",
  },
  {
    code: 71,
    description: "Sněžení - velmi slabá intenzita",
    icon: "cloud-snow-fill",
  },
  {
    code: 73,
    description: "Sněžení - slabá až střední intenzita",
    icon: "cloud-snow-fill",
  },
  {
    code: 75,
    description: "Sněžení - střední až silná intenzita",
    icon: "cloud-snow-fill",
  },
  { code: 77, description: "Jemný sníh", icon: "cloud-snow-fill" },
  {
    code: 80,
    description: "Déšť se sněhem - slabá intenzita",
    icon: "cloud-cloud-snow-fill",
  },
  {
    code: 81,
    description: "Déšť se sněhem - střední intenzita",
    icon: "cloud-cloud-snow-fill",
  },
  {
    code: 82,
    description: "Déšť se sněhem - silná intenzita",
    icon: "cloud-cloud-snow-fill",
  },
  {
    code: 85,
    description: "Sněhové přeháňky - slabá intenzita",
    icon: "snow3",
  },
  {
    code: 86,
    description: "Sněhové přeháňky - silná intenzita",
    icon: "snow3",
  },
  {
    code: 95,
    description: "Bouřka - slabá až střední intenzita",
    icon: "lightning",
  },
  {
    code: 96,
    description: "Bouřka s kroupami - slabá intenzita",
    icon: "cloud-hail-fill",
  },
  {
    code: 99,
    description: "Bouřka s kroupami - silná intenzita",
    icon: "cloud-hail-fill",
  },
];

const places = [
  {
    city: "Valdice",
    lat: 50.46,
    lon: 15.38,
  },
  {
    city: "Brno",
    lat: 49.2,
    lon: 16.61,
  },
  {
    city: "Ostrava",
    lat: 49.83,
    lon: 18.25,
  },
  {
    city: "Praha",
    lat: 50.08,
    lon: 14.43,
  },
  {
    city: "Plzeň",
    lat: 49.75,
    lon: 13.37,
  },
  {
    city: "Liberec",
    lat: 50.77,
    lon: 15.05,
  },
  {
    city: "Olomouc",
    lat: 49.6,
    lon: 17.25,
  },
  {
    city: "České Budějovice",
    lat: 48.97,
    lon: 14.47,
  },
  {
    city: "Hradec Králové",
    lat: 50.21,
    lon: 15.83,
  },
  {
    city: "Zlín",
    lat: 49.22,
    lon: 17.67,
  },
  {
    city: "Ústí nad Labem",
    lat: 50.66,
    lon: 14.04,
  },
  {
    city: "Jihlava",
    lat: 49.39,
    lon: 15.59,
  },
  {
    city: "Karlovy Vary",
    lat: 50.23,
    lon: 12.87,
  },
  {
    city: "Pardubice",
    lat: 50.04,
    lon: 15.78,
  },
];
