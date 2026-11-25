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

const n2 = (i: number) => String(i + 1).padStart(2, '0');

/** Danh sách kẻ dòng: số thứ tự serif – tiêu đề – một câu (không icon). */
function Steps({ items, c, numbered = true }: { items: { title: Tx; text: Tx }[]; c: Ctx; numbered?: boolean }) {
  return (
    <ol className={`steps${numbered ? '' : ' steps--plain'}`}>
      {items.map((s, i) => (
        <li key={i}>{numbered && <span className="steps__n" aria-hidden="true">{n2(i)}</span>}<div><h3>{c.t(s.title)}</h3><p>{c.t(s.text)}</p></div></li>
      ))}
    </ol>
  );
}

/** 10 lĩnh vực, 2 cột; lĩnh vực có trang riêng là link (hover: tên màu nhấn + mũi tên), còn lại là chữ thường. */
function AreaList({ c, except }: { c: Ctx; except?: string }) {
  const list = site.areas.filter((a) => a.id !== except);
  return (
    <ol className="areas">
      {list.map((a) => {
        const body = <><span className="areas__n" aria-hidden="true">{n2(site.areas.indexOf(a))}</span>
          <span className="areas__body"><h3>{c.t(a.title)}{a.detail && <span className="areas__go" aria-hidden="true"> →</span>}</h3><p>{c.t(a.short)}</p></span></>;
        return <li key={a.id}>{a.detail ? <a href={linkTo(c.r, { lang: c.L, page: 'area', id: a.id })}>{body}</a> : <div>{body}</div>}</li>;
      })}
    </ol>
  );
}

