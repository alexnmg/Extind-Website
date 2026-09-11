import LegalPage from '../components/LegalPage'
import { useLang } from '../lib/i18n'

/* Cookie policy.
 *
 * This page claims the site stores NOTHING in the visitor's browser — no cookies
 * and no local storage. That became true when language moved from localStorage
 * into the URL (/en), which removed the last stored value. Adding any
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
          'This website uses no analytics, tracking or advertising cookies, and stores nothing at all in your browser — not a cookie, not a single stored value. That is why you are not met by a cookie banner: there is nothing for us to ask your permission for.',
        ],
      },
      {
        h: '1. What we store in your browser',
        p: [
          'Nothing at all. The site keeps no cookies and no local storage of any kind on your device.',
          'The language you are reading in is part of the web address rather than something stored: the Romanian pages sit at extind.ro and the English ones under extind.ro/en. Switching language changes the address, so nothing needs to be remembered about you.',
        ],
      },
      {
        h: '2. Services loaded from other companies',
        p: [
          'Some pages load elements hosted elsewhere. When that happens, your browser talks directly to those servers, which therefore receive your IP address and the technical details any web request carries.',
        ],
        ul: [
          'Cal.com — the booking widget on the home page, Private offices, FAQ and Book a visit. It loads only once you scroll down to it, and Cal.com may set its own cookies inside the widget in order to make the booking work.',
          'CARTO and OpenStreetMap — the map on the contact page. The map tiles are loaded directly from CARTO.',
        ],
        links: [
          { label: 'Cal.com privacy policy', href: 'https://cal.com/privacy' },
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
          'There is nothing from this site to delete. If you clear cookies and site data in your browser — usually under “Cookies and site data” — nothing about this site changes, because it stored nothing to begin with.',
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
          'Acest site nu folosește cookie-uri de analiză, de urmărire sau de publicitate și nu stochează absolut nimic în browserul tău — niciun cookie, nicio valoare salvată. Tocmai de aceea nu te întâmpină un banner de cookie-uri: nu avem ce acord să îți cerem.',
        ],
      },
      {
        h: '1. Ce stocăm în browserul tău',
        p: [
          'Absolut nimic. Site-ul nu păstrează pe dispozitivul tău niciun cookie și nicio dată în local storage.',
          'Limba în care citești face parte din adresa paginii, nu este ceva stocat: paginile în română sunt la extind.ro, iar cele în engleză la extind.ro/en. Când schimbi limba se schimbă adresa, așa că nu trebuie reținut nimic despre tine.',
        ],
      },
      {
        h: '2. Servicii încărcate de la alte companii',
        p: [
          'Unele pagini încarcă elemente găzduite în altă parte. Atunci browserul tău comunică direct cu serverele respective, care primesc astfel adresa ta IP și detaliile tehnice pe care le poartă orice cerere web.',
        ],
        ul: [
          'Cal.com — widgetul de programare de pe pagina principală, Birouri private, Întrebări frecvente și Programează o vizită. Se încarcă doar când ajungi cu derularea la el, iar Cal.com poate plasa cookie-uri proprii în interiorul widgetului, necesare funcționării programării.',
          'CARTO și OpenStreetMap — harta de pe pagina de contact. Imaginile hărții sunt încărcate direct de la CARTO.',
        ],
        links: [
          { label: 'Politica de confidențialitate Cal.com', href: 'https://cal.com/privacy' },
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
          'Nu există nimic de șters de la acest site. Dacă golești cookie-urile și datele site-urilor din browser — de regulă la secțiunea „Cookie-uri și date ale site-urilor” — nu se schimbă nimic, pentru că nu am stocat nimic.',
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
