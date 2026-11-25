import { useState, type FormEvent } from 'react';
import { site, type Area, type Lang, type Tx } from './site';
import { ui, type UI } from './ui';
import { asset, linkTo, type Route } from './routes';
import { Icon, Logo } from './icons';

const tel = site.phone.replace(/[^\d+]/g, '');

type Ctx = { r: Route; L: Lang; t: (x: Tx) => string; u: UI };
const home = (L: Lang): Route => ({ lang: L, page: 'home' });

function Header({ c }: { c: Ctx }) {
  const { r, L, u } = c;
  const [open, setOpen] = useState(false);
  const h = (id: string) => linkTo(r, home(L), id);
  const other: Lang = L === 'vi' ? 'en' : 'vi';
  const otherRoute: Route = r.page === 'home' ? home(other) : { ...r, lang: other };
  return (
    <header className="nav">
      <div className="nav__in">
        <a href={linkTo(r, home(L))} className="brand" aria-label={`${site.name} – ${u.home}`}><Logo /><span className="brand__name">NP LEGAL</span></a>
        <div className="nav__right">
          <nav className="lang" aria-label={u.langLabel}>
            <a href={linkTo(r, { ...otherRoute, lang: 'vi' })} hrefLang="vi" aria-current={L === 'vi' ? 'true' : undefined}>VI</a>
            <a href={linkTo(r, { ...otherRoute, lang: 'en' })} hrefLang="en" aria-current={L === 'en' ? 'true' : undefined}>EN</a>
          </nav>
          <button className="nav__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? u.close : u.menu}</button>
        </div>
        <nav id="menu" className={`nav__links${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
          <a href={h('about')}>{u.nav.about}</a>
          <a href={h('practices')}>{u.nav.practices}</a>
          <a href={h('approach')}>{u.nav.approach}</a>
          <a href={h('team')}>{u.nav.team}</a>
          <a href={h('contact')} className="btn btn--solid btn--sm">{u.cta}</a>
        </nav>
      </div>
    </header>
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

function AreaCard({ a, c }: { a: Area; c: Ctx }) {
  const inner = (
    <>
      <span className="area__ic"><Icon name={a.icon} /></span>
      <h3>{c.t(a.title)}</h3>
      <p>{c.t(a.short)}</p>
      {a.detail && <span className="area__more">{c.u.more}<Icon name="arrow" /></span>}
    </>
  );
  return a.detail
    ? <a className="area area--link" href={linkTo(c.r, { lang: c.L, page: 'area', id: a.id })}>{inner}</a>
    : <article className="area">{inner}</article>;
}

function Steps({ items, c }: { items: { title: Tx; text: Tx }[]; c: Ctx }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={i}><span className="steps__n">{i + 1}</span><div><h3>{c.t(s.title)}</h3><p>{c.t(s.text)}</p></div></li>
      ))}
    </ol>
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
            <p className="eyebrow eyebrow--light">{site.name} · {L === 'vi' ? 'Hà Nội, Việt Nam' : 'Hanoi, Vietnam'}</p>
            <h1>{t(site.hero.title)}</h1>
            <p className="hero__lead">{t(site.hero.lead)}</p>
            <div className="hero__cta">
              <a href={linkTo(r, home(L), 'contact')} className="btn btn--solid">{u.cta}<Icon name="arrow" /></a>
              <a href={`tel:${tel}`} className="btn btn--line"><Icon name="phone" />{site.phone}</a>
            </div>
            <ul className="hero__pillars">
              {site.hero.pillars.map((p) => {
                const a = site.areas.find((x) => x.id === p.area)!;
                const href = a.detail ? linkTo(r, { lang: L, page: 'area', id: a.id }) : linkTo(r, home(L), 'practices');
                return <li key={p.area}><a href={href}><Icon name={a.icon} /><span>{t(p.label)}</span></a></li>;
              })}
            </ul>
          </div>
          <figure className="hero__media">
            <img src={asset(r, 'img/hero.jpg')} alt="" width={468} height={941} fetchPriority="high" />
            <blockquote className="hero__quote"><Icon name="quote" /><p>{t(site.hero.quote)}</p></blockquote>
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
        <div className="wrap about">
          <div>
            <SecHead eyebrow={u.aboutEyebrow} title={u.aboutTitle} />
            <div className="prose">{site.about.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
            <ul className="marks">
              {site.about.marks.map((m, i) => <li key={i}><span className="mark__ic"><Icon name={m.icon} /></span><div><strong>{t(m.title)}</strong><span>{t(m.text)}</span></div></li>)}
            </ul>
          </div>
          <ul className="values">
            {site.message.values.map((v, i) => (
              <li key={i}><span className="values__ic"><Icon name={v.icon} /></span><div><h3>{t(v.title)}</h3><p>{t(v.text)}</p></div></li>
            ))}
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
            <Icon name="quote" size={40} />
            {site.message.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
            <p className="msg__sign"><strong>{t(site.message.name)}</strong><span>{t(site.message.role)}</span></p>
          </div>
        </div>
      </section>

      <section id="practices" className="sec sec--tint">
        <div className="wrap">
          <SecHead eyebrow={u.practicesEyebrow} title={u.practicesTitle} lead={u.practicesLead} />
          <div className="areas">{site.areas.map((a) => <AreaCard key={a.id} a={a} c={c} />)}</div>
        </div>
      </section>

      <section id="approach" className="sec">
        <div className="wrap split">
          <div>
            <SecHead eyebrow={u.approachEyebrow} title={u.approachTitle} />
            <div className="prose">{fdi.detail!.intro.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
            <a className="link-more" href={linkTo(r, { lang: L, page: 'area', id: 'fdi' })}>{t(fdi.title)}<Icon name="arrow" /></a>
          </div>
          <Steps items={fdi.detail!.services} c={c} />
        </div>
      </section>

      <section id="team" className="sec sec--tint">
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
                    {p.creds.map((k) => <li key={k}><Icon name={/vbf|hba/.test(k) ? 'bank' : 'cap'} />{t(site.creds[k])}</li>)}
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
          <span className="phero__ic"><Icon name={a.icon} size={34} /></span>
          <h1>{t(a.title)}</h1>
          <p className="tagline">{t(d.tagline)}</p>
          <div className="phero__intro">{d.intro.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
          <a href={linkTo(r, home(L), 'contact')} className="btn btn--solid">{u.cta}<Icon name="arrow" /></a>
        </div>
      </section>

      {d.pillars.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead eyebrow={u.ourApproach} title={t(a.title)} />
            <div className="pillars">
              {d.pillars.map((p, i) => <article key={i}><span className="pillars__n">0{i + 1}</span><h3>{t(p.title)}</h3><p>{t(p.text)}</p></article>)}
            </div>
          </div>
        </section>
      )}

      <section className={`sec${d.pillars.length ? ' sec--tint' : ''}`}>
        <div className="wrap">
          <SecHead eyebrow={u.services} title={d.steps ? u.approachTitle : t(a.title)} />
          {d.steps ? <Steps items={d.services} c={c} /> : (
            <div className="svc">
              {d.services.map((s, i) => <article key={i}><h3>{t(s.title)}</h3><p>{t(s.text)}</p></article>)}
            </div>
          )}
        </div>
      </section>

      {d.strengths.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead eyebrow={u.whyUs} title={L === 'vi' ? 'Điểm mạnh của chúng tôi' : 'Our strengths'} />
            <ul className="strengths">
              {d.strengths.map((s, i) => <li key={i}><Icon name="check" /><div><h3>{t(s.title)}</h3><p>{t(s.text)}</p></div></li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="sec sec--tint">
        <div className="wrap">
          <SecHead eyebrow={u.otherAreas} title={u.practicesTitle} />
          <ul className="chips">
            {site.areas.filter((x) => x.id !== a.id).map((x) => (
              <li key={x.id}>
                {x.detail
                  ? <a href={linkTo(r, { lang: L, page: 'area', id: x.id })}><Icon name={x.icon} />{t(x.title)}</a>
                  : <span><Icon name={x.icon} />{t(x.title)}</span>}
              </li>
            ))}
          </ul>
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
            <ul className="contact__list">
              <li><span className="contact__ic"><Icon name="phone" /></span><div><small>{u.phone}</small><a href={`tel:${tel}`}>{site.phone}</a></div></li>
              <li><span className="contact__ic"><Icon name="mail" /></span><div><small>{u.email}</small><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
              <li><span className="contact__ic"><Icon name="pin" /></span><div><small>{u.address}</small><span>{t(site.address)}</span></div></li>
              <li><span className="contact__ic"><Icon name="clock" /></span><div><small>{u.hours}</small><span>{t(site.hours)}</span></div></li>
            </ul>
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
      <button className="btn btn--solid" disabled={state === 'sending'}>{state === 'sending' ? f.sending : f.send}<Icon name="arrow" /></button>
      {state === 'err' && <p className="form__err" role="alert">{f.err} {site.phone} · {site.email}</p>}
    </form>
  );
}

function Footer({ c }: { c: Ctx }) {
  const { r, L, t, u } = c;
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div className="foot__brand">
          <Logo />
          <p>{t(site.hero.title)}</p>
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
          <h2 className="foot__h">{u.nav.contact}</h2>
          <ul className="foot__list">
            <li><a href={`tel:${tel}`}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li>{t(site.address)}</li>
          </ul>
        </div>
      </div>
      <div className="wrap foot__note">
        {t(site.legal.license) && <p>{t(site.legal.license)}</p>}
        {site.legal.taxCode && <p>{L === 'vi' ? 'Mã số thuế' : 'Tax code'}: {site.legal.taxCode}</p>}
        <p>{u.disclaimer}</p>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
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
      <a href={`tel:${tel}`} className="callfab" aria-label={`${c.u.call} ${site.phone}`}><Icon name="phone" /><span>{c.u.callFab}</span></a>
    </>
  );
}
