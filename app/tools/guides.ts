export type GuideStep = {
  title: string;
  text: string;
};

export type ToolGuide = {
  id: string;
  name: string;
  nameHighlight?: string;
  price: string;
  logoImage: string;
  downloadLink: string;
  downloadText: string;
  description: string;
  guideTitle: string;
  guideDescription: string;
  steps: GuideStep[];
};

export const toolGuides: Record<string, ToolGuide> = {
  "obs": {
    id: "obs",
    name: "OBS Studio",
    nameHighlight: "Studio",
    price: "ILMAINEN",
    logoImage: "https://cdn.simpleicons.org/obsstudio/ffffff",
    downloadLink: "https://obsproject.com/",
    downloadText: "Lataa OBS Studio",
    description: "Tässä oppaassa käydään läpi OBS Studion käyttöönotto ensimmäisestä käynnistyksestä aina valmiiseen Twitch- tai YouTube-lähetykseen asti.",
    guideTitle: "OBS STUDION KÄYTTÖÖNOTTO",
    guideDescription: "Jos OBS Studio ei ole sinulle ennestään tuttu, ei haittaa. Käydään tärkeimmät asiat läpi vaihe vaiheelta.",
    steps: [
      {
        title: "LATAA JA ASENNA OBS STUDIO",
        text: "Mene OBS Studion viralliselle verkkosivulle ja lataa käyttöjärjestelmällesi sopiva versio. OBS Studio on saatavilla Windowsille, macOS:lle ja Linuxille.",
      },
      {
        title: "AUTOMAATTINEN MÄÄRITYS",
        text: "Ensimmäisellä käynnistyskerralla OBS voi avata automaattisen määritystoiminnon. Valitse vaihtoehto, jossa OBS optimoidaan ensisijaisesti striimaamista varten.",
      },
      {
        title: "YHDISTÄ STRIIMAUSPALVELU",
        text: "Avaa OBS:n asetukset ja siirry Lähetys-kohtaan. Valitse käyttämäsi palvelu, esimerkiksi Twitch tai YouTube. Yhdistä tilisi palvelun tarjoamalla kirjautumistavalla tai käytä palvelusi tarjoamaa lähetysavainta.",
      },
      {
        title: "LUO ENSIMMÄINEN SKENE",
        text: "Skene määrittää sen, mitä katsojat näkevät lähetyksessäsi. Voit tehdä esimerkiksi peliskenen, Just Chatting -näkymän, aloitusruudun ja taukoruudun.",
      },
      {
        title: "LISÄÄ LÄHTEET",
        text: "Lisää skeneen tarvitsemasi lähteet. Pelin kaappaamiseen voit käyttää Game Capture -lähdettä, näytön näyttämiseen Display Capturea ja kameralle Video Capture Device -lähdettä. Tarvittaessa voit lisätä myös kuvia, tekstiä ja selainlähteitä.",
      },
      {
        title: "TARKISTA MIKROFONI JA ÄÄNET",
        text: "Tarkista OBS:n Audio Mixeristä, että mikrofonisi ja tietokoneen äänet näkyvät oikein. Puhu normaalilla äänenvoimakkuudella ja varmista, ettei ääni jatkuvasti osu mittarin punaiseen alueeseen.",
      },
      {
        title: "VIDEOASETUKSET",
        text: "Avaa Asetukset → Video. Valitse pohjaresoluutioksi näyttösi tai käyttämäsi canvas-resoluutio. Lähetyksen resoluutio ja FPS kannattaa valita tietokoneen suorituskyvyn, internet-yhteyden ja käyttämäsi striimauspalvelun mukaan.",
      },
      {
        title: "TEE TESTILÄHETYS",
        text: "Ennen ensimmäistä varsinaista striimiä tarkista kuva, mikrofoni, peliäänet, kamera ja mahdolliset overlayt. Lyhyt testilähetys tai tallennus auttaa huomaamaan mahdolliset ongelmat ennen kuin aloitat oikean lähetyksen.",
      },
      {
        title: "ALOITA STRIIMAAMINEN",
        text: "Kun kaikki näyttää ja kuulostaa oikealta, olet valmis. Tarkista vielä striimauspalvelusta lähetyksen otsikko, kategoria ja muut tarvittavat tiedot ja käynnistä lähetys OBS:n Aloita lähetys -painikkeesta.",
      },
    ],
  },

  "streamlabs": {
    id: "streamlabs",
    name: "Streamlabs Desktop",
    nameHighlight: "Desktop",
    price: "ILMAINEN",
    logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
    downloadLink: "https://streamlabs.com/streamlabs-desktop",
    downloadText: "Lataa Streamlabs",
    description: "Streamlabs Desktop yhdistää striimaamisen tärkeimmät työkalut yhteen ohjelmaan. Tässä oppaassa käydään läpi ohjelman käyttöönotto ensimmäisestä käynnistyksestä valmiiseen lähetykseen.",
    guideTitle: "STREAMLABS DESKTOPIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Streamlabs Desktopin tärkeimmät asetukset läpi vaihe vaiheelta.",
    steps: [
      {
        title: "LATAA JA ASENNA STREAMLABS DESKTOP",
        text: "Lataa Streamlabs Desktop ohjelman viralliselta verkkosivulta ja suorita asennus. Käynnistä ohjelma asennuksen jälkeen.",
      },
      {
        title: "YHDISTÄ STRIIMAUSTILISI",
        text: "Kirjaudu Streamlabs Desktopiin ja yhdistä käyttämäsi striimauspalvelu, esimerkiksi Twitch tai YouTube.",
      },
      {
        title: "LUO ENSIMMÄINEN SKENE",
        text: "Scenes-osiossa voit luoda erilaisia näkymiä lähetyksellesi. Tee esimerkiksi peliskene, Just Chatting -näkymä, Starting Soon -ruutu ja BRB-näkymä.",
      },
      {
        title: "LISÄÄ LÄHTEET",
        text: "Lisää Sources-osiosta tarvitsemasi lähteet, kuten peli, näyttö, webkamera, kuvat ja tekstit.",
      },
      {
        title: "LISÄÄ KAMERA",
        text: "Paina Sources-kohdan plus-painiketta, valitse Video Capture Device ja valitse käyttämäsi kamera.",
      },
      {
        title: "TARKISTA MIKROFONI JA ÄÄNET",
        text: "Tarkista mikseristä, että mikrofoni ja tietokoneen äänet toimivat eikä ääni säröydy.",
      },
      {
        title: "LISÄÄ ALERTIT JA WIDGETIT",
        text: "Lisää tarvittaessa Alert Box, Chat Box ja muut widgetit suoraan Sources-valikosta.",
      },
      {
        title: "TARKISTA LÄHETYSASETUKSET",
        text: "Avaa Settings ja tarkista Video- sekä Output-asetukset. Valitse resoluutio ja FPS koneesi sekä verkkosi mukaan.",
      },
      {
        title: "TEE TESTI ENNEN LIVEÄ",
        text: "Tee lyhyt testitallennus ja tarkista kamera, mikrofoni, peliäänet, skenet ja alertit.",
      },
      {
        title: "PAINA GO LIVE",
        text: "Kun kaikki on valmista, paina Go Live ja tarkista lähetyksen otsikko, kategoria sekä muut kanavatiedot.",
      },
    ],
  },

  "prism": {
    id: "prism",
    name: "PRISM Live Studio",
    nameHighlight: "Live Studio",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=prismlive.com&sz=128",
    downloadLink: "https://prismlive.com/",
    downloadText: "Lataa PRISM",
    description: "PRISM Live Studio on monipuolinen striimausohjelma, jolla voit rakentaa lähetyksen, lisätä lähteitä ja lähettää sisältöä eri suoratoistopalveluihin.",
    guideTitle: "PRISM LIVE STUDION KÄYTTÖÖNOTTO",
    guideDescription: "Käydään tärkeimmät asetukset läpi vaihe vaiheelta ensimmäisestä käynnistyksestä valmiiseen lähetykseen.",
    steps: [
      {
        title: "LATAA JA ASENNA PRISM LIVE STUDIO",
        text: "Lataa PRISM Live Studio ohjelman viralliselta verkkosivulta ja asenna käyttöjärjestelmällesi sopiva Desktop-versio.",
      },
      {
        title: "KIRJAUDU PRISMIIN",
        text: "Kirjaudu PRISM Live Studioon. Kirjautumisen jälkeen pääset hallitsemaan lähetyskanavia ja muita ominaisuuksia.",
      },
      {
        title: "YHDISTÄ STRIIMAUSKANAVA",
        text: "Lisää käyttämäsi suoratoistopalvelu PRISMin kanava-asetuksista tai käytä tarvittaessa Custom RTMP -yhteyttä.",
      },
      {
        title: "LUO LÄHETYKSEN NÄKYMÄ",
        text: "Rakenna lähetyksesi scenejen avulla. Tee erilliset näkymät esimerkiksi pelaamiseen, Just Chattingiin, aloitukseen ja tauolle.",
      },
      {
        title: "LISÄÄ LÄHTEET",
        text: "Lisää sceneen näyttö, peli tai ikkuna, kamera, kuva, teksti ja muut tarvitsemasi mediaelementit.",
      },
      {
        title: "LISÄÄ KAMERA",
        text: "Lisää kamera videolähteenä ja säädä sen koko sekä sijainti lähetysnäkymässä.",
      },
      {
        title: "TARKISTA MIKROFONI JA ÄÄNET",
        text: "Varmista mikseristä, että mikrofonisi ja tietokoneen äänet toimivat sopivalla äänenvoimakkuudella.",
      },
      {
        title: "TARKISTA VIDEO- JA LÄHETYSASETUKSET",
        text: "Tarkista resoluutio, FPS ja muut lähetysasetukset tietokoneesi ja verkkoyhteytesi mukaan.",
      },
      {
        title: "TEE TESTI ENNEN LIVEÄ",
        text: "Tarkista scenet, lähteet, kamera ja äänet. Sulje tarpeettomat raskaat ohjelmat.",
      },
      {
        title: "ALOITA LÄHETYS",
        text: "Valitse lähetyskanava, tarkista otsikko ja muut tiedot ja käynnistä live PRISM Live Studiosta.",
      },
    ],
  },

  "streamlabs-mobile": {
    id: "streamlabs-mobile",
    name: "Streamlabs Mobile",
    nameHighlight: "Mobile",
    price: "ILMAINEN",
    logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
    downloadLink: "https://play.google.com/store/apps/details?id=com.streamlabs",
    downloadText: "Avaa Google Play",
    description: "Streamlabs Mobilella voit lähettää liveä suoraan puhelimesta ja hallita lähetyksen tärkeimpiä elementtejä mobiilisti.",
    guideTitle: "STREAMLABS MOBILEN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Streamlabs Mobile-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "streamelements-mobile": {
    id: "streamelements-mobile",
    name: "StreamElements Mobile",
    nameHighlight: "Mobile",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=streamelements.com&sz=128",
    downloadLink: "https://play.google.com/store/apps/details?id=com.streamelements.firestream&pli=1",
    downloadText: "Avaa Google Play",
    description: "StreamElementsin mobiiliratkaisulla voit tehdä IRL-lähetyksiä puhelimesta ja hyödyntää StreamElements-ekosysteemiä.",
    guideTitle: "STREAMELEMENTS MOBILEN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään StreamElements Mobile-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "prism-mobile": {
    id: "prism-mobile",
    name: "PRISM Live",
    nameHighlight: "Live",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=prismlive.com&sz=128",
    downloadLink: "https://play.google.com/store/apps/details?id=com.prism.live",
    downloadText: "Avaa Google Play",
    description: "PRISM Live on suosittu mobiilistriimaussovellus IRL-lähetyksiin ja monipuoliseen mobiilisisältöön.",
    guideTitle: "PRISM LIVEN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään PRISM Live-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "moblin": {
    id: "moblin",
    name: "Moblin",
    price: "ILMAINEN",
    logoImage: "https://play-lh.googleusercontent.com/FsZQ2ch37S6k1pdbru_Mhb-nyd8b88xF1nqrx37pNMfZtCHL9_8ljbKaGPJI4SOGUiS0mz9UFI2fTGWznfFm3A=w240-h480-rw",
    downloadLink: "https://moblin.tv/",
    downloadText: "Avaa sivusto",
    description: "Moblin on iPhonelle suunnattu IRL-striimaussovellus, joka sopii erityisesti liikkuvaan Twitch-lähettämiseen.",
    guideTitle: "MOBLININ KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Moblin-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "larix": {
    id: "larix",
    name: "Larix Broadcaster",
    nameHighlight: "Broadcaster",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=softvelum.com&sz=128",
    downloadLink: "https://softvelum.com/larix/",
    downloadText: "Avaa sivusto",
    description: "Larix Broadcaster on teknisempi mobiililähetyssovellus RTMP- ja SRT-yhteyksiä käyttäville striimaajille.",
    guideTitle: "LARIX BROADCASTERIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Larix Broadcaster-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "irl-pro": {
    id: "irl-pro",
    name: "IRL Pro",
    nameHighlight: "Pro",
    price: "MAKSULLINEN",
    logoImage: "https://play-lh.googleusercontent.com/wVEmW1E_2txFRm2E1-Dt2FQYLqtInj9QiG13bxfKKqINiP9DWKe_GWvEp7lYxqa6CU7VUTlIlBjVf_ZFFXdgsg",
    downloadLink: "https://play.google.com/store/apps/details?id=app.irlpro.android&hl=fi",
    downloadText: "Avaa Google Play",
    description: "IRL Pro on Androidille suunnattu IRL-striimaussovellus käyttäjille, jotka haluavat enemmän lähetysasetuksia ja hallintaa.",
    guideTitle: "IRL PRON KÄYTTÖÖNOTTO",
    guideDescription: "Käydään IRL Pro-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "streamelements": {
    id: "streamelements",
    name: "StreamElements",
    price: "FREEMIUM",
    logoImage: "https://www.google.com/s2/favicons?domain=streamelements.com&sz=128",
    downloadLink: "https://streamelements.com/",
    downloadText: "Avaa sivusto",
    description: "StreamElements tarjoaa chatbotin, alertit, overlayt, widgetit ja muita kanavan hallintaan tarkoitettuja työkaluja.",
    guideTitle: "STREAMELEMENTSIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään StreamElements-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "streamlabs-cloudbot": {
    id: "streamlabs-cloudbot",
    name: "Streamlabs Cloudbot",
    nameHighlight: "Cloudbot",
    price: "FREEMIUM",
    logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
    downloadLink: "https://streamlabs.com/cloudbot",
    downloadText: "Avaa sivusto",
    description: "Streamlabs Cloudbot on selainpohjainen botti komentojen, moderoinnin ja katsojatoimintojen hallintaan.",
    guideTitle: "STREAMLABS CLOUDBOTIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Streamlabs Cloudbot-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "nightbot": {
    id: "nightbot",
    name: "Nightbot",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=nightbot.tv&sz=128",
    downloadLink: "https://nightbot.tv/",
    downloadText: "Avaa sivusto",
    description: "Nightbot on helppokäyttöinen pilvipohjainen chatbot Twitchiin ja YouTubeen.",
    guideTitle: "NIGHTBOTIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Nightbot-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "streamerbot": {
    id: "streamerbot",
    name: "Streamer.bot",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=streamer.bot&sz=128",
    downloadLink: "https://streamer.bot/",
    downloadText: "Avaa sivusto",
    description: "Streamer.bot mahdollistaa erittäin monipuoliset automaatiot, komennot ja integraatiot striimiin.",
    guideTitle: "STREAMER.BOTIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Streamer.bot-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "mixitup": {
    id: "mixitup",
    name: "Mix It Up",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=mixitupapp.com&sz=128",
    downloadLink: "https://mixitupapp.com/",
    downloadText: "Avaa sivusto",
    description: "Mix It Up tarjoaa komentoja, minipelejä, automaatioita ja muita vuorovaikutteisia ominaisuuksia striimiin.",
    guideTitle: "MIX IT UPIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Mix It Up-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "serybot": {
    id: "serybot",
    name: "Sery Bot",
    nameHighlight: "Bot",
    price: "ILMAINEN",
    logoImage: "https://docs.sery.bot/img/seryLOVE.png",
    downloadLink: "https://docs.sery.bot/",
    downloadText: "Avaa sivusto",
    description: "Sery Bot auttaa suojaamaan Twitch-kanavaa haitallisilta boteilta, follow-boteilta ja roskapostilta.",
    guideTitle: "SERY BOTIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Sery Bot-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "streamlabs-alerts": {
    id: "streamlabs-alerts",
    name: "Streamlabs Alerts",
    nameHighlight: "Alerts",
    price: "FREEMIUM",
    logoImage: "https://cdn.simpleicons.org/streamlabs/ffffff",
    downloadLink: "https://streamlabs.com/alert-box",
    downloadText: "Avaa sivusto",
    description: "Streamlabs Alerts näyttää seuraajat, tilaukset, lahjoitukset ja muut tapahtumat visuaalisina ilmoituksina lähetyksessä.",
    guideTitle: "STREAMLABS ALERTSIEN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Streamlabs Alerts-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "betterttv": {
    id: "betterttv",
    name: "BetterTTV",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=betterttv.com&sz=128",
    downloadLink: "https://betterttv.com/",
    downloadText: "Avaa sivusto",
    description: "BetterTTV laajentaa Twitch-chatin ominaisuuksia ja tuo käyttöön suuren määrän yhteisön emoteja.",
    guideTitle: "BETTERTTV:N KÄYTTÖÖNOTTO",
    guideDescription: "Käydään BetterTTV-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "7tv": {
    id: "7tv",
    name: "7TV",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=7tv.app&sz=128",
    downloadLink: "https://7tv.app/",
    downloadText: "Avaa sivusto",
    description: "7TV lisää Twitch- ja muiden chat-palveluiden emotevalikoimaa ja mahdollistaa yhteisön omien emotejen käytön.",
    guideTitle: "7TV:N KÄYTTÖÖNOTTO",
    guideDescription: "Käydään 7TV-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "davinci": {
    id: "davinci",
    name: "DaVinci Resolve",
    nameHighlight: "Resolve",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=blackmagicdesign.com&sz=128",
    downloadLink: "https://www.blackmagicdesign.com/products/davinciresolve",
    downloadText: "Lataa DaVinci",
    description: "DaVinci Resolve on ammattitason videoeditori editointiin, värimäärittelyyn, ääneen ja efekteihin.",
    guideTitle: "DAVINCI RESOLVEN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään DaVinci Resolve-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "capcut": {
    id: "capcut",
    name: "CapCut",
    price: "ILMAINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=capcut.com&sz=128",
    downloadLink: "https://www.capcut.com/",
    downloadText: "Avaa sivusto",
    description: "CapCut on helppokäyttöinen videoeditori erityisesti lyhyille videoille ja sosiaalisen median sisällölle.",
    guideTitle: "CAPCUTIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään CapCut-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "premiere": {
    id: "premiere",
    name: "Adobe Premiere Pro",
    nameHighlight: "Premiere Pro",
    price: "MAKSULLINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=adobe.com&sz=128",
    downloadLink: "https://www.adobe.com/products/premiere.html",
    downloadText: "Avaa sivusto",
    description: "Adobe Premiere Pro on ammattitason videoeditointiohjelma monipuoliseen sisällöntuotantoon.",
    guideTitle: "ADOBE PREMIERE PRON KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Adobe Premiere Pro-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "photoshop": {
    id: "photoshop",
    name: "Photoshop",
    price: "MAKSULLINEN",
    logoImage: "https://www.google.com/s2/favicons?domain=photoshop.adobe.com&sz=128",
    downloadLink: "https://www.adobe.com/products/photoshop.html",
    downloadText: "Avaa sivusto",
    description: "Photoshop on kuvankäsittely- ja grafiikkaohjelma esimerkiksi thumbnaileihin, bannereihin ja striimigrafiikoihin.",
    guideTitle: "PHOTOSHOPIN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Photoshop-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },

  "canva": {
    id: "canva",
    name: "Canva",
    price: "FREEMIUM",
    logoImage: "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
    downloadLink: "https://www.canva.com/",
    downloadText: "Avaa sivusto",
    description: "Canva on helppo selainpohjainen työkalu grafiikoiden, somekuvien, bannereiden ja videoiden tekemiseen.",
    guideTitle: "CANVAN KÄYTTÖÖNOTTO",
    guideDescription: "Käydään Canva-työkalun käyttöönotto läpi vaihe vaiheelta.",
    steps: [
      {
        title: "AVAA PALVELU TAI ASENNA OHJELMA",
        text: "Avaa työkalun virallinen sivusto ja asenna sovellus, jos työkalu sitä vaatii. Käytä aina virallista latauslähdettä.",
      },
      {
        title: "LUO TILI TAI KIRJAUDU SISÄÄN",
        text: "Kirjaudu sisään olemassa olevalla tililläsi tai luo uusi käyttäjätili. Yhdistä tarvittaessa Twitch-, YouTube- tai muu käyttämäsi palvelu.",
      },
      {
        title: "TARKISTA PERUSASETUKSET",
        text: "Käy läpi tärkeimmät asetukset ennen käyttöönottoa. Tarkista erityisesti tili-, yksityisyys-, ääni-, video- ja integraatioasetukset sen mukaan, mitä työkalu käyttää.",
      },
      {
        title: "YHDISTÄ TARVITTAVAT PALVELUT",
        text: "Yhdistä työkalu niihin palveluihin, joiden kanssa haluat käyttää sitä. Hyväksy vain oikeasti tarvittavat käyttöoikeudet.",
      },
      {
        title: "TEE ENSIMMÄINEN MÄÄRITYS",
        text: "Luo ensimmäinen komento, näkymä, projekti, alertti tai muu työkalun perustoiminto. Näin varmistat, että yhteys ja asetukset toimivat.",
      },
      {
        title: "TESTAA ENNEN JULKAISUA",
        text: "Testaa toiminta rauhassa ennen varsinaista lähetystä tai julkaisua. Tarkista, että kuva, ääni, komennot, alertit tai muut ominaisuudet toimivat odotetusti.",
      },
      {
        title: "OTA TYÖKALU KÄYTTÖÖN",
        text: "Kun testi toimii, ota työkalu mukaan normaaliin striimi- tai sisällöntuotantotyönkulkuusi. Pidä sovellus ja integraatiot ajan tasalla.",
      },
    ],
  },
};