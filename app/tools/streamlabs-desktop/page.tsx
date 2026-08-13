import ToolGuide from "../../../components/ToolGuide";

export default function StreamlabsDesktopGuide() {
  return (
    <ToolGuide
      name="Streamlabs Desktop"
      nameHighlight="Desktop"
      price="ILMAINEN"
      logoImage="https://cdn.simpleicons.org/streamlabs/ffffff"
      downloadLink="https://streamlabs.com/streamlabs-desktop"
      downloadText="Lataa Streamlabs"
      description="Streamlabs Desktop yhdistää striimaamisen tärkeimmät työkalut yhteen ohjelmaan. Tässä oppaassa käydään läpi ohjelman käyttöönotto ensimmäisestä käynnistyksestä valmiiseen lähetykseen."
      guideTitle="STREAMLABS DESKTOPIN KÄYTTÖÖNOTTO"
      guideDescription="Käydään Streamlabs Desktopin tärkeimmät asetukset läpi vaihe vaiheelta."
      steps={[
        {
          title: "LATAA JA ASENNA STREAMLABS DESKTOP",
          text: "Lataa Streamlabs Desktop ohjelman viralliselta verkkosivulta ja suorita asennus. Käynnistä ohjelma asennuksen jälkeen.",
        },
        {
          title: "YHDISTÄ STRIIMAUSTILISI",
          text: "Kirjaudu Streamlabs Desktopiin ja yhdistä käyttämäsi striimauspalvelu, esimerkiksi Twitch tai YouTube. Streamlabs käyttää yhdistettyä tiliä lähetyksen käynnistämiseen ja kanavatietojen hallintaan.",
        },
        {
          title: "LUO ENSIMMÄINEN SKENE",
          text: "Scenes-osiossa voit luoda erilaisia näkymiä lähetyksellesi. Tee esimerkiksi peliskene, Just Chatting -näkymä, Starting Soon -ruutu ja BRB-näkymä.",
        },
        {
          title: "LISÄÄ LÄHTEET",
          text: "Lisää Sources-osiosta tarvitsemasi lähteet. Voit lisätä esimerkiksi pelin tai ikkunan kaappauksen, näytön, webkameran, kuvia, tekstiä ja muita elementtejä.",
        },
        {
          title: "LISÄÄ KAMERA",
          text: "Paina Sources-kohdan plus-painiketta, valitse Video Capture Device ja valitse käyttämäsi kamera. Tämän jälkeen voit sijoittaa ja rajata kameran haluamaasi kohtaan skenessä.",
        },
        {
          title: "TARKISTA MIKROFONI JA ÄÄNET",
          text: "Lisää tarvittaessa Audio Input Capture mikrofonille ja tarkista mikseristä, että sekä mikrofoni että tietokoneen äänet toimivat. Vältä liian kovaa äänenvoimakkuutta, joka aiheuttaa äänen säröytymistä.",
        },
        {
          title: "LISÄÄ ALERTIT JA WIDGETIT",
          text: "Streamlabs Desktopissa voit lisätä esimerkiksi Alert Boxin, Chat Boxin ja muita widgettejä suoraan Sources-valikosta. Näillä saat seuraajat, tilaukset ja muut tapahtumat näkymään lähetyksessä.",
        },
        {
          title: "TARKISTA LÄHETYSASETUKSET",
          text: "Avaa Settings ja tarkista Video- sekä Output-asetukset. Valitse resoluutio, FPS ja muut lähetysasetukset tietokoneesi suorituskyvyn, verkkoyhteytesi ja käyttämäsi striimauspalvelun mukaan.",
        },
        {
          title: "TEE TESTI ENNEN LIVEÄ",
          text: "Tarkista ennen varsinaista lähetystä, että kamera, mikrofoni, peliäänet, skenet, alertit ja muut lähteet toimivat oikein. Lyhyt testitallennus auttaa löytämään mahdolliset ongelmat.",
        },
        {
          title: "PAINA GO LIVE",
          text: "Kun kaikki on valmista, paina Go Live. Tarkista lähetyksen otsikko, kategoria ja muut kanavatiedot ja käynnistä lähetys.",
        },
      ]}
    />
  );
}