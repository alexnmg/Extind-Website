import LegalPage from '../components/LegalPage'
import { useLang } from '../lib/i18n'

/* Privacy policy. The facts here are meant to match what the site actually
 * does — no analytics, no advertising, no tracking — so if a third-party
 * script, a form endpoint or a measurement tool is ever added, this copy has
 * to be updated in the same change. See also Cookies.jsx. */

const UPDATED = { en: 'Last updated: 11 September 2026', ro: 'Ultima actualizare: 11 septembrie 2026' }

const T = {
  en: {
    docTitle: 'Privacy Policy — Extind',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    updatedLabel: UPDATED.en,
    sections: [
      {
        h: '1. Who we are',
        p: [
          'This website is operated by EXTIND BUSINESS SRL, with its registered office in Iași, str. Baltagului nr. 14, registered with the Trade Register under no. J22/1827/2008, tax ID (CUI) 24027429 (“EXTIND”, “we”, “us”). Our spaces are at Strada Sfântul Andrei nr. 39A, Palas Campus, building B2, 6th floor, Iași.',
          'We are the controller of the personal data collected through this website. For anything concerning your data, write to office@extind.ro or call 0722 523 102.',
        ],
      },
      {
        h: '2. What we collect, and why',
        p: [
          'Contact form. When you send us a message we process your name, email address, phone number and company (where you provide them) together with the content of your message, so that we can reply and discuss our spaces with you. Legal basis: your consent (Art. 6(1)(a) GDPR) and, where the message concerns a possible agreement, steps taken at your request prior to entering into a contract (Art. 6(1)(b)).',
          'Newsletter. If you subscribe through the form in the site footer, we process your email address solely to send you news about EXTIND and about community events. Legal basis: your consent (Art. 6(1)(a) GDPR). Every newsletter carries an unsubscribe link, and you can also unsubscribe at any time by writing to office@extind.ro. Our newsletters record whether they were opened and which links were clicked, so we can tell what is worth writing about.',
          'Booking a visit. The booking form is provided by Cal.com. What you enter there — your name, email address, the slot you choose and any details you add — reaches both Cal.com and us, so that we can confirm and prepare your visit.',
          'Technical data. Like any website, the servers hosting it automatically log your IP address, browser type, the page requested and the time of the request. We use this to keep the site running and secure. Legal basis: our legitimate interest (Art. 6(1)(f)) in keeping the site available and protected.',
          'We do not use analytics tools, tracking pixels or advertising on this website. We do not profile you and we take no automated decisions about you.',
        ],
      },
      {
        h: '3. Who else sees your data',
        p: [
          'We do not sell your data and we do not pass it to anyone for marketing purposes. The following providers may process it strictly in order to deliver the services we rely on:',
        ],
        ul: [
          'Cloudflare, Inc. — hosting and delivery of this website.',
          'Cal.com, Inc. — the visit booking form.',
          'Google Ireland Ltd. (Google Workspace) — our email. A message you send through the contact form is delivered to, and kept in, our mailbox there. The typefaces this site uses are served from our own server, so reading a page sends nothing to Google.',
          'CARTO — the map on our contact page, built on OpenStreetMap data. Your browser loads the map tiles directly from CARTO, which therefore receives your IP address.',
          'The Rocket Science Group LLC d/b/a Mailchimp (United States) — our newsletter. Your address is stored on Mailchimp’s servers in the United States, and they send the newsletters on our behalf. They receive nothing from this website unless you subscribe.',
        ],
        links: [
          { label: 'Cloudflare privacy policy', href: 'https://www.cloudflare.com/privacypolicy/' },
          { label: 'Cal.com privacy policy', href: 'https://cal.com/privacy' },
          { label: 'Google privacy policy', href: 'https://policies.google.com/privacy' },
          { label: 'CARTO privacy policy', href: 'https://carto.com/privacy/' },
          { label: 'Mailchimp privacy policy', href: 'https://mailchimp.com/legal/privacy/' },
        ],
      },
      {
        h: '4. Transfers outside the EEA',
        p: [
          'Some of the providers above are companies established in the United States. Any transfer is made on the safeguards provided by the GDPR — the standard contractual clauses approved by the European Commission or, where applicable, the EU–US Data Privacy Framework.',
        ],
      },
      {
        h: '5. How long we keep it',
        ul: [
          'Messages sent through the contact form: up to 2 years from our last exchange, if you do not become a client.',
          'Newsletter email address: until you unsubscribe.',
          'Bookings: for as long as we need to organise the visit, and afterwards in our commercial records.',
          'Server logs: short retention periods set by our hosting providers.',
        ],
        note: [
          'If you become an EXTIND client, data relating to your contract is kept for the statutory archiving periods — generally 10 years for accounting documents.',
        ],
      },
      {
        h: '6. Your rights',
        p: [
          'Under the GDPR you have the right to access your data, to have it corrected or erased, to restrict or object to its processing, to receive it in a portable format, and to withdraw your consent at any time — withdrawal does not affect the lawfulness of processing carried out beforehand.',
          'To exercise any of these, write to office@extind.ro. We reply within one month at the latest.',
          'If you are not satisfied with our answer, you can lodge a complaint with the Romanian supervisory authority, ANSPDCP, B-dul G-ral. Gheorghe Magheru nr. 28-30, sector 1, Bucharest, anspdcp@dataprotection.ro.',
        ],
        links: [{ label: 'dataprotection.ro', href: 'https://www.dataprotection.ro/' }],
      },
      {
        h: '7. Security',
        p: [
          'The site is served over HTTPS only. Access to messages received through it is limited to the members of our team who need them. No system is perfectly secure, but we take reasonable technical and organisational measures to protect your data.',
        ],
      },
      {
        h: '8. Children',
        p: [
          'This website is addressed to professionals and companies. We do not knowingly collect data relating to persons under the age of 16.',
        ],
      },
      {
        h: '9. Changes to this policy',
        p: [
          'We may update this policy when the way the site works changes, or when the law requires it. The version in force is the one published here, and the date of the latest update is shown at the top of the page.',
        ],
      },
      {
        h: '10. Cookies',
        p: [
          'What this site stores in your browser is set out separately, in plain terms:',
        ],
        links: [{ label: 'Cookie Policy', to: '/cookies' }],
      },
    ],
  },
  ro: {
    docTitle: 'Politica de confidențialitate — Extind',
    eyebrow: 'Legal',
    title: 'Politica de confidențialitate',
    updatedLabel: UPDATED.ro,
    sections: [
      {
        h: '1. Cine suntem',
        p: [
          'Acest site este administrat de EXTIND BUSINESS SRL, cu sediul în Iași, str. Baltagului nr. 14, înregistrată la Registrul Comerțului sub nr. J22/1827/2008, CUI 24027429 („EXTIND”, „noi”). Spațiile noastre se află pe Strada Sfântul Andrei nr. 39A, complex Palas Campus, clădirea B2, etajul 6, Iași.',
          'Suntem operatorul datelor cu caracter personal colectate prin acest site. Pentru orice întrebare legată de datele tale, scrie-ne la office@extind.ro sau sună-ne la 0722 523 102.',
        ],
      },
      {
        h: '2. Ce date colectăm și de ce',
        p: [
          'Formularul de contact. Când ne trimiți un mesaj, prelucrăm numele, adresa de email, telefonul și compania (dacă le completezi), împreună cu conținutul mesajului, ca să îți putem răspunde și să discutăm despre spațiile noastre. Temei legal: consimțământul tău (art. 6 alin. (1) lit. a) GDPR) și, dacă mesajul privește o posibilă colaborare, demersurile făcute la cererea ta înainte de încheierea unui contract (art. 6 alin. (1) lit. b)).',
          'Newsletter. Dacă te abonezi prin formularul din subsolul site-ului, prelucrăm adresa ta de email exclusiv ca să îți trimitem noutăți despre EXTIND și despre evenimentele comunității. Temei legal: consimțământul tău (art. 6 alin. (1) lit. a) GDPR). Fiecare newsletter conține un link de dezabonare, iar te poți dezabona oricând și scriindu-ne la office@extind.ro. Newsletterele noastre înregistrează dacă au fost deschise și ce linkuri au fost accesate, ca să știm despre ce merită să scriem.',
          'Programarea unei vizite. Formularul de programare este pus la dispoziție de Cal.com. Ce completezi acolo — numele, adresa de email, intervalul ales și eventualele detalii adăugate — ajunge atât la Cal.com, cât și la noi, ca să confirmăm și să pregătim vizita.',
          'Date tehnice. Ca orice site, serverele care îl găzduiesc înregistrează automat adresa IP, tipul de browser, pagina cerută și momentul accesării. Le folosim ca să menținem site-ul funcțional și în siguranță. Temei legal: interesul nostru legitim (art. 6 alin. (1) lit. f)) de a păstra site-ul disponibil și protejat.',
          'Nu folosim instrumente de analiză a traficului, pixeli de urmărire sau publicitate pe acest site. Nu creăm profiluri și nu luăm decizii automate cu privire la tine.',
        ],
      },
      {
        h: '3. Cine mai are acces la datele tale',
        p: [
          'Nu vindem datele tale și nu le transmitem nimănui în scopuri de marketing. Următorii furnizori le pot prelucra strict pentru a ne livra serviciile de care avem nevoie:',
        ],
        ul: [
          'Cloudflare, Inc. — găzduirea și livrarea acestui site.',
          'Cal.com, Inc. — formularul de programare a vizitelor.',
          'Google Ireland Ltd. (Google Workspace) — emailul nostru. Mesajul pe care îl trimiți prin formularul de contact ajunge și rămâne în căsuța noastră poștală. Fonturile site-ului sunt servite de pe serverul nostru, așa că simpla citire a unei pagini nu trimite nimic către Google.',
          'CARTO — harta de pe pagina de contact, construită pe date OpenStreetMap. Browserul tău încarcă imaginile hărții direct de la CARTO, care primește astfel adresa ta IP.',
          'The Rocket Science Group LLC d/b/a Mailchimp (Statele Unite) — newsletterul nostru. Adresa ta este stocată pe serverele Mailchimp din Statele Unite, iar ei trimit newsletterele în numele nostru. Nu primesc nimic de pe acest site dacă nu te abonezi.',
        ],
        links: [
          { label: 'Politica de confidențialitate Cloudflare', href: 'https://www.cloudflare.com/privacypolicy/' },
          { label: 'Politica de confidențialitate Cal.com', href: 'https://cal.com/privacy' },
          { label: 'Politica de confidențialitate Google', href: 'https://policies.google.com/privacy' },
          { label: 'Politica de confidențialitate CARTO', href: 'https://carto.com/privacy/' },
          { label: 'Politica de confidențialitate Mailchimp', href: 'https://mailchimp.com/legal/privacy/' },
        ],
      },
      {
        h: '4. Transferuri în afara Spațiului Economic European',
        p: [
          'O parte dintre furnizorii de mai sus sunt companii din Statele Unite. Transferurile se fac pe baza garanțiilor prevăzute de GDPR — clauzele contractuale standard aprobate de Comisia Europeană sau, după caz, Cadrul UE–SUA privind confidențialitatea datelor.',
        ],
      },
      {
        h: '5. Cât timp păstrăm datele',
        ul: [
          'Mesajele trimise prin formularul de contact: maximum 2 ani de la ultima comunicare, dacă nu devii client.',
          'Adresa de email pentru newsletter: până când te dezabonezi.',
          'Programările: cât este necesar pentru organizarea vizitei și, ulterior, în evidențele noastre comerciale.',
          'Jurnalele serverelor: perioade scurte, stabilite de furnizorii de găzduire.',
        ],
        note: [
          'Dacă devii client EXTIND, datele legate de contract se păstrează potrivit termenelor legale de arhivare — în general 10 ani pentru documentele financiar-contabile.',
        ],
      },
      {
        h: '6. Drepturile tale',
        p: [
          'Potrivit GDPR ai dreptul de a-ți accesa datele, de a cere rectificarea sau ștergerea lor, de a restricționa sau de a te opune prelucrării, de a le primi într-un format portabil și de a-ți retrage consimțământul oricând — retragerea nu afectează legalitatea prelucrării de dinainte.',
          'Pentru oricare dintre ele, scrie-ne la office@extind.ro. Îți răspundem în cel mult o lună.',
          'Dacă nu ești mulțumit de răspunsul nostru, ai dreptul să depui plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr. 28-30, sector 1, București, anspdcp@dataprotection.ro.',
        ],
        links: [{ label: 'dataprotection.ro', href: 'https://www.dataprotection.ro/' }],
      },
      {
        h: '7. Securitate',
        p: [
          'Site-ul este livrat exclusiv prin HTTPS. Accesul la mesajele primite prin site este limitat la persoanele din echipă care au nevoie de ele. Niciun sistem nu este perfect sigur, dar luăm măsuri tehnice și organizatorice rezonabile pentru a-ți proteja datele.',
        ],
      },
      {
        h: '8. Copii',
        p: [
          'Acest site se adresează profesioniștilor și companiilor. Nu colectăm cu bună știință date ale persoanelor sub 16 ani.',
        ],
      },
      {
        h: '9. Modificări ale acestei politici',
        p: [
          'Putem actualiza această politică atunci când se schimbă modul în care funcționează site-ul sau când legea o cere. Versiunea în vigoare este cea publicată aici, iar data ultimei actualizări apare la începutul paginii.',
        ],
      },
      {
        h: '10. Cookie-uri',
        p: ['Ce anume stochează site-ul în browserul tău este explicat separat, pe scurt:'],
        links: [{ label: 'Politica de cookie-uri', to: '/cookies' }],
      },
    ],
  },
}

export default function Privacy() {
  const { lang } = useLang()
  return <LegalPage {...T[lang]} />
}
