import { Link } from "react-router-dom";

export default function PillarPerformanceCreative() {
  return (
    <>
      <h2>Worum es geht</h2>
      <p>
        In den letzten fünf Jahren ist im Paid Social ein stiller Wechsel passiert:{" "}
        <strong>Die Algorithmen können besser targeten als jeder Mensch.</strong> Meta, TikTok und
        Google verteilen Budgets längst weitgehend automatisch. Was sie nicht für dich erfinden
        können, ist das Bild, der Hook, die zwei Sekunden, die einen Daumen anhalten.
      </p>
      <p>
        Genau deshalb ist heute das Creative der entscheidende Hebel. Studien aus Meta-internen
        Daten und unabhängigen Performance-Auditoren weisen dem Creative regelmäßig{" "}
        <strong>bis zu 70 Prozent des Kampagnenerfolgs</strong> zu. Targeting, Bidding, Placements —
        alles wichtig, aber zunehmend Commodity. Das Creative ist der Differenzierungsraum, der dir
        noch bleibt.
      </p>
      <p>Performance Creative ist die Disziplin, dieses Wissen ernst zu nehmen.</p>

      <h2>Definition: Was Performance Creative ist — und was nicht</h2>
      <p>Es gibt drei verbreitete Missverständnisse, mit denen wir täglich aufräumen:</p>
      <p>
        <strong>1. „Schöne Bilder = gute Creatives."</strong>
        <br />
        Falsch. Ein technisch perfektes Editorial-Foto kann auf Instagram-Stories durchrasseln,
        weil es keinen Hook in den ersten 1,5 Sekunden hat. Performance Creative beginnt nicht mit
        Ästhetik, sondern mit der Frage: <em>Warum sollte jemand auf diesem Frame stoppen?</em>
      </p>
      <p>
        <strong>2. „Wir testen einfach mehr Varianten."</strong>
        <br />
        Mehr Varianten ohne Hypothese sind Lärm. Performance Creative arbeitet mit klaren
        Hypothesen pro Variante: <em>Diese Version testet Hook A gegen Hook B</em>;{" "}
        <em>diese testet Format vertikal vs. quadratisch</em>;{" "}
        <em>diese testet Problem-Solution gegen Aspiration</em>.
      </p>
      <p>
        <strong>3. „Das macht doch der Algorithmus von alleine."</strong>
        <br />
        Der Algorithmus ist gut darin, das beste deiner Creatives zu finden. Er ist schlecht
        darin, Creatives zu erfinden, die du nicht produziert hast. Wenn dein Creative-Pool drei
        Varianten enthält, optimiert er auf die beste der drei — auch wenn alle drei mittelmäßig
        sind.
      </p>

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v1-creative-workflow-production.png"
          alt="Creative Production Workflow — High-end Camera and Digital Screens"
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          Creative-Workflow: vom Brief zum getesteten Asset
        </p>
      </div>

      <h2>Die Mechanik: Creative Fatigue</h2>
      <p>Jedes Creative hat eine Halbwertszeit. Eine grobe Faustregel aus unserer Praxis:</p>
      <div className="not-prose my-10 overflow-x-auto">
        <table className="w-full text-sm border border-white/5">
          <thead>
            <tr className="bg-surface/50">
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-accent font-mono">
                Ad-Spend / Monat
              </th>
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-accent font-mono">
                Typische Creative-Halbwertszeit
              </th>
            </tr>
          </thead>
          <tbody className="text-muted">
            <tr className="border-t border-white/5"><td className="p-3">5–15 k €</td><td className="p-3">4–8 Wochen</td></tr>
            <tr className="border-t border-white/5"><td className="p-3">15–50 k €</td><td className="p-3">2–4 Wochen</td></tr>
            <tr className="border-t border-white/5"><td className="p-3">50–150 k €</td><td className="p-3">1–3 Wochen</td></tr>
            <tr className="border-t border-white/5"><td className="p-3">150 k € +</td><td className="p-3">wenige Tage bis 2 Wochen</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Je höher dein Budget, desto schneller siehst du dasselbe Creative dieselbe Zielgruppe.
        Frequency-Caps verzögern den Effekt, lösen ihn aber nicht. Die Konsequenz:{" "}
        <strong>Wer skalieren will, braucht eine kontinuierliche Creative-Pipeline.</strong> Nicht
        ein Mega-Shooting im Quartal, sondern einen Rhythmus aus alle 2–4 Wochen frischen,
        getesteten Varianten.
      </p>

      <h2>Die KPIs, die wirklich zählen</h2>
      <p>
        Es gibt zu viele Metriken im Werbekonto. Für Performance Creative sind diese vier zentral:
      </p>
      <ul>
        <li>
          <strong>Hook-Rate / 3-Second-View-Rate</strong> — wie viele Menschen bleiben überhaupt?
          Das ist die ehrlichste Bewertung deines Creatives, unabhängig von der Landing-Page.
        </li>
        <li>
          <strong>CTR (Click-Through-Rate) / Outbound-CTR</strong> — wie viele klicken? Hier zeigt
          sich, ob das Versprechen im Creative zur Erwartung an den Klick passt.
        </li>
        <li>
          <strong>CPC (Cost per Click)</strong> — gleiche Information, anders skaliert. Sinkt er,
          wird dein Creative effizienter.
        </li>
        <li>
          <strong>ROAS / CAC</strong> — die Geschäftsmetrik. Sie kombiniert Creative, Funnel und
          Produkt. Ein Creative, das CTR senkt, aber CAC erhöht, ist kein gutes Creative.
        </li>
      </ul>
      <p>
        Wir berichten alle vier — und vor allem deren <em>relative Veränderung</em> zwischen
        Kontroll- und Test-Creative. Absolute Zahlen ohne Vergleich sind Marketing-Theater.
      </p>

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v2-data-dashboard-metrics.png"
          alt="Ad Metrics Data Dashboard — Real-time Performance Tracking"
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          KPIs in echter Zeit: Hook-Rate, CTR, CPC, ROAS
        </p>
      </div>

      <h2>Was Beauty / Health / Lifestyle besonders macht</h2>
      <p>Drei Dinge, die diese Branche von SaaS, Reisen oder Fashion unterscheiden:</p>
      <ol>
        <li>
          <strong>Bildgewicht.</strong> In Beauty kauft man, was man sieht. Texturen, Hauttöne,
          Lichtführung — winzige Details, die in der Postproduktion ruiniert werden können, sind
          hier Conversion-relevant.
        </li>
        <li>
          <strong>Versprechen-Compliance.</strong> Health-Brands operieren in einem regulierten
          Werbeumfeld (HWG, Cosmetics Regulation). Creatives müssen wirken, ohne unzulässig zu
          versprechen — eine kreative Disziplin, die spezifisches Branchenwissen braucht.
        </li>
        <li>
          <strong>Identifikation &gt; Aspiration.</strong> TikTok hat das Spiel verändert:
          Beauty-Käufer wollen heute eher Menschen sehen, die ihnen ähneln, als unerreichbare
          Models. Ad-Creatives, die dem nicht folgen, werden weggewischt.
        </li>
      </ol>

      <h2>Wie Mirrou Performance Creative produziert</h2>
      <p>
        Wir produzieren keine Einzel-Creatives. Wir betreiben eine{" "}
        <Link to="/creative-engine">Creative Engine</Link> — einen Loop aus fünf Schritten, der
        Creative-Output systematisch macht: Analyse, Hypothesen, Produktion, Testing, Learning.
      </p>
      <p>
        Das Hybrid-Setup (<Link to="/foto-ki-hybrid">Foto + KI-Hintergrund</Link>) erlaubt uns, in
        derselben Zeit, in der ein klassisches Studio drei Bilder produziert, dreißig Varianten
        auszuliefern. Ohne Qualitätsverlust — und ohne KI-Bilder, die durch ihre algorithmische
        Glätte den Trust untergraben.
      </p>

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v3-team-strategy-session.png"
          alt="Team Strategy Session — Dark Editorial Photography"
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          Strategie-Session: Hypothesen vor Produktion
        </p>
      </div>

      <h2>Was du als Nächstes tun kannst</h2>
      <p>
        Wenn deine Brand monatlich zwischen 10 und 150 k € auf Paid Social ausgibt und du das
        Gefühl hast, dass deine Creatives nicht mit der nötigen Frequenz erneuert werden, dann
        sind drei Hebel realistisch:
      </p>
      <ol>
        <li>
          <strong>Audit deines Creative-Pools.</strong> Wie viele Varianten waren in den letzten
          30 Tagen aktiv? Wie viele davon wurden tatsächlich gegeneinander getestet?
        </li>
        <li>
          <strong>Hook-Audit.</strong> Sind die ersten 1,5 Sekunden eurer Top-3-Spendenden-Creatives
          bewusst gestaltet — oder zufällig entstanden?
        </li>
        <li>
          <strong>Learning-Log einführen.</strong> Welche Hypothese wurde wann gegen welche
          getestet, mit welchem Ergebnis? Wenn du diese Frage nicht in 60 Sekunden beantworten
          kannst, fehlt dir die Lernschleife.
        </li>
      </ol>
      <p>
        Wir helfen bei allen dreien. Im{" "}
        <Link to="/kontakt">Strategiegespräch</Link> bekommst du in 30 Minuten eine ehrliche
        Einschätzung — kostenfrei, ohne Verkaufsdruck.
      </p>
    </>
  );
}