function Home({ c }: { c: Ctx }) {
  const { r, L, t, u } = c;
  const fdi = site.areas.find((a) => a.id === 'fdi')!;
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero__in">
          <div className="hero__text">
            <div className="hero__media">
              {/* TODO: thay ảnh Hà Nội hoàng hôn (ảnh ngang, rộng ≥ 2400px) */}
              <img src={asset(r, 'img/hero.jpg')} alt="" width={468} height={941} fetchPriority="high" />
            </div>
            <span className="hero__rule hero__rule--short" aria-hidden="true" />
            <p className="eyebrow hero__eyebrow">{u.heroEyebrow}</p>
            <h1 id="hero-h">{t(site.hero.title)}</h1>
            <span className="hero__rule" aria-hidden="true" />
            <div className="hero__cta">
              <a href={linkTo(r, home(L), ids.contact)} className="btn btn--solid">{u.cta}</a>
              <a href={linkTo(r, home(L), ids.practices)} className="hero__link">{u.practicesLink} <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <ul className="hero__facts">
            {site.hero.facts.map((f, i) => (
              <li key={i}><span className="hero__label">{t(f.label)}</span><p>{t(f.text)}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section id={ids.about} className="sec" aria-labelledby="about-h">
        <div className="wrap about">
          <div className="about__text">
            <h2 id="about-h">{u.aboutTitle}</h2>
            {site.about.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
          </div>
          <dl className="facts">
            <div><dt>{u.facts.founded}</dt><dd>{t(site.about.founded)}</dd></div>
            <div><dt>{u.facts.people}</dt><dd>{site.team.people.length}</dd></div>
            <div><dt>{u.facts.languages}</dt><dd>{t(site.about.languages)}</dd></div>
          </dl>
        </div>
      </section>

      <section id={ids.practices} className="sec sec--sage" aria-labelledby="practices-h">
        <div className="wrap">
          <div className="sec__head">
            <h2 id="practices-h">{u.practicesTitle}</h2>
            <p className="sec__lead">{u.practicesLead}</p>
          </div>
          <AreaList c={c} />
        </div>
      </section>

      <section className="msg" aria-label={u.msgLabel}>
        <div className="wrap msg__in">
          <figure className="msg__photo">
            <img src={asset(r, site.message.photo)} alt={t(site.message.name)} width={508} height={650} loading="lazy" />
          </figure>
          <div className="msg__text">
            <blockquote className="msg__quote"><p>{t(site.message.quote)}</p></blockquote>
            <p>{t(site.message.text)}</p>
            <p className="msg__sign"><span className="msg__name">{t(site.message.name)}</span><span className="msg__role">{t(site.message.role)}</span></p>
          </div>
        </div>
      </section>

      <section id={ids.approach} className="sec" aria-labelledby="approach-h">
        <div className="wrap split">
          <div className="split__head">
            <h2 id="approach-h">{u.approachTitle}</h2>
            <p className="sec__lead">{t(fdi.detail!.intro[1])}</p>
            <a className="more" href={linkTo(r, { lang: L, page: 'area', id: 'fdi' })}>{u.approachLink} <span aria-hidden="true">→</span></a>
          </div>
          <Steps items={fdi.detail!.services} c={c} />
        </div>
      </section>

      <section id={ids.team} className="sec sec--rule" aria-labelledby="team-h">
        <div className="wrap">
          <div className="sec__head">
            <h2 id="team-h">{u.teamTitle}</h2>
            <p className="sec__lead">{t(site.team.intro[0])}</p>
          </div>
          <div className="team team--lead">{site.team.people.slice(0, 3).map((p) => <Person key={p.photo} p={p} c={c} />)}</div>
          <div className="team team--rest">{site.team.people.slice(3).map((p) => <Person key={p.photo} p={p} c={c} />)}</div>
        </div>
      </section>

      {hasPubs && (
        <section id={ids.publications} className="sec sec--sage" aria-labelledby="pubs-h">
          <div className="wrap pubs">
            <h2 id="pubs-h">{u.pubsTitle[0]}<br />{u.pubsTitle[1]}</h2>
            <ul className="pubs__list">
              {site.publications.map((p, i) => (
                <li key={i}>
                  <h3>{p.href ? <a href={p.href}>{t(p.title)} <span aria-hidden="true">→</span></a> : <>{t(p.title)} <span className="pubs__go" aria-hidden="true">→</span></>}</h3>
                  <p>{t(p.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Contact c={c} />
    </>
  );
}

type Person = (typeof site.team.people)[number];
function Person({ p, c }: { p: Person; c: Ctx }) {
  const { r, t } = c;
  return (
    <article className="person">
      <img className="person__photo" src={asset(r, p.photo)} alt={t(p.name)} width={215} height={230} loading="lazy" />
      <div className="person__body">
        <h3>{t(p.name)}</h3>
        <p className="person__role">{t(p.role)}</p>
        <ul className="person__creds">{p.creds.map((k) => <li key={k}>{t(site.creds[k])}</li>)}</ul>
        {p.bio && <p className="person__bio">{t(p.bio)}</p>}
      </div>
    </article>
  );
}

/** Trang lĩnh vực: một cột bài viết rộng tối đa 68ch. */
function AreaPage({ c, a }: { c: Ctx; a: Area }) {
  const { r, L, t, u } = c;
  const d = a.detail!;
  return (
    <>
      <article className="sec article" aria-labelledby="area-h">
        <div className="wrap">
          <div className="article__col">
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href={linkTo(r, home(L))}>{u.home}</a><span aria-hidden="true">/</span>
              <a href={linkTo(r, home(L), ids.practices)}>{u.nav.practices}</a>
            </nav>
            <h1 id="area-h">{t(a.title)}</h1>
            <p className="article__tagline">{t(d.tagline)}</p>
            {d.intro.map((p, i) => <p key={i}>{t(p)}</p>)}
            <a href={linkTo(r, home(L), ids.contact)} className="btn btn--solid article__cta">{u.cta}</a>

            {d.pillars.length > 0 && <>
              <h2>{u.ourApproach}</h2>
              <Steps items={d.pillars} c={c} numbered={false} />
            </>}
            <h2>{d.steps ? u.approachTitle : u.services}</h2>
            <Steps items={d.services} c={c} />
            {d.strengths.length > 0 && <>
              <h2>{u.whyUs}</h2>
              <Steps items={d.strengths} c={c} numbered={false} />
            </>}
          </div>
        </div>
      </article>

      <section className="sec sec--rule" aria-labelledby="other-h">
        <div className="wrap">
          <div className="sec__head"><h2 id="other-h">{u.otherAreas}</h2></div>
          <AreaList c={c} except={a.id} />
        </div>
      </section>

      <Contact c={c} />
    </>
  );
}

function Contact({ c }: { c: Ctx }) {
  const { L, t, u } = c;
  return (
    <section id={ids.contact} className="sec sec--rule" aria-labelledby="contact-h">
      <div className="wrap contact">
        <div className="contact__info">
          <h2 id="contact-h">{u.contactTitle}</h2>
          <p className="sec__lead">{t(site.contact.lead)}</p>
          <dl className="facts facts--contact">
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
