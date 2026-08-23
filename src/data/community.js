import heroImg from '../assets/photos/coworking.jpg'
import vistaImg from '../assets/photos/panorama.jpg'
import pillarsImg from '../assets/photos/private-office.jpg'
import openOfficeImg from '../assets/photos/open-office.jpg'
import meetingImg from '../assets/photos/meeting-room.jpg'
import focusImg from '../assets/photos/focus-room.jpg'

/* Community content — events and the Extind Magazine.
 *
 * Events are intentionally empty at launch: only real events (with a confirmed
 * date, organiser, format and registration) are ever listed. The Events page
 * shows a placeholder and an "organise an event" form until real ones exist.
 *
 * Every reader-facing field is bilingual ({ en, ro }); slugs stay stable
 * across languages so URLs never fork. Categories are keys — labels live in
 * CATEGORY_LABELS. readingTime is minutes, formatted by the pages.
 */

export const events = []

export const categories = ['guides', 'costs', 'location']

export const CATEGORY_LABELS = {
  en: { guides: 'Guides', costs: 'Costs', location: 'Location' },
  ro: { guides: 'Ghiduri', costs: 'Costuri', location: 'Locație' },
}

export const AUTHOR = { en: 'The Extind Team', ro: 'Echipa Extind' }

// Commercial-intent articles — the SEO/consideration core the client asked to
// launch first, in place of a journal of generic posts.
export const posts = [
  {
    slug: 'coworking-or-private-office-team-of-5-20',
    category: 'guides',
    dateLabel: { en: '4 August 2026', ro: '4 august 2026' },
    readingTime: 5,
    image: heroImg,
    title: {
      en: 'Coworking or a private office: what to choose for a 5–20 person team',
      ro: 'Coworking sau birou privat: ce alegi pentru o echipă de 5–20 de persoane',
    },
    excerpt: {
      en: 'The honest trade-offs between a coworking membership and a private office for a growing team — and how to tell which one you’ve outgrown.',
      ro: 'Compromisurile oneste dintre un abonament de coworking și un birou privat pentru o echipă în creștere — și cum îți dai seama pe care l-ai depășit.',
    },
    body: {
      en: [
        'Somewhere around five people, a coworking membership starts to strain. What worked beautifully for one or two founders — the flexibility, the buzz, the pay-as-you-go simplicity — becomes a daily negotiation for desks, a scramble for a room to take a call, and a quiet worry about who’s sitting next to your screens.',
        'Coworking is the right answer when your headcount moves week to week, when being around other people is a feature rather than a distraction, and when you’d rather not commit. A private office is the right answer when your team needs to concentrate together, when confidentiality matters, and when “our space” starts to shape how you work and how you’re seen.',
        'For a 5–20 person team, the tipping points are usually three: you’re paying for more coworking desks than a private room would cost; you’re losing real time to finding space for calls and meetings; or you’ve started handling information you’d rather keep behind a door. Any one of them is a signal.',
        'At EXTIND you don’t have to guess in advance. Our private offices are configured for teams of 2–12, and you can start smaller and grow into more space as you hire — without a rigid lease. If you’re on the fence, book a visit; twenty minutes in the space usually settles it.',
      ],
      ro: [
        'Undeva în jurul a cinci persoane, un abonament de coworking începe să scârțâie. Ce funcționa perfect pentru unul sau doi fondatori — flexibilitatea, energia, simplitatea lui „plătești cât folosești” — devine o negociere zilnică pentru birouri, o goană după o sală pentru un apel și o grijă discretă legată de cine stă lângă ecranele voastre.',
        'Coworkingul este răspunsul corect când numărul de oameni variază de la o săptămână la alta, când prezența celorlalți este un avantaj, nu o distragere, și când preferi să nu te angajezi pe termen lung. Un birou privat este răspunsul corect când echipa are nevoie să se concentreze împreună, când confidențialitatea contează și când „spațiul nostru” începe să modeleze felul în care lucrezi și felul în care ești perceput.',
        'Pentru o echipă de 5–20 de persoane, punctele de cotitură sunt de obicei trei: plătești mai multe birouri de coworking decât ar costa o încăpere privată; pierzi timp real căutând spațiu pentru apeluri și întâlniri; sau ai început să lucrezi cu informații pe care ai prefera să le ții în spatele unei uși. Oricare dintre ele este un semnal.',
        'La EXTIND nu trebuie să ghicești dinainte. Birourile noastre private sunt configurate pentru echipe de 2–12 persoane, poți începe cu mai puțin și crește pe măsură ce angajezi — fără un contract rigid. Dacă ești indecis, programează o vizită; douăzeci de minute în spațiu lămuresc de obicei totul.',
      ],
    },
  },
  {
    slug: 'how-much-does-a-private-office-cost-in-iasi',
    category: 'costs',
    dateLabel: { en: '22 July 2026', ro: '22 iulie 2026' },
    readingTime: 4,
    image: pillarsImg,
    title: {
      en: 'How much does a private office cost in Iași?',
      ro: 'Cât costă un birou privat în Iași?',
    },
    excerpt: {
      en: 'What actually goes into the price of a private office in Iași — and why a fully managed office and a conventional lease aren’t the same number.',
      ro: 'Ce intră de fapt în prețul unui birou privat în Iași — și de ce un birou complet administrat și o chirie convențională nu înseamnă același număr.',
    },
    body: {
      en: [
        'It’s the first question every team asks, and the honest answer is: it depends on how many people you are, how long you stay, and what “office” includes. But the more useful question is what you’re comparing it against.',
        'A conventional lease in Iași looks cheaper per square metre — until you add it up. Rent is only the start: fit-out and furniture, utilities, internet, cleaning, maintenance, consumables, and the time someone on your team spends managing all of it. Those line items don’t appear on the lease, but they land on your budget every month.',
        'A fully managed private office folds all of that into one predictable figure. At EXTIND, a private office comes furnished, wired with 1 Gbps internet, cleaned and maintained, with meeting-room access and a team on site — one price, no surprises, no separate suppliers to chase.',
        'Because the right number depends on your team, we quote per office rather than publish a single rate. Tell us how many people, for how long, and what you need, and we come back with a clear proposal. Start with the “Request an offer” form, or book a visit to see the space first.',
      ],
      ro: [
        'Este prima întrebare pe care o pune orice echipă, iar răspunsul onest este: depinde de câți sunteți, cât timp rămâneți și ce include „biroul”. Dar întrebarea mai utilă este cu ce compari.',
        'O chirie convențională în Iași pare mai ieftină pe metru pătrat — până aduni totul. Chiria e doar începutul: amenajarea și mobilierul, utilitățile, internetul, curățenia, mentenanța, consumabilele și timpul pe care cineva din echipă îl petrece administrându-le pe toate. Aceste costuri nu apar în contract, dar aterizează în bugetul tău în fiecare lună.',
        'Un birou privat complet administrat le adună pe toate într-o singură sumă predictibilă. La EXTIND, un birou privat vine mobilat, cu internet 1 Gbps, curățenie și mentenanță incluse, acces la săli de întâlniri și o echipă la fața locului — un singur preț, fără surprize, fără furnizori de alergat.',
        'Pentru că numărul corect depinde de echipa ta, ofertăm per birou în loc să publicăm un tarif unic. Spune-ne câte persoane, pentru cât timp și de ce aveți nevoie, și revenim cu o propunere clară. Începe cu formularul „Cere o ofertă” sau programează o vizită ca să vezi mai întâi spațiul.',
      ],
    },
  },
  {
    slug: 'office-for-a-day-in-iasi-whats-included',
    category: 'guides',
    dateLabel: { en: '9 July 2026', ro: '9 iulie 2026' },
    readingTime: 4,
    image: focusImg,
    title: {
      en: 'An office for a day in Iași: what’s included?',
      ro: 'Un birou pentru o zi în Iași: ce este inclus?',
    },
    excerpt: {
      en: 'Day Pass, Day Office, Executive Day Office — the short-term options in Iași, and exactly what you get with each.',
      ro: 'Day Pass, Day Office, Executive Day Office — opțiunile pe termen scurt din Iași și exact ce primești cu fiecare.',
    },
    body: {
      en: [
        'Not every need is a year-long commitment. Sometimes you want a professional base for a single day — a quiet place to work between meetings, a room to host a client, or a representative office for an important visit.',
        'At EXTIND there are three short-term options. A Day Pass gives one person access to the coworking floor for the day — a workstation, 1 Gbps internet, coffee and the shared areas. A Day Office gives you exclusive use of a private office, priced per office rather than per person, for a team that needs its own room for the day.',
        'And for the moments that matter most, the Executive Day Office prepares a private, representative office for one to three days — with meeting-room access, hospitality and a setup matched to your schedule — for hosting partners, investors, a board meeting or a management visit.',
        'All of them come with the essentials handled: furniture, internet, coffee, tea and filtered water, and a team on site. What’s included scales with the product; tell us the occasion and we’ll point you to the right one.',
      ],
      ro: [
        'Nu orice nevoie înseamnă un angajament pe un an. Uneori vrei o bază profesională pentru o singură zi — un loc liniștit unde să lucrezi între întâlniri, o sală în care să primești un client sau un birou reprezentativ pentru o vizită importantă.',
        'La EXTIND există trei opțiuni pe termen scurt. Day Pass oferă unei persoane acces la etajul de coworking pentru o zi — un loc de lucru, internet 1 Gbps, cafea și zonele comune. Day Office îți oferă utilizarea exclusivă a unui birou privat, tarifat per birou, nu per persoană, pentru o echipă care are nevoie de propria încăpere pentru o zi.',
        'Iar pentru momentele care contează cel mai mult, Executive Day Office pregătește un birou privat și reprezentativ pentru una până la trei zile — cu acces la săli de întâlniri, ospitalitate și o configurare adaptată programului tău — pentru găzduirea partenerilor, a investitorilor, a unei ședințe de board sau a unei vizite de management.',
        'Toate vin cu esențialul rezolvat: mobilier, internet, cafea, ceai și apă filtrată, plus o echipă la fața locului. Ce este inclus crește odată cu produsul; spune-ne ocazia și te îndrumăm către varianta potrivită.',
      ],
    },
  },
  {
    slug: 'how-to-choose-a-meeting-room-for-a-corporate-team',
    category: 'guides',
    dateLabel: { en: '25 June 2026', ro: '25 iunie 2026' },
    readingTime: 5,
    image: meetingImg,
    title: {
      en: 'How to choose a meeting room for a corporate team',
      ro: 'Cum alegi o sală de întâlniri pentru o echipă corporate',
    },
    excerpt: {
      en: 'The practical checklist for picking a meeting or conference room your team — and your clients — will actually be comfortable in.',
      ro: 'Lista practică de criterii pentru o sală de întâlniri sau de conferințe în care echipa ta — și clienții tăi — chiar se vor simți confortabil.',
    },
    body: {
      en: [
        'A meeting room is easy to book and easy to get wrong. The wrong size, the wrong tech, or the wrong setting can quietly undermine an important conversation before it starts. Here’s what actually matters.',
        'Capacity and layout first: match the room to the meeting, not the other way round. A four-person working session and a twelve-person board meeting want very different rooms. Then the essentials — reliable, fast internet; a screen you can share to without a fight; and a setup you can rearrange for the format you need.',
        'Setting matters more than teams expect. For client meetings, board sessions and interviews, the room is part of the impression you make — natural light, a considered space and a quiet environment do real work. So does discretion: a room where confidential conversations stay confidential.',
        'At EXTIND you can book meeting rooms and a conference room by reservation, per your package, with 1 Gbps internet and setup support — and, for the bigger occasions, the panoramic Vista Lounge. Tell us the format and the numbers, and we’ll match you to the right space.',
      ],
      ro: [
        'O sală de întâlniri e ușor de rezervat și ușor de ales greșit. Dimensiunea nepotrivită, tehnica nepotrivită sau cadrul nepotrivit pot submina discret o conversație importantă înainte să înceapă. Iată ce contează cu adevărat.',
        'Mai întâi capacitatea și configurația: potrivește sala cu întâlnirea, nu invers. O sesiune de lucru în patru persoane și o ședință de board în douăsprezece cer săli foarte diferite. Apoi esențialul — internet rapid și stabil; un ecran la care te conectezi fără bătăi de cap; și o configurare pe care o poți rearanja după formatul de care ai nevoie.',
        'Cadrul contează mai mult decât se așteaptă echipele. Pentru întâlniri cu clienți, ședințe de board și interviuri, sala face parte din impresia pe care o lași — lumina naturală, un spațiu îngrijit și un mediu liniștit lucrează pentru tine. La fel și discreția: o sală în care conversațiile confidențiale rămân confidențiale.',
        'La EXTIND poți rezerva săli de întâlniri și o sală de conferințe conform pachetului tău, cu internet 1 Gbps și suport la instalare — iar pentru ocaziile mai mari, Vista Lounge, spațiul panoramic. Spune-ne formatul și numărul de participanți și îți potrivim spațiul.',
      ],
    },
  },
  {
    slug: 'what-costs-are-included-in-a-fully-managed-office',
    category: 'costs',
    dateLabel: { en: '11 June 2026', ro: '11 iunie 2026' },
    readingTime: 4,
    image: openOfficeImg,
    title: {
      en: 'What costs are included in a fully managed office?',
      ro: 'Ce costuri include un birou complet administrat?',
    },
    excerpt: {
      en: 'The line items a fully managed office rolls into one price — and the ones a conventional lease leaves on your plate.',
      ro: 'Costurile pe care un birou complet administrat le adună într-un singur preț — și cele pe care o chirie convențională le lasă în seama ta.',
    },
    body: {
      en: [
        '“Fully managed” is one of those phrases that sounds good and means little until you see the itemised version. Here’s what it actually covers at EXTIND, and what a conventional office asks you to handle yourself.',
        'Rolled into one price: the furnished office itself; 1 Gbps internet; utilities; cleaning; day-to-day maintenance; the usual coffee-point consumables; meeting-room access per your package; guest reception; and a team on site to keep it all running. You get one invoice and one point of contact.',
        'In a conventional lease, most of those are separate: you fit out and furnish the space, set up and manage utilities and internet, arrange cleaning and maintenance vendors, buy the consumables, and either hire or become the person who administers it all. The rent is the smallest part of the real number.',
        'The point of a managed office isn’t only cost — it’s attention. Every hour your team doesn’t spend running the office is an hour it spends on the work. If you want the full breakdown for your team size, request an offer and we’ll lay it out.',
      ],
      ro: [
        '„Complet administrat” este una dintre acele expresii care sună bine și spun puțin, până vezi varianta detaliată. Iată ce acoperă de fapt la EXTIND și ce te lasă un birou convențional să gestionezi singur.',
        'Incluse într-un singur preț: biroul mobilat; internet 1 Gbps; utilitățile; curățenia; mentenanța de zi cu zi; consumabilele obișnuite de la coffee point; accesul la săli de întâlniri conform pachetului; primirea oaspeților; și o echipă la fața locului care ține totul în mișcare. Primești o singură factură și un singur punct de contact.',
        'Într-o chirie convențională, cele mai multe sunt separate: amenajezi și mobilezi spațiul, instalezi și administrezi utilitățile și internetul, organizezi furnizori de curățenie și mentenanță, cumperi consumabilele și fie angajezi, fie devii persoana care le administrează pe toate. Chiria este cea mai mică parte din numărul real.',
        'Rostul unui birou administrat nu ține doar de cost — ține de atenție. Fiecare oră pe care echipa ta nu o petrece administrând biroul este o oră petrecută în munca propriu-zisă. Dacă vrei calculul complet pentru dimensiunea echipei tale, cere o ofertă și ți-l punem pe hârtie.',
      ],
    },
  },
  {
    slug: 'advantages-of-an-office-in-palas-campus-iasi',
    category: 'location',
    dateLabel: { en: '28 May 2026', ro: '28 mai 2026' },
    readingTime: 4,
    image: vistaImg,
    title: {
      en: 'The advantages of an office in Palas Campus, Iași',
      ro: 'Avantajele unui birou în Palas Campus, Iași',
    },
    excerpt: {
      en: 'Why the address matters — what a Palas Campus office gives your team, your clients and your day beyond the four walls.',
      ro: 'De ce contează adresa — ce îi oferă un birou în Palas Campus echipei tale, clienților tăi și zilei tale de lucru, dincolo de cei patru pereți.',
    },
    body: {
      en: [
        'Where your office sits shapes more than your commute. In Iași, few addresses do as much work as Palas Campus — and for a growing business, that matters in ways that go well beyond prestige.',
        'Palas puts you in the heart of the city’s business district, a short walk from restaurants, hotels, shops and the amenities that make a workday — and a client visit — easier. It’s connected, central and easy to reach, which quietly removes friction from everything from lunch to logistics.',
        'For clients and partners, the address is reassurance. A Class A office building in a landmark complex signals a business that’s established and serious — the kind of first impression you can’t fake and don’t have to explain.',
        'EXTIND sits on the 6th floor, with the panoramic Vista Lounge above the old town and full access to the wider Palas facilities. You get the location without the overhead of holding it yourself. Book a visit and take in the view.',
      ],
      ro: [
        'Locul în care se află biroul tău modelează mai mult decât naveta. În Iași, puține adrese lucrează atât de mult pentru tine ca Palas Campus — iar pentru o afacere în creștere, asta contează în feluri care depășesc prestigiul.',
        'Palas te așază în inima districtului de business al orașului, la câțiva pași de restaurante, hoteluri, magazine și facilitățile care fac o zi de lucru — și o vizită a unui client — mai simple. Este central, conectat și ușor de ajuns, ceea ce elimină discret fricțiunile din orice, de la prânz la logistică.',
        'Pentru clienți și parteneri, adresa este o garanție. O clădire de birouri clasa A într-un ansamblu-reper transmite o afacere așezată și serioasă — genul de primă impresie pe care nu o poți mima și pe care nu trebuie să o explici.',
        'EXTIND se află la etajul 6, cu Vista Lounge, spațiul panoramic deasupra orașului vechi, și acces complet la facilitățile ansamblului Palas. Primești locația fără povara de a o susține singur. Programează o vizită și bucură-te de priveliște.',
      ],
    },
  },
]

export const featuredEvent = events.find((e) => e.featured)
export const upcomingEvents = events.filter((e) => !e.featured)
export const getEvent = (slug) => events.find((e) => e.slug === slug)
export const getPost = (slug) => posts.find((p) => p.slug === slug)
