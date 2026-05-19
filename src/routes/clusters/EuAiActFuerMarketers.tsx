import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EuAiActFuerMarketers() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p>{t("aiact.p1")}</p>

      <h2>{t("aiact.h2a")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("aiact.p2") }} />
      <p>{t("aiact.p3")}</p>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t("aiact.rule1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.rule2") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.rule3") }} />
      </ol>

      <h2>{t("aiact.h2b")}</h2>
      <p>{t("aiact.p4")}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("aiact.class1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.class2") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.class3") }} />
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t("aiact.p5") }} />

      <h2>{t("aiact.h2c")}</h2>
      <p>{t("aiact.p6")}</p>
      <ul>
        <li>{t("aiact.label1")}</li>
        <li>{t("aiact.label2")}</li>
        <li>{t("aiact.label3")}</li>
      </ul>
      <p>{t("aiact.p7")}</p>

      <h2>{t("aiact.h2d")}</h2>
      <p>{t("aiact.p8")}</p>
      <p>{t("aiact.p9")}</p>

      <h2>{t("aiact.h2e")}</h2>
      <p>{t("aiact.p10")}</p>
      <ul>
        <li>{t("aiact.action1")}</li>
        <li>{t("aiact.action2")}</li>
        <li>{t("aiact.action3")}</li>
        <li>{t("aiact.action4")}</li>
        <li>{t("aiact.action5")}</li>
      </ul>
      <p>
        <span dangerouslySetInnerHTML={{ __html: t("aiact.p11Pre") }} />{" "}
        <Link to="/foto-ki-hybrid">{t("aiact.p11Link")}</Link>{t("aiact.p11After")}
      </p>

      <h2>{t("aiact.h2f")}</h2>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t("aiact.todo1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.todo2") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.todo3") }} />
        <li dangerouslySetInnerHTML={{ __html: t("aiact.todo4") }} />
      </ol>
      <p>{t("aiact.p12")}</p>
    </>
  );
}
