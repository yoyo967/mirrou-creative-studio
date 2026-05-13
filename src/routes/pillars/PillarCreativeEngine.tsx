import { Link } from "react-router-dom";

export default function PillarCreativeEngine() {
  return (
    <>
      <h2>Warum ein „Operating System"</h2>
      <p>
        Die meisten Agentur-Briefings funktionieren linear: Brief rein, Shooting raus, Rechnung
        dazu. Das ist okay, wenn du einmal pro Quartal eine Kampagne brauchst. Es ist nicht okay,
        wenn dein Werbekonto rund um die Uhr läuft und alle paar Wochen neue, getestete Creatives
        braucht.
      </p>
      <p>
        Was du brauchst, ist nicht ein nächstes Shooting. Du brauchst einen{" "}
        <strong>Loop, der nicht stoppt</strong>. Wir nennen ihn die Creative Engine.
      </p>

      <h2>Die fünf Schritte</h2>

      <h3>01 — Analyse</h3>
      <p>
        Wir bekommen Read-only-Zugriff auf euer Werbekonto (Meta, TikTok, Google Ads). Wir lesen
        die letzten 60–90 Tage:
      </p>
      <ul>
        <li>Welche Creatives haben gespendet, welche sind ermüdet?</li>
        <li>Wo bricht die Hook-Rate weg? Wo bricht die CTR weg?</li>
        <li>
          Welche Hooks, Formate, Bildwelten korrelieren mit gutem ROAS — und welche nur mit guter
          CTR (das ist nicht dasselbe)?
        </li>
      </ul>
      <p>
        Output dieses Schritts ist ein Creative-Audit-Dokument. Kein Marketingmaterial, sondern
        eine ehrliche Bestandsaufnahme. Es bildet die Grundlage für alles, was danach kommt.
      </p>

      <h3>02 — Hypothesen</h3>
      <p>
        Aus der Analyse leiten wir konkrete Creative-Hypothesen ab. Eine Hypothese ist nicht „lass
        uns mal etwas Neues probieren". Eine Hypothese hat dieses Format:
      </p>
      <blockquote>
        Wir vermuten, dass <strong>[konkrete Creative-Variante]</strong> für{" "}
        <strong>[konkrete Zielgruppe]</strong> zu <strong>[konkretem KPI-Effekt]</strong> führt —
        weil <strong>[Begründung aus Daten oder Marktbeobachtung]</strong>.
      </blockquote>
      <p>Beispiel:</p>
      <blockquote>
        Wir vermuten, dass eine Hook-Variante mit dem Pain Point „klebrige Sonnencreme" zu einer
        um mindestens 25 % höheren Hook-Rate führt als die aktuelle aspirational Variante — weil
        unsere Top-3 organischen TikTok-Posts der Konkurrenz alle dieselbe Pain-Point-Eröffnung
        nutzen.
      </blockquote>
      <p>
        Pro Produktionszyklus formulieren wir typischerweise 3–5 Hypothesen. Jede wird mit
        Test-Cells (Kontrolle + 2–3 Varianten) gegen die aktuelle Bestform gestellt.
      </p>

      <h3>03 — Produktion</h3>
      <p>
        Die Produktion ist hybrid. Wir kombinieren echte Fotografie aus unserem Hamburger Studio
        mit KI-generierten Hintergründen und Stilvarianten (
        <Link to="/foto-ki-hybrid">mehr dazu hier</Link>). Aus einem Shooting-Tag entstehen so
        20–40 finale Creatives — nicht 5.
      </p>
      <p>
        Das ist kein Selbstzweck. Es ist die einzige Art, in einem 2-Wochen-Rhythmus echte
        Test-Cells mit ausreichender Varianten-Tiefe zu liefern. Jede Variante bekommt einen
        klaren Dateinamen und eine Hypothese-ID.
      </p>

      <h3>04 — Testing</h3>
      <p>Tests werden strukturiert aufgesetzt. Standardlogik:</p>
      <ul>
        <li>1 Hypothese = 1 Test</li>
        <li>1 Test = mindestens 2 Cells (Kontrolle + Variante)</li>
        <li>Mindest-Statistik: ab 1.000 Klicks oder 50.000 Impressions pro Cell</li>
        <li>Stop-Regel: Nach 7 Tagen, oder wenn ein Cell signifikant unterperformt</li>
      </ul>
      <p>
        Wir nutzen die A/B-Testing-Funktionen der Plattformen, ergänzt durch eigene
        UTM-Strukturen. Reporting läuft wöchentlich.
      </p>

      <h3>05 — Learning</h3>
      <p>
        Das ist der Schritt, den fast alle überspringen — und der den Unterschied zwischen Output
        und echter Lernkurve macht. Jede Test-Auswertung landet in einem Learning-Log mit:
      </p>
      <ul>
        <li>Hypothese (formuliert vor dem Test)</li>
        <li>Test-Setup</li>
        <li>Ergebnis (gewonnene/verlorene Hypothese, mit KPI-Delta)</li>
        <li>
          Generalisierbare Erkenntnis: <em>Was lernen wir daraus für nächste Creatives?</em>
        </li>
        <li>Nächster Test (was wir auf Basis dieses Ergebnisses als Nächstes prüfen)</li>
      </ul>
      <p>
        Nach 6 Monaten hast du nicht nur 30+ Creatives produziert. Du hast einen dokumentierten
        Lernpfad: <em>Welche Hooks funktionieren in deiner Nische?</em> Diese Erkenntnis ist
        langlebiger als jedes einzelne Creative.
      </p>

      <h2>Variablen-Isolation: Wissenschaft statt Raten</h2>
      <p>
        Der größte Fehler im Creative Testing: drei Dinge gleichzeitig ändern. Wenn die neue
        Variante gewinnt, weißt du nicht, woran es lag. Unsere Regel: <strong>eine Variable pro
        Test</strong>. Hook gegen Hook. Format gegen Format. Aber nie alles auf einmal.
      </p>

      <h2>Wie der Loop bei uns einsteckt</h2>
      <p>Im Retainer-Modell läuft der Loop durchgehend:</p>
      <ul>
        <li><strong>Woche 1–2:</strong> Analyse + Hypothesen + Briefing-Update</li>
        <li><strong>Woche 3:</strong> Shooting-Tag in Hamburg</li>
        <li><strong>Woche 4:</strong> Postproduktion + KI-Varianten + Test-Setup</li>
        <li><strong>Woche 5–6:</strong> Tests laufen, Reporting, Learning-Update</li>
        <li><strong>Loop neu</strong></li>
      </ul>
      <p>
        Bei Tier-S-Kunden (10–30 k € Ad-Spend / Monat) ist der Loop eher 6-wöchig, bei
        Tier-L-Kunden (80 k+) eher 3-wöchig. Die Logik bleibt dieselbe.
      </p>

      <h2>Was die Engine nicht ist</h2>
      <p>
        Sie ist kein Tool, kein SaaS, kein Buzzword. Sie ist eine Disziplin: ein Set von
        Vorgehensweisen, das verhindert, dass Creative-Produktion zur Bauchentscheidung wird. Mehr
        nicht, weniger auch nicht.
      </p>
      <p>
        Mehr in den Cluster-Artikeln unten — und in einer ausführlichen Demonstration unserer
        Methodik im <Link to="/cases">Pilot-Case</Link>.
      </p>
    </>
  );
}
