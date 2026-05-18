'use client'
import { useState } from 'react'
type E = { n:string; p:number; s:number; foto?:string; video?:string }
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
  return (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:12,paddingBottom:12,borderBottom:'1px solid rgba(201,168,76,0.2)'}}>
        <img src="/logo-house-insects-peru.png" className="popup-logo" style={{width:48,height:48,objectFit:'contain'}} alt="House Insects of Peru"/>
        <span style={{color:'#C9A84C',fontSize:'1rem',fontWeight:700,letterSpacing:'.06em',flex:1}}>{title}</span>
        <button onClick={onClose} style={{background:'none',border:'none',color:'rgba(232,201,122,0.5)',cursor:'pointer',fontSize:'1.2rem',lineHeight:1}}>✕</button>
      </div>
      {foto&&<div style={{textAlign:'center',marginBottom:12}}>
        <img src={foto} alt={nombre||''} className="sel-img" style={{width:120,height:120,objectFit:'cover',borderRadius:8,border:'1px solid rgba(201,168,76,0.3)'}}/>
        {nombre&&<p style={{color:'#E8C97A',fontSize:'.75rem',fontStyle:'italic',marginTop:6}}>{nombre}</p>}
      </div>}
    </div>
  )
}
const POPUP_STYLE = {
  box: {background:'#1A1209',border:'1px solid rgba(201,168,76,0.4)',borderRadius:12,padding:'22px 26px',maxWidth:420,width:'100%',fontFamily:'Georgia,serif',boxShadow:'0 20px 60px rgba(0,0,0,0.7)'},
  row: {display:'flex' as const,gap:14,padding:'9px 0',borderBottom:'1px solid rgba(201,168,76,0.1)',alignItems:'flex-start' as const},
  key: {color:'#C9A84C',fontWeight:700,fontSize:'.85rem',minWidth:54,textAlign:'right' as const},
  val: {color:'rgba(232,201,122,0.8)',fontSize:'.82rem',lineHeight:1.6},
  btn: {background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,padding:'7px 24px',cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif',color:'#C9A84C',marginTop:16,transition:'background 0.15s'},
}
function PopupCalidad({onClose,foto,nombre}:{onClose:()=>void,foto?:string,nombre?:string}) {
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div onClick={e=>e.stopPropagation()} className="popup-box" style={POPUP_STYLE.box}>
        <PopupHeader title="Quality Chart" onClose={onClose} foto={foto} nombre={nombre}/>
        {QUALITY_CHART.map((r,i)=>(
          <div key={i} className="popup-row-item" style={{...POPUP_STYLE.row,borderRadius:4,padding:'9px 6px'}}>
            <span style={POPUP_STYLE.key}>{r.q}</span>
            <span style={POPUP_STYLE.val}>{r.d}</span>
          </div>
        ))}
        <div style={{textAlign:'center'}}>
          <button onClick={onClose} style={POPUP_STYLE.btn}>close window</button>
        </div>
      </div>
    </div>
  )
}
function PopupAbrev({onClose,foto,nombre}:{onClose:()=>void,foto?:string,nombre?:string}) {
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div onClick={e=>e.stopPropagation()} className="popup-box" style={{...POPUP_STYLE.box,maxWidth:380}}>
        <PopupHeader title="Abbreviation Chart" onClose={onClose} foto={foto} nombre={nombre}/>
        {ABBREV_CHART.map((r,i)=>(
          <div key={i} className="popup-row-item" style={{...POPUP_STYLE.row,borderRadius:4,padding:'9px 6px'}}>
            <span style={{...POPUP_STYLE.key,minWidth:32}}>{r.k}</span>
            <span style={POPUP_STYLE.val}>{r.d}</span>
          </div>
        ))}
        <div style={{textAlign:'center'}}>
          <button onClick={onClose} style={POPUP_STYLE.btn}>close window</button>
        </div>
      </div>
    </div>
  )
}
export default function Page() {
  const [ord, setOrd] = useState('Lepidoptera Diurnae')
  const [fid, setFid] = useState('Morphidae')
  const [sel, setSel] = useState<E|null>(null)
  const [q, setQ] = useState('')
  const [pag, setPag] = useState(1)
  const [showQ, setShowQ] = useState(false)
  const [showA, setShowA] = useState(false)
  const [composicion, setComposicion] = useState('individual')
  const [marco, setMarco] = useState('rectangular')
  const [vidrio, setVidrio] = useState('normal')
  const [vista, setVista] = useState<'frente'|'lado'|'reverso'|'video'>('frente')
  const catAct = ORDS.find(c=>c.o===ord)!
  const fam = catAct.f.find(f=>f.id===fid)||catAct.f[0]
  const filtrados = fam.e.filter(e=>e.n.toLowerCase().includes(q.toLowerCase()))
  const totalPag = Math.ceil(filtrados.length/POR_PAG)
  const pagEsp = filtrados.slice((pag-1)*POR_PAG, pag*POR_PAG)
  if(sel) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      {showQ&&<PopupCalidad onClose={()=>setShowQ(false)}/>}
      {showA&&<PopupAbrev onClose={()=>setShowA(false)}/>}
      <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes popIn{from{opacity:0;transform:scale(0.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}.sel-img{transition:transform 0.3s ease,box-shadow 0.3s ease}.sel-img:hover{transform:scale(1.04);box-shadow:0 12px 40px rgba(201,168,76,0.3)}.logo-ani{transition:transform 0.4s ease,opacity 0.3s ease}.logo-ani:hover{transform:scale(1.08) rotate(3deg);opacity:0.9}.help-btn{transition:transform 0.15s ease,background 0.15s ease,box-shadow 0.15s ease}.help-btn:hover{transform:translateY(-2px) scale(1.12);background:rgba(201,168,76,0.28)!important;box-shadow:0 4px 12px rgba(201,168,76,0.3)}.stat-card{transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease}.stat-card:hover{transform:translateY(-4px) scale(1.04);box-shadow:0 8px 24px rgba(201,168,76,0.2);border-color:rgba(201,168,76,0.5)!important}.wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}.wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.5)}.popup-box{animation:popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)}.popup-row-item{transition:background 0.15s ease,transform 0.15s ease}.popup-row-item:hover{background:rgba(201,168,76,0.08);transform:translateX(4px)}.popup-logo{transition:transform 0.4s ease}.popup-logo:hover{transform:scale(1.1) rotate(-5deg)}.pag-btn{transition:transform 0.15s ease,background 0.15s ease,box-shadow 0.15s ease}.pag-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.1);box-shadow:0 4px 12px rgba(201,168,76,0.3)}.volver-btn{transition:transform 0.15s ease,color 0.15s ease}.volver-btn:hover{transform:translateX(-4px);color:#E8C97A!important}.inicio-btn{transition:transform 0.15s ease,color 0.15s ease}.inicio-btn:hover{transform:translateX(-4px);color:#E8C97A!important}.desc-text{transition:color 0.2s ease}.desc-text:hover{color:rgba(232,201,122,0.7)!important}.consult-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}.consult-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}.esp-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.12);border-radius:9px;padding:10px;cursor:pointer;text-align:left;font-family:Georgia,serif;transition:transform 0.18s ease,border-color 0.18s ease,background 0.18s ease,box-shadow 0.18s ease}.esp-card:hover{transform:translateY(-5px) scale(1.04);border-color:rgba(201,168,76,0.55);background:rgba(201,168,76,0.11);box-shadow:0 10px 28px rgba(0,0,0,0.45)}.esp-card img{transition:opacity 0.18s ease}.esp-card:hover img{opacity:0.9}.ord-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease}.ord-btn:hover{transform:translateY(-2px) scale(1.06);box-shadow:0 4px 14px rgba(201,168,76,0.3)}.fam-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease,color 0.15s ease}.fam-btn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 6px 18px rgba(201,168,76,0.25);border-color:rgba(201,168,76,0.5)!important;color:#E8C97A!important}`}</style>
      <button onClick={()=>setSel(null)} className='volver-btn' style={{color:'#C9A84C',fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:32,display:'block'}}>← Volver al catálogo</button>
      <div style={{maxWidth:640,margin:'0 auto',textAlign:'center'}}>
        <div style={{marginBottom:20}}>
          <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:10}}>
            {(['frente','lado','reverso','video'] as const).map(v=>(
              <button key={v} onClick={()=>setVista(v)} style={{
                padding:'5px 12px',borderRadius:20,cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif',
                background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
                color:vista===v?'#1A1209':'#C9A84C',
                border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                transition:'all 0.18s ease',textTransform:'capitalize'
              }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}</button>
            ))}
          </div>
          <div style={{width:'100%',maxWidth:420,margin:'0 auto'}}>
            {vista==='video'&&sel.video&&<video autoPlay loop muted playsInline className="sel-img" style={{width:'100%',borderRadius:12,border:'2px solid #C9A84C'}}><source src={sel.video} type="video/mp4"/></video>}
            {vista==='video'&&!sel.video&&(
              <div className="sel-img" style={{width:'100%',height:280,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>🎥</div>
                <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem'}}>Video próximamente</p>
              </div>
            )}
            {vista!=='video'&&sel.foto&&<img src={sel.foto} alt={sel.n} className="sel-img" style={{width:'100%',height:280,objectFit:'cover',borderRadius:12,border:'2px solid #C9A84C'}}/>}
            {vista!=='video'&&!sel.foto&&(
              <div className="sel-img" style={{width:'100%',height:280,background:'linear-gradient(135deg,#1A1209,#2A2010)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',cursor:'default'}}>
                <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 30% 30%, rgba(201,168,76,0.1) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(201,168,76,0.06) 0%, transparent 50%)'}}/>
                <img src="/logo-house-insects-peru.png" className="logo-ani" style={{width:120,height:120,objectFit:'contain',opacity:.8,filter:'drop-shadow(0 4px 20px rgba(201,168,76,0.5))',marginBottom:12,position:'relative',zIndex:1}} onError={(ev)=>{(ev.target as HTMLImageElement).src='/logo.png'}}/>
                <div style={{width:60,height:1,background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',marginBottom:10,position:'relative',zIndex:1}}/>
                <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.7rem',letterSpacing:'.15em',position:'relative',zIndex:1}}>FOTO PRÓXIMAMENTE</p>
                <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.6rem',letterSpacing:'.08em',marginTop:4,position:'relative',zIndex:1}}>HOUSE INSECTS OF PERU</p>
              </div>
            )}
          </div>
        </div>
        {ord==='Lepidoptera Diurnae'&&(
          <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:14,marginBottom:16}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:10}}>🖼️ CONFIGURAR CUADRO DE MARIPOSAS</div>
            <div style={{marginBottom:10}}>
              <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginBottom:6}}>COMPOSICIÓN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[{id:'individual',nm:'🦋 Individual'},{id:'mixto',nm:'🎨 Mixto/Combinado'}].map(o=>(
                  <button key={o.id} onClick={()=>setComposicion(o.id)} style={{padding:'4px 10px',borderRadius:16,cursor:'pointer',fontSize:'.68rem',fontFamily:'Georgia,serif',background:composicion===o.id?'#C9A84C':'rgba(201,168,76,0.08)',color:composicion===o.id?'#1A1209':'#C9A84C',border:`1px solid ${composicion===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,transition:'all 0.15s ease'}}>{o.nm}</button>
                ))}
              </div>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginBottom:6}}>FORMATO DEL MARCO</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[{id:'rectangular',nm:'⬛ Rectangular'},{id:'redondo',nm:'⭕ Redondo'},{id:'triangular',nm:'🔺 Triangular'},{id:'cubo',nm:'📦 Cubo 3D'},{id:'cupula',nm:'🔮 Cúpula'},{id:'reloj',nm:'🕐 Tipo Reloj'}].map(o=>(
                  <button key={o.id} onClick={()=>setMarco(o.id)} style={{padding:'4px 10px',borderRadius:16,cursor:'pointer',fontSize:'.68rem',fontFamily:'Georgia,serif',background:marco===o.id?'#C9A84C':'rgba(201,168,76,0.08)',color:marco===o.id?'#1A1209':'#C9A84C',border:`1px solid ${marco===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,transition:'all 0.15s ease'}}>{o.nm}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginBottom:6}}>TIPO DE PROTECCIÓN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[{id:'normal',nm:'🔲 Cristal Normal',extra:0},{id:'uv',nm:'☀️ Cristal UV Premium',extra:20},{id:'resina',nm:'💎 Resina Epóxica',extra:35}].map(o=>(
                  <button key={o.id} onClick={()=>setVidrio(o.id)} style={{padding:'4px 10px',borderRadius:16,cursor:'pointer',fontSize:'.68rem',fontFamily:'Georgia,serif',background:vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.08)',color:vidrio===o.id?'#1A1209':'#C9A84C',border:`1px solid ${vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,transition:'all 0.15s ease'}}>{o.nm}{o.extra>0?` +$${o.extra}`:''}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        <p style={{color:'rgba(232,201,122,0.35)',fontSize:'.7rem',marginBottom:8,letterSpacing:'.08em'}}>ORDER: LEPIDOPTERA · AMAZONIA PERUANA · SERFOR · CITES</p>
        <h1 className='desc-text' style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',fontStyle:'italic',marginBottom:20}}>{sel.n}</h1>
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:'16px',marginBottom:20,textAlign:'left'}}>
          {[
            ['FAMILY', fid],
            ['LOCALITY', 'Tingo María, Perú'],
          ].map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
              <span style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.06em'}}>{k}</span>
              <span style={{color:'#E8C97A',fontSize:'.78rem',fontStyle:'italic'}}>{v}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.08)',alignItems:'center'}}>
            <span style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.06em'}}>QUALITY</span>
            <span style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{color:'#C9A84C',fontSize:'.78rem',fontWeight:700}}>A1</span>
              <button onClick={()=>setShowQ(true)} className="help-btn" style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',borderRadius:3,padding:'1px 6px',fontSize:'.65rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>? help</button>
            </span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.08)',alignItems:'center'}}>
            <span style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.06em'}}>SEX</span>
            <span style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{color:'#E8C97A',fontSize:'.78rem'}}>M or F</span>
              <button onClick={()=>setShowA(true)} className="help-btn" style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',borderRadius:3,padding:'1px 6px',fontSize:'.65rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>? help</button>
            </span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',alignItems:'center'}}>
            <span style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.06em'}}>SIZE RANGE</span>
            <span style={{color:'#E8C97A',fontSize:'.78rem'}}>— cm</span>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20}}>
          <div className='stat-card' style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4,letterSpacing:'.06em'}}>PRICE USD</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>${sel.p}</div>
          </div>
          <div className='stat-card' style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4,letterSpacing:'.06em'}}>STOCK</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>{sel.s}</div>
          </div>
          <div className='stat-card' style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4,letterSpacing:'.06em'}}>QUALITY</div>
            <div style={{color:'#7EC87E',fontSize:'1rem',fontWeight:700}}>A1</div>
          </div>
        </div>
        <div style={{fontSize:'.7rem',color:'rgba(232,201,122,0.4)',marginBottom:20,lineHeight:2,letterSpacing:'.06em'}}>SERFOR · CITES · EXPORTAFACIL · DHL · FEDEX · UPS · ARAMEX · RUC 20447397804</div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href={`https://wa.me/51940699405?text=Me interesa: ${sel.n} USD $${sel.p}`} target="_blank" className='wa-btn' style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 940 699 405</a>
          <a href={`https://wa.me/51920644433?text=Me interesa: ${sel.n} USD $${sel.p}`} target="_blank" className='wa-btn' style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 920 644 433</a>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`.logo-ani{transition:transform 0.4s ease,opacity 0.3s ease;cursor:pointer}.logo-ani:hover{transform:scale(1.12) rotate(5deg);opacity:0.9;filter:drop-shadow(0 0 16px rgba(201,168,76,0.6))}.ord-btn{transition:transform 0.15s ease,box-shadow 0.15s ease}.ord-btn:hover{transform:translateY(-2px) scale(1.06);box-shadow:0 4px 14px rgba(201,168,76,0.3)}.fam-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,color 0.15s ease}.fam-btn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 6px 18px rgba(201,168,76,0.25);border-color:rgba(201,168,76,0.5)!important;color:#E8C97A!important}.esp-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.12);border-radius:9px;padding:10px;cursor:pointer;text-align:left;font-family:Georgia,serif;transition:transform 0.18s ease,border-color 0.18s ease,box-shadow 0.18s ease}.esp-card:hover{transform:translateY(-5px) scale(1.04);border-color:rgba(201,168,76,0.55);box-shadow:0 10px 28px rgba(0,0,0,0.45)}.pag-btn{transition:transform 0.15s ease,box-shadow 0.15s ease}.pag-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.1);box-shadow:0 4px 12px rgba(201,168,76,0.3)}`}</style>
      {showQ&&<PopupCalidad onClose={()=>setShowQ(false)}/>}
      {showA&&<PopupAbrev onClose={()=>setShowA(false)}/>}
      <a href="/" className="inicio-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:20}}>
          <img src="/logo-house-insects-peru.png" className="logo-ani" style={{width:80,height:80,marginBottom:10,objectFit:'contain',cursor:'pointer'}} onError={(ev)=>{(ev.target as HTMLImageElement).src='/logo.png'}}/>
          <h1 style={{fontSize:'1.6rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>Especimenes Biologicos Secos</h1>
          <p style={{color:'rgba(232,201,122,0.3)',fontSize:'.7rem',letterSpacing:'.08em'}}>HOUSE INSECTS OF PERU · AMAZONIA · SERFOR · CITES · RUC 20447397804</p>
        </div>
        <style>{`
          .ord-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease}
          .ord-btn:hover{transform:translateY(-2px) scale(1.06);box-shadow:0 4px 14px rgba(201,168,76,0.3)}
          .fam-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease,color 0.15s ease}
          .fam-btn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 6px 18px rgba(201,168,76,0.25);border-color:rgba(201,168,76,0.5)!important;color:#E8C97A!important}
        `}</style>
        <div style={{display:'flex',gap:4,flexWrap:'wrap',justifyContent:'center',marginBottom:12}}>
          {ORDS.map(c=>(
            <button key={c.o} onClick={()=>{setOrd(c.o);setFid(c.f[0].id);setQ('');setPag(1)}} className="ord-btn" style={{padding:'6px 12px',background:ord===c.o?'#C9A84C':'rgba(201,168,76,0.08)',color:ord===c.o?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.25)',borderRadius:4,fontSize:'.7rem',cursor:'pointer',fontWeight:ord===c.o?700:400}}>
              {c.o}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:3,flexWrap:'wrap',justifyContent:'center',marginBottom:14,padding:'8px',background:'rgba(201,168,76,0.03)',borderRadius:8,border:'1px solid rgba(201,168,76,0.08)'}}>
          {catAct.f.map(f=>(
            <button key={f.id} onClick={()=>{setFid(f.id);setQ('');setPag(1)}} className="fam-btn" style={{padding:'4px 10px',background:fid===f.id?'#C9A84C':'transparent',color:fid===f.id?'#1A1209':'rgba(201,168,76,0.6)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,fontSize:'.65rem',cursor:'pointer',fontStyle:'italic',fontWeight:fid===f.id?700:400}}>
              {f.nm}{f.e.length>0?` (${f.e.length})`:''}</button>
          ))}
        </div>
        <div style={{textAlign:'center',marginBottom:14}}>
          <input value={q} onChange={e=>{setQ(e.target.value);setPag(1)}} placeholder={`Buscar en ${fid}...`} style={{width:'100%',maxWidth:340,padding:'8px 14px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.8rem',outline:'none'}}/>
        </div>
        {filtrados.length>0?(
          <>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',textAlign:'center',marginBottom:10}}>
              Mostrando {(pag-1)*POR_PAG+1}–{Math.min(pag*POR_PAG,filtrados.length)} de {filtrados.length} especies · Página {pag} de {totalPag}
            </div>
            <style>{`.esp-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.12);border-radius:9px;padding:10px;cursor:pointer;text-align:left;font-family:Georgia,serif;transition:transform 0.18s ease,border-color 0.18s ease,background 0.18s ease,box-shadow 0.18s ease}.esp-card:hover{transform:translateY(-5px) scale(1.04);border-color:rgba(201,168,76,0.55);background:rgba(201,168,76,0.11);box-shadow:0 10px 28px rgba(0,0,0,0.45)}.esp-card img{transition:opacity 0.18s ease}.esp-card:hover img{opacity:0.9}`}</style>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:7}}>
              {pagEsp.map((e,i)=>(
                <button key={i} onClick={()=>setSel(e)} className="esp-card">
                  <div style={{width:'100%',height:75,background:'rgba(201,168,76,0.06)',borderRadius:5,marginBottom:6,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                    {e.foto?<img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:(
                    <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,rgba(26,18,9,0.9),rgba(42,32,16,0.95))',position:'relative',overflow:'hidden'}}>
                      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 30% 40%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(201,168,76,0.05) 0%, transparent 50%)'}}/>
                      <img src="/logo-house-insects-peru.png" style={{width:44,height:44,objectFit:'contain',opacity:.6,marginBottom:4,filter:'drop-shadow(0 2px 8px rgba(201,168,76,0.4))'}} onError={(ev)=>{(ev.target as HTMLImageElement).src='/logo.png'}}/>
                      <div style={{width:30,height:1,background:'rgba(201,168,76,0.3)',margin:'3px auto'}}/>
                      <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.5rem',letterSpacing:'.12em'}}>FOTO PRÓXIMAMENTE</span>
                    </div>
                  )}
                  </div>
                  <div style={{fontSize:'.68rem',fontStyle:'italic',color:'#E8C97A',marginBottom:4,lineHeight:1.3}}>{e.n}</div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'#C9A84C',fontWeight:700,fontSize:'.75rem'}}>${e.p}</span>
                    <span style={{color:'rgba(232,201,122,0.3)',fontSize:'.58rem'}}>{e.s}</span>
                  </div>
                </button>
              ))}
            </div>
            {totalPag>1&&(
              <div style={{display:'flex',gap:5,justifyContent:'center',flexWrap:'wrap',marginTop:20,paddingTop:14,borderTop:'1px solid rgba(201,168,76,0.12)'}}>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} className='pag-btn' style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===1?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===1?'not-allowed':'pointer',fontSize:'.7rem'}}>← Ant</button>
                {Array.from({length:Math.min(totalPag,10)},(_,i)=>i+1).map(n=>(
                  <button key={n} onClick={()=>setPag(n)} className='pag-btn' style={{padding:'5px 9px',background:pag===n?'#C9A84C':'rgba(201,168,76,0.08)',color:pag===n?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:'pointer',fontSize:'.7rem',fontWeight:pag===n?700:400,minWidth:28}}>{n}</button>
                ))}
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} className='pag-btn' style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===totalPag?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===totalPag?'not-allowed':'pointer',fontSize:'.7rem'}}>Sig →</button>
              </div>
            )}
          </>
        ):(
          <div style={{textAlign:'center',padding:'40px 20px'}}>
            <p style={{color:'rgba(232,201,122,0.3)',marginBottom:12}}>{fam.e.length===0?`Proximamente especies de ${fid}`:'No se encontraron'}</p>
            <a href="https://wa.me/51940699405" target="_blank" className='consult-btn' style={{display:'inline-block',background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>Consultar disponibilidad</a>
          </div>
        )}
      </div>
    </div>
  )
}
// Mon May 18 00:31:25 -05 2026
