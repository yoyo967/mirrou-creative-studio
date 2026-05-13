import { Link } from "react-router-dom";

export default function CreativeHypothesenFormulieren() {
  return (
    <>
      <p>
        „Lass uns mal etwas Neues testen" ist keine Hypothese. Es ist ein Wunsch. Eine echte
        Creative-Hypothese hat drei Bausteine, die jeden Test von einem zufälligen Versuch zu
        einer kontrollierten Frage machen.
      </p>

      <h2>Die drei Bausteine</h2>

      <h3>1. Die Variable (was wir ändern)</h3>
      <p>
        Konkret und isoliert. <em>„Wir testen Hook A gegen Hook B."</em> Nicht <em>„Wir testen
        Variante 3 gegen Variante 7."</em> Wenn Variante 3 und 7 sich in fünf Dingen
        unterscheiden, lernst du nichts.
      </p>

      <h3>2. Die Erwartung (welcher KPI sich wie ändert)</h3>
      <p>
        Du musst vor dem Test wissen, welcher KPI sich wie ändern soll. Sonst suchst du dir nach
        dem Test den KPI, der am besten aussieht — und das ist Selbstbestätigung, kein Lernen.
      </p>

      <h3>3. Die Begründung (warum wir das vermuten)</h3>
      <p>
        Aus Daten der eigenen Kampagnen, aus Marktbeobachtung, aus Konkurrenz-Analyse. Eine gute
        Begründung verbindet die Hypothese mit etwas, das du schon weißt.
      </p>

      <h2>Das Template</h2>
      <p>Wir nutzen dieses Format intern für jede Test-Welle:</p>
      <blockquote>
        Wir vermuten, dass <strong>[konkrete Variante]</strong> für{" "}
        <strong>[konkrete Zielgruppe / Audience]</strong> zu{" "}
        <strong>[KPI-Effekt mit erwartetem Delta]</strong> führt — weil{" "}
        <strong>[evidenzbasierte Begründung]</strong>.
      </blockquote>

      <h2>Drei Beispiele aus der Praxis</h2>

      <h3>Beispiel 1 — Hook-Variante</h3>
      <blockquote>
        Wir vermuten, dass eine Hook-Variante mit dem Pain Point „klebrige Sonnencreme" für die
        Audience „Skincare-affine Frauen 25–40, urban" zu einer um mindestens 25 % höheren
        Hook-Rate führt — weil unsere Top-3 organischen TikTok-Posts der Konkurrenz alle dieselbe
        Pain-Point-Eröffnung nutzen.
      </blockquote>

      <h3>Beispiel 2 — Format-Variante</h3>
      <blockquote>
        Wir vermuten, dass ein 9:16-vertikales Format gegenüber 4:5-quadratisch in TikTok-Feed
        eine um mindestens 15 % höhere Hold-Rate erzielt — weil 9:16 nativ den TikTok-Bildschirm
        füllt und „Werbung-Erkennung" reduziert.
      </blockquote>

      <h3>Beispiel 3 — Postproduktion</h3>
      <blockquote>
        Wir vermuten, dass eine entsättigte, kontrastreichere Postproduktion gegenüber der
        aktuellen warmen Bildsprache zu einer um 10 % niedrigeren CPC führt — weil die
        Konkurrenz im aktuellen Quartal stark warm-cinematisch arbeitet und unsere Creatives sich
        durch Kontrast abheben würden.
      </blockquote>

      <h2>Was eine schlechte Hypothese ausmacht</h2>
      <ul>
        <li>
          <strong>Zu vage:</strong> „Lass uns moderner aussehen." (Was ist „modern"? Welcher KPI?)
        </li>
        <li>
          <strong>Zu viele Variablen:</strong> „Lass uns Hook, Body und CTA gleichzeitig ändern."
          (Lernrate = null)
        </li>
        <li>
          <strong>Ohne Begründung:</strong> „Ich glaube, vertikal ist besser." (Glauben ist nicht
          testen)
        </li>
        <li>
          <strong>Nicht widerlegbar:</strong> „Es wird besser performen." (Was ist „besser"?)
        </li>
      </ul>

      <h2>Wie viele Hypothesen pro Zyklus?</h2>
      <p>
        In unseren Retainern formulieren wir typischerweise 3–5 Hypothesen pro Produktionszyklus.
        Mehr ist operativ schwer zu testen (Test-Cells brauchen Statistik). Weniger lässt
        Lernchancen liegen.
      </p>
      <p>
        Jede Hypothese landet im{" "}
        <Link to="/blog/learning-log-aufbauen">Learning-Log</Link> — vor dem Test, mit dem
        Setup, und nach dem Test mit dem Ergebnis. So entsteht über Quartale hinweg ein
        Wissensbestand, der unbezahlbar ist.
      </p>
    </>
  );
}
