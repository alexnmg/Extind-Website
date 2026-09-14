import LegalPage from '../components/LegalPage'
import { useLang } from '../lib/i18n'

/* Cookie policy.
 *
 * This page describes exactly what src/lib/consent.js does, so the two change
 * together or the page becomes a false statement. The commitments made below in
 * both languages are: Clarity never loads without an explicit accept, refusing
 * costs one click, and the decision can be withdrawn later. Adding any further
 * measurement, advertising or embedded third-party script means updating this
 * page in the same commit. See also Privacy.jsx. */

const UPDATED = { en: 'Last updated: 14 September 2026', ro: 'Ultima actualizare: 14 septembrie 2026' }

const T = {
  en: {
    docTitle: 'Cookie Policy — Extind',
    eyebrow: 'Legal',
    title: 'Cookie Policy',
    updatedLabel: UPDATED.en,
    sections: [
      {
        h: 'In short',
        p: [
          'This website measures how it is used, with Microsoft Clarity — but only if you accept. Nothing is loaded and no cookie is set until you press Accept on the banner. Refuse, and the site works exactly the same and Clarity never runs. There is no advertising, no retargeting and no sale of data either way.',
        ],
      },
      {
        h: '1. What we store in your browser',
        p: [
          'Your answer to the banner, and nothing else until you accept. It is kept on your own device so we do not ask again on every page, and it records only the word "granted" or "denied".',
          'If you accept, Microsoft Clarity sets two first-party cookies, _clck and _clsk, which let it recognise a visit across the pages you open. They expire on their own — _clsk within a day, _clck within a year.',
          'The language you are reading in is part of the web address rather than something stored: the Romanian pages sit at extind.ro and the English ones under extind.ro/en. Switching language changes the address, so nothing needs to be remembered about you.',
        ],
      },
      {
        h: '2. Services loaded from other companies',
        p: [
          'Some pages load elements hosted elsewhere. When that happens, your browser talks directly to those servers, which therefore receive your IP address and the technical details any web request carries.',
        ],
        ul: [
          'Microsoft Clarity — only after you accept. It records which pages you open, where you click and how far you scroll, and replays that as an anonymous session so we can see where the site is confusing. It does not ask for your name or email, and we do not use it to identify you.',
          'Cal.com — the booking widget on the home page, Private offices, FAQ and Book a visit. It loads only once you scroll down to it, and Cal.com may set its own cookies inside the widget in order to make the booking work.',
          'OpenFreeMap and OpenStreetMap — the map on the contact page. The map is loaded directly from OpenFreeMap, using OpenStreetMap data.',
        ],
        links: [
          { label: 'Microsoft privacy statement', href: 'https://privacy.microsoft.com/privacystatement' },
          { label: 'Cal.com privacy policy', href: 'https://cal.com/privacy' },
          { label: 'OpenFreeMap', href: 'https://openfreemap.org/' },
        ],
      },
      {
        h: '3. What we deliberately do not do',
        ul: [
          'No measurement at all unless you accept it — refusing is one click, the same size as accepting.',
          'No advertising, retargeting or social media pixels. Clarity can pass data to Bing for advertising; we block that request.',
          'No profiling and no sale of data.',
          'No Google Analytics.',
        ],
      },
      {
        h: '4. How to change your mind',
        p: [
          'Use the button below. It withdraws your consent, deletes the Clarity cookies and reloads the page, after which Clarity is not loaded again.',
          'Clearing cookies and site data in your browser — usually under “Cookies and site data” — has the same effect, and also erases your saved answer, so the banner will ask again on your next visit.',
        ],
        consentLabel: 'Withdraw consent and delete the Clarity cookies',
      },
      {
        h: '5. Changes',
        p: [
          'If we add another tool that relies on cookies, we will update this page and ask for your consent before that tool loads — the same way we did for Clarity.',
        ],
        links: [{ label: 'Privacy Policy', to: '/privacy' }],
      },
    ],
  },
  ro: {
    docTitle: 'Politica de cookie-uri — Extind',
    eyebrow: 'Legal',
    title: 'Politica de cookie-uri',
    updatedLabel: UPDATED.ro,
    sections: [
      {
        h: 'Pe scurt',
        p: [
          'Acest site măsoară felul în care este folosit, cu Microsoft Clarity — dar numai dacă accepți. Nu se încarcă nimic și nu se pune niciun cookie până nu apeși Accept în banner. Dacă refuzi, site-ul funcționează exact la fel, iar Clarity nu pornește niciodată. În ambele cazuri, nu există publicitate, retargetare sau vânzare de date.',
        ],
      },
      {
        h: '1. Ce stocăm în browserul tău',
        p: [
          'Răspunsul tău la banner și nimic altceva, până când accepți. Este păstrat pe dispozitivul tău ca să nu te întrebăm din nou la fiecare pagină și conține doar cuvântul „granted” sau „denied”.',
          'Dacă accepți, Microsoft Clarity pune două cookie-uri proprii, _clck și _clsk, care îi permit să recunoască o vizită de-a lungul paginilor pe care le deschizi. Expiră singure — _clsk într-o zi, _clck într-un an.',
          'Limba în care citești face parte din adresa paginii, nu este ceva stocat: paginile în română sunt la extind.ro, iar cele în engleză la extind.ro/en. Când schimbi limba se schimbă adresa, așa că nu trebuie reținut nimic despre tine.',
        ],
      },
      {
        h: '2. Servicii încărcate de la alte companii',
        p: [
          'Unele pagini încarcă elemente găzduite în altă parte. Atunci browserul tău comunică direct cu serverele respective, care primesc astfel adresa ta IP și detaliile tehnice pe care le poartă orice cerere web.',
        ],
        ul: [
          'Microsoft Clarity — doar după ce accepți. Înregistrează ce pagini deschizi, unde dai clic și cât derulezi, apoi reia totul ca sesiune anonimă, ca să vedem unde este confuz site-ul. Nu îți cere numele sau adresa de email și nu îl folosim ca să te identificăm.',
          'Cal.com — widgetul de programare de pe pagina principală, Birouri private, Întrebări frecvente și Programează o vizită. Se încarcă doar când ajungi cu derularea la el, iar Cal.com poate plasa cookie-uri proprii în interiorul widgetului, necesare funcționării programării.',
          'OpenFreeMap și OpenStreetMap — harta de pe pagina de contact. Harta este încărcată direct de la OpenFreeMap, pe date OpenStreetMap.',
        ],
        links: [
          { label: 'Declarația de confidențialitate Microsoft', href: 'https://privacy.microsoft.com/privacystatement' },
          { label: 'Politica de confidențialitate Cal.com', href: 'https://cal.com/privacy' },
          { label: 'OpenFreeMap', href: 'https://openfreemap.org/' },
        ],
      },
      {
        h: '3. Ce nu facem, în mod deliberat',
        ul: [
          'Nu măsurăm nimic dacă nu accepți — refuzul este un singur clic, la fel de vizibil ca acceptul.',
          'Nu folosim publicitate, retargetare sau pixeli de social media. Clarity poate trimite date către Bing pentru publicitate; noi blocăm acea cerere.',
          'Nu creăm profiluri și nu vindem date.',
          'Nu folosim Google Analytics.',
        ],
      },
      {
        h: '4. Cum te răzgândești',
        p: [
          'Folosește butonul de mai jos. Îți retrage acordul, șterge cookie-urile Clarity și reîncarcă pagina, după care Clarity nu mai este încărcat.',
          'Dacă golești cookie-urile și datele site-urilor din browser — de regulă la secțiunea „Cookie-uri și date ale site-urilor” — efectul este același, iar răspunsul tău salvat dispare, așa că bannerul va întreba din nou la următoarea vizită.',
        ],
        consentLabel: 'Retrage acordul și șterge cookie-urile Clarity',
      },
      {
        h: '5. Modificări',
        p: [
          'Dacă adăugăm un alt instrument care folosește cookie-uri, vom actualiza această pagină și îți vom cere acordul înainte ca acel instrument să se încarce — la fel cum am făcut pentru Clarity.',
        ],
        links: [{ label: 'Politica de confidențialitate', to: '/privacy' }],
      },
    ],
  },
}

export default function Cookies() {
  const { lang } = useLang()
  return <LegalPage {...T[lang]} />
}
