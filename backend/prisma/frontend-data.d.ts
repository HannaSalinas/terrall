// Tipos de los módulos de datos del frontend que importa el seed.

interface TopicData {
  description: string;
  mainTerminal?: string;
  routes?: string[];
  topDestinations?: string[];
  universities?: string[];
  mainActivities?: string[];
}

declare module '*/data/departments.js' {
  export const DEPARTMENTS: Record<
    string,
    Record<'transporte' | 'turismo' | 'educacion' | 'economia', TopicData>
  >;
}

declare module '*/data/tourismStats.js' {
  export const TOURISM_STATS: Record<
    string,
    { total: number; topCategories: { categoria: string; count: number }[] }
  >;
}

declare module '*/data/tourismVenues.js' {
  export const TOURISM_VENUES: Record<
    string,
    { name: string; municipio: string; categoria: string }[]
  >;
}

declare module '*/data/cities.js' {
  export const CITIES: {
    name: string;
    lat: number;
    lng: number;
    population: number;
  }[];
}
