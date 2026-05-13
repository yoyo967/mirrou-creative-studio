import { Link } from "react-router-dom";

export default function PillarFotoKiHybrid() {
  return (
    <>
      <h2>Das Problem mit den zwei Extremen</h2>
      <p>
        <strong>Pure Fotografie</strong> liefert Trust, Authentizität und Texturschärfe. Aber sie
        ist langsam. Ein Set-Tag in einer real gebauten Location für einen Beauty-Shot kostet
        leicht 4–8 k € und produziert vielleicht zehn finale Visuals. Bei einem 30-k-€-Ad-Spend
        pro Monat reicht das für zwei Wochen — danach beginnt Creative Fatigue.
      </p>
      <p>
        <strong>Pure KI</strong> liefert Geschwindigkeit und endlose Variation. Aber sie hat ein
        Identifikations-Problem: KI-Gesichter wirken zu glatt, KI-Hände haben sechs Finger,
        KI-Texturen wirken berechenbar. In Beauty, wo Käufer:innen winzige Mikrosignale lesen,
        bricht das Vertrauen sofort.
      </p>
      <p>
        Wer eines dieser Extreme wählt, muss mit dem Tradeoff leben. Wer beides verbindet, muss es
        nicht.
      </p>

      <h2>Was Hybrid Production bei uns konkret heißt</h2>

      <h3>Ebene 1: Das Produkt — immer echt</h3>
      <p>
        Das Produkt steht nie nur in einer KI-Szene. Wir fotografieren das eigentliche Produkt
        unter kontrollierten Bedingungen: korrekte Farbtemperatur, Texturwiedergabe,
        Konsistenzdarstellung. Die Postproduktion arbeitet mit dem realen Material — keine
        KI-Generierung des Produkts selbst.
      </p>
      <p>
        <strong>Warum:</strong> Käufer:innen erwarten zu Recht, dass das Produkt im Werbebild dem
        Produkt in der Lieferung entspricht. Hier KI einzusetzen, ist nicht nur taktisch dumm, es
        kann auch werberechtlich problematisch werden.
      </p>

      <h3>Ebene 2: Die Person — echt, mit Stilvariation</h3>
      <p>
        Wenn ein Mensch im Bild ist, ist es ein realer Mensch — nicht ein KI-Avatar. Hauttexturen,
        Pigmentierung, Mimik, Haltung müssen echt sein, sonst leidet die Identifikation (siehe{" "}
        <Link to="/beauty-ecommerce-marketing">Beauty-E-Commerce-Pillar</Link>).
      </p>
      <p>
        <strong>KI kommt hier ins Spiel für Variationen:</strong> Veränderung der Lichtsituation,
        Stilcheck (warmer Tag vs. kühler Abend), Hintergrund-Wechsel, Format-Anpassung. Diese
        Variationen entstehen nicht durch Re-Shooting, sondern durch kontrollierte
        KI-Manipulation des realen Footage.
      </p>

      <h3>Ebene 3: Hintergrund / Stimmung — KI als Produktionshebel</h3>
      <p>
        Hier sitzt der eigentliche Hebel. Statt für jede Werbevariante eine Location anzumieten,
        generieren wir Hintergründe in der gewünschten Stimmung: marmornes Bad, botanisches
        Studio, urbanes Penthouse, hyperrealistische Texturlandschaften. Das Produkt und die
        Person werden in diese Hintergründe eingebettet — sauber maskiert, mit korrektem
        Licht-Matching.
      </p>
      <p>
        <strong>Aus einem realen Shooting werden so 5–15 Stilvarianten</strong> für
        unterschiedliche Zielgruppen, Plattformen oder Hypothesen — ohne Re-Shooting.
      </p>

      <h2>EU AI Act: Compliance als Vorteil, nicht als Bremse</h2>
      <p>
        Der EU AI Act ist seit Februar 2025 in Teilen in Kraft, ab August 2026 gilt die volle
        Kennzeichnungspflicht für KI-generierte Werbeinhalte. Viele kleine Studios werden das
        übersehen. Wir behandeln es als Standard.
      </p>

      <h3>Was wir konkret tun</h3>
      <ul>
        <li>
          <strong>Dateinamen-Konvention:</strong> Jede Datei trägt ein KI-Flag, wenn KI involviert
          war (<code>brand_creative_v3_KI-bg.jpg</code> vs.{" "}
          <code>brand_creative_v3_full-photo.jpg</code>).
        </li>
        <li>
          <strong>Kunden-Reporting:</strong> Im monatlichen Report dokumentieren wir, welche
          Creatives KI-generierte Elemente enthalten und in welchem Umfang.
        </li>
        <li>
          <strong>Briefing-Template:</strong> Unser Standard-Briefing fragt früh, welche KI-Anteile
          gewünscht und welche ausgeschlossen sind.
        </li>
        <li>
          <strong>AVV mit den Kunden:</strong> Auftragsverarbeitungsvertrag (DSGVO) und
          KI-Transparenzklausel sind Standardbestandteile unserer Verträge.
        </li>
      </ul>
      <p>
        Der Effekt: Wenn ab August 2026 die ersten Marken Compliance-Audits ihrer Werbemittel
        laufen lassen, ist nichts zu tun. Alles ist dokumentiert, alles ist konform.
      </p>

      <h3>Risiko-Klassifizierung</h3>
      <p>
        KI-generierte Hintergründe in Werbung fallen unter „begrenztes Risiko" — keine aufwendige
        Zertifizierung wie bei Hochrisiko-KI (medizinische Diagnostik,
        Bewerbungsentscheidungen), nur Transparenz- und Kennzeichnungspflicht. Genau in dieser
        Zone arbeiten wir.
      </p>

      <h2>Welche Tools wir nutzen — und welche bewusst nicht</h2>
      <p><strong>Im Einsatz:</strong></p>
      <ul>
        <li>Midjourney (v6+) für Hintergründe und Stimmungsvariationen</li>
        <li>Adobe Firefly für rechtssichere Generierung im DACH-Werbeumfeld</li>
        <li>Photoshop / Adobe Generative Fill für gezielte Bildbereich-Änderungen</li>
        <li>Eigene Lightroom-Presets für konsistente Bildsprache pro Brand</li>
      </ul>
      <p><strong>Bewusst nicht im Einsatz:</strong></p>
      <ul>
        <li>KI-Tools, deren Trainingsdaten unklar sind oder Urheberrechtsverletzungen riskieren</li>
        <li>KI-Generierung von Gesichtern, die echte Personen darstellen sollen</li>
        <li>Vollautomatische „Ad-Generators", die Creatives ohne menschliche Hypothese ausspucken</li>
      </ul>
      <p>
        Wir sind nicht religiös in der Tool-Wahl — wir sind religiös in der Frage, wer für das
        fertige Bild verantwortlich ist. Diese Verantwortung tragen wir, nicht ein Modell.
      </p>

      <h2>Wann Hybrid sich lohnt</h2>
      <p>Hybrid-Production rechnet sich vor allem in zwei Szenarien:</p>
      <ol>
        <li>
          <strong>Höhere Frequenz:</strong> Wenn du im 2–4-Wochen-Rhythmus neue Creatives
          brauchst, ist Hybrid die einzige skalierbare Option ohne Qualitätsverlust.
        </li>
        <li>
          <strong>A/B-Tests mit Stilvarianten:</strong> Wenn du wissen willst, ob ein botanischer
          Hintergrund besser performt als ein urbaner, brauchst du beide — schnell, in derselben
          Look-and-Feel-Familie. Hybrid liefert das.
        </li>
      </ol>
      <p>
        Wenn du nur ein Hero-Visual pro Saison brauchst, ist klassische Fotografie wirtschaftlicher.
        Wir sind ehrlich darüber.
      </p>

      <h2>Was du als Nächstes tun kannst</h2>
      <p>
        Wenn du eine D2C-Brand führst und das Gefühl hast, dass eure Produktion zur Engstelle
        wird:
      </p>
      <ol>
        <li>
          Schau dir die letzten 30 Ad-Creatives an. Wie viele davon sind tatsächliche Stilvarianten
          desselben Shootings — und wie viele sind „mehr vom Gleichen"?
        </li>
        <li>
          Frag dein aktuelles Studio:{" "}
          <em>Wie würdet ihr aus einem Shooting-Tag 25 statt 8 finale Creatives produzieren?</em>
        </li>
        <li>
          Frag dich selbst: Habt ihr eine schriftliche Position zu KI-Einsatz in Werbung — oder
          wird das ad hoc entschieden, wenn der nächste Auftrag kommt?
        </li>
      </ol>
      <p>
        Drei Mal kein klares Ja? Wir reden gerne darüber.{" "}
        <Link to="/kontakt">Strategiegespräch buchen →</Link>
      </p>
    </>
  );
}
