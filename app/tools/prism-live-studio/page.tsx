import ToolGuide from "../../../components/ToolGuide";

export default function PrismLiveStudioGuide() {
  return (
    <ToolGuide
      name="PRISM Live Studio"
      nameHighlight="Live Studio"
      price="ILMAINEN"
logoImage="https://play-lh.googleusercontent.com/814oVEPEUuRRv-Q1UOS9WEiZSIALx_Uy7AT-GdISPPNVvM0mbRxUMTtAzXwiRxjzFEjcxd57ssrLKmoyTuoEAw"
      downloadLink="https://prismlive.com/"
      downloadText="Lataa PRISM"
      description="PRISM Live Studio on monipuolinen striimausohjelma, jolla voit rakentaa lähetyksen, lisätä lähteitä ja lähettää sisältöä eri suoratoistopalveluihin."
      guideTitle="PRISM LIVE STUDION KÄYTTÖÖNOTTO"
      guideDescription="Käydään tärkeimmät asetukset läpi vaihe vaiheelta ensimmäisestä käynnistyksestä valmiiseen lähetykseen."
      steps={[
        {
          title: "LATAA JA ASENNA PRISM LIVE STUDIO",
          text: "Lataa PRISM Live Studio ohjelman viralliselta verkkosivulta ja asenna käyttöjärjestelmällesi sopiva Desktop-versio. Käynnistä ohjelma asennuksen jälkeen.",
        },
        {
          title: "KIRJAUDU PRISMIIN",
          text: "Kirjaudu PRISM Live Studioon. Kirjautumisen jälkeen pääset hallitsemaan lähetyskanavia ja muita ohjelman ominaisuuksia.",
        },
        {
          title: "YHDISTÄ STRIIMAUSKANAVA",
          text: "Lisää käyttämäsi suoratoistopalvelu PRISMin kanava-asetuksista. Voit yhdistää tuettuja palveluita kirjautumalla tilillesi tai käyttää tarvittaessa Custom RTMP -yhteyttä.",
        },
        {
          title: "LUO LÄHETYKSEN NÄKYMÄ",
          text: "Rakenna lähetyksesi scenejen avulla. Voit tehdä erilliset näkymät esimerkiksi pelaamiseen, Just Chattingiin, aloitusruutuun ja tauolle.",
        },
        {
          title: "LISÄÄ LÄHTEET",
          text: "Lisää sceneen tarvitsemasi lähteet, kuten näyttö, peli tai ikkuna, kamera, kuva, teksti ja muut mediaelementit.",
        },
        {
          title: "LISÄÄ KAMERA",
          text: "Lisää kamera Video Capture Device -tyyppisenä lähteenä ja valitse käyttämäsi kamera. Säädä tämän jälkeen kameran koko ja sijainti lähetysnäkymässä.",
        },
        {
          title: "TARKISTA MIKROFONI JA ÄÄNET",
          text: "Varmista mikseristä, että mikrofonisi ja tietokoneen äänet toimivat. Tarkista äänenvoimakkuudet ennen lähetystä, jotta ääni ei säröydy tai jää liian hiljaiseksi.",
        },
        {
          title: "TARKISTA VIDEO- JA LÄHETYSASETUKSET",
          text: "Tarkista resoluutio, FPS ja muut lähetysasetukset. Valitse arvot tietokoneesi suorituskyvyn, verkkoyhteytesi ja käyttämäsi striimauspalvelun perusteella.",
        },
        {
          title: "TEE TESTI ENNEN LIVEÄ",
          text: "Tarkista ennen varsinaista lähetystä kaikki scenet, lähteet, kamera ja äänet. Sulje tarpeettomat raskaat ohjelmat, jotta tietokoneen resurssit riittävät lähetykseen.",
        },
        {
          title: "ALOITA LÄHETYS",
          text: "Kun kaikki on kunnossa, valitse lähetyskanava, tarkista otsikko ja muut lähetyksen tiedot ja käynnistä live PRISM Live Studiosta.",
        },
      ]}
    />
  );
}