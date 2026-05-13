import { Link } from "react-router-dom";

export default function LearningLogAufbauen() {
  return (
    <>
      <p>
        Die meisten Brands wissen, welches Creative diesen Monat gewonnen hat. Wenige wissen,{" "}
        <em>welcher Hook-Typ</em> in ihrer Nische über 12 Monate stabil dominiert. Diese Lücke
        schließt das Learning-Log — eines der unterschätztesten Werkzeuge im Performance Creative.
      </p>

      <h2>Warum es die meisten Brands nicht haben</h2>
      <p>
        Drei Gründe: Der Test ist vorbei, der Druck wechselt zum nächsten Monat, niemand schreibt
        es auf. Der Plattform-Report ist da, aber er fasst Ergebnisse zusammen — nicht
        Erkenntnisse. Eine Erkenntnis ist <em>generalisierbar</em>; ein Ergebnis ist
        kontextabhängig.
      </p>

      <h2>Die Pflicht-Felder pro Eintrag</h2>
      <ol>
        <li>
          <strong>Datum + Test-ID</strong> — eindeutige Referenz, damit du Tests später
          rekonstruieren kannst.
        </li>
        <li>
          <strong>Hypothese (formuliert vor dem Test)</strong> — siehe{" "}
          <Link to="/blog/creative-hypothesen-formulieren">Creative-Hypothesen formulieren</Link>.
        </li>
        <li>
          <strong>Test-Setup</strong> — Audience, Placement, Budget pro Cell, Stop-Regel,
          Plattform.
        </li>
        <li>
          <strong>Ergebnis (KPI-Delta zwischen Cells)</strong> — Hook-Rate, CTR, CPC, ROAS, jede
          relevant.
        </li>
        <li>
          <strong>Verifikation</strong> — Statistical Significance erreicht? Bei kleinen Tests
          oft schwierig — dann Soft-Confidence-Statement reichen.
        </li>
        <li>
          <strong>Generalisierbare Erkenntnis</strong> — der wichtigste Eintrag. Was lernen wir
          daraus über Hook-Typen, Formate, Bildwelten in unserer Nische?
        </li>
        <li>
          <strong>Nächster Test</strong> — was wir auf Basis dieses Ergebnisses als Nächstes
          prüfen wollen.
        </li>
      </ol>

      <h2>Beispieleintrag</h2>
      <blockquote>
        <strong>Test #14 · 2026-04-22</strong>
        <br />
        Hypothese: Hook-Variante „klebrige Sonnencreme?" gegen aktuelle aspirational-Variante
        führt zu mindestens 25 % höherer Hook-Rate.
        <br />
        Setup: TikTok In-Feed, Audience „Skincare 25–40 DACH", 2.500 € pro Cell, Stop nach 5 Tagen.
        <br />
        Ergebnis: Hook-Rate +32 %, CTR +18 %, CPC −12 %, ROAS +9 %.
        <br />
        Verifikation: 6.800 Klicks pro Cell, p ≪ 0,01.
        <br />
        Generalisierbare Erkenntnis: Konkret-physische Pain-Point-Hooks schlagen abstrakt-emotionale
        Aspiration im DACH-Sun-Care-Segment. Vermutlich übertragbar auf andere
        Sensory-Pain-Kategorien (klebrig, fettig, schwer).
        <br />
        Nächster Test: Pain-Point-Hook auf Anti-Aging-Linie übertragen — testet
        Übertragbarkeitsannahme.
      </blockquote>

      <h2>Tools, die wir nutzen</h2>
      <p>
        Wir arbeiten mit Notion-Datenbanken (intern + Kunden-geteilt). Eine Tabelle mit den oben
        genannten Feldern als Spalten reicht. Wichtiger als das Tool ist die Disziplin: jeder Test
        landet im Log, ohne Ausnahmen, innerhalb von 48 Stunden nach Ende.
      </p>
      <p>
        Alternative Tools: Airtable, Google Sheets mit klarer Struktur, Linear-Issues mit
        Test-Tag.
      </p>

      <h2>Was nach 12 Monaten passiert</h2>
      <p>
        Nach einem Jahr hast du 30–60 Einträge. Wenn du die generalisierbaren Erkenntnisse
        durchsuchst, siehst du Muster: Welche Hook-Typen funktionieren in deiner Nische
        wiederholt? Welche Formate sind stabil? Welche Postproduktion-Stile altern besser?
      </p>
      <p>
        Das ist der Moment, in dem dein Marketing-Wissen <em>kompoundiert</em>. Bei jeder neuen
        Kampagne startest du nicht mehr bei null. Du startest bei den 47 % Hooks, die in deiner
        Nische in der Vergangenheit besser performt haben — und stellst dann nur noch die offenen
        Fragen.
      </p>
      <p>
        Das ist der eigentliche Wert eines Performance-Creative-Retainers über die ersten 6
        Monate hinaus: nicht die einzelnen Creatives, sondern der akkumulierte Lernpfad.
      </p>
    </>
  );
}
