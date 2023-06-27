const mongoose = require("mongoose");

const TechnologySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  background_image: {
    type: String,
    require: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Marca: {
    type: String,
    require: true,
  },
  Ubicacion: {
    type: String,
    require: true,
  },
  Ofertas: {
    type: Number,
    default: 0,
  },
  Disabled: {
    type: Boolean,
    default: false,
  },
  favoritos: {
    type: [String], // Array de IDs de favoritos
    default: [],
  },
  subcategoria: {
    type: {
      TV: {
        type: String,
      },
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      Computacion: {
        type: {
          notebook: Boolean,

          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          PcEscritorio: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Monitores: Boolean,

          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          AccesoriosPc: Boolean,

          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Sillas: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Componentes: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Impresoras: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Proyectores: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Conectividad: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Tablets: Boolean,
          AccesoriosTablet: Boolean,
        },
      },
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      ElectronicaAudioVideo: {
        type: {
          Amplificadores: Boolean,
          AsistentesVirtuales: Boolean,
          Auriculares: Boolean,
          EquiposDj: Boolean,
          AccesoriosDj: Boolean,
          EstudiodeGrabacion: Boolean,
          Grabadoras: Boolean,
          HomeTheatre: Boolean,
          Megafonos: Boolean,
          Microfonos: Boolean,
          Parlantes: Boolean,
          Radios: Boolean,
          Sintonizador: Boolean,
          Tocadiscos: Boolean,
          AccesoriosParaAudio: Boolean,
          ComponentesElectronicos: Boolean,
          Drones: Boolean,
        },
      },
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      ConsolasyVideojuegos: {
        type: {
          Consolas: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Videojuegos: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Accesorios: Boolean,
        },
      },
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      Celulares: {
        type: {
          Smartphones: Boolean,
          Fundas: Boolean,
          Cargadores: Boolean,
        },
      },

      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      //-------------------------------------------------------------------------------------------------------------------------------------------------//
      CamarasyAccesorios: {
        type: {
          Camaras: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          CamarasFilmadoras: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Lentes: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          EstudioseIluminacion: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          CargadoresyBaterias: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Soportes: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Telescopios: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Binoculares: Boolean,
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          //-------------------------------------------------------------------------------------------------------------------------------------------------//
          Microscopios: Boolean,
        },
      },
    },
  },
});
TechModel = mongoose.model("Technology", TechnologySchema);
module.exports = TechModel;

