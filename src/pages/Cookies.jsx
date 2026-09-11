import LegalPage from '../components/LegalPage'
import { useLang } from '../lib/i18n'

/* Cookie policy.
 *
 * This page claims the site sets no cookies of its own and loads no analytics.
 * That was verified against both the dev build and the deployed site — document.cookie
 * is empty and localStorage holds only the language key from lib/i18n.jsx. Adding any
 * measurement, advertising or embedded third-party script invalidates the claim, and
 * would also require a consent banner before the script loads. Update this page in the
 * same change. See also Privacy.jsx. */

const UPDATED = { en: 'Last updated: 11 September 2026', ro: 'Ultima actualizare: 11 septembrie 2026' }

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
          'This website uses no analytics, tracking or advertising cookies. EXTIND places no cookies of its own in your browser. That is also why you are not met by a cookie banner — there is no non-essential storage for us to ask your permission for.',
        ],
      },
      {
        h: '1. What we do store in your browser',
        p: ['One thing only: the language you choose to read the site in.'],
        ul: [
          'Name: extind-lang',
          'Type: local storage — not a cookie, so it is never sent to a server',
          'Content: “ro” or “en”',
          'Lifetime: stays until you clear it',
          'Purpose: so the site opens in the language you chose the next time you visit',
        ],
      },
      {
        h: '2. Services loaded from other companies',
        p: [
          'Some pages load elements hosted elsewhere. When that happens, your browser talks directly to those servers, which therefore receive your IP address and the technical details any web request carries.',
        ],
        ul: [
          'Cal.com — the booking widget on the home page, Private offices, FAQ and Book a visit. It loads only once you scroll down to it, and Cal.com may set its own cookies inside the widget in order to make the booking work.',
          'Google Fonts — the typefaces used across the site. Google does not set cookies for font files, but it does receive your IP address.',
          'CARTO and OpenStreetMap — the map on the contact page. The map tiles are loaded directly from CARTO.',
        ],
        links: [
          { label: 'Cal.com privacy policy', href: 'https://cal.com/privacy' },
          { label: 'Google privacy policy', href: 'https://policies.google.com/privacy' },
          { label: 'CARTO privacy policy', href: 'https://carto.com/privacy/' },
        ],
      },
      {
        h: '3. What we deliberately do not do',
        ul: [
          'No analytics or traffic measurement (no Google Analytics, no alternatives).',
          'No advertising, retargeting or social media pixels.',
          'No profiling and no sale of data.',
        ],
      },
      {
        h: '4. How to control what is stored',
        p: [
          'You can delete or block what this site stores at any time from your browser settings, usually under “Cookies and site data”. If you clear the language preference, the site simply opens in Romanian again.',
        ],
      },
      {
        h: '5. Changes',
        p: [
          'If we ever add a tool that relies on cookies — traffic analytics, for example — we will update this page and ask for your consent before that tool loads.',
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
          'Acest site nu folosește cookie-uri de analiză, de urmărire sau de publicitate. EXTIND nu plasează niciun cookie propriu în browserul tău. Tocmai de aceea nu te întâmpină un banner de cookie-uri — nu există stocare neesențială pentru care să îți cerem acordul.',
        ],
      },
      {
        h: '1. Ce stocăm totuși în browserul tău',
        p: ['Un singur lucru: limba în care alegi să citești site-ul.'],
        ul: [
          'Nume: extind-lang',
          'Tip: local storage — nu este cookie, deci nu ajunge niciodată la un server',
          'Conținut: „ro” sau „en”',
          'Durată: rămâne până când îl ștergi',
          'Scop: ca site-ul să se deschidă în limba aleasă la următoarea vizită',
        ],
      },
      {
        h: '2. Servicii încărcate de la alte companii',
        p: [
          'Unele pagini încarcă elemente găzduite în altă parte. Atunci browserul tău comunică direct cu serverele respective, care primesc astfel adresa ta IP și detaliile tehnice pe care le poartă orice cerere web.',
        ],
        ul: [
          'Cal.com — widgetul de programare de pe pagina principală, Birouri private, Întrebări frecvente și Programează o vizită. Se încarcă doar când ajungi cu derularea la el, iar Cal.com poate plasa cookie-uri proprii în interiorul widgetului, necesare funcționării programării.',
          'Google Fonts — fonturile folosite pe tot site-ul. Google nu plasează cookie-uri pentru fișierele de font, dar primește adresa ta IP.',
          'CARTO și OpenStreetMap — harta de pe pagina de contact. Imaginile hărții sunt încărcate direct de la CARTO.',
        ],
        links: [
          { label: 'Politica de confidențialitate Cal.com', href: 'https://cal.com/privacy' },
          { label: 'Politica de confidențialitate Google', href: 'https://policies.google.com/privacy' },
          { label: 'Politica de confidențialitate CARTO', href: 'https://carto.com/privacy/' },
        ],
      },
      {
        h: '3. Ce nu facem, în mod deliberat',
        ul: [
          'Nu măsurăm traficul (fără Google Analytics și fără alternative).',
          'Nu folosim publicitate, retargetare sau pixeli de social media.',
          'Nu creăm profiluri și nu vindem date.',
        ],
      },
      {
        h: '4. Cum controlezi ce se stochează',
        p: [
          'Poți șterge sau bloca oricând ce stochează acest site, din setările browserului — de regulă la secțiunea „Cookie-uri și date ale site-urilor”. Dacă ștergi preferința de limbă, site-ul se va deschide din nou în română.',
        ],
      },
      {
        h: '5. Modificări',
        p: [
          'Dacă vom adăuga vreodată un instrument care folosește cookie-uri — de exemplu analiza traficului — vom actualiza această pagină și îți vom cere acordul înainte ca acel instrument să se încarce.',
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
