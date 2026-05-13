import { Link } from "react-router-dom";

export default function EuAiActFuerMarketers() {
  return (
    <>
      <p>
        Ab August 2026 müssen KI-generierte Werbeinhalte in der EU gekennzeichnet werden. Was
        klingt wie Bürokratie-Lärm, ist in Wirklichkeit eine substanzielle Verschiebung — und für
        Marketing-Teams, die KI-Tools nutzen (also fast alle), eine konkrete Vorbereitungsaufgabe.
      </p>

      <h2>Was der EU AI Act für Werbung konkret regelt</h2>
      <p>
        Der EU AI Act unterscheidet vier Risiko-Klassen. Marketing-Anwendungen fallen
        praktisch immer in <strong>„begrenztes Risiko"</strong>: keine aufwendige Zertifizierung,
        aber Transparenz- und Kennzeichnungspflicht.
      </p>
      <p>Konkret heißt das ab August 2026:</p>
      <ol>
        <li>
          <strong>Kennzeichnungspflicht für KI-generierte Inhalte.</strong> Bilder, Videos und
          Audio, die ganz oder substanziell durch KI erzeugt wurden, müssen als solche
          erkennbar sein.
        </li>
        <li>
          <strong>Deepfake-Kennzeichnung.</strong> Synthetisch erzeugte Personen oder
          manipulierte echte Personen müssen explizit als künstlich gekennzeichnet werden.
        </li>
        <li>
          <strong>KI-Literacy-Pflicht.</strong> Bereits seit Februar 2025 in Kraft: Unternehmen
          müssen sicherstellen, dass Mitarbeiter:innen, die KI-Tools nutzen, ausreichende
          Kompetenz haben.
        </li>
      </ol>

      <h2>Was als „KI-generiert" zählt</h2>
      <p>
        Das ist die kniffligste Frage. Die EU-Kommission hat noch keine endgültige
        Detail-Definition veröffentlicht, aber die aktuelle Auslegung lautet sinngemäß:
      </p>
      <ul>
        <li>
          <strong>Voll KI-generiert:</strong> Bild, Video oder Audio, das ohne menschliches
          Originalmaterial entstanden ist (z. B. Midjourney-Hintergrund von Grund auf). Klare
          Kennzeichnung.
        </li>
        <li>
          <strong>Substanziell KI-bearbeitet:</strong> Reales Material, bei dem KI mehr als
          marginal verändert hat (Personentausch, Hintergrund-Tausch, Stiltransfer). Kennzeichnung
          empfohlen / pflichtig.
        </li>
        <li>
          <strong>KI-unterstützte Bearbeitung:</strong> Werkzeug-Einsatz wie Generative Fill für
          kleine Korrekturen, KI-Upscaling, KI-gestützte Maskierung. <em>Vermutlich</em> nicht
          kennzeichnungspflichtig — Detailregelung steht noch aus.
        </li>
      </ul>
      <p>
        <strong>Praxis-Empfehlung:</strong> im Zweifel kennzeichnen. Über-Compliance ist billiger
        als Unter-Compliance.
      </p>

      <h2>Wie die Kennzeichnung aussehen kann</h2>
      <p>
        Konkrete Form ist nicht final festgelegt, aber wahrscheinlich werden folgende Patterns
        akzeptiert:
      </p>
      <ul>
        <li>Sichtbarer Hinweis am Bild/Video: „KI-unterstützt", „AI-generiert", oder Symbol</li>
        <li>Maschinenlesbare Metadaten (C2PA-Standard, Content Credentials)</li>
        <li>Plattform-eigene KI-Labels (Meta hat bereits, TikTok ebenfalls)</li>
      </ul>
      <p>
        Wir empfehlen, alle drei zu kombinieren: sichtbarer Hinweis im Visual + Content Credentials
        in den Metadaten + Plattform-Labels nutzen, wo verfügbar.
      </p>

      <h2>Was passiert bei Nicht-Compliance</h2>
      <p>
        Bußgelder bis zu 15 Millionen Euro oder 3 % des weltweiten Jahresumsatzes (je nachdem,
        was höher ist) für Verstöße gegen Transparenzpflichten. In der Praxis: Wettbewerber-
        und Verbraucherschützer-Klagen werden vermutlich der häufigere Eintreiber sein als die
        Behörden selbst.
      </p>
      <p>
        Realistisch für eine D2C-Beauty-Brand: Abmahnungen, Plattform-Demonetization, Reputation-
        Schaden. Insbesondere Plattform-Demonetization ist gefährlich — Meta und TikTok werden
        ihre eigenen Compliance-Checks vorschalten.
      </p>

      <h2>Was Mirrou macht — als Standard, nicht als Add-on</h2>
      <p>
        Wir behandeln Kennzeichnung nicht als Reaktion, sondern als Bestandteil der Produktion:
      </p>
      <ul>
        <li>Dateinamen-Konvention mit KI-Flag</li>
        <li>Monatliches Kunden-Reporting mit KI-Anteils-Übersicht</li>
        <li>Briefing-Template mit KI-Erlaubnis-Frage</li>
        <li>AVV (DSGVO) und KI-Transparenzklausel im Standardvertrag</li>
        <li>C2PA-Metadaten-Generierung für ausgelieferte Assets</li>
      </ul>
      <p>
        Mehr Detail in unserer <Link to="/foto-ki-hybrid">Foto + KI-Pillar</Link>.
      </p>

      <h2>Was du als Brand jetzt tun solltest</h2>
      <ol>
        <li>
          <strong>Audit deines aktuellen Creative-Bestands.</strong> Welche Visuals enthalten
          KI-Anteile? Sind sie dokumentiert?
        </li>
        <li>
          <strong>Briefing-Template aktualisieren.</strong> KI-Anteile als explizite Frage
          aufnehmen.
        </li>
        <li>
          <strong>Vertragspartner prüfen.</strong> Externe Studios und Freelancer auf ihre
          KI-Compliance-Praxis ansprechen.
        </li>
        <li>
          <strong>Plattform-Labels nutzen.</strong> Meta und TikTok bieten KI-Tags an. Setze sie
          aktiv ein, statt sie zu ignorieren.
        </li>
      </ol>
      <p>
        Wer im August 2026 mit sauberer Compliance startet, hat einen Vorsprung gegenüber Marken,
        die in den Reaktionsmodus rutschen müssen — und das wird ein Großteil sein.
      </p>
    </>
  );
}