// const TechnologySchema = mongoose.Schema({
//   name: {
//     type: Boolean,
//     require: true,
//   },
//   state: {
//     type: Boolean,
//     require: true,
//   },
//   background_image: {
//     type: Boolean,
//     require: true,
//   },
//   precio: {
//     type: Number,
//     require: true,
//   },
//   Description: {
//     type: Boolean,
//     require: true,
//   },
//   Marca: {
//     type: Boolean,
//     require: true,
//   },
//   Ubicacion: {
//     type: Boolean,
//     require: true,
//   },
//   subcategoria: {
//     type: {
//       TV: {
//         type: {
//           pulgadas: {
//             type: Number,
//           },
//           definicion: {
//             type: Boolean,
//           },
//         },
//       },
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       Computacion: {
//         type: {
//           notebook: {
//             type: {
//               Procesador: { type: Boolean },
//               MemoriaRAM: { type: Boolean },
//               TarjetaGrafica: { type: Boolean },
//               MemoriaGrafica: { type: Boolean },
//               Almacenamiento: { type: Boolean },
//               tamañoPantalla: { type: Boolean },
//               Nucleos: { type: Boolean },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           PcEscritorio: {
//             type: {
//               allInOne: {
//                 type: {
//                   Procesador: { type: Boolean },
//                   MemoriaRAM: { type: Boolean },
//                   TarjetaGrafica: { type: Boolean },
//                   MemoriaGrafica: { type: Boolean },
//                   Almacenamiento: { type: Boolean },
//                   tamañoPantalla: { type: Boolean },
//                   Nucleos: { type: Boolean },
//                 },
//               },
//               Escritorio: {
//                 type: {
//                   Procesador: { type: Boolean },
//                   MemoriaRAM: { type: Boolean },
//                   TarjetaGrafica: { type: Boolean },
//                   MemoriaGrafica: { type: Boolean },
//                   Almacenamiento: { type: String },
//                   tamañoPantalla: { type: String },
//                   Nucleos: { type: String },
//                 },
//               },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Monitores: {
//             type: {
//               monitores: {
//                 type: {
//                   tamañoDePantalla: { type: String },
//                   defincion: { type: String },
//                 },
//               },
//               soportes: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           AccesoriosPc: {
//             type: {
//               Auriculares: {
//                 type: {
//                   inalambricos: { type: Boolean, default: false },
//                   cable: { type: Boolean, default: false },
//                   microfono: { type: Boolean, default: false },
//                 },
//               },
//               Mouse: {
//                 type: {
//                   mouse: { type: Boolean, default: false },
//                   mousePad: { type: Boolean, default: false },
//                 },
//               },
//               Teclado: { type: Boolean, default: false },
//               Parlantes: { type: Boolean, default: false },
//               Webcam: { type: Boolean, default: false },
//               Pendrive: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Sillas: {
//             type: {
//               Gamer: { type: Boolean, default: false },
//               Escritorio: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Componentes: {
//             type: {
//               CoolersyVentiladores: {
//                 type: {
//                   coolersPc: { type: Boolean, default: false },
//                   coolersLaptop: { type: Boolean, default: false },
//                   rejillasCoolers: { type: Boolean, default: false },
//                 },
//               },
//               DiscosyAccesorios: {
//                 type: {
//                   discosRigidosySSD: { type: Boolean, default: false },
//                   Accesorios: {
//                     type: {
//                       Adaptadores: { type: Boolean, default: false },
//                       cablesAdaptadores: { type: Boolean, default: false },
//                     },
//                   },
//                 },
//               },
//               FuentesDeAlimentacion: {
//                 type: {
//                   cablesDeAlimentacion: { type: Boolean, default: false },
//                   fuentes: { type: Boolean, default: false },
//                 },
//               },
//               GabinetesdePc: { type: Boolean, default: false },
//               MemoriasRam: {
//                 type: {
//                   modulosDeMemoria: { type: String },
//                   Velocidad: { type: String },
//                   CapacidadTotal: { type: String },
//                   Tecnologia: { type: String },
//                   LatenciaCas: { type: String },
//                 },
//               },
//               Procesadores: {
//                 type: {
//                   Modelo: { type: String },
//                   Linea: { type: String },
//                   Nucleos: { type: Number },
//                   cantidadHilosCPU: { type: String },
//                   tamañoMaxMemoriaRamSoportada: { type: String },
//                   potenciaDiseñoTermico: { type: String },
//                 },
//               },
//               Placas: {
//                 type: {
//                   PlacasMadre: {
//                     type: {
//                       Plataforma: { type: String },
//                       TipodememoriaRAM: { type: String },
//                       CapacidadmáximasoportadadelamemoriaRAM: { type: String },
//                     },
//                   },
//                   EditorasVideo: { type: Boolean, default: false },
//                   PlacasControladoras: { type: Boolean, default: false },
//                   PlacasUSByFirewire: { type: Boolean, default: false },
//                   PlacasdeSonido: {
//                     type: {
//                       externa: { type: Boolean, default: false },
//                       interna: { type: Boolean, default: false },
//                     },
//                   },
//                   PlacasdeVideo: {
//                     type: {
//                       TamañodelaMemoria: { type: String },
//                       TipoDeMemoriaGrafica: { type: String },
//                       CantidadDeNucleos: { type: String },
//                       ResolucionMaxima: { type: String },
//                     },
//                   },
//                 },
//               },
//               SintonizadoresdeTV: { type: Boolean, default: false },
//               ZipDrivers: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Impresoras: {
//             type: {
//               TecnologiaDeImpresion: { type: String },
//               TipoDeImpresion: { type: String },
//               CapacidadMaximaDeHojas: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Proyectores: {
//             type: {
//               BrilloDeImagen: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Conectividad: {
//             type: {
//               adaptadoresUSB: {
//                 type: {
//                   bluetooth: { type: Boolean, default: false },
//                   wifi: { type: Boolean, default: false },
//                 },
//               },
//               antenasWireless: { type: Boolean, default: false },
//               cablesDeRedyAccesorios: {
//                 type: {
//                   adaptadorCablesdeRed: { type: Boolean, default: false },
//                   cablesyRed: { type: Boolean, default: false },
//                   Capuchonesparafichas: { type: Boolean, default: false },
//                   fichas: { type: Boolean, default: false },
//                   OrganizadoresDeCables: { type: Boolean, default: false },
//                 },
//               },
//               fuentesPoe: { type: Boolean, default: false },
//               Modems: {
//                 type: {
//                   tipoDeModem: { type: String },
//                 },
//               },
//               PatchPanels: { type: Boolean, default: false },
//               PlacasDeRed: { type: Boolean, default: false },
//               RacksparaServidores: { type: Boolean, default: false },
//               Routers: {
//                 type: {
//                   tipoDeFrecuencia: { type: String },
//                   tipoDeConexion: { type: String },
//                   cantAntenasExternas: { type: String },
//                   cantAntenasInternas: { type: String },
//                   cantPuertosLAN: { type: String },
//                 },
//               },
//               Switches: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           TabletsyAccesorios: {
//             tablets: { type: Boolean, default: false },
//             accesorios: {
//               type: {
//                 adaptadores: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 cables: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 cargadores: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 estuchesyFundas: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 lapicesOpticos: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 soportes: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 teclados: {
//                   type: Boolean,
//                   default: false,
//                 },
//                 protectorPantalla: {
//                   type: Boolean,
//                   default: false,
//                 },
//               },
//             },
//           },
//         },
//       },
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       Electronica_audio_video: {
//         type: {
//           Audio: {
//             type: {
//               AmplificadoresyReceivers: {
//                 type: {
//                   amplificadorDeAudio: {
//                     type: {
//                       PotenciaDeSalida: { type: String },
//                       CantidadDecanales: { type: String },
//                     },
//                   },
//                   Preamplificador: {
//                     type: Boolean,
//                     default: false,
//                   },
//                   SintoAmplificador: {
//                     type: Boolean,
//                     default: false,
//                   },
//                 },
//               },
//               AsistentesVirutales: { type: Boolean, default: false },
//               Auriculares: {
//                 type: {
//                   inEar: { type: Boolean, default: false },
//                   OverEar: { type: Boolean, default: false },
//                   HeadSet: { type: Boolean, default: false },
//                   NeckBand: { type: Boolean, default: false },
//                 },
//               },
//               CDPlayers: { type: Boolean, default: false },
//               Casetteras: { type: Boolean, default: false },
//               CassetesDeAudio: { type: Boolean, default: false },
//               EquiposDeDjyAccesorios: {
//                 Bandejas: { type: Boolean, default: false },
//                 CompacterasDeDJ: { type: Boolean, default: false },
//                 Controladores: { type: Boolean, default: false },
//                 DivisoresDeFrecuencia: { type: Boolean, default: false },
//                 Ecualizador: { type: Boolean, default: false },
//                 LucesyEfectos: { type: Boolean, default: false },
//                 Mixers: { type: Boolean, default: false },
//               },
//               EstudioDeGrabacion: {
//                 type: {
//                   consolasDeSonido: { type: Boolean, default: false },
//                   InterfacesDeAudio: {
//                     type: {
//                       cantidaddeEntradas: { type: String },
//                       cantidadDeSalidas: { type: String },
//                     },
//                   },
//                   MonitoresDeEstudio: { type: Boolean, default: false },
//                   PlacasAcusticas: { type: Boolean, default: false },
//                   SoftwaredeAdio: { type: Boolean, default: false },
//                 },
//               },
//               Grabadores: {
//                 type: {
//                   Portatiles: { type: Boolean, default: false },
//                   Cinta: { type: Boolean, default: false },
//                   Periodisticas: { type: Boolean, default: false },
//                 },
//               },
//               HomeTheatre: {
//                 type: {
//                   PotenciaRMS: { type: String },
//                   cantidadParlantes: { type: String },
//                 },
//               },
//               Megafonos: {
//                 type: Boolean,
//                 default: false,
//               },
//               Microfonos: { type: Boolean, default: false },
//               MiniDiscs: { type: Boolean, default: false },
//               ParlantesyBafles: {
//                 type: {
//                   PotenciaDeSalida: { type: String },
//                   CantidadDeParlantes: { type: String },
//                   TipoDeParlante: { type: String },
//                   FormatodeParlante: { type: String },
//                 },
//               },
//               RadioDespertadores: { type: Boolean, default: false },
//               RadioGrabadores: { type: Boolean, default: false },
//               RadiosAM_FM: { type: Boolean, default: false },
//               Sintonizadores: { type: Boolean, default: false },
//               SoportesHomeTheathre: { type: Boolean, default: false },
//               SoportesParlante: { type: Boolean, default: false },
//               Tocadiscos: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Accesorios_AudioyVideo: {
//             type: {
//               Adaptadores: {
//                 type: Boolean,
//                 default: false,
//               },
//               Conversores_Audio_Video: {
//                 type: Boolean,
//                 default: false,
//               },
//               Conversores_TV: {
//                 type: Boolean,
//                 default: false,
//               },
//               Monitores_In_Ear: {
//                 type: Boolean,
//                 default: false,
//               },
//               Otros: {
//                 type: Boolean,
//                 default: false,
//               },
//               Puntero_Laser: {
//                 type: Boolean,
//                 default: false,
//               },
//               Switches_Splitters: {
//                 type: Boolean,
//                 default: false,
//               },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           ComponenteElectronicos: {
//             type: {
//               Arduino: { type: Boolean, default: false },
//               Conectores: { type: Boolean, default: false },
//               Conversores_Corriente: { type: Boolean, default: false },
//               Disipadores_Termicos: {
//                 type: {
//                   Otros: { type: Boolean, default: false },
//                   Pasta_Termica: { type: Boolean, default: false },
//                   Plaquetas_Disipadoras: { type: Boolean, default: false },
//                   Thermal_Pads: { type: Boolean, default: false },
//                 },
//               },
//               Displays_LCD: { type: Boolean, default: false },
//               Fuentes_Conmutadas: { type: Boolean, default: false },
//               Inversores_Corriente: { type: Boolean, default: false },
//               Lectores_Laser: { type: Boolean, default: false },
//               Otros: { type: Boolean, default: false },
//               Pasivos: {
//                 type: {
//                   Capacitores: { type: Boolean, default: false },
//                   Otros: { type: Boolean, default: false },
//                   Potenciometros: { type: Boolean, default: false },
//                   Resistores: { type: Boolean, default: false },
//                   Termistores: { type: Boolean, default: false },
//                 },
//               },
//               Plaquetas: { type: Boolean, default: false },
//               Programadores: { type: Boolean, default: false },
//               Protoboards: { type: Boolean, default: false },
//               Raspberry_Pi: { type: Boolean, default: false },
//               Semiconductores: {
//                 Bobinas: { type: Boolean, default: false },
//                 Chips_Leds: { type: Boolean, default: false },
//                 Circuitos_Integrados: { type: Boolean, default: false },
//                 Diodos_Rectificadores: { type: Boolean, default: false },
//                 Microcontroladores: { type: Boolean, default: false },
//                 Modulos_IGBT: { type: Boolean, default: false },
//                 Optoacopladores: { type: Boolean, default: false },
//                 Otros: { type: Boolean, default: false },
//                 Reguladores_Tension: { type: Boolean, default: false },
//                 Reles: { type: Boolean, default: false },
//                 Tiristores: { type: Boolean, default: false },
//                 Transistores: { type: Boolean, default: false },
//                 Valvulas_Electronicas: { type: Boolean, default: false },
//               },
//               Sensores_Inductivos: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Drones_Accesorios: {
//             type: {
//               Drones: { type: Boolean, default: false },
//               Otros: { type: Boolean, default: false },
//             },
//           },
//         },
//       },
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       ConsolasyVideojuegos: {
//         type: {
//           Consolas: {
//             type: {
//               modelo: { type: String },
//               capacidad: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Videojuegos: {
//             type: {
//               consola: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Accesorios: {
//             type: {
//               joystick: { type: Boolean, default: false },
//               lentesVR: { type: Boolean, default: false },
//             },
//           },
//         },
//       },
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       Celulares: {
//         type: {
//           Smartphones: {},
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Auriculares: {
//             type: {
//               inEar: { type: Boolean, default: false },
//               OverEar: { type: Boolean, default: false },
//               HeadSet: { type: Boolean, default: false },
//               NeckBand: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           FundasyAcc: {
//             type: {
//               carcasas: { type: Boolean, default: false },
//               fundas: { type: Boolean, default: false },
//               protectoresDePantalla: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Cargadores: { type: Boolean, default: false },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Baterias: { type: Boolean, default: false },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           RealidadVirtual: { type: Boolean, default: false },
//         },
//       },
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       //-------------------------------------------------------------------------------------------------------------------------------------------------//
//       CamarasyAccesorios: {
//         type: {
//           Camaras: {
//             type: {
//               camarasAnalogicas: {
//                 type: {
//                   tipoDeCamara: { type: String },
//                 },
//               },
//               camarasDigitales: {
//                 type: {
//                   tipoDeCamara: { type: String },
//                   Resolucion: { type: String },
//                   ZoomOptico: { type: String },
//                   TamañoSensor: { type: String },
//                   VelocidadMaxObturador: { type: String },
//                   TamañoPantalla: { type: String },
//                 },
//               },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           CamarasFilmadores: {
//             type: {
//               Tipo: { type: String },
//               Modelo: { type: String },
//               Resolucion: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Lentes: {
//             type: {
//               Tipo: { type: String },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           EstudioseIluminacion: {
//             type: {
//               DifusoresySoftBox: { type: Boolean, default: false },
//               FlashesyAccesorios: {},
//               FondosFotograficos: { type: Boolean, default: false },
//               Fotometros: { type: Boolean, default: false },
//               Iluminadores: {
//                 type: {
//                   Potencia: { type: String },
//                   ColorLuz: { type: String },
//                 },
//               },
//               PantallasReflectoras: { type: Boolean, default: false },
//               SoportesparaFondos: { type: Boolean, default: false },
//               Tripodes: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           CargadoresyBaterias: {
//             type: {
//               BateriasparaCamaras: { type: Boolean, default: false },
//               BaterryGrips: { type: Boolean, default: false },
//               CargadoresDeBaterias: { type: Boolean, default: false },
//               CargadoresparaCamaras: { type: Boolean, default: false },
//             },
//           },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Soportes: { type: Boolean, default: false },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Telescopios: { type: Boolean, default: false },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Binoculares: { type: Boolean, default: false },
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           //-------------------------------------------------------------------------------------------------------------------------------------------------//
//           Microscopios: { type: Boolean, default: false },
//         },
//       },
//     },
//   },
// });
// module.exports = model("Technology", TechnologySchema);
