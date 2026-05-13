import { Link } from "react-router-dom";

export default function CreativeFatigueErkennen() {
  return (
    <>
      <p>
        Creative Fatigue erkennt man nicht im Brainstorming. Man erkennt sie in den Daten — und
        zwar früher, als die meisten Brands schauen. Hier sind die vier Frühindikatoren, auf die
        wir täglich achten, plus die Stop-Regel, die uns vor unnötigem Ad-Spend bewahrt.
      </p>

      <h2>1. Hook-Rate sinkt zuerst</h2>
      <p>
        Die Hook-Rate (3-Second-View-Rate) ist die ehrlichste Frühwarnung. Sie misst, wie viele
        Menschen überhaupt stoppen — bevor jeder Pixel danach eine Rolle spielt. Wenn deine
        Hook-Rate über 7 Tage um mehr als 15 % fällt, ohne dass sich Audience oder Placement
        geändert hat, ist das Creative ermüdet. Die CTR und der ROAS folgen typischerweise 4–10
        Tage später.
      </p>
      <p>
        <strong>Was du tust:</strong> nicht warten, bis ROAS einbricht. Schon bei
        Hook-Rate-Verfall den Ersatz vorbereiten.
      </p>

      <h2>2. CPM steigt, ohne dass das Targeting es erklärt</h2>
      <p>
        Wenn dein CPM um mehr als 20 % steigt, obwohl Audience, Placement und Bidding gleich sind,
        sieht der Algorithmus, dass dein Creative ermüdet. Plattformen erhöhen den Preis für
        ermüdetes Material, weil es weniger Engagement liefert.
      </p>
      <p>
        <strong>Was du tust:</strong> CPM gegen vorherige 30-Tage-Range vergleichen. Steigt er
        unverhältnismäßig, prüfe gleichzeitig die Hook-Rate.
      </p>

      <h2>3. Frequency überschreitet 3,5</h2>
      <p>
        Bei Frequency &gt; 3,5 (in 7 Tagen) sieht dieselbe Person dein Creative mehr als drei Mal.
        In Beauty/Health ist das die typische Schmerzgrenze, ab der Engagement und CTR rapide
        sinken.
      </p>
      <p>
        <strong>Was du tust:</strong> Frequency in Meta Ads Manager direkt monitoren.
        Frequency-Caps helfen — sind aber kein Ersatz für frische Creatives.
      </p>

      <h2>4. CTR fällt, aber Conversion-Rate bleibt stabil</h2>
      <p>
        Das ist der subtilste Indikator: weniger Klicks, aber die, die kommen, kaufen. Was zuerst
        nach „Audience-Verfall" aussieht, ist oft Creative Fatigue: nur die wirklich Interessierten
        überzeugt das alte Creative noch — die zufällig Vorbeischauenden nicht mehr. Ergebnis:
        absolute Volumina sinken, der Funnel sieht künstlich „sauberer" aus.
      </p>
      <p>
        <strong>Was du tust:</strong> Volumen-Trend statt Verhältnis-Trend lesen. Sinkende Klicks
        bei gleicher Conversion-Rate = Skalierungsdeckel.
      </p>

      <h2>Die Stop-Regel</h2>
      <p>
        Wir nehmen ein Creative aus dem Lauf, wenn <strong>zwei der vier</strong> Indikatoren über
        7 Tage außerhalb der Toleranz liegen. Nicht erst bei drei. Nicht erst, wenn ROAS sinkt.
      </p>
      <p>
        Das klingt streng, ist aber wirtschaftlich richtig: bis ROAS sinkt, hast du oft schon
        20–40 % unnötigen Spend in einem ermüdenden Creative versenkt. Die Pipeline der nächsten
        Creatives muss vorher stehen — siehe <Link to="/creative-engine">Creative Engine</Link>.
      </p>

      <h2>Was Creative Fatigue nicht ist</h2>
      <p>
        Wichtig: Creative Fatigue ist kein „das Creative wird schlechter". Das Creative ist das
        gleiche. Was sich ändert, ist das Verhältnis von <em>Menschen, die es noch nicht gesehen
        haben</em> zu <em>Menschen, die es zum dritten Mal sehen</em>. Jede Skalierung beschleunigt
        diesen Prozess.
      </p>
      <p>
        Die Konsequenz: Skalierung erfordert Pipeline. Ohne kontinuierlich neue Creatives ist
        Skalierung mathematisch unmöglich.
      </p>
    </>
  );
}
