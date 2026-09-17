// Datos mock (ficticios pero realistas) por departamento.
// Las claves coinciden exactamente con NOMBRE_DPT del geojson.
export const DEPARTMENTS = {
  'AMAZONAS': {
    transporte: {
      description: 'Movilidad fluvial y aérea predominante en la selva amazónica; sin conexión terrestre con el resto del país.',
      mainTerminal: 'Aeropuerto Alfredo Vásquez Cobo (Leticia)',
      routes: ['Leticia - Puerto Nariño (fluvial)', 'Leticia - Bogotá (aérea)'],
    },
    turismo: {
      description: 'Turismo de naturaleza y comunidades indígenas en plena selva amazónica.',
      topDestinations: ['Parque Nacional Amacayacu', 'Puerto Nariño', 'Reserva Natural Tanimboca'],
    },
    educacion: {
      description: 'Oferta académica limitada, enfocada en programas técnicos y sedes regionales.',
      universities: ['Universidad Nacional sede Amazonía', 'SENA Amazonas'],
    },
    economia: {
      description: 'Economía basada en pesca, agricultura de subsistencia y turismo ecológico.',
      mainActivities: ['Pesca artesanal', 'Turismo ecológico', 'Agricultura de subsistencia'],
    },
  },
  'ANTIOQUIA': {
    transporte: {
      description: 'Uno de los sistemas de movilidad más desarrollados del país, con metro, metrocable y terminales de alto flujo.',
      mainTerminal: 'Terminal del Norte / Terminal del Sur (Medellín)',
      routes: ['Medellín - Bogotá', 'Medellín - Cartagena', 'Metro Línea A/B'],
    },
    turismo: {
      description: 'Destino líder en turismo urbano, cultural y de montaña.',
      topDestinations: ['Comuna 13', 'Guatapé y El Peñol', 'Parque Arví'],
    },
    educacion: {
      description: 'Alta concentración de universidades e instituciones técnicas.',
      universities: ['Universidad de Antioquia', 'EAFIT', 'Universidad Nacional sede Medellín'],
    },
    economia: {
      description: 'Economía diversificada con fuerte sector textil, servicios e innovación.',
      mainActivities: ['Textil y moda', 'Servicios financieros', 'Tecnología e innovación'],
    },
  },
  'ARAUCA': {
    transporte: {
      description: 'Movilidad terrestre limitada por la geografía de los Llanos Orientales, con conexión fronteriza a Venezuela.',
      mainTerminal: 'Terminal de Transportes de Arauca',
      routes: ['Arauca - Bogotá', 'Arauca - Saravena'],
    },
    turismo: {
      description: 'Turismo llanero y de naturaleza en la frontera oriental.',
      topDestinations: ['Reserva Natural El Deseo', 'Caño La Mona', 'Malecón de Arauca'],
    },
    educacion: {
      description: 'Oferta académica reducida con presencia de sedes regionales.',
      universities: ['UNAD sede Arauca', 'SENA Arauca'],
    },
    economia: {
      description: 'Economía basada en ganadería, petróleo y agricultura llanera.',
      mainActivities: ['Ganadería extensiva', 'Explotación petrolera', 'Agricultura'],
    },
  },
  'ARCHIPIELAGO DE SAN ANDRES PROVIDENCIA Y SANTA CATALINA': {
    transporte: {
      description: 'Movilidad exclusivamente aérea y marítima por su condición insular.',
      mainTerminal: 'Aeropuerto Gustavo Rojas Pinilla (San Andrés)',
      routes: ['San Andrés - Providencia (lancha)', 'San Andrés - Bogotá (aérea)'],
    },
    turismo: {
      description: 'Principal destino de playa y buceo del país, con el Mar de los Siete Colores.',
      topDestinations: ['Johnny Cay', 'Hoyo Soplador', 'Providencia'],
    },
    educacion: {
      description: 'Oferta académica reducida orientada a turismo y pesca.',
      universities: ['Universidad Nacional sede Caribe', 'SENA San Andrés'],
    },
    economia: {
      description: 'Economía centrada en el turismo y el comercio.',
      mainActivities: ['Turismo de playa', 'Pesca', 'Comercio libre de impuestos'],
    },
  },
  'ATLANTICO': {
    transporte: {
      description: 'Nodo logístico portuario del Caribe con alta conectividad terrestre y aérea.',
      mainTerminal: 'Terminal Metropolitana de Transporte (Barranquilla)',
      routes: ['Barranquilla - Cartagena', 'Barranquilla - Santa Marta', 'Barranquilla - Bogotá'],
    },
    turismo: {
      description: 'Cuna del Carnaval de Barranquilla y turismo cultural caribeño.',
      topDestinations: ['Carnaval de Barranquilla', 'Malecón del Río', 'Puerto Colombia'],
    },
    educacion: {
      description: 'Importante centro académico de la región Caribe.',
      universities: ['Universidad del Norte', 'Universidad del Atlántico'],
    },
    economia: {
      description: 'Economía portuaria, industrial y comercial.',
      mainActivities: ['Actividad portuaria', 'Industria manufacturera', 'Comercio'],
    },
  },
  'BOLIVAR': {
    transporte: {
      description: 'Terminal marítimo y aéreo internacional de alto tráfico turístico.',
      mainTerminal: 'Terminal de Transportes de Cartagena',
      routes: ['Cartagena - Barranquilla', 'Cartagena - Medellín', 'Cartagena - Bogotá'],
    },
    turismo: {
      description: 'Ciudad amurallada Patrimonio de la Humanidad y playas del Caribe.',
      topDestinations: ['Ciudad Amurallada', 'Islas del Rosario', 'Castillo San Felipe'],
    },
    educacion: {
      description: 'Oferta universitaria orientada a turismo y negocios internacionales.',
      universities: ['Universidad de Cartagena', 'Universidad Tecnológica de Bolívar'],
    },
    economia: {
      description: 'Economía turística, portuaria e industrial petroquímica.',
      mainActivities: ['Turismo', 'Industria petroquímica', 'Actividad portuaria'],
    },
  },
  'BOYACA': {
    transporte: {
      description: 'Red vial andina que conecta con Bogotá y el centro del país.',
      mainTerminal: 'Terminal de Transportes de Tunja',
      routes: ['Tunja - Bogotá', 'Tunja - Sogamoso', 'Tunja - Villa de Leyva'],
    },
    turismo: {
      description: 'Pueblos patrimonio y sitios históricos de la independencia.',
      topDestinations: ['Villa de Leyva', 'Puente de Boyacá', 'Lago de Tota'],
    },
    educacion: {
      description: 'Tradición académica con universidades públicas reconocidas.',
      universities: ['Universidad Pedagógica y Tecnológica de Colombia'],
    },
    economia: {
      description: 'Economía agrícola, minera y turística.',
      mainActivities: ['Agricultura', 'Minería de esmeraldas y carbón', 'Turismo cultural'],
    },
  },
  'CALDAS': {
    transporte: {
      description: 'Terminal de alta montaña con conexión al Eje Cafetero.',
      mainTerminal: 'Terminal de Transportes de Manizales',
      routes: ['Manizales - Pereira', 'Manizales - Bogotá', 'Manizales - Medellín'],
    },
    turismo: {
      description: 'Epicentro del Paisaje Cultural Cafetero.',
      topDestinations: ['Nevado del Ruiz', 'Recinto del Pensamiento', 'Termales de Villamaría'],
    },
    educacion: {
      description: 'Fuerte tradición universitaria en la región cafetera.',
      universities: ['Universidad de Caldas', 'Universidad Nacional sede Manizales'],
    },
    economia: {
      description: 'Economía cafetera e industrial.',
      mainActivities: ['Producción de café', 'Industria manufacturera', 'Turismo rural'],
    },
  },
  'CAQUETA': {
    transporte: {
      description: 'Puerta de entrada terrestre a la Amazonía colombiana.',
      mainTerminal: 'Terminal de Transportes de Florencia',
      routes: ['Florencia - Bogotá', 'Florencia - Neiva'],
    },
    turismo: {
      description: 'Turismo de naturaleza en la transición andino-amazónica.',
      topDestinations: ['Parque Nacional Alto Fragua', 'Fin del Mundo (San José del Fragua)'],
    },
    educacion: {
      description: 'Presencia universitaria enfocada en ciencias agropecuarias y ambientales.',
      universities: ['Universidad de la Amazonia'],
    },
    economia: {
      description: 'Economía ganadera y agrícola amazónica.',
      mainActivities: ['Ganadería', 'Agricultura', 'Extracción de caucho'],
    },
  },
  'CASANARE': {
    transporte: {
      description: 'Red vial llanera con creciente actividad petrolera.',
      mainTerminal: 'Terminal de Transportes de Yopal',
      routes: ['Yopal - Bogotá', 'Yopal - Villavicencio'],
    },
    turismo: {
      description: 'Turismo llanero, esteros y avistamiento de fauna.',
      topDestinations: ['Esteros de Casanare', 'Hato La Aurora', 'Laguna del Tinije'],
    },
    educacion: {
      description: 'Oferta académica en expansión con sedes regionales.',
      universities: ['UNAD sede Yopal'],
    },
    economia: {
      description: 'Economía petrolera y ganadera.',
      mainActivities: ['Explotación petrolera', 'Ganadería extensiva', 'Agricultura'],
    },
  },
  'CAUCA': {
    transporte: {
      description: 'Corredor vial estratégico del suroccidente colombiano.',
      mainTerminal: 'Terminal de Transportes de Popayán',
      routes: ['Popayán - Cali', 'Popayán - Pasto'],
    },
    turismo: {
      description: 'Ciudad blanca colonial y territorios indígenas.',
      topDestinations: ['Centro Histórico de Popayán', 'Parque Nacional Puracé', 'Silvia'],
    },
    educacion: {
      description: 'Universidad histórica de gran tradición regional.',
      universities: ['Universidad del Cauca'],
    },
    economia: {
      description: 'Economía agrícola con fuerte producción de café.',
      mainActivities: ['Café especial', 'Agricultura', 'Minería artesanal'],
    },
  },
  'CESAR': {
    transporte: {
      description: 'Corredor vial minero y ganadero del Caribe interior.',
      mainTerminal: 'Terminal de Transportes de Valledupar',
      routes: ['Valledupar - Santa Marta', 'Valledupar - Bucaramanga'],
    },
    turismo: {
      description: 'Cuna del vallenato y el Festival de la Leyenda Vallenata.',
      topDestinations: ['Festival de la Leyenda Vallenata', 'Parque Nacional Sierra Nevada', 'Balneario Hurtado'],
    },
    educacion: {
      description: 'Oferta académica regional en crecimiento.',
      universities: ['Universidad Popular del Cesar'],
    },
    economia: {
      description: 'Economía minera (carbón) y ganadera.',
      mainActivities: ['Minería de carbón', 'Ganadería', 'Agricultura'],
    },
  },
  'CHOCO': {
    transporte: {
      description: 'Movilidad fluvial predominante por la densa selva del Pacífico.',
      mainTerminal: 'Aeropuerto El Caraño (Quibdó)',
      routes: ['Quibdó - Medellín (aérea)', 'Quibdó - Istmina (fluvial)'],
    },
    turismo: {
      description: 'Avistamiento de ballenas y playas vírgenes del Pacífico.',
      topDestinations: ['Bahía Solano', 'Nuquí', 'Parque Nacional Utría'],
    },
    educacion: {
      description: 'Oferta académica limitada con enfoque étnico-territorial.',
      universities: ['Universidad Tecnológica del Chocó'],
    },
    economia: {
      description: 'Economía basada en minería artesanal, pesca y biodiversidad.',
      mainActivities: ['Minería artesanal de oro', 'Pesca', 'Explotación forestal'],
    },
  },
  'CORDOBA': {
    transporte: {
      description: 'Corredor ganadero conectado al Caribe y Urabá.',
      mainTerminal: 'Terminal de Transportes de Montería',
      routes: ['Montería - Cartagena', 'Montería - Medellín'],
    },
    turismo: {
      description: 'Turismo de río y artesanías en sombrero vueltiao.',
      topDestinations: ['Ronda del Sinú', 'Tuchín (sombrero vueltiao)', 'San Bernardo del Viento'],
    },
    educacion: {
      description: 'Oferta académica regional con enfoque agropecuario.',
      universities: ['Universidad de Córdoba'],
    },
    economia: {
      description: 'Economía ganadera y agroindustrial.',
      mainActivities: ['Ganadería', 'Agroindustria', 'Pesca'],
    },
  },
  'CUNDINAMARCA': {
    transporte: {
      description: 'Alta conectividad vial con la capital del país y la sabana circundante.',
      mainTerminal: 'Terminal Salitre (conexión Bogotá-Cundinamarca)',
      routes: ['Bogotá - Zipaquirá', 'Bogotá - Girardot', 'Bogotá - Chía'],
    },
    turismo: {
      description: 'Sabana con turismo religioso, de aventura y patrimonio.',
      topDestinations: ['Catedral de Sal de Zipaquirá', 'Salto del Tequendama', 'Represa del Guavio'],
    },
    educacion: {
      description: 'Cinturón universitario alrededor de Bogotá.',
      universities: ['Universidad de Cundinamarca', 'Universidad Militar sede Cajicá'],
    },
    economia: {
      description: 'Economía industrial, floricultora y agroindustrial.',
      mainActivities: ['Floricultura de exportación', 'Industria', 'Agricultura de sabana'],
    },
  },
  'GUAINIA': {
    transporte: {
      description: 'Movilidad fluvial y aérea en la selva oriental.',
      mainTerminal: 'Aeropuerto César Gaviria Trujillo (Inírida)',
      routes: ['Inírida - Bogotá (aérea)', 'Inírida - San Felipe (fluvial)'],
    },
    turismo: {
      description: 'Cerros de Mavecure y paisajes de la Estrella Fluvial de Oriente.',
      topDestinations: ['Cerros de Mavecure', 'Estrella Fluvial de Inírida', 'Laguna Vitina'],
    },
    educacion: {
      description: 'Oferta académica muy limitada, principalmente técnica.',
      universities: ['SENA Guainía'],
    },
    economia: {
      description: 'Economía basada en pesca ornamental y minería artesanal.',
      mainActivities: ['Pesca ornamental', 'Minería artesanal', 'Turismo ecológico'],
    },
  },
  'GUAVIARE': {
    transporte: {
      description: 'Punto de entrada terrestre y aérea a la Amazonía occidental.',
      mainTerminal: 'Terminal de Transportes de San José del Guaviare',
      routes: ['San José del Guaviare - Bogotá', 'San José del Guaviare - Villavicencio'],
    },
    turismo: {
      description: 'Hogar de la Serranía de la Lindosa y sus pinturas rupestres.',
      topDestinations: ['Serranía de la Lindosa', 'Cerro Azul', 'Caño Sabana'],
    },
    educacion: {
      description: 'Oferta académica limitada con sedes regionales.',
      universities: ['UNAD sede Guaviare'],
    },
    economia: {
      description: 'Economía agropecuaria y de conservación en transición post-conflicto.',
      mainActivities: ['Ganadería', 'Agricultura', 'Turismo de naturaleza'],
    },
  },
  'HUILA': {
    transporte: {
      description: 'Corredor vial del sur andino conectado con el Macizo Colombiano.',
      mainTerminal: 'Terminal de Transportes de Neiva',
      routes: ['Neiva - Bogotá', 'Neiva - Popayán'],
    },
    turismo: {
      description: 'Parque Arqueológico de San Agustín, Patrimonio de la Humanidad.',
      topDestinations: ['San Agustín', 'Desierto de la Tatacoa', 'Represa de Betania'],
    },
    educacion: {
      description: 'Universidad regional con fuerte presencia en el sur del país.',
      universities: ['Universidad Surcolombiana'],
    },
    economia: {
      description: 'Economía cafetera y piscícola.',
      mainActivities: ['Café', 'Piscicultura (tilapia)', 'Agricultura'],
    },
  },
  'LA GUAJIRA': {
    transporte: {
      description: 'Corredor fronterizo con Venezuela y acceso al desierto.',
      mainTerminal: 'Terminal de Transportes de Riohacha',
      routes: ['Riohacha - Santa Marta', 'Riohacha - Maicao'],
    },
    turismo: {
      description: 'Desierto de la Guajira y cultura wayuu.',
      topDestinations: ['Cabo de la Vela', 'Punta Gallinas', 'Palomino'],
    },
    educacion: {
      description: 'Oferta académica con enfoque étnico y minero.',
      universities: ['Universidad de La Guajira'],
    },
    economia: {
      description: 'Economía minera (carbón del Cerrejón) y pesquera.',
      mainActivities: ['Minería de carbón', 'Pesca artesanal', 'Turismo'],
    },
  },
  'MAGDALENA': {
    transporte: {
      description: 'Puerto caribeño con conexión a la Sierra Nevada.',
      mainTerminal: 'Terminal de Transportes de Santa Marta',
      routes: ['Santa Marta - Barranquilla', 'Santa Marta - Riohacha'],
    },
    turismo: {
      description: 'Parque Tayrona y Ciudad Perdida.',
      topDestinations: ['Parque Tayrona', 'Ciudad Perdida', 'Playa Blanca'],
    },
    educacion: {
      description: 'Universidad regional con enfoque en turismo y ambiente.',
      universities: ['Universidad del Magdalena'],
    },
    economia: {
      description: 'Economía turística, portuaria y bananera.',
      mainActivities: ['Turismo', 'Cultivo de banano y palma', 'Actividad portuaria'],
    },
  },
  'META': {
    transporte: {
      description: 'Puerta de entrada a los Llanos Orientales desde Bogotá.',
      mainTerminal: 'Terminal de Transportes de Villavicencio',
      routes: ['Villavicencio - Bogotá', 'Villavicencio - Yopal'],
    },
    turismo: {
      description: 'Turismo llanero, ríos y parques naturales.',
      topDestinations: ['Caño Cristales (Serranía de la Macarena)', 'Bioparque Los Ocarros', 'Puente Amarillo'],
    },
    educacion: {
      description: 'Sede regional de universidades nacionales.',
      universities: ['Universidad de los Llanos'],
    },
    economia: {
      description: 'Economía petrolera, ganadera y agroindustrial.',
      mainActivities: ['Explotación petrolera', 'Ganadería', 'Cultivo de palma africana'],
    },
  },
  'NARIÑO': {
    transporte: {
      description: 'Corredor fronterizo con Ecuador en la vía Panamericana.',
      mainTerminal: 'Terminal de Transportes de Pasto',
      routes: ['Pasto - Ipiales', 'Pasto - Cali'],
    },
    turismo: {
      description: 'Santuario de Las Lajas y volcán Galeras.',
      topDestinations: ['Santuario de Las Lajas', 'Volcán Galeras', 'Laguna de la Cocha'],
    },
    educacion: {
      description: 'Universidad regional con tradición andina.',
      universities: ['Universidad de Nariño'],
    },
    economia: {
      description: 'Economía agrícola andina y comercio fronterizo.',
      mainActivities: ['Agricultura de papa y lácteos', 'Comercio fronterizo', 'Artesanías'],
    },
  },
  'NORTE DE SANTANDER': {
    transporte: {
      description: 'Nodo fronterizo clave con Venezuela.',
      mainTerminal: 'Terminal de Transportes de Cúcuta',
      routes: ['Cúcuta - Bucaramanga', 'Cúcuta - Bogotá'],
    },
    turismo: {
      description: 'Turismo fronterizo y de montaña en el Catatumbo.',
      topDestinations: ['Parque Nacional Tamá', 'Villa del Rosario', 'Zona Catatumbo'],
    },
    educacion: {
      description: 'Universidad pública de referencia en la frontera.',
      universities: ['Universidad Francisco de Paula Santander'],
    },
    economia: {
      description: 'Economía de comercio fronterizo y agricultura.',
      mainActivities: ['Comercio fronterizo', 'Agricultura', 'Industria del calzado'],
    },
  },
  'PUTUMAYO': {
    transporte: {
      description: 'Corredor de transición entre los Andes y la Amazonía.',
      mainTerminal: 'Terminal de Transportes de Mocoa',
      routes: ['Mocoa - Pasto', 'Mocoa - Florencia'],
    },
    turismo: {
      description: 'Cascadas y turismo de naturaleza amazónica-andina.',
      topDestinations: ['Cascada Fin del Mundo', 'Valle de Sibundoy', 'Laguna de La Cocha'],
    },
    educacion: {
      description: 'Oferta académica limitada con sedes regionales.',
      universities: ['UNAD sede Mocoa'],
    },
    economia: {
      description: 'Economía petrolera y agrícola amazónica.',
      mainActivities: ['Explotación petrolera', 'Agricultura', 'Ganadería'],
    },
  },
  'QUINDIO': {
    transporte: {
      description: 'Corredor vial del Eje Cafetero con alta conectividad turística.',
      mainTerminal: 'Terminal de Transportes de Armenia',
      routes: ['Armenia - Pereira', 'Armenia - Bogotá'],
    },
    turismo: {
      description: 'Valle del Cocora y Paisaje Cultural Cafetero.',
      topDestinations: ['Valle de Cocora', 'Salento', 'Parque del Café'],
    },
    educacion: {
      description: 'Universidad regional con enfoque en turismo y agroindustria.',
      universities: ['Universidad del Quindío'],
    },
    economia: {
      description: 'Economía cafetera y turística.',
      mainActivities: ['Café especial', 'Turismo rural', 'Agroindustria'],
    },
  },
  'RISARALDA': {
    transporte: {
      description: 'Centro logístico del Triángulo del Café.',
      mainTerminal: 'Terminal de Transportes de Pereira',
      routes: ['Pereira - Manizales', 'Pereira - Armenia', 'Pereira - Cali'],
    },
    turismo: {
      description: 'Termales y ecoturismo en el Eje Cafetero.',
      topDestinations: ['Santuario Otún Quimbaya', 'Termales de Santa Rosa', 'Parque Ukumarí'],
    },
    educacion: {
      description: 'Universidad tecnológica de referencia regional.',
      universities: ['Universidad Tecnológica de Pereira'],
    },
    economia: {
      description: 'Economía cafetera, comercial y de servicios.',
      mainActivities: ['Café', 'Comercio', 'Servicios'],
    },
  },
  'SANTAFE DE BOGOTA D.C': {
    transporte: {
      description: 'Sistema de transporte masivo TransMilenio y principal hub aéreo del país.',
      mainTerminal: 'Terminal de Transporte de Bogotá / Aeropuerto El Dorado',
      routes: ['TransMilenio troncales', 'Bogotá - todas las capitales'],
    },
    turismo: {
      description: 'Capital cultural con museos, La Candelaria y Monserrate.',
      topDestinations: ['La Candelaria', 'Cerro de Monserrate', 'Museo del Oro'],
    },
    educacion: {
      description: 'Mayor concentración universitaria del país.',
      universities: ['Universidad Nacional de Colombia', 'Universidad de los Andes', 'Pontificia Universidad Javeriana'],
    },
    economia: {
      description: 'Centro económico y financiero nacional.',
      mainActivities: ['Servicios financieros', 'Industria', 'Comercio'],
    },
  },
  'SANTANDER': {
    transporte: {
      description: 'Corredor vial andino con fuerte tradición de movilidad en moto.',
      mainTerminal: 'Terminal de Transportes de Bucaramanga',
      routes: ['Bucaramanga - Cúcuta', 'Bucaramanga - Bogotá'],
    },
    turismo: {
      description: 'Cañón del Chicamocha y pueblo patrimonio de Barichara.',
      topDestinations: ['Cañón del Chicamocha', 'Barichara', 'San Gil (deportes extremos)'],
    },
    educacion: {
      description: 'Fuerte tradición universitaria industrial.',
      universities: ['Universidad Industrial de Santander'],
    },
    economia: {
      description: 'Economía industrial, avícola y de hidrocarburos.',
      mainActivities: ['Industria petroquímica', 'Avicultura', 'Comercio'],
    },
  },
  'SUCRE': {
    transporte: {
      description: 'Corredor ganadero y de sabanas del Caribe.',
      mainTerminal: 'Terminal de Transportes de Sincelejo',
      routes: ['Sincelejo - Cartagena', 'Sincelejo - Montería'],
    },
    turismo: {
      description: 'Golfo de Morrosquillo y playas del Caribe.',
      topDestinations: ['Golfo de Morrosquillo', 'Coveñas', 'San Onofre'],
    },
    educacion: {
      description: 'Universidad regional con enfoque agropecuario.',
      universities: ['Universidad de Sucre'],
    },
    economia: {
      description: 'Economía ganadera y pesquera.',
      mainActivities: ['Ganadería', 'Pesca', 'Agricultura'],
    },
  },
  'TOLIMA': {
    transporte: {
      description: 'Corredor vial central entre Bogotá y el suroccidente.',
      mainTerminal: 'Terminal de Transportes de Ibagué',
      routes: ['Ibagué - Bogotá', 'Ibagué - Cali'],
    },
    turismo: {
      description: 'Capital musical de Colombia y nevados del Tolima.',
      topDestinations: ['Nevado del Tolima', 'Parque Los Nevados (sector Tolima)', 'Represa de Prado'],
    },
    educacion: {
      description: 'Universidad pública regional consolidada.',
      universities: ['Universidad del Tolima'],
    },
    economia: {
      description: 'Economía agrícola (arroz, algodón) y ganadera.',
      mainActivities: ['Cultivo de arroz', 'Ganadería', 'Agricultura'],
    },
  },
  'VALLE DEL CAUCA': {
    transporte: {
      description: 'Principal puerto del Pacífico y corredor industrial del suroccidente.',
      mainTerminal: 'Terminal de Transportes de Cali',
      routes: ['Cali - Buenaventura', 'Cali - Bogotá', 'Cali - Popayán'],
    },
    turismo: {
      description: 'Capital mundial de la salsa y acceso al Pacífico.',
      topDestinations: ['Cristo Rey', 'Bulevar del Río Cali', 'Buenaventura'],
    },
    educacion: {
      description: 'Alta concentración universitaria del suroccidente.',
      universities: ['Universidad del Valle', 'Universidad Icesi'],
    },
    economia: {
      description: 'Economía industrial, azucarera y portuaria.',
      mainActivities: ['Industria azucarera', 'Actividad portuaria (Buenaventura)', 'Comercio'],
    },
  },
  'VAUPES': {
    transporte: {
      description: 'Movilidad fluvial y aérea en la selva amazónica oriental.',
      mainTerminal: 'Aeropuerto de Mitú',
      routes: ['Mitú - Bogotá (aérea)', 'Mitú - comunidades ribereñas (fluvial)'],
    },
    turismo: {
      description: 'Raudales del río Vaupés y territorios indígenas amazónicos.',
      topDestinations: ['Raudal de Yuruparí', 'Cerro Cupatí', 'Comunidades indígenas del Vaupés'],
    },
    educacion: {
      description: 'Oferta académica prácticamente inexistente fuera de lo técnico.',
      universities: ['SENA Vaupés'],
    },
    economia: {
      description: 'Economía de subsistencia basada en pesca y agricultura tradicional.',
      mainActivities: ['Pesca', 'Agricultura de subsistencia', 'Artesanías indígenas'],
    },
  },
  'VICHADA': {
    transporte: {
      description: 'Aislamiento vial con acceso predominantemente fluvial y aéreo.',
      mainTerminal: 'Aeropuerto de Puerto Carreño',
      routes: ['Puerto Carreño - Bogotá (aérea)', 'Puerto Carreño - Puerto Ayacucho (fluvial)'],
    },
    turismo: {
      description: 'Sabanas orientales y confluencia de los ríos Meta y Orinoco.',
      topDestinations: ['Confluencia del Meta y el Orinoco', 'Cerro Bandera', 'Reserva El Tuparro'],
    },
    educacion: {
      description: 'Oferta académica muy limitada.',
      universities: ['SENA Vichada'],
    },
    economia: {
      description: 'Economía agropecuaria extensiva en la Orinoquía.',
      mainActivities: ['Ganadería extensiva', 'Agricultura', 'Pesca'],
    },
  },
}
