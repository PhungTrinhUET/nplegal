import { useState, type FormEvent } from 'react';
import { site } from './site';

const tel = site.phone.replace(/[^\d+]/g, '');

const Icon = {
  phone: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" /></svg>,
  chat: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1z" /></svg>,
  mail: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zM3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>,
};

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['#linh-vuc', 'Lĩnh vực'], ['#quy-trinh', 'Quy trình'], ['#doi-ngu', 'Đội ngũ'], ['#hoi-dap', 'Hỏi đáp'], ['#lien-he', 'Liên hệ']];
  return (
    <header className="nav">
      <div className="nav__in">
        <a href="#top" className="brand" aria-label={site.name}><span className="brand__mark">§</span>{site.shortName}</a>
        <button className="nav__toggle" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Đóng' : 'Menu'}</button>
        <nav id="menu" className={`nav__links${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
          {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          <a href={`tel:${tel}`} className="btn btn--solid btn--sm">{Icon.phone}{site.phone}</a>
        </nav>
      </div>
    </header>
  );
}

function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (f.botcheck) return; // ô bẫy spam
    const subject = `Yêu cầu tư vấn: ${f.topic || 'chung'} – ${f.name}`;
    const body = `Họ tên: ${f.name}\nĐiện thoại: ${f.phone}\nEmail: ${f.email || '(không)'}\nLĩnh vực: ${f.topic}\n\n${f.message}`;
    if (!site.web3formsKey && !site.formEndpoint) {
      location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setState('sending');
    try {
      const url = site.web3formsKey ? 'https://api.web3forms.com/submit' : site.formEndpoint;
      const r = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...(site.web3formsKey ? { access_key: site.web3formsKey, from_name: site.name } : {}), subject, ...f }),
      });
      if (!r.ok) throw new Error();
      setState('ok'); e.currentTarget?.reset();
    } catch { setState('err'); }
  };
  if (state === 'ok') return <div className="form form--done" role="status"><h3>Đã gửi yêu cầu</h3><p>Chúng tôi sẽ gọi lại cho bạn trong giờ làm việc. Việc gấp, vui lòng gọi <a href={`tel:${tel}`}>{site.phone}</a>.</p></div>;
  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <label htmlFor="f-name">Họ tên<input id="f-name" name="name" required autoComplete="name" /></label>
        <label htmlFor="f-phone">Số điện thoại<input id="f-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" /></label>
      </div>
      <div className="form__row">
        <label htmlFor="f-email">Email (không bắt buộc)<input id="f-email" name="email" type="email" autoComplete="email" /></label>
        <label htmlFor="f-topic">Lĩnh vực
          <select id="f-topic" name="topic" defaultValue="">
            <option value="">Chưa rõ / khác</option>
            {site.practiceAreas.map((a) => <option key={a.title}>{a.title}</option>)}
          </select>
        </label>
      </div>
      <label htmlFor="f-msg">Tóm tắt vụ việc<textarea id="f-msg" name="message" rows={4} required placeholder="Nêu ngắn gọn sự việc và điều bạn cần luật sư hỗ trợ." /></label>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <p className="form__note">Thông tin chỉ dùng để liên hệ tư vấn và được giữ bí mật.</p>
      <button className="btn btn--solid" disabled={state === 'sending'}>{state === 'sending' ? 'Đang gửi…' : 'Gửi yêu cầu tư vấn'}</button>
      {state === 'err' && <p className="form__err" role="alert">Chưa gửi được. Vui lòng gọi {site.phone} hoặc email {site.email}.</p>}
    </form>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="hero">
          <div className="hero__in">
            <p className="eyebrow">Văn phòng luật sư · {site.address.split(',').pop()?.trim()}</p>
            <h1>{site.name}</h1>
            <p className="hero__lead">{site.tagline}</p>
            <div className="hero__cta">
              <a href={`tel:${tel}`} className="btn btn--solid">{Icon.phone}Gọi {site.phone}</a>
              {site.zalo && <a href={`https://zalo.me/${site.zalo}`} className="btn btn--line" target="_blank" rel="noopener">{Icon.chat}Nhắn Zalo</a>}
              <a href="#lien-he" className="btn btn--text">Gửi yêu cầu tư vấn →</a>
            </div>
            <dl className="hero__facts">
              <div><dt>Giờ làm việc</dt><dd>{site.hours}</dd></div>
              <div><dt>Địa chỉ</dt><dd>{site.address}</dd></div>
            </dl>
          </div>
        </section>

        <section id="linh-vuc" className="sec">
          <div className="sec__in">
            <div className="sec__head"><p className="eyebrow">Lĩnh vực hành nghề</p><h2>Chúng tôi hỗ trợ những việc gì</h2></div>
            <div className="areas">
              {site.practiceAreas.map((a) => (
                <article key={a.title} className="area"><h3>{a.title}</h3><p>{a.text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="quy-trinh" className="sec sec--tint">
          <div className="sec__in">
            <div className="sec__head"><p className="eyebrow">Quy trình</p><h2>Làm việc với chúng tôi</h2></div>
            <ol className="steps">
              {site.steps.map((s, i) => <li key={s.title}><span className="steps__n">{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}
            </ol>
          </div>
        </section>

        <section id="doi-ngu" className="sec">
          <div className="sec__in">
            <div className="sec__head"><p className="eyebrow">Đội ngũ</p><h2>Luật sư phụ trách</h2></div>
            <div className="team">
              {site.team.map((p) => (
                <article key={p.name} className="person">
                  <div className="person__ava" aria-hidden="true">{p.name.split(' ').pop()?.[0]}</div>
                  <div><h3>{p.name}</h3><p className="person__role">{p.role}</p><p>{p.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="hoi-dap" className="sec sec--tint">
          <div className="sec__in sec__in--narrow">
            <div className="sec__head"><p className="eyebrow">Hỏi đáp</p><h2>Câu hỏi thường gặp</h2></div>
            <div className="faq">
              {site.faq.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          </div>
        </section>

        <section id="lien-he" className="sec">
          <div className="sec__in contact">
            <div className="contact__info">
              <p className="eyebrow">Liên hệ</p>
              <h2>Đặt lịch tư vấn</h2>
              <ul className="contact__list">
                <li>{Icon.phone}<a href={`tel:${tel}`}>{site.phone}</a></li>
                {site.zalo && <li>{Icon.chat}<a href={`https://zalo.me/${site.zalo}`} target="_blank" rel="noopener">Zalo {site.zalo}</a></li>}
                <li>{Icon.mail}<a href={`mailto:${site.email}`}>{site.email}</a></li>
              </ul>
              <p className="muted">{site.address}<br />{site.hours}</p>
              {site.mapEmbed && <iframe className="map" title={`Bản đồ đến ${site.name}`} src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />}
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="sec__in foot__in">
          <div><strong>{site.name}</strong><p>{site.address}</p><p>{site.phone} · {site.email}</p></div>
          <div className="foot__legal"><p>{site.legal.license}</p><p>{site.legal.bar}</p><p>Người đại diện: {site.legal.representative}</p></div>
        </div>
        <p className="sec__in foot__note">Thông tin trên trang mang tính giới thiệu, không phải ý kiến tư vấn pháp lý cho vụ việc cụ thể. © {new Date().getFullYear()} {site.name}.</p>
      </footer>

      <a href={`tel:${tel}`} className="callfab" aria-label={`Gọi ${site.phone}`}>{Icon.phone}<span>Gọi luật sư</span></a>
    </>
  );
}
