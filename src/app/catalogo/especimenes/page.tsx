'use client'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'
import { useState } from 'react'
type E = { n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; video?:string }
type F = { id:string; nm:string; e:E[] }
const FAM:F[] = [
  { id:'Brassolidae', nm:'Brassolidae', e:[{n:'Caligo eurilochus livius',p:4.0,s:800},{n:'Caligo idomenius idomenides',p:6.5,s:100},{n:'Caligo illioneus',p:3.5,s:200},{n:'Caligo placidianus',p:4.0,s:200},{n:'Caligo prometheus',p:9.0,s:200},{n:'Caligo superbus',p:15.0,s:50},{n:'Caligo teucer semicaerulea',p:3.5,s:300},{n:'Dynastor darius darius',p:15.0,s:10},{n:'Opoptera aorsa',p:4.5,s:100},{n:'Opoptera arsippe arsippe',p:4.5,s:200},{n:'Opsiphanes bogatanus',p:3.5,s:100},{n:'Opsiphanes tamarindi incolumis',p:4.0,s:50},{n:'Caligo illioneus oberon',p:4.0,s:200},{n:'Caligo Oberthuri floklides',p:10.0,s:50},{n:'Eryphanis Polyxena',p:7.5,s:200},{n:'Catoblepia Berecynthia',p:10.0,s:20},{n:'Dynastor macrosirus stix',p:30.0,s:5},{n:'Opoptera Arsippe Bracteolata',p:4.0,s:20},{n:'Opsiphanes Cassina',p:3.5,s:50},{n:'Opsiphanes Sallei',p:3.0,s:100},{n:'Opsiphanes Invirae Agasthenes',p:2.5,s:200},{n:'Opsiphanes Quiteria Quirinalis',p:2.5,s:100}] },
  { id:'Danaidae', nm:'Danaidae', e:[{n:'Danaus plexippus nigrippus',p:2.5,s:2000},{n:'Lycorea halia',p:4.0,s:20},{n:'Lycorea ilione lamaris',p:1.5,s:2000},{n:'Lycorea Ituna Ilione Phenarete',p:2.0,s:100},{n:'Danaus Gilippus thersippus',p:3.0,s:200}] },
  { id:'Heliconidae', nm:'Heliconidae & Ithomidae', e:[{n:'Dione juno',p:1.3,s:5000},{n:'Dione moneta',p:2.5,s:500},{n:'Dryas julia',p:1.3,s:5000},{n:'Eueides (Heliconius) aliphera',p:1.8,s:2000},{n:'Eueides isabella dissolutus',p:2.5,s:5},{n:'Euides tales',p:2.0,s:500},{n:'Godyris duillia (Ithomidae)',p:2.5,s:500},{n:'Godyris zavalata huanaco',p:1.8,s:500},{n:'Heliconius burneyi huebneri',p:4.0,s:100},{n:'Heliconius erato microclea',p:2.5,s:200},{n:'Heliconius hecale shanki',p:5.5,s:10},{n:'Heliconius melpomene amaryllis',p:2.0,s:5000},{n:'Heliconius melpomene',p:2.5,s:20},{n:'Heliconius numata bicoloratus',p:2.0,s:500},{n:'Heliconius telesiphe telesiphe',p:2.0,s:500},{n:'Heliconius wallacei flavescens',p:1.8,s:500},{n:'Methona curvifascia',p:1.8,s:3000},{n:'Philaethria (Metamorpha) dido',p:4.0,s:200},{n:'Thyridia psidii cetoides',p:1.5,s:2000},{n:'Tithorea harmonia',p:2.5,s:200},{n:'Hypothyris semifulva',p:2.0,s:300},{n:'Mechanitis polymnia',p:2.0,s:10}] },
  { id:'Lycaenidae', nm:'Lycaenidae', e:[{n:'Arawacus seperata',p:6.5,s:200},{n:'Arcas imperialis',p:15.0,s:200},{n:'Arcas tuneta',p:15.0,s:100},{n:'Evenus gannymedes',p:18.0,s:20},{n:'Thecla gibberosa',p:12.0,s:100},{n:'Arawacus dolylas',p:10.0,s:15}] },
  { id:'Morphidae', nm:'Morphidae', e:[{n:'Morpho absoloni',p:43.0,s:100},{n:'Morpho aurora aureola',p:13.0,s:200},{n:'Morpho lympharis selenarys',p:13.5,s:1000},{n:'Morpho sulkowskyi  descimokoenigi',p:13.5,s:200},{n:'Morpho rhetenor cacica',p:33.0,s:500},{n:'Morpho rhtenor helena',p:45.0,s:1000},{n:'Morpho telemachus',p:5.5,s:500},{n:'Morpho zephritis',p:13.5,s:1000},{n:'Morpho theseus juturna',p:20.0,s:500},{n:'Morpho menelaus assarpai',p:12.0,s:500},{n:'Morpho Cisseis gahua(brows and asure)',p:15.0,s:200},{n:'Morpho cisseis phanademus(azure)',p:18.0,s:50},{n:'Morpho adonis huallaga',p:12.0,s:200},{n:'Morpho amphitriom cinerous',p:43.0,s:100},{n:'Morpho deidamia marie',p:7.5,s:1000},{n:'Morpho achilles helenor',p:5.5,s:1000},{n:'Morpho didius',p:7.0,s:5000},{n:'Morpho didius tingomaria',p:7.0,s:5000},{n:'Morpho menelaus michaelus',p:20.0,s:20},{n:'Morpho Menelaus pucallpensis',p:21.0,s:50},{n:'Morpho helenor amazonius',p:6.0,s:200},{n:'Morpho mariosiajane',p:43.0,s:50},{n:'Morpho sulkowoskii Nieva',p:28.0,s:50},{n:'Morpho sulkowoskii zachi',p:40.0,s:100},{n:'Morpho godartii julanthicus',p:10.0,s:500},{n:'Morpho  Menelaus  ssp. zischkai',p:12.0,s:5000},{n:'Morpho Rethenor mariosiojanae (small)',p:45.0,s:200},{n:'Morpho  aurora Isidorssoni',p:15.0,s:100},{n:'Morpho aurora lamasi',p:14.0,s:200},{n:'Morpho Cisseis gahua ssp. Gahua',p:80.0,s:10},{n:'Morpho Cisseis gahua ssp. Gahua',p:90.0,s:3}] },
  { id:'Nymphalidae', nm:'Nymphalidae', e:[{n:'Adelpha mesentina',p:1.8,s:500},{n:'Adelpha erotia erotia f. erotia',p:2.0,s:200},{n:'Adelpha iphiclus',p:2.0,s:200},{n:'Adelpha lycorias lara',p:2.0,s:500},{n:'Agraulis vanillae lucina f. catella',p:2.5,s:500},{n:'Agrias amydon zenodorus',p:60.0,s:100},{n:'Agrias claudina lugens',p:10.0,s:2000},{n:'Agrias hewitsonius beata (=beatifica beata)',p:6.0,s:3000},{n:'Agrias hewitsonius stuarti (=beatifica stuarti)',p:40.0,s:10},{n:'Agrias pericles peruviana',p:120.0,s:10},{n:'Agrias sardanapulis',p:30.0,s:200},{n:'Asterope degandii allyni (= A. adamsi)',p:5.0,s:200},{n:'Asterope degandii bartletti',p:5.5,s:200},{n:'Asterope markii davisi',p:3.0,s:500},{n:'Asterope markii hewitsoni',p:20.0,s:5},{n:'Asterope optima f. eminens',p:5.5,s:500},{n:'Asterope optima philotina',p:3.5,s:20},{n:'Asterope whitelyi whitelyi',p:5.0,s:50},{n:'Baeotus (Megistanis) amazonicus',p:5.0,s:200},{n:'Baeotus (Megistanis) japetus',p:5.0,s:200},{n:'Baeotus (Megistanis) deucalion',p:5.0,s:300},{n:'Batesia hypochlora f.hypochlora',p:8.0,s:500},{n:'Biblis hyperia',p:2.0,s:500},{n:'Callicore (Catagramma)hytaspes',p:2.0,s:500},{n:'Callicore cynosura -Verso Aberration',p:2.5,s:2000},{n:'Callicore cynosura cynosura',p:2.5,s:5000},{n:'Callicore discrepans',p:10.0,s:500},{n:'Callicore eunomia',p:2.0,s:1000},{n:'Callicore excelsior pastazza',p:3.0,s:200},{n:'Callicore felderi cajetani',p:3.0,s:100},{n:'Callicore hesperis',p:2.5,s:1000},{n:'Callicore lyca aegina',p:2.5,s:5000},{n:'Callicore texa maimuna',p:3.0,s:100},{n:'Callicore tolima',p:6.5,s:50},{n:'Callidula pyramus',p:4.0,s:10},{n:'Catenophele salambria',p:3.0,s:500},{n:'Catonephele acontius',p:2.0,s:500},{n:'Catonephele chromis chromis',p:2.5,s:100},{n:'Catonephele numilia (Peru)',p:2.5,s:500},{n:'Catonephele numilia (Peru) F',p:6.0,s:4},{n:'Catonephele selambria',p:2.5,s:100},{n:'Coenophlebia (Anaea) archidona',p:6.5,s:100},{n:'Colubura dirce',p:2.0,s:200},{n:'Consul (Anaea) fabius divisus',p:2.5,s:200},{n:'Diaethria (Catacore) kolyma',p:3.0,s:2000},{n:'Diaethria (Catacore) kolyma f. pasithea',p:3.5,s:100},{n:'Diaethria clymena peruviana',p:1.8,s:5000},{n:'Diaethria neglecta neglecta',p:1.5,s:5000},{n:'Doxocopa agathina',p:4.0,s:200},{n:'Doxocopa cherubina',p:2.5,s:5000},{n:'Doxocopa cyane',p:2.5,s:500},{n:'Doxocopa elis',p:2.0,s:1000},{n:'Doxocopa lavinia',p:3.0,s:200},{n:'Doxocopa linda f. linda',p:2.5,s:500},{n:'Doxocopa linda f. selina',p:2.0,s:1000},{n:'Doxocopa pavon',p:3.5,s:150},{n:'Doxocopa zunilda floris',p:4.0,s:50},{n:'Eunica carias ninetta',p:5.0,s:100},{n:'Eunica alcmena flora',p:4.0,s:2000},{n:'Eunica ameliae',p:4.0,s:2000},{n:'Eunica bechina',p:5.5,s:50},{n:'Eunica caralis caralis',p:6.0,s:100},{n:'Eunica carias ninetta',p:6.0,s:100},{n:'Eunica chlorochroa',p:5.0,s:200},{n:'Eunica clytia',p:3.5,s:50},{n:'Eunica eurota',p:4.5,s:500},{n:'Eunica excelsa',p:4.5,s:500},{n:'Eunica malvina',p:4.0,s:500},{n:'Eunica mygdona',p:6.5,s:50},{n:'Eunica norica',p:2.5,s:5000},{n:'Eunica orphise',p:5.0,s:50},{n:'Eunica pomona pomona',p:7.5,s:20},{n:'Eunica sophonisba agele',p:12.0,s:5},{n:'Eunica sydonia',p:6.0,s:100},{n:'Eunica veronica',p:8.0,s:200},{n:'Eunica volumna celma',p:4.0,s:500},{n:'Fountainea (Anaea) eurypyle (=tehuana)',p:2.0,s:2000},{n:'Fountainea (Anaea) ryphea ryphea (Peru)',p:2.0,s:2000},{n:'Hamadryas amphinome',p:3.5,s:500},{n:'Hamadryas arinome',p:3.0,s:500},{n:'Hamadryas chloe',p:3.0,s:50},{n:'Hamadryas epinome',p:3.0,s:100},{n:'Hamadryas feronia',p:2.5,s:2000},{n:'Hamadryas fornax',p:3.0,s:500},{n:'Hamadryas iphthime iphthime',p:2.0,s:500},{n:'Hamadryas laodamia laodamia',p:4.0,s:500},{n:'Historis odius',p:1.5,s:5000},{n:'Junonia l(Precis) lavinia lavinia',p:3.5,s:500},{n:'Marpesia berania',p:1.2,s:5000},{n:'Hypna (Anaea) clymenestra negra',p:1.5,s:500},{n:'Marpesia coresia',p:2.0,s:500},{n:'Marpesia crethon',p:1.5,s:2000},{n:'Marpesia hermione',p:3.0,s:50},{n:'Marpesia marcella/corinna',p:2.5,s:5000},{n:'Marpesia petreus',p:3.0,s:100},{n:'Memphis (Anaea) acaudata',p:8.0,s:20},{n:'Memphis (Anaea) alberta',p:8.0,s:20},{n:'Memphis (Anaea) arginussa (Peru)',p:2.0,s:100},{n:'Memphis (Anaea) cerelia (Peru)',p:4.0,s:500},{n:'Memphis (Anaea) falcata',p:15.0,s:20},{n:'Memphis (Anaea) florita',p:3.5,s:100},{n:'Memphis (Anaea) lemnos (Peru)',p:2.5,s:200},{n:'Memphis (Anaea) lineata (Peru)',p:3.0,s:500},{n:'Memphis (Anaea) mora montana',p:3.0,s:100},{n:'Memphis (Anaea) moruus morpheus',p:4.0,s:200},{n:'Memphis (Anaea) offa',p:5.0,s:100},{n:'Memphis (Anaea) philumena philumena (Peru)',p:3.0,s:500},{n:'Memphis (Anaea) pithyusa pithyusa (Peru)',p:3.0,s:500},{n:'Memphis (Anaea) polycarmes (Peru)',p:2.5,s:500},{n:'Memphis (Anaea) polyxo',p:3.5,s:500},{n:'Memphis (Anaea) praxias (Peru)',p:4.0,s:500},{n:'Memphis (Anaea) xenocles xenocles (Peru)',p:2.5,s:500},{n:'Napocles jucunda',p:4.0,s:500},{n:'Nessaea hewitsoni',p:4.0,s:500},{n:'Orophila (Perisama) diotima cecidas',p:2.5,s:20},{n:'Panacea prola',p:2.5,s:5000},{n:'Panacea regina chalcothea',p:3.5,s:500},{n:'Paulogramma pyracmon peristera',p:2.0,s:3000},{n:'Perisama alicia',p:3.0,s:500},{n:'Perisama ambatensis',p:5.0,s:500},{n:'Perisama bomplandii albipenis',p:4.0,s:200},{n:'Perisama canoma',p:2.5,s:500},{n:'Perisama cecidas',p:4.0,s:50},{n:'Perisama comnena',p:3.0,s:500},{n:'Perisama hilara',p:3.5,s:500},{n:'Perisama humboldti',p:3.0,s:500},{n:'Perisama jurinei jurinei',p:3.5,s:500},{n:'Perisama lanice picteti',p:3.0,s:500},{n:'Perisama oppellii viridinota',p:4.0,s:100},{n:'Perisama pericles',p:3.0,s:500},{n:'Perisama philinus saussurei',p:3.5,s:500},{n:'Perisama tringa',p:3.5,s:500},{n:'Perisama vitringa vitringa',p:3.5,s:500},{n:'Perisama xanthica xanthica',p:3.5,s:500},{n:'Polygrapha (Anaea) cyanea cyanea',p:3.5,s:500},{n:'Polygrapha (Anaea) tyrianthina',p:15.0,s:100},{n:'Polygrapha (Anaea) xenocrates xenocrates (Peru)',p:2.5,s:200},{n:'Prepona (Archeoprepona) amphimachus',p:4.0,s:200},{n:'Prepona (Archeoprepona) camilla',p:3.0,s:200},{n:'Prepona (Archeoprepona) demophon muson',p:3.0,s:500},{n:'Prepona (Archeoprepona) licomedes',p:4.0,s:500},{n:'Prepona (Archeoprepona) meander megabates',p:4.0,s:500},{n:'Prepona (Archeoprepona/Norepa) chromus',p:3.0,s:500},{n:'Prepona deiphile neoterpe',p:50.0,s:5},{n:'Prepona dexamenes',p:18.0,s:5},{n:'Prepona eugenes',p:4.0,s:500},{n:'Prepona laertes',p:4.0,s:500},{n:'Prepona pheridamas',p:4.0,s:500},{n:'Prepona praeneste (Dept San Martin, N. Peru)',p:80.0,s:20},{n:'Prepona praeneste confusa',p:70.0,s:20},{n:'Prepona praeneste praenestina',p:70.0,s:50},{n:'Prepona sub-omphale pseudoomphale',p:25.0,s:5},{n:'Pyrrhogyra edocla maculata',p:1.5,s:500},{n:'Pyrrhogyra neaerea',p:1.5,s:500},{n:'Pyrrhogyra otalais',p:1.5,s:500},{n:'Siderone (Anaea) galanthis galanthis (=marthesia)',p:10.0,s:50},{n:'Siderone (Anaea) galanthis thebais',p:10.0,s:50},{n:'Siproeta (Victorina) stelenes',p:2.0,s:5000},{n:'Siproeta epaphus',p:1.5,s:5000},{n:'Smryna blomfieldia',p:3.0,s:100},{n:'Temenis lathoe',p:3.0,s:100},{n:'Temenis pulchra pallidior',p:2.0,s:200},{n:'Villa emilia',p:2.0,s:100},{n:'Zaretis (Anaea) isidora',p:3.0,s:300},{n:'Anaea anna',p:15.0,s:50}] },
  { id:'Papilionidae', nm:'Papilionidae', e:[{n:'Battus crassus',p:3.5,s:50},{n:'Battus madyes chlorodamas',p:3.5,s:50},{n:'Battus polydamas',p:4.0,s:20},{n:'Battus streckerianus',p:9.0,s:50},{n:'Eurytides leucaspis',p:1.8,s:1000},{n:'Eurytides serville',p:1.4,s:5000},{n:'Heraclides (Papilio) anchisiades',p:1.8,s:500},{n:'Heraclides (Papilio) torquatus torquatus',p:1.8,s:2000},{n:'Mimoides (Eurytides) ariarathes gayi',p:4.0,s:5},{n:'Mimoides (Eurytides) pausianus cleombrotus',p:8.0,s:10},{n:'Mimoides (Eurytides) xeniades',p:1.8,s:500},{n:'Neographium (Eurytides) agesilaus',p:1.8,s:500},{n:'Neographium (Eurytides) dioxippus diores',p:2.5,s:100},{n:'Neographium (Eurytides) thyastes thyastinus',p:3.5,s:200},{n:'Papilio (Heraclides) androgeus',p:2.7,s:200},{n:'Papilio (Heraclides) isodorus tingo',p:1.8,s:500},{n:'Papilio xanthopleura',p:40.0,s:10},{n:'Parides aeneas bolivar',p:17.5,s:20},{n:'Parides chabrias',p:7.0,s:100},{n:'Parides erlaces (=erathalion) xanthias',p:3.5,s:200},{n:'Parides lysander brissonius',p:9.0,s:20},{n:'Parides neophilus anaximenes',p:7.5,s:20},{n:'Parides phalaceus nieva',p:20.0,s:10},{n:'Parides pizzaro',p:5.0,s:100},{n:'Parides sesostris',p:2.5,s:200},{n:'Parides vertumnus astorius',p:2.5,s:500},{n:'Parides vertumnus bogatanus',p:4.0,s:20},{n:'Pterourus (Papilio) bachus chrysomelus',p:12.0,s:20},{n:'Pterourus (Papilio) cacicus inca',p:40.0,s:100},{n:'Pterourus (Papilio) cacicus mendozaensis',p:60.0,s:20},{n:'Pterourus (Papilio) euterpinus',p:4.0,s:100},{n:'Pterourus (Papilio) menatius bitias',p:3.0,s:2000},{n:'Pterourus (Papilio) menatius coelebs',p:25.0,s:5},{n:'Pterourus (Papilio) warscewiczi jelskii',p:10.0,s:100},{n:'Pterourus (Papilio) warscewiczi mercedes',p:10.0,s:200},{n:'Pterourus (Papilio) zagreus batesi',p:15.0,s:20},{n:'Pterourus (Papilio) zagreus chrysoxanthus',p:6.5,s:500},{n:'Pterourus (Papilio) zagreus',p:6.5,s:500}] },
  { id:'Pieridae', nm:'Pieridae', e:[{n:'Anteos chlorinde',p:45.0,s:100},{n:'Archonias (=Catasticta) hebra',p:15.0,s:200},{n:'Archonias (=Catasticta) eurigania straminea',p:20.0,s:50},{n:'Archonias (=Catasticta) hebra',p:15.0,s:1000},{n:'Archonias (=Catasticta) poujadei',p:13.0,s:200},{n:'Archonias bellona negrina',p:35.0,s:500},{n:'Ascia buniae',p:45.0,s:1000},{n:'Dismorphia amphione',p:6.0,s:500},{n:'Eurema arbela',p:14.0,s:1000},{n:'Eurema reticulata',p:24.0,s:500},{n:'Hesperocharis marchali coloe',p:12.0,s:500},{n:'Itaballia demophile demophile',p:15.0,s:200},{n:'Leptophobia aripa aripa',p:18.0,s:50},{n:'Leptophobia eleone eleone',p:12.0,s:200},{n:'Leptophobia philoma',p:48.0,s:100},{n:'Leptophobia tovaria maruga',p:7.5,s:1000},{n:'Lieinix (Dismorphia) nemesis',p:5.5,s:1000},{n:'Methania agasicles',p:6.5,s:5000},{n:'Methania aureomaculata',p:6.5,s:5000},{n:'Pereute callinara',p:23.0,s:20},{n:'Pereute charops peruviana',p:2.5,s:200},{n:'Perrhybris lorena lorena',p:1.8,s:2000},{n:'Phoebis (Aphrissa) statira',p:2.5,s:500},{n:'Phoebis (Rhabdodryas) trite',p:3.0,s:1000},{n:'Phoebis argante',p:1.8,s:5000},{n:'Phoebis neocypris rurina',p:1.5,s:5000},{n:'Phoebis philea',p:1.8,s:5000},{n:'Pieriballia mandela apicalis',p:1.5,s:500}] },
  { id:'Riodinidae', nm:'Riodinidae', e:[{n:'Ancyluris aulestes',p:45.0,s:100},{n:'Ancyluris etias',p:15.0,s:200},{n:'Ancyluris formisissima venerabilis',p:20.0,s:50},{n:'Ancyluris huscar',p:15.0,s:1000},{n:'Ancyluris meliboeus eudaemon',p:13.0,s:200},{n:'Ancyluris pulchra',p:35.0,s:500},{n:'Cartea vitula',p:45.0,s:1000},{n:'Chorinea amazon',p:6.0,s:500},{n:'Chorinea batesii',p:14.0,s:1000},{n:'Chorinea sylphina',p:24.0,s:500},{n:'Cremna acoris',p:12.0,s:500},{n:'Eurybia halimede',p:15.0,s:200},{n:'Lyropteryx appollonia',p:18.0,s:50},{n:'Necyria bellona juturna',p:12.0,s:200},{n:'Nymphidium cachrus',p:48.0,s:100},{n:'Rhetus arcius',p:7.5,s:1000},{n:'Rhetus dysoni',p:5.5,s:1000},{n:'Rhetus periander',p:6.5,s:5000},{n:'Siseme hellotis',p:6.5,s:5000},{n:'Stalachitis euterpe',p:23.0,s:20},{n:'Thisbe irene',p:4.0,s:20},{n:'Siseme neurodes',p:2.0,s:500}] },
  { id:'Satyridae', nm:'Satyridae', e:[{n:'Cithaerais pireta',p:45.0,s:100},{n:'Cithaerias pyropina',p:15.0,s:200},{n:'Corades enyo',p:20.0,s:50},{n:'Corades iduna',p:15.0,s:1000},{n:'Corades medeba',p:13.0,s:200},{n:'Haetera macleannania',p:35.0,s:500},{n:'Haetera piera',p:45.0,s:1000},{n:'Oressinoma typhia',p:6.0,s:500},{n:'Oxeoschistus iphigenia',p:14.0,s:1000},{n:'Pierella albofasciata',p:24.0,s:500},{n:'Pierella amalia',p:12.0,s:500},{n:'Pierella hortona hortona f. ocellata',p:15.0,s:200},{n:'Pierella hyceta',p:18.0,s:50},{n:'Pierella lamia chalybaea',p:12.0,s:200},{n:'Pierella lena',p:48.0,s:100},{n:'Pierella lucia',p:7.5,s:1000},{n:'Pseudohaetera (Haetera) hypasia',p:5.5,s:1000}] }
]
const ORDS = [
  { o:'Lepidoptera Diurnae', f:FAM },
  { o:'Moths Nocturnas', f:[
    { id:'Arctiidae', nm:'Arctiidae', e:[] as E[] },
    { id:'Castnia', nm:'Castnia', e:[] as E[] },
    { id:'Hepalidae', nm:'Hepalidae', e:[] as E[] },
    { id:'Saturnidae', nm:'Saturnidae', e:[] as E[] },
    { id:'Sphingidae', nm:'Sphingidae', e:[] as E[] },
    { id:'Uranidae', nm:'Uranidae', e:[] as E[] },
    { id:'Geometridae', nm:'Geometridae', e:[] as E[] },
    { id:'Noctuidae', nm:'Noctuidae', e:[] as E[] },
    { id:'Erebidae', nm:'Erebidae', e:[] as E[] },
    { id:'Acontiinae', nm:'Acontiinae', e:[] as E[] },
    { id:'Acronictinae', nm:'Acronictinae', e:[] as E[] },
    { id:'Agaristinae', nm:'Agaristinae', e:[] as E[] },
    { id:'Amphipyrinae', nm:'Amphipyrinae', e:[] as E[] },
    { id:'Bagisarinae', nm:'Bagisarinae', e:[] as E[] },
    { id:'Balsinae', nm:'Balsinae', e:[] as E[] },
    { id:'Bryophilinae', nm:'Bryophilinae', e:[] as E[] },
    { id:'Calpinae', nm:'Calpinae', e:[] as E[] },
    { id:'Catocalinae', nm:'Catocalinae', e:[] as E[] },
    { id:'Cocytiinae', nm:'Cocytiinae', e:[] as E[] },
    { id:'Condicinae', nm:'Condicinae', e:[] as E[] },
    { id:'Cuculliinae', nm:'Cuculliinae', e:[] as E[] },
    { id:'Dilobinae', nm:'Dilobinae', e:[] as E[] },
    { id:'Eustrotiinae', nm:'Eustrotiinae', e:[] as E[] },
    { id:'Euteliinae', nm:'Euteliinae', e:[] as E[] },
    { id:'Hadeninae', nm:'Hadeninae', e:[] as E[] },
    { id:'Heliothinae', nm:'Heliothinae', e:[] as E[] },
    { id:'Herminiinae', nm:'Herminiinae', e:[] as E[] },
    { id:'Noctuinae', nm:'Noctuinae', e:[] as E[] },
    { id:'Ophiderinae', nm:'Ophiderinae', e:[] as E[] },
    { id:'Pantheinae', nm:'Pantheinae', e:[] as E[] },
    { id:'Plusiinae', nm:'Plusiinae', e:[] as E[] },
    { id:'Stictopterinae', nm:'Stictopterinae', e:[] as E[] },
    { id:'Stiriinae', nm:'Stiriinae', e:[] as E[] },
    { id:'Strepsimaninae', nm:'Strepsimaninae', e:[] as E[] },
    { id:'Xyleninae', nm:'Xyleninae', e:[] as E[] },
  ] as F[] },
  { o:'Coleoptera', f:[
    { id:'Buprestidae', nm:'Buprestidae', e:[] as E[] },
    { id:'Cerambycidae', nm:'Cerambycidae', e:[] as E[] },
    { id:'Cetonidae', nm:'Cetonidae', e:[] as E[] },
    { id:'Chrysomelidae', nm:'Chrysomelidae', e:[] as E[] },
    { id:'Cicindelidae', nm:'Cicindelidae', e:[] as E[] },
    { id:'Curculionidae', nm:'Curculionidae', e:[] as E[] },
    { id:'Dynastidae', nm:'Dynastidae', e:[] as E[] },
    { id:'Elateridae', nm:'Elateridae', e:[] as E[] },
    { id:'Euchiridae', nm:'Euchiridae', e:[] as E[] },
    { id:'Lucanidae', nm:'Lucanidae', e:[] as E[] },
    { id:'Rutilidae', nm:'Rutilidae', e:[] as E[] },
    { id:'Scarabaeidae', nm:'Scarabaeidae', e:[] as E[] },
    { id:'Trictenotomidae', nm:'Trictenotomidae', e:[] as E[] },
  ] as F[] },
  { o:'Arthropoda', f:[
    { id:'Spider', nm:'Spider (Araneae)', e:[] as E[] },
    { id:'Homoptera', nm:'Homoptera (Cicada)', e:[] as E[] },
    { id:'Phasmidae', nm:'Phasmidae', e:[] as E[] },
    { id:'Phylliidae', nm:'Phylliidae', e:[] as E[] },
    { id:'Mantidae', nm:'Mantidae (Mantis)', e:[] as E[] },
    { id:'Orthoptera', nm:'Orthoptera (Grillidae)', e:[] as E[] },
    { id:'Hemiptera', nm:'Hemiptera', e:[] as E[] },
    { id:'Hymenoptera', nm:'Hymenoptera', e:[] as E[] },
    { id:'Escorpion', nm:'Escorpion', e:[] as E[] },
    { id:'Odonata', nm:'Odonata', e:[] as E[] },
  ] as F[] },
]
const POR_PAG = 20
const QUALITY_CHART = [
  {q:'A1', d:'Perfect specimen. As perfect as all reasonable expectations dictate. Many are ex-pupae bred.'},
  {q:'A1/A1-', d:'Virtually perfect and fresh. A minor flaw or so. Sometimes only antennae damage. Excellent quality at significant savings.'},
  {q:'A1-', d:'Flaws, but generally respectable.'},
  {q:'VGA2', d:'Very good second quality. Usually easily repairable. Sometimes accompanied by spare parts.'},
  {q:'A2', d:'Definite second quality. Usually a good representative specimen but far from perfect.'},
]
const ABBREV_CHART = [
  {k:'M', d:'Male'},
  {k:'F', d:'Female'},
  {k:'P', d:'Pair (male and female)'},
  {k:'EP', d:'Ex-pupae, reared or farmed.'},
  {k:'S', d:'Set — a specially priced set of more than a single item at a discount.'},
]
function PopupHeader({title,onClose,foto,nombre}:{title:string,onClose:()=>void,foto?:string,nombre?:string}) {

  const lbVistas = (e:E) => [
    {label:'Frente',url:e.foto||'',tipo:'img'},
    {label:'Lado',url:e.fotoLado||'',tipo:'img'},
    {label:'Reverso',url:e.fotoReverso||'',tipo:'img'},
    {label:'Video',url:e.video||'',tipo:'video'},
  ]
  const abrirLB = (e:E,ev:React.MouseEvent) => {ev.stopPropagation();setLbEsp(e);setLbVista(0);setLbOpen(true)}
  const cerrarLB = () => setLbOpen(false)

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12,paddingBottom:12,borderBottom:'1px solid rgba(201,168,76,0.2)'}}>
        <a href="/" style={{display:"flex",justifyContent:"center"}}><img src="/logo-house-insects-peru.png" className="popup-logo" style={{width:180,height:180,objectFit:'contain'}} alt="House Insects of Peru"/></a>
        <span style={{color:'#C9A84C',fontSize:'1rem',fontWeight:700,letterSpacing:'.06em',flex:1}}>{title}</span>
        <button onClick={onClose} style={{background:'none',border:'none',color:'rgba(232,201,122,0.5)',cursor:'pointer',fontSize:'1.2rem',lineHeight:1}}>✕</button>
      </div>
      {foto&&<div style={{textAlign:'center',marginBottom:12}}>
        <img src={foto} alt={nombre||''} className="sel-img" style={{width:120,height:120,objectFit:'cover',borderRadius:8,border:'1px solid rgba(201,168,76,0.3)'}}/>
        {nombre&&<p style={{color:'#E8C97A',fontSize:'.75rem',fontStyle:'italic',marginTop:6}}>{nombre}</p>}
      </div>}
    </div>
      <div className={'lb-ov' + (lbOpen?' lb-on':'')} onClick={(e)=>{if((e.target as HTMLElement).classList.contains('lb-ov'))cerrarLB()}}>
        <div className="lb-bx">
          <button className="lb-x" onClick={cerrarLB}>&#x2715;</button>
          <div className="lb-md">
            {lbEsp&&(()=>{const vs=lbVistas(lbEsp);const v=vs[lbVista];if(!v.url)return <div className="lb-nf"><span style={{fontSize:'2rem'}}>&#128247;</span><span>{v.label.toUpperCase()} PROXIMAMENTE</span></div>;if(v.tipo==='video')return <video src={v.url} autoPlay loop muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>;return <img src={v.url} alt={v.label} style={{width:'100%',height:'100%',objectFit:'contain'}}/>})()}
          </div>
          <div className="lb-nv">
            <button className="lb-ar" onClick={()=>setLbVista(v=>Math.max(0,v-1))} disabled={lbVista===0}>&#8592;</button>
            <div className="lb-ts">
              {lbEsp&&lbVistas(lbEsp).map((v,i)=>(
                <button key={i} className={'lb-t'+(lbVista===i?' lb-ta':'')} onClick={()=>setLbVista(i)}>{v.label}</button>
              ))}
            </div>
            <button className="lb-ar" onClick={()=>setLbVista(v=>Math.min(3,v+1))} disabled={lbVista===3}>&#8594;</button>
          </div>
          {lbEsp&&<div style={{textAlign:'center',fontSize:'.75rem',fontStyle:'italic',color:'#E8C97A',marginBottom:2}}>{lbEsp.n}</div>}
          <div style={{fontSize:'.55rem',color:'rgba(201,168,76,0.2)',textAlign:'center',marginTop:6,fontFamily:'Georgia,serif'}}>Toca fuera para cerrar</div>
        </div>
      </div>
  )
}