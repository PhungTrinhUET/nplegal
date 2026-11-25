import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { site, type Area, type Lang, type Tx } from './site';
import { ui, type UI } from './ui';
import { asset, linkTo, type Route } from './routes';
import { Wordmark } from './icons';

const tel = site.phone.replace(/[^\d+]/g, '');

type Ctx = { r: Route; L: Lang; t: (x: Tx) => string; u: UI };
const home = (L: Lang): Route => ({ lang: L, page: 'home' });

/** Các anchor trên trang chủ (giữ #approach cho link cũ dù không còn trên menu). */
const ids = { about: 'about', practices: 'practices', approach: 'approach', team: 'doi-ngu', publications: 'publications', contact: 'contact' };
const hasPubs = site.publications.length > 0;

function Header({ c }: { c: Ctx }) {
  const { r, L, u } = c;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', esc);
    return () => removeEventListener('keydown', esc);
  }, [open]);
  const h = (id: string) => linkTo(r, home(L), id);
  return (
    <>
      <div className="util">
        <div className="wrap util__in">
          <nav className="util__grp" aria-label={u.utilLabel}>
            <a href={h(ids.about)}>{u.nav.about}</a><span className="util__sep" aria-hidden="true">·</span><a href={h(ids.contact)}>{u.nav.contact}</a>
          </nav>
          <div className="util__grp">
            <a href={`tel:${tel}`}>{site.phone}</a><span className="util__sep" aria-hidden="true">·</span>
            <LangLinks c={c} sep={<span className="util__sep" aria-hidden="true">|</span>} />
          </div>
        </div>
      </div>
      <header className="nav">
        <div className="wrap nav__in">
          <a href={linkTo(r, home(L))} className="brand" aria-label={`${site.name} – ${u.home}`}><Wordmark /></a>
          <nav id="menu" className={`nav__links${open ? ' is-open' : ''}`} aria-label="Menu" onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
            <a href={h(ids.about)}>{u.nav.about}</a>
            <a href={h(ids.practices)}>{u.nav.practices}</a>
            <a href={h(ids.team)}>{u.nav.team}</a>
            {hasPubs && <a href={h(ids.publications)}>{u.nav.publications}</a>}
            <a href={h(ids.contact)}>{u.nav.contact}</a>
            <div className="nav__extra">
              <a href={`tel:${tel}`} className="nav__tel">{site.phone}</a>
              <LangLinks c={c} sep={<span aria-hidden="true">|</span>} />
            </div>
          </nav>
          <button className="nav__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? u.close : u.menu}</button>
        </div>
      </header>
    </>
  );
}

/** Liên kết VI | EN tới cùng trang ở ngôn ngữ kia. */
function LangLinks({ c, sep }: { c: Ctx; sep: ReactNode }) {
  const { r, L, u } = c;
  const other: Lang = L === 'vi' ? 'en' : 'vi';
  const base: Route = r.page === 'home' ? home(other) : { ...r, lang: other };
  return (
    <span className="langs" role="group" aria-label={u.langLabel}>
      <a href={linkTo(r, { ...base, lang: 'vi' })} hrefLang="vi" lang="vi" aria-current={L === 'vi' ? 'true' : undefined}>VI</a>
      {sep}
      <a href={linkTo(r, { ...base, lang: 'en' })} hrefLang="en" lang="en" aria-current={L === 'en' ? 'true' : undefined}>EN</a>
    </span>
  );
}

function SecHead({ eyebrow, title, lead, center }: { eyebrow: string; title: string; lead?: string; center?: boolean }) {
  return (
    <div className={`sec__head${center ? ' sec__head--c' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead && <p className="sec__lead">{lead}</p>}
    </div>
  );
}

const n2 = (i: number) => String(i + 1).padStart(2, '0');

/** Danh sách kẻ dòng: số thứ tự – tiêu đề – mô tả (kiểu trang các hãng luật lớn, không icon). */
function Rows({ items, c, numbered = true }: { items: { title: Tx; text: Tx }[]; c: Ctx; numbered?: boolean }) {
  return (
    <ol className={`rows${numbered ? '' : ' rows--plain'}`}>
      {items.map((s, i) => (
        <li key={i}>{numbered && <span className="rows__n">{n2(i)}</span>}<h3>{c.t(s.title)}</h3><p>{c.t(s.text)}</p></li>
      ))}
    </ol>
  );
}

function AreaList({ c, except }: { c: Ctx; except?: string }) {
  return (
    <ul className="plist">
      {site.areas.filter((a) => a.id !== except).map((a) => (
        <li key={a.id}>
          {a.detail
            ? <a href={linkTo(c.r, { lang: c.L, page: 'area', id: a.id })}><h3>{c.t(a.title)}</h3><p>{c.t(a.short)}</p><span className="plist__go" aria-hidden="true">→</span></a>
            : <div><h3>{c.t(a.title)}</h3><p>{c.t(a.short)}</p></div>}
        </li>
      ))}
    </ul>
  );
}

function Home({ c }: { c: Ctx }) {
  const { r, L, t, u } = c;
  const fdi = site.areas.find((a) => a.id === 'fdi')!;
  return (
    <>
      <section className="hero">
        <div className="hero__in">
          <div className="hero__text">
            <p className="eyebrow eyebrow--light">{L === 'vi' ? 'Công ty luật · Hà Nội' : 'Law firm · Hanoi'}</p>
            <h1>{t(site.hero.title)}</h1>
            <p className="hero__lead">{t(site.hero.lead)}</p>
            <div className="hero__cta">
              <a href={linkTo(r, home(L), 'contact')} className="btn btn--solid">{u.cta}</a>
              <a href={`tel:${tel}`} className="hero__tel">{site.phone}</a>
            </div>
          </div>
          <figure className="hero__media">
            <img src={asset(r, 'img/hero.jpg')} alt="" width={468} height={941} fetchPriority="high" />
          </figure>
        </div>
      </section>

      <section className="stats" aria-label={L === 'vi' ? 'Số liệu' : 'Key figures'}>
        <div className="wrap stats__in">
          {site.stats.map((s, i) => (
            <div key={i} className="stat"><strong>{s.n}</strong><span className="stat__label">{t(s.label)}</span><span className="stat__note">{t(s.note)}</span></div>
          ))}
        </div>
      </section>

      <section id="about" className="sec">
        <div className="wrap">
          <div className="about">
            <SecHead eyebrow={u.aboutEyebrow} title={u.aboutTitle} />
            <div className="prose">{site.about.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
          </div>
          <ul className="values">
            {site.message.values.map((v, i) => <li key={i}><h3>{t(v.title)}</h3><p>{t(v.text)}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="msg" aria-labelledby="msg-h">
        <div className="wrap msg__in">
          <figure className="msg__photo">
            <img src={asset(r, site.message.photo)} alt={t(site.message.name)} width={508} height={650} loading="lazy" />
          </figure>
          <div className="msg__text">
            <p className="eyebrow eyebrow--light" id="msg-h">{u.msgEyebrow}</p>
            {site.message.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
            <p className="msg__sign"><strong>{t(site.message.name)}</strong><span>{t(site.message.role)}</span></p>
          </div>
        </div>
      </section>

      <section id="practices" className="sec sec--tint">
        <div className="wrap">
          <SecHead eyebrow={u.practicesEyebrow} title={u.practicesTitle} lead={u.practicesLead} />
          <AreaList c={c} />
        </div>
      </section>

      <section id="approach" className="sec">
        <div className="wrap split">
          <div>
            <SecHead eyebrow={u.approachEyebrow} title={u.approachTitle} />
            <div className="prose">{fdi.detail!.intro.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
            <a className="link-more" href={linkTo(r, { lang: L, page: 'area', id: 'fdi' })}>{t(fdi.title)} →</a>
          </div>
          <Rows items={fdi.detail!.services} c={c} />
        </div>
      </section>

      <section id={ids.team} className="sec sec--tint">
        <div className="wrap">
          <SecHead eyebrow={u.teamEyebrow} title={u.teamTitle} lead={t(site.team.intro[0])} />
          <div className="team">
            {site.team.people.map((p) => (
              <article key={p.photo} className="person">
                <img className="person__photo" src={asset(r, p.photo)} alt={t(p.name)} width={215} height={230} loading="lazy" />
                <div className="person__body">
                  <h3>{t(p.name)}</h3>
                  <p className="person__role">{t(p.role)}</p>
                  <ul className="person__creds">
                    {p.creds.map((k) => <li key={k}>{t(site.creds[k])}</li>)}
                  </ul>
                  {p.bio && <details className="person__bio"><summary>{u.bio}</summary><p>{t(p.bio)}</p></details>}
                </div>
              </article>
            ))}
          </div>
          <p className="team__note">{t(site.team.intro[1])}</p>
        </div>
      </section>

      <Contact c={c} />
    </>
  );
}

function AreaPage({ c, a }: { c: Ctx; a: Area }) {
  const { r, L, t, u } = c;
  const d = a.detail!;
  return (
    <>
      <section className="phero">
        <div className="wrap phero__in">
          <nav className="crumbs" aria-label="Breadcrumb">
            <a href={linkTo(r, home(L))}>{u.home}</a><span aria-hidden="true">/</span>
            <a href={linkTo(r, home(L), 'practices')}>{u.nav.practices}</a>
          </nav>
          <h1>{t(a.title)}</h1>
          <p className="tagline">{t(d.tagline)}</p>
          <div className="phero__intro">{d.intro.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
          <a href={linkTo(r, home(L), 'contact')} className="btn btn--solid">{u.cta}</a>
        </div>
      </section>

      {d.pillars.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead eyebrow={u.ourApproach} title={t(a.title)} />
            <div className="pillars">
              {d.pillars.map((p, i) => <article key={i}><h3>{t(p.title)}</h3><p>{t(p.text)}</p></article>)}
            </div>
          </div>
        </section>
      )}

      <section className={`sec${d.pillars.length ? ' sec--tint' : ''}`}>
        <div className="wrap">
          <SecHead eyebrow={u.services} title={d.steps ? u.approachTitle : t(a.title)} />
          <Rows items={d.services} c={c} />
        </div>
      </section>

      {d.strengths.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead eyebrow={u.whyUs} title={L === 'vi' ? 'Điểm mạnh của chúng tôi' : 'Our strengths'} />
            <Rows items={d.strengths} c={c} numbered={false} />
          </div>
        </section>
      )}

      <section className="sec sec--tint">
        <div className="wrap">
          <SecHead eyebrow={u.otherAreas} title={L === 'vi' ? 'Lĩnh vực khác' : 'Other practice areas'} />
          <AreaList c={c} except={a.id} />
        </div>
      </section>

      <Contact c={c} />
    </>
  );
}

function Contact({ c }: { c: Ctx }) {
  const { r, L, t, u } = c;
  return (
    <>
      <section className="band">
        <img src={asset(r, 'img/office.jpg')} alt="" width={669} height={865} loading="lazy" />
        <div className="wrap band__in">
          <h2>{u.ctaBandTitle}</h2>
          <p className="tagline">{t(site.contact.lead)}</p>
        </div>
      </section>
      <section id="contact" className="sec">
        <div className="wrap contact">
          <div className="contact__info">
            <SecHead eyebrow={u.contactEyebrow} title={u.contactTitle} />
            <dl className="contact__list">
              <div><dt>{u.phone}</dt><dd><a href={`tel:${tel}`}>{site.phone}</a></dd></div>
              <div><dt>{u.email}</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>{u.address}</dt><dd>{t(site.address)}</dd></div>
              <div><dt>{u.hours}</dt><dd>{t(site.hours)}</dd></div>
            </dl>
            {site.mapEmbed && <iframe className="map" title={L === 'vi' ? 'Bản đồ văn phòng NP Legal' : 'Map to NP Legal office'} src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
          </div>
          <ContactForm c={c} />
        </div>
      </section>
    </>
  );
}

function ContactForm({ c }: { c: Ctx }) {
  const { t, u } = c;
  const f = u.form;
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const v = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (v.botcheck) return; // ô bẫy spam
    const subject = `${f.subject}: ${v.topic || f.other} – ${v.name}`;
    const body = `${f.name}: ${v.name}\n${f.company}: ${v.company || '-'}\n${f.email}: ${v.email}\n${f.phone}: ${v.phone || '-'}\n${f.topic}: ${v.topic || f.other}\n\n${v.message}`;
    if (!site.web3formsKey && !site.formEndpoint) {
      location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState('sending');
    try {
      const url = site.web3formsKey ? 'https://api.web3forms.com/submit' : site.formEndpoint;
      const res = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...(site.web3formsKey ? { access_key: site.web3formsKey, from_name: site.name } : {}), subject, ...v }),
      });
      if (!res.ok) throw new Error();
      setState('ok'); form.reset();
    } catch { setState('err'); }
  };
  if (state === 'ok') return <div className="form form--done" role="status"><h3>{f.okTitle}</h3><p>{f.ok} <a href={`tel:${tel}`}>{site.phone}</a>.</p></div>;
  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <label>{f.name}<input name="name" required autoComplete="name" /></label>
        <label>{f.company}<input name="company" autoComplete="organization" /></label>
      </div>
      <div className="form__row">
        <label>{f.email}<input name="email" type="email" required autoComplete="email" /></label>
        <label>{f.phone}<input name="phone" type="tel" autoComplete="tel" inputMode="tel" /></label>
      </div>
      <label>{f.topic}
        <select name="topic" defaultValue="">
          <option value="">{f.other}</option>
          {site.areas.map((a) => <option key={a.id}>{t(a.title)}</option>)}
        </select>
      </label>
      <label>{f.message}<textarea name="message" rows={5} required placeholder={f.placeholder} /></label>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <p className="form__note">{f.note}</p>
      <button className="btn btn--solid" disabled={state === 'sending'}>{state === 'sending' ? f.sending : f.send}</button>
      {state === 'err' && <p className="form__err" role="alert">{f.err} {site.phone} · {site.email}</p>}
    </form>
  );
}

function Footer({ c }: { c: Ctx }) {
  const { r, L, t, u } = c;
  const h = (id: string) => linkTo(r, home(L), id);
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div className="foot__brand">
          <a href={linkTo(r, home(L))} aria-label={`${site.name} – ${u.home}`}><Wordmark /></a>
          <p className="foot__addr">{t(site.address)}</p>
        </div>
        <div>
          <h2 className="foot__h">{u.nav.practices}</h2>
          <ul className="foot__list">
            {site.areas.map((a) => (
              <li key={a.id}>{a.detail ? <a href={linkTo(r, { lang: L, page: 'area', id: a.id })}>{t(a.title)}</a> : t(a.title)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="foot__h">{u.foot.firm}</h2>
          <ul className="foot__list">
            <li><a href={h(ids.about)}>{u.nav.about}</a></li>
            <li><a href={h(ids.team)}>{u.nav.team}</a></li>
            {hasPubs && <li><a href={h(ids.publications)}>{u.nav.publications}</a></li>}
            <li><a href={h(ids.contact)}>{u.nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="foot__h">{u.foot.legal}</h2>
          <ul className="foot__list">
            <li><a href="#disclaimer">{u.foot.disclaimer}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot__note">
        {t(site.legal.license) && <p>{t(site.legal.license)}</p>}
        {site.legal.taxCode && <p>{L === 'vi' ? 'Mã số thuế' : 'Tax code'}: {site.legal.taxCode}</p>}
        <p id="disclaimer">{u.disclaimer}</p>
        <p className="foot__bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span aria-hidden="true">·</span>
          <LangLinks c={c} sep={<span aria-hidden="true">|</span>} />
        </p>
      </div>
    </footer>
  );
}

/** Nút gọi nổi (chỉ màn hình < 600px), ẩn khi mục Liên hệ đang trong khung nhìn. */
function CallFab({ c }: { c: Ctx }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById(ids.contact);
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <a href={`tel:${tel}`} className={`callfab${hidden ? ' is-hidden' : ''}`} aria-label={`${c.u.call} ${site.phone}`}>{c.u.callFab}</a>;
}

export default function App({ route }: { route: Route }) {
  const L = route.lang;
  const c: Ctx = { r: route, L, t: (x) => x[L], u: ui[L] };
  const area = route.page === 'area' ? site.areas.find((a) => a.id === route.id) : undefined;
  return (
    <>
      <a className="skip" href="#main">{c.u.skip}</a>
      <Header c={c} />
      <main id="main">{area?.detail ? <AreaPage c={c} a={area} /> : <Home c={c} />}</main>
      <Footer c={c} />
      <CallFab c={c} />
    </>
  );
}
