// ===== NỘI DUNG WEBSITE NP LEGAL – sửa file này là đổi chữ trên toàn trang =====
// Mỗi đoạn chữ có 2 bản: vi (trang tiếng Việt, địa chỉ gốc /) và en (trang tiếng Anh, /en/).
// Nguồn: hồ sơ năng lực "NPL - Profile - Eng Ver.pdf". Bản tiếng Việt là bản dịch, nên soát lại trước khi công khai.

export type Lang = 'vi' | 'en';
export type Tx = { vi: string; en: string };
const tx = (vi: string, en: string): Tx => ({ vi, en });

export type IconName =
  | 'globe' | 'building' | 'handshake' | 'clipboard' | 'gavel' | 'crane' | 'bulb' | 'percent' | 'bank' | 'bolt'
  | 'users' | 'shield' | 'target' | 'chart' | 'briefcase' | 'star';

export type Item = { title: Tx; text: Tx };
export type Area = {
  id: string;
  /** Đường dẫn trang chi tiết: /linh-vuc/<vi>/ và /en/practice/<en>/ */
  slug: Tx;
  icon: IconName;
  title: Tx;
  /** Một câu mô tả trên thẻ ở trang chủ. */
  short: Tx;
  /** Có `detail` thì có trang riêng; không có thì chỉ hiện thẻ ở trang chủ. */
  detail?: {
    tagline: Tx;
    intro: Tx[];
    pillars: Item[];
    services: Item[];
    strengths: Item[];
    /** true: hiện `services` thành các bước đánh số (quy trình). */
    steps?: boolean;
  };
};

export const site = {
  name: 'NP Legal',
  /** Địa chỉ web chính thức, có / ở cuối. Dùng cho sitemap, thẻ chia sẻ, link chuẩn. */
  url: 'https://www.nplegal.vn/',
  phone: '+84 988 965 813',
  /** Số Zalo (chỉ chữ số), để '' nếu không dùng. Chưa rõ số Zalo của công ty nên đang tắt. */
  zalo: '',
  email: 'the.pham@nplegal.vn',
  address: tx(
    'Tầng 7, Zen Tower, số 12 Khuất Duy Tiến, phường Thanh Xuân Trung, quận Thanh Xuân, Hà Nội',
    '7th Floor, Zen Tower, No. 12 Khuat Duy Tien Street, Thanh Xuan Trung Ward, Thanh Xuan District, Hanoi, Vietnam',
  ),
  hours: tx('Thứ 2 – Thứ 6, 8:30 – 17:30', 'Monday – Friday, 8:30 – 17:30'),
  /** Bản đồ nhúng (không cần API key). Để '' thì ẩn. */
  mapEmbed: 'https://www.google.com/maps?q=Zen+Tower,+12+Khuat+Duy+Tien,+Thanh+Xuan,+Ha+Noi&output=embed',

  /** Thông tin pháp lý ở chân trang (Luật Luật sư yêu cầu ghi rõ). Ô nào để '' thì không hiện. */
  legal: {
    license: tx('', ''), // vd: 'Giấy đăng ký hoạt động số … do Sở Tư pháp Hà Nội cấp ngày …'
    taxCode: '',
  },

  /** Form liên hệ gửi thẳng về email (miễn phí): access key Web3Forms hoặc URL Formspree. Để trống: mở ứng dụng email. */
  web3formsKey: '',
  formEndpoint: '',

  seo: {
    title: tx(
      'NP Legal – Đối tác pháp lý cho nhà đầu tư nước ngoài và doanh nghiệp tại Việt Nam',
      'NP Legal – Strategic Legal Partner for Foreign Investors and Businesses in Vietnam',
    ),
    description: tx(
      'Công ty luật tại Hà Nội: đầu tư nước ngoài, M&A, doanh nghiệp – thương mại, tuân thủ, tranh chấp, bất động sản, sở hữu trí tuệ, thuế và hải quan.',
      'Hanoi law firm advising foreign investors and businesses on market entry, M&A, corporate, compliance, disputes, real estate, IP, tax and customs.',
    ),
  },

  hero: {
    title: tx('Tư vấn pháp lý cho nhà đầu tư nước ngoài tại Việt Nam', 'Legal counsel for foreign investors in Vietnam'),
    lead: tx(
      'Kết hợp chuyên môn pháp lý, kinh nghiệm tuân thủ và hiểu biết kinh doanh thực tế để đưa ra giải pháp hợp lý về thương mại và hiệu quả.',
      'We combine legal expertise, compliance experience and practical business knowledge to deliver solutions that are commercially sound and effective.',
    ),
    quote: tx(
      'Giải pháp pháp lý chiến lược, chính trực, hiệu quả và tận tâm vì thành công của khách hàng.',
      'Delivering strategic legal solutions with integrity, efficiency and a commitment to your success.',
    ),
    /** 4 mảng nổi bật dưới tiêu đề; trỏ tới id lĩnh vực. */
    pillars: [
      { area: 'fdi', label: tx('Đầu tư nước ngoài & M&A', 'Foreign Investment & M&A') },
      { area: 'corporate', label: tx('Tư vấn doanh nghiệp & thương mại', 'Corporate Advisory & Commercial') },
      { area: 'compliance', label: tx('Tuân thủ & kiểm toán nội bộ', 'Compliance & Internal Audit') },
      { area: 'disputes', label: tx('Giải quyết tranh chấp', 'Dispute Resolution') },
    ],
  },

  stats: [
    { n: '10+', label: tx('Năm kinh nghiệm', 'Years'), note: tx('tổng kinh nghiệm nghề nghiệp', 'combined professional experience') },
    { n: '50+', label: tx('Khách hàng', 'Clients'), note: tx('trong nước và quốc tế', 'domestic & international') },
    { n: '10+', label: tx('Quốc gia', 'Countries'), note: tx('khách hàng từ châu Á, châu Âu, Bắc Mỹ', 'clients from Asia, Europe, North America & beyond') },
    { n: '10+', label: tx('Lĩnh vực', 'Practice areas'), note: tx('hỗ trợ pháp lý toàn diện cho doanh nghiệp', 'full business legal support') },
  ],

  about: {
    paragraphs: [
      tx(
        'NP Legal là công ty luật tại Việt Nam, cung cấp giải pháp pháp lý chiến lược cho nhà đầu tư nước ngoài và doanh nghiệp trong nhiều ngành nghề.',
        'NP Legal is a law firm in Vietnam, providing strategic legal solutions to foreign investors and businesses across a wide range of industries.',
      ),
      tx(
        'Chúng tôi kết hợp chuyên môn pháp lý sâu, chuẩn mực quốc tế và hiểu biết kinh doanh thực tế để tạo ra giá trị thật cho khách hàng.',
        'We combine deep legal expertise, international standards and practical business understanding to deliver solutions that create real value.',
      ),
      tx(
        'Cam kết của chúng tôi là trở thành đối tác pháp lý tin cậy, đồng hành cùng khách hàng ở mọi giai đoạn đầu tư và kinh doanh tại Việt Nam.',
        'Our commitment is to be a trusted legal partner, accompanying clients at every stage of their investment and business journey in Vietnam.',
      ),
    ],
    marks: [
      { icon: 'chart' as IconName, title: tx('Trọng tâm FDI', 'FDI focus'), text: tx('Đầu tư và gia nhập thị trường', 'Investment & market entry expertise') },
      { icon: 'star' as IconName, title: tx('Luật sư thành viên trực tiếp phụ trách', 'Partner-led service'), text: tx('Luật sư cấp cao tham gia trực tiếp vào hồ sơ', 'Direct senior lawyer involvement') },
    ],
  },

  message: {
    name: tx('Phạm Đình Thế', 'Pham Dinh The'),
    role: tx('Luật sư điều hành', 'Managing Partner'),
    photo: 'img/team/the-lg.jpg',
    paragraphs: [
      tx(
        'Việt Nam tiếp tục là một trong những điểm đến đầu tư năng động nhất châu Á. Cơ hội nhiều, nhưng nhà đầu tư và doanh nghiệp cũng gặp những thách thức pháp lý, quản lý nhà nước và tuân thủ ngày càng phức tạp.',
        'Vietnam continues to emerge as one of the most dynamic investment destinations in Asia. While opportunities are abundant, investors and businesses face increasingly complex legal, regulatory and compliance challenges.',
      ),
      tx(
        'Tại NP Legal, chúng tôi kết hợp chuyên môn pháp lý, kinh nghiệm tuân thủ và hiểu biết kinh doanh thực tế để đưa ra giải pháp hợp lý về thương mại và hiệu quả.',
        'At NP Legal, we combine legal expertise, compliance experience and practical business knowledge to deliver solutions that are commercially sound and effective.',
      ),
      tx(
        'Chúng tôi cam kết là đối tác pháp lý tin cậy, đồng hành cùng khách hàng ở mọi chặng đường và góp phần vào thành công lâu dài của họ tại Việt Nam.',
        'We are committed to being a trusted legal partner, accompanying our clients at every stage of their journey and contributing to their long-term success in Vietnam.',
      ),
    ],
    values: [
      { icon: 'handshake' as IconName, title: tx('Lấy khách hàng làm trọng tâm', 'Client-focused'), text: tx('Đặt lợi ích của khách hàng lên trước và xây dựng quan hệ lâu dài.', 'We put our clients’ interests first and build long-term relationships.') },
      { icon: 'bulb' as IconName, title: tx('Thực tế', 'Practical'), text: tx('Tư vấn thực tế, hướng tới giải pháp, tạo ra giá trị thật.', 'We provide practical and solution-oriented legal advice that creates real value.') },
      { icon: 'users' as IconName, title: tx('Phản hồi nhanh', 'Responsive'), text: tx('Chủ động, tận tâm và hỗ trợ kịp thời.', 'We are responsive, proactive and dedicated to timely support.') },
      { icon: 'shield' as IconName, title: tx('Tin cậy', 'Reliable'), text: tx('Chính trực, bảo mật và chuyên nghiệp.', 'We deliver reliable legal services with integrity, confidentiality and professionalism.') },
    ],
  },

  areas: [
    {
      id: 'fdi', slug: tx('dau-tu-nuoc-ngoai', 'foreign-investment'), icon: 'globe',
      title: tx('Đầu tư nước ngoài & gia nhập thị trường', 'Foreign Investment & Market Entry'),
      short: tx('Giúp nhà đầu tư nước ngoài gia nhập, thành lập và phát triển kinh doanh tại Việt Nam một cách tự tin.', 'Helping foreign investors successfully enter, establish and grow their business in Vietnam with confidence.'),
      detail: {
        tagline: tx('Gia nhập thị trường tự tin. Phát triển bền vững.', 'Enter with confidence. Grow with certainty.'),
        intro: [
          tx('Chúng tôi giúp nhà đầu tư nước ngoài gia nhập, thành lập và phát triển kinh doanh tại Việt Nam một cách tự tin.', 'We help foreign investors successfully enter, establish and grow their business in Vietnam with confidence.'),
          tx('Đội ngũ của chúng tôi hỗ trợ pháp lý trọn gói: từ chiến lược gia nhập thị trường, cấu trúc đầu tư đến cấp phép, tuân thủ và tư vấn vận hành thường xuyên.', 'Our team provides end-to-end legal support, from market entry strategy and investment structuring to licensing, compliance and ongoing operational advisory.'),
          tx('Với hiểu biết sâu về pháp luật, quy định và thực tiễn tại Việt Nam, chúng tôi đưa ra giải pháp thực tế giúp giảm rủi ro và tận dụng tối đa cơ hội.', 'With in-depth knowledge of Vietnamese laws, regulations and local practices, we deliver practical solutions that minimize risks and maximize opportunities for our clients.'),
        ],
        steps: true,
        pillars: [],
        services: [
          { title: tx('Chiến lược gia nhập thị trường', 'Market entry strategy'), text: tx('Đánh giá cơ hội thị trường, khung pháp lý và ưu đãi đầu tư để chọn cách gia nhập phù hợp nhất.', 'Assessing market opportunities, legal landscape and investment incentives to define the optimal entry approach.') },
          { title: tx('Cấu trúc đầu tư', 'Investment structure'), text: tx('Thiết kế cấu trúc đầu tư phù hợp với mục tiêu kinh doanh và mức độ chấp nhận rủi ro.', 'Designing the most suitable investment structure aligned with your business goals and risk profile.') },
          { title: tx('Cấp phép & đăng ký', 'Licensing & registration'), text: tx('Hỗ trợ giấy phép, đăng ký và phê duyệt của cơ quan nhà nước để thành lập doanh nghiệp hợp pháp, nhanh gọn.', 'Assisting with licenses, registrations and government approvals to establish your business legally and efficiently.') },
          { title: tx('Tuân thủ trong vận hành', 'Operational compliance'), text: tx('Bảo đảm tuân thủ thường xuyên pháp luật Việt Nam, chế độ báo cáo và quản trị doanh nghiệp.', 'Ensuring ongoing compliance with Vietnamese laws, regulations, reporting and corporate governance.') },
          { title: tx('Mở rộng & tăng trưởng', 'Expansion & growth'), text: tx('Hỗ trợ mở rộng kinh doanh, tái cấu trúc, M&A và tăng trưởng dài hạn tại Việt Nam.', 'Supporting business expansion, restructuring, M&A and long-term growth in Vietnam.') },
        ],
        strengths: [],
      },
    },
    {
      id: 'corporate', slug: tx('doanh-nghiep-thuong-mai', 'corporate-commercial'), icon: 'building',
      title: tx('Doanh nghiệp & thương mại', 'Corporate & Commercial'),
      short: tx('Quản trị doanh nghiệp, hợp đồng, giao dịch thương mại và tư vấn pháp lý thường xuyên.', 'Corporate governance, contracts, commercial transactions and day-to-day legal advisory.'),
    },
    {
      id: 'ma', slug: tx('mua-ban-sap-nhap', 'mergers-acquisitions'), icon: 'handshake',
      title: tx('Mua bán & sáp nhập (M&A)', 'Mergers & Acquisitions'),
      short: tx('Thẩm định pháp lý, cấu trúc giao dịch, đàm phán và hỗ trợ sau mua bán.', 'Legal due diligence, transaction structuring, negotiations and post-acquisition support.'),
      detail: {
        tagline: tx('Đồng hành cùng các khoản đầu tư chiến lược và mở rộng kinh doanh tại Việt Nam.', 'Supporting strategic investments and business expansion in Vietnam.'),
        intro: [tx('Chúng tôi tư vấn cho nhà đầu tư, công ty tư nhân và chủ doanh nghiệp trong các giao dịch mua lại, thoái vốn, liên doanh và tái cấu trúc tại Việt Nam.', 'We advise investors, private companies and business owners on acquisitions, divestments, joint ventures and corporate restructuring transactions in Vietnam.')],
        pillars: [
          { title: tx('Tư vấn giao dịch chiến lược', 'Strategic transaction advisory'), text: tx('Mua lại, thoái vốn, liên doanh và tái cấu trúc doanh nghiệp tại Việt Nam.', 'Acquisitions, divestments, joint ventures and corporate restructuring transactions in Vietnam.') },
          { title: tx('Tiếp cận theo mục tiêu thương mại', 'Commercially focused approach'), text: tx('Kết hợp chuyên môn pháp lý, tuân thủ và hiểu biết kinh doanh để nhận diện rủi ro, bảo vệ giá trị và giúp giao dịch thành công.', 'Our team combines legal expertise, compliance experience and practical business understanding to identify risks, protect value and facilitate successful transactions.') },
          { title: tx('Kinh nghiệm xuyên biên giới', 'Cross-border experience'), text: tx('Hỗ trợ nhà đầu tư trong nước và nước ngoài suốt vòng đời giao dịch, từ đánh giá ban đầu đến hội nhập sau giao dịch.', 'We support both domestic and foreign investors throughout the entire transaction lifecycle, from initial assessment to post-closing integration.') },
        ],
        services: [
          { title: tx('Thẩm định pháp lý', 'Legal due diligence'), text: tx('Rà soát pháp lý doanh nghiệp, lao động, giấy phép, sở hữu trí tuệ và tuân thủ để nhận diện rủi ro và cơ hội.', 'Review legal, corporate, employment, licensing, IP and compliance matters to identify risks and opportunities.') },
          { title: tx('Cấu trúc giao dịch', 'Transaction structuring'), text: tx('Thiết kế cấu trúc giao dịch hiệu quả, khả thi về thương mại và phù hợp mục tiêu.', 'Design efficient and commercially viable transaction structures aligned with your objectives.') },
          { title: tx('Mua cổ phần, phần vốn góp & tài sản', 'Share & asset acquisitions'), text: tx('Hỗ trợ mua cổ phần, phần vốn góp và tài sản doanh nghiệp trong nhiều ngành.', 'Support acquisitions of shares, equity interests and business assets across various industries.') },
          { title: tx('Liên doanh & liên minh chiến lược', 'Joint ventures & strategic alliances'), text: tx('Tư vấn hợp tác đầu tư, mô hình đối tác và cơ cấu quản trị.', 'Advise on investment cooperation, partnership models and governance structures.') },
          { title: tx('Hồ sơ giao dịch', 'Transaction documentation'), text: tx('Soạn thảo, đàm phán văn kiện giao dịch và thoả thuận kèm theo để bảo vệ quyền lợi của bạn.', 'Draft and negotiate transaction documents and ancillary agreements to protect your interests.') },
          { title: tx('Hỗ trợ sau giao dịch', 'Post-transaction support'), text: tx('Hỗ trợ cấp phép, thủ tục với cơ quan quản lý, tái cấu trúc và hội nhập sau giao dịch.', 'Assist with licensing, regulatory filings, restructuring and post-closing integration.') },
        ],
        strengths: [
          { title: tx('50+ khách hàng', '50+ clients advised'), text: tx('Khách hàng trong nước và quốc tế.', 'Domestic and international clients.') },
          { title: tx('Giao dịch xuyên biên giới', 'Cross-border transactions'), text: tx('Nhà đầu tư từ nhiều quốc gia.', 'Investors from many jurisdictions.') },
          { title: tx('Luật sư thành viên phụ trách', 'Partner-led service'), text: tx('Luật sư cấp cao tham gia trực tiếp.', 'Direct senior lawyer involvement.') },
        ],
      },
    },
    {
      id: 'compliance', slug: tx('tuan-thu-kiem-toan-noi-bo', 'compliance-internal-audit'), icon: 'clipboard',
      title: tx('Tuân thủ & kiểm toán nội bộ', 'Compliance & Internal Audit'),
      short: tx('Rà soát tuân thủ, đánh giá rủi ro, điều tra nội bộ và tư vấn quản trị.', 'Compliance reviews, risk assessments, internal investigations and governance advisory.'),
      detail: {
        tagline: tx('Tăng cường quản trị. Kiểm soát rủi ro. Tăng trưởng bền vững.', 'Strengthening governance. Managing risk. Driving sustainable growth.'),
        intro: [tx('Chúng tôi giúp doanh nghiệp xây dựng hệ thống tuân thủ hiệu quả, phù hợp pháp luật Việt Nam, chuẩn mực quốc tế và thông lệ tốt của ngành.', 'We help businesses establish effective compliance frameworks aligned with Vietnamese regulations, international standards and industry best practices.')],
        pillars: [
          { title: tx('Tuân thủ ngay từ thiết kế', 'Compliance by design'), text: tx('Hệ thống tuân thủ phù hợp pháp luật Việt Nam, chuẩn mực quốc tế và thông lệ tốt của ngành.', 'Effective compliance frameworks aligned with Vietnamese regulations, international standards and industry best practices.') },
          { title: tx('Kiểm toán nội bộ chuyên sâu', 'Internal audit excellence'), text: tx('Kết hợp chuyên môn pháp lý, tuân thủ và kiểm toán nội bộ để đánh giá rủi ro, tăng cường kiểm soát và nâng hiệu quả vận hành.', 'Our team combines legal, compliance and internal audit expertise to evaluate risks, strengthen internal controls and improve operational effectiveness.') },
          { title: tx('Giải pháp hướng tới kinh doanh', 'Business-oriented solutions'), text: tx('Từ kinh nghiệm tại các tập đoàn đa quốc gia và doanh nghiệp lớn của Việt Nam, chúng tôi đưa ra khuyến nghị làm được và đo được.', 'Drawing on practical experience from multinational corporations and leading Vietnamese enterprises, we deliver actionable recommendations that create measurable value.') },
        ],
        services: [
          { title: tx('Thiết kế hệ thống tuân thủ', 'Compliance framework design'), text: tx('Xây dựng và triển khai hệ thống, chính sách và quy trình tuân thủ phù hợp luật và thông lệ tốt.', 'Design and implement compliance frameworks, policies and procedures aligned with laws, regulations and best practices.') },
          { title: tx('Tư vấn tuân thủ pháp luật', 'Regulatory compliance advisory'), text: tx('Tư vấn nghĩa vụ pháp lý về đầu tư, lao động, thuế, bảo vệ dữ liệu, phòng chống rửa tiền và các lĩnh vực khác.', 'Practical advice on legal obligations across investment, labor, tax, data protection, AML and other key areas.') },
          { title: tx('Kiểm toán nội bộ', 'Internal audit services'), text: tx('Lập kế hoạch và thực hiện kiểm toán nội bộ dựa trên rủi ro để đánh giá kiểm soát, quy trình và hiệu quả vận hành.', 'Plan and conduct risk-based internal audits to evaluate controls, processes and operational effectiveness.') },
          { title: tx('Rà soát tuân thủ hợp đồng', 'Contract compliance review'), text: tx('Rà soát hợp đồng, thoả thuận để bảo đảm phù hợp pháp luật và chính sách nội bộ.', 'Review contracts and agreements to ensure compliance with legal requirements and internal policies.') },
          { title: tx('Điều tra nội bộ & đánh giá rủi ro', 'Internal investigation & risk assessment'), text: tx('Điều tra độc lập, đánh giá rủi ro để xác định vấn đề và đề xuất xử lý phù hợp.', 'Conduct independent investigations and risk assessments to identify issues and recommend appropriate actions.') },
          { title: tx('Cải thiện quản trị & quy trình', 'Governance & process improvement'), text: tx('Tăng cường quản trị doanh nghiệp, tối ưu quy trình, nâng hiệu quả và môi trường kiểm soát.', 'Strengthen corporate governance and optimize processes to enhance efficiency and the control environment.') },
        ],
        strengths: [
          { title: tx('Chuyên môn tuân thủ', 'Compliance expertise'), text: tx('Am hiểu pháp luật Việt Nam và chuẩn mực quốc tế.', 'Deep understanding of Vietnamese laws, regulations and international standards.') },
          { title: tx('Năng lực kiểm toán nội bộ', 'Internal audit capability'), text: tx('Tiếp cận dựa trên rủi ro để đánh giá và tăng cường kiểm soát nội bộ.', 'Risk-based approach to evaluate, strengthen and enhance internal controls and processes.') },
          { title: tx('Quản trị rủi ro kinh doanh', 'Business risk management'), text: tx('Nhận diện, đánh giá và quản lý rủi ro để bảo vệ doanh nghiệp và tăng trưởng bền vững.', 'Identify, assess and manage risks to protect your business and drive sustainable growth.') },
        ],
      },
    },
    {
      id: 'disputes', slug: tx('giai-quyet-tranh-chap', 'dispute-resolution'), icon: 'gavel',
      title: tx('Giải quyết tranh chấp & tố tụng', 'Dispute Resolution & Litigation'),
      short: tx('Đại diện khách hàng trong tố tụng, trọng tài, hoà giải và thi hành án.', 'Representing clients in litigation, arbitration, mediation and enforcement proceedings.'),
      detail: {
        tagline: tx('Chiến lược. Hiệu quả. Hướng tới kết quả.', 'Strategic. Effective. Results-driven.'),
        intro: [tx('Chúng tôi tiếp cận việc giải quyết tranh chấp theo hướng chiến lược và thương mại, tập trung đạt kết quả tốt nhất có thể cho khách hàng.', 'We take a strategic and commercial approach to dispute resolution, focused on achieving the best possible outcome for our clients.')],
        pillars: [
          { title: tx('Tiếp cận chiến lược', 'Strategic approach'), text: tx('Cân nhắc cả mục tiêu thương mại, không chỉ khía cạnh pháp lý của vụ việc.', 'A strategic and commercial approach focused on the best possible outcome for our clients.') },
          { title: tx('Đại diện giàu kinh nghiệm', 'Experienced representation'), text: tx('Luật sư của chúng tôi đã đại diện khách hàng trong nhiều tranh chấp phức tạp thuộc nhiều ngành.', 'Our lawyers have extensive experience representing clients in complex disputes across a wide range of industries and sectors.') },
          { title: tx('Giải pháp hiệu quả, tiết kiệm', 'Effective & efficient solutions'), text: tx('Dùng thương lượng, hoà giải, trọng tài và tố tụng để giải quyết tranh chấp nhanh, bảo vệ quyền lợi và hạn chế ảnh hưởng tới kinh doanh.', 'We leverage negotiation, mediation, arbitration and litigation to resolve disputes efficiently, protect interests and minimize disruption to business.') },
        ],
        services: [
          { title: tx('Tranh chấp thương mại', 'Commercial disputes'), text: tx('Tranh chấp hợp đồng, vi phạm hợp đồng, tranh chấp cổ đông và kinh doanh.', 'Representing clients in contract disputes, breach of contract, shareholder and business disputes.') },
          { title: tx('Tranh chấp xây dựng', 'Construction disputes'), text: tx('Khiếu nại về chậm tiến độ, sai sót, phát sinh, thanh toán và chấm dứt hợp đồng xây dựng.', 'Handling claims related to delays, defects, variations, payments and terminations in construction projects.') },
          { title: tx('Tranh chấp lao động', 'Labor & employment disputes'), text: tx('Tư vấn và đại diện khách hàng trong tranh chấp lao động, việc làm.', 'Advising and representing clients in employment, workplace and labor-related disputes.') },
          { title: tx('Giải quyết tranh chấp ngoài toà (ADR)', 'Alternative dispute resolution (ADR)'), text: tx('Thương lượng, hoà giải và trọng tài để giải quyết tranh chấp hiệu quả.', 'Providing effective solutions through negotiation, mediation and arbitration to resolve disputes efficiently.') },
          { title: tx('Đại diện tại toà án', 'Litigation representation'), text: tx('Đại diện khách hàng trong tố tụng tại toà án Việt Nam các cấp.', 'Representing clients in litigation proceedings before Vietnamese courts at all levels.') },
          { title: tx('Tranh chấp xuyên biên giới', 'Cross-border disputes'), text: tx('Hỗ trợ giải quyết tranh chấp có yếu tố nước ngoài, thi hành bản án và phán quyết trọng tài.', 'Assisting clients in navigating cross-border disputes and enforcing judgments and arbitral awards.') },
        ],
        strengths: [
          { title: tx('Hướng tới kết quả', 'Results-oriented'), text: tx('Giải pháp thực tế bảo vệ quyền lợi và đạt mục tiêu của bạn.', 'Focused on practical solutions that protect your rights and achieve your objectives.') },
          { title: tx('Hiểu ngành', 'Industry insight'), text: tx('Am hiểu các ngành và khung pháp lý quan trọng tại Việt Nam.', 'Deep understanding of key industries and regulatory frameworks in Vietnam.') },
          { title: tx('Lấy khách hàng làm trọng tâm', 'Client focused'), text: tx('Phản hồi nhanh, trao đổi rõ ràng, quan hệ lâu dài.', 'Committed to responsive service, clear communication and long-term client relationships.') },
        ],
      },
    },
    {
      id: 'realestate', slug: tx('bat-dong-san-xay-dung', 'real-estate-construction'), icon: 'crane',
      title: tx('Bất động sản & xây dựng', 'Real Estate & Construction'),
      short: tx('Phát triển dự án, hợp đồng xây dựng, đất đai và giao dịch bất động sản.', 'Project development, construction contracts, land matters and property transactions.'),
      detail: {
        tagline: tx('Giải pháp pháp lý cho phát triển bền vững.', 'Delivering legal solutions for sustainable development.'),
        intro: [tx('Chúng tôi tư vấn pháp lý toàn diện cho mọi khía cạnh của dự án bất động sản và xây dựng tại Việt Nam.', 'We provide comprehensive legal advice across all aspects of real estate and construction projects in Vietnam.')],
        pillars: [
          { title: tx('Am hiểu ngành', 'Industry focus'), text: tx('Tư vấn mọi khía cạnh của dự án bất động sản và xây dựng tại Việt Nam.', 'Comprehensive legal advice across all aspects of real estate and construction projects in Vietnam.') },
          { title: tx('Hỗ trợ trọn vòng đời dự án', 'End-to-end support'), text: tx('Từ tiếp cận đất đai, cấu trúc dự án đến xây dựng, vận hành và giao dịch.', 'From land acquisition and project structuring to construction, operations and transactions, we support clients at every stage.') },
          { title: tx('Thực tế & thương mại', 'Pragmatic & commercial'), text: tx('Giải pháp thực tế, theo mục tiêu thương mại, giúp giảm rủi ro và đạt mục tiêu dự án.', 'Our solutions are practical, commercially driven and tailored to help clients mitigate risks and achieve project objectives.') },
        ],
        services: [
          { title: tx('Tiếp cận đất đai & quyền sử dụng đất', 'Land acquisition & use rights'), text: tx('Thẩm định đất đai, quyền sử dụng đất, giải phóng mặt bằng và thủ tục đất đai.', 'Advising on land due diligence, land use rights, site clearance and land-related procedures.') },
          { title: tx('Cấu trúc & phát triển dự án', 'Project structuring & development'), text: tx('Cấu trúc dự án, phương tiện đầu tư và liên doanh tối ưu về pháp lý và thuế.', 'Structuring real estate projects, investment vehicles and joint ventures for optimal legal and tax efficiency.') },
          { title: tx('Tuân thủ quy định', 'Regulatory & legal compliance'), text: tx('Tư vấn pháp luật áp dụng, giấy phép, phê duyệt và tuân thủ suốt vòng đời dự án.', 'Advising on applicable laws, permits, approvals and compliance throughout the project lifecycle.') },
          { title: tx('Xây dựng & hợp đồng', 'Construction & contracts'), text: tx('Soạn thảo, đàm phán hợp đồng xây dựng và hỗ trợ quản lý hợp đồng.', 'Drafting and negotiating construction contracts and supporting contract management.') },
          { title: tx('Giao dịch & tài chính bất động sản', 'Real estate transactions & financing'), text: tx('Hỗ trợ M&A, mua tài sản, cho thuê, mua bán và giao dịch tài chính.', 'Supporting M&A, asset acquisitions, leasing, sales and financing transactions.') },
          { title: tx('Vận hành & quản lý tranh chấp', 'Operations & dispute management'), text: tx('Tư vấn vận hành bất động sản, phòng ngừa và giải quyết tranh chấp liên quan dự án.', 'Advising on property operations, dispute prevention and resolution related to real estate projects.') },
        ],
        strengths: [
          { title: tx('Hiểu biết ngành', 'Industry knowledge'), text: tx('Am hiểu môi trường pháp lý bất động sản và xây dựng tại Việt Nam.', 'In-depth understanding of Vietnam’s real estate and construction regulatory environment.') },
          { title: tx('Đội ngũ liên ngành', 'Cross-functional team'), text: tx('Luật sư về doanh nghiệp, đầu tư, xây dựng, tài chính và tranh chấp.', 'Lawyers with expertise in corporate, investment, construction, finance and dispute resolution.') },
          { title: tx('Lấy khách hàng làm trọng tâm', 'Client-centric approach'), text: tx('Giải pháp thực tế, tối đa giá trị và thành công lâu dài.', 'Practical solutions that maximize value and support long-term business success.') },
        ],
      },
    },
    {
      id: 'ip', slug: tx('so-huu-tri-tue-cong-nghe', 'intellectual-property-technology'), icon: 'bulb',
      title: tx('Sở hữu trí tuệ & công nghệ', 'Intellectual Property & Technology'),
      short: tx('Nhãn hiệu, sáng chế, chuyển giao công nghệ, bảo vệ dữ liệu và thực thi quyền.', 'Trademarks, patents, technology transfer, data protection and enforcement.'),
      detail: {
        tagline: tx('Bảo vệ đổi mới. Tạo ra giá trị. Thúc đẩy tăng trưởng.', 'Protecting innovation. Creating value. Enabling business growth.'),
        intro: [tx('Chúng tôi giúp doanh nghiệp nhận diện, bảo hộ và khai thác tài sản trí tuệ để tạo lợi thế cạnh tranh.', 'We help businesses identify, protect and leverage their intellectual property assets to create competitive advantage.')],
        pillars: [
          { title: tx('Tư vấn chiến lược SHTT', 'Strategic IP advisory'), text: tx('Nhận diện, bảo hộ và khai thác tài sản trí tuệ để tạo lợi thế cạnh tranh.', 'Identify, protect and leverage intellectual property assets to create competitive advantage.') },
          { title: tx('Dịch vụ SHTT trọn gói', 'Comprehensive IP services'), text: tx('Từ đăng ký, thực thi, chuyển giao đến thương mại hoá.', 'End-to-end IP solutions across registration, enforcement, licensing and commercialization.') },
          { title: tx('Thương mại & thực tế', 'Commercial & practical approach'), text: tx('Gắn bảo hộ SHTT với mục tiêu kinh doanh và chiến lược đổi mới của bạn.', 'Business-oriented advice that aligns IP protection with your commercial objectives and innovation strategy.') },
        ],
        services: [
          { title: tx('Chiến lược & quản lý danh mục SHTT', 'IP strategy & portfolio management'), text: tx('Xây dựng và quản lý chiến lược SHTT để bảo vệ đổi mới và mục tiêu kinh doanh.', 'Develop and manage IP strategies to protect innovation and support business objectives.') },
          { title: tx('Nhãn hiệu', 'Trademark services'), text: tx('Đăng ký, phản đối, gia hạn và quản lý danh mục nhãn hiệu.', 'Registration, opposition, renewal and portfolio management for trademarks.') },
          { title: tx('Sáng chế', 'Patent services'), text: tx('Tra cứu, nộp đơn, theo đuổi đơn và quản lý danh mục sáng chế.', 'Patent search, filing, prosecution and portfolio management for inventions.') },
          { title: tx('Chuyển giao & thương mại hoá', 'IP licensing & commercialization'), text: tx('Soạn thảo, đàm phán hợp đồng li-xăng, chuyển nhượng SHTT và chuyển giao công nghệ.', 'Drafting and negotiating IP licensing, assignment and technology transfer agreements.') },
          { title: tx('Thực thi & tranh chấp SHTT', 'IP enforcement & dispute resolution'), text: tx('Thực thi quyền, phản đối, huỷ bỏ hiệu lực và giải quyết tranh chấp để bảo vệ quyền SHTT.', 'Enforcement, opposition, invalidation and dispute resolution to protect your IP rights.') },
          { title: tx('Công nghệ & bảo vệ dữ liệu', 'Technology & data protection'), text: tx('Bảo vệ dữ liệu, phần mềm, tên miền, li-xăng và các vấn đề pháp lý về công nghệ.', 'Advising on data protection, software, domains, licensing and technology-related legal matters.') },
        ],
        strengths: [
          { title: tx('Chuyên môn SHTT', 'IP expertise'), text: tx('Am hiểu pháp luật SHTT và thông lệ quốc tế.', 'Deep knowledge of IP laws, regulations and global best practices.') },
          { title: tx('Góc nhìn quốc tế', 'Global perspective'), text: tx('Kinh nghiệm làm việc với khách hàng quốc tế thuộc nhiều ngành.', 'Experience working with international clients across diverse industries.') },
          { title: tx('Hướng tới kinh doanh', 'Business focused'), text: tx('Bảo vệ tài sản trí tuệ và thúc đẩy thành công lâu dài.', 'Solutions that protect your IP and drive long-term business success.') },
        ],
      },
    },
    {
      id: 'tax', slug: tx('thue-hai-quan', 'tax-customs'), icon: 'percent',
      title: tx('Thuế & hải quan', 'Tax & Customs'),
      short: tx('Thuế doanh nghiệp, GTGT, TNCN, thuế quốc tế, hải quan và hỗ trợ thanh tra, kiểm tra.', 'Corporate tax, VAT, personal income tax, international tax, customs and audit support.'),
      detail: {
        tagline: tx('Giải pháp thực tế. Bảo đảm tuân thủ. Tối ưu giá trị.', 'Practical solutions. Compliance assurance. Value optimization.'),
        intro: [tx('Chúng tôi tư vấn thuế trọn gói: thuế thu nhập doanh nghiệp, thuế giá trị gia tăng, thuế thu nhập cá nhân và các vấn đề thuế quốc tế.', 'We provide end-to-end tax advisory services covering corporate tax, VAT, personal income tax and international tax matters.')],
        pillars: [
          { title: tx('Tư vấn thuế toàn diện', 'Comprehensive tax advisory'), text: tx('Thuế doanh nghiệp, GTGT, thu nhập cá nhân và thuế quốc tế.', 'End-to-end tax advisory covering corporate tax, VAT, personal income tax and international tax matters.') },
          { title: tx('Hải quan & thương mại', 'Customs & trade advisory'), text: tx('Tuân thủ hải quan, thủ tục xuất nhập khẩu và các vấn đề thương mại để vận hành trơn tru.', 'Customs compliance, import-export procedures and trade-related matters to ensure smooth and efficient operations.') },
          { title: tx('Quản trị rủi ro & tối ưu', 'Risk management & optimization'), text: tx('Quản lý rủi ro thuế, hải quan, bảo đảm tuân thủ và tìm cơ hội tối ưu chi phí.', 'We help clients manage tax and customs risks, ensure compliance and identify opportunities for tax efficiency and cost optimization.') },
        ],
        services: [
          { title: tx('Thuế thu nhập doanh nghiệp', 'Corporate tax advisory'), text: tx('Hoạch định thuế, cấu trúc giao dịch và tuân thủ để tối ưu hiệu quả kinh doanh.', 'Advising on tax planning, transaction structuring and compliance to optimize business efficiency.') },
          { title: tx('Thuế GTGT', 'VAT advisory & compliance'), text: tx('Đăng ký, hoàn thuế, rà soát tuân thủ và giải quyết vướng mắc với cơ quan thuế.', 'Supporting VAT registration, refunds, compliance reviews and dispute resolution with tax authorities.') },
          { title: tx('Thuế thu nhập cá nhân', 'Personal income tax advisory'), text: tx('Tư vấn người nước ngoài và cá nhân về tuân thủ, hoạch định và nghĩa vụ thuế tại Việt Nam.', 'Advising expatriates and individuals on PIT compliance, planning and tax obligations in Vietnam.') },
          { title: tx('Thuế quốc tế', 'International tax advisory'), text: tx('Giao dịch xuyên biên giới, chuyển giá và hiệp định tránh đánh thuế hai lần.', 'Providing solutions for cross-border transactions, transfer pricing and tax treaty considerations.') },
          { title: tx('Hải quan', 'Customs advisory & compliance'), text: tx('Phân loại HS, thủ tục hải quan, quy tắc xuất xứ và tuân thủ hải quan.', 'Advising on HS classification, customs procedures, origin rules and customs compliance requirements.') },
          { title: tx('Hỗ trợ thanh tra, kiểm tra thuế & hải quan', 'Tax & customs audit support'), text: tx('Đồng hành trong thanh tra, kiểm tra và đại diện làm việc với cơ quan thuế, hải quan.', 'Assisting clients in tax and customs audits, reviews and representation before tax and customs authorities.') },
        ],
        strengths: [
          { title: tx('Chuyên môn thuế', 'Tax expertise'), text: tx('Am hiểu pháp luật thuế Việt Nam và thông lệ quốc tế.', 'In-depth knowledge of Vietnamese tax laws, regulations and international tax practices.') },
          { title: tx('Giải pháp thực tế', 'Practical solutions'), text: tx('Tuân thủ đồng thời tối ưu vị thế thuế và dòng tiền.', 'Business-oriented advice that ensures compliance while optimizing tax positions and cash flow.') },
          { title: tx('Lấy khách hàng làm trọng tâm', 'Client focused'), text: tx('Giải pháp phù hợp, giảm rủi ro, hỗ trợ tăng trưởng bền vững.', 'Tailored solutions that minimize risks and support sustainable business growth.') },
        ],
      },
    },
    {
      id: 'banking', slug: tx('ngan-hang-tai-chinh', 'banking-finance'), icon: 'bank',
      title: tx('Ngân hàng & tài chính', 'Banking & Finance'),
      short: tx('Hỗ trợ tổ chức tài chính, bên cho vay và bên vay trong giao dịch tài chính và vấn đề pháp lý chuyên ngành.', 'Supporting financial institutions, lenders and borrowers in financing transactions and regulatory matters.'),
    },
    {
      id: 'energy', slug: tx('nang-luong-khoang-san-ha-tang', 'energy-mining-infrastructure'), icon: 'bolt',
      title: tx('Năng lượng, khoáng sản & hạ tầng', 'Energy, Mining & Infrastructure'),
      short: tx('Tư vấn phát triển dự án, cấp phép, cấu trúc đầu tư và tuân thủ quy định.', 'Advising on project development, licensing, investment structures and regulatory compliance.'),
    },
  ] as Area[],

  team: {
    intro: [
      tx('NP Legal quy tụ luật sư và chuyên gia có kinh nghiệm đa dạng về đầu tư nước ngoài, tư vấn doanh nghiệp, tuân thủ, M&A và giải quyết tranh chấp.', 'NP Legal brings together lawyers and professionals with diverse experience in foreign investment, corporate advisory, compliance, mergers & acquisitions and dispute resolution.'),
      tx('Chúng tôi cam kết tư vấn chiến lược, hiệu quả và kịp thời, giúp khách hàng tự tin vượt qua các thách thức pháp lý và kinh doanh phức tạp.', 'We are committed to providing strategic, effective and timely advice that helps our clients navigate complex legal and business challenges with confidence.'),
    ],
    people: [
      { name: tx('Phạm Đình Thế', 'Pham Dinh The'), role: tx('Luật sư điều hành', 'Managing Partner'), photo: 'img/team/the.jpg',
        creds: ['hluLLB', 'hluLLM', 'vbf', 'hba'] },
      { name: tx('Nguyễn Văn Thương', 'Nguyen Van Thuong'), role: tx('Luật sư thành viên', 'Partner'), photo: 'img/team/thuong.jpg',
        creds: ['hcmLLB', 'fribourgLLM', 'vbf', 'hba'] },
      { name: tx('Trần Thị Liên', 'Tran Thi Lien'), role: tx('Luật sư thành viên', 'Partner'), photo: 'img/team/lien.jpg',
        creds: ['hluLLB', 'hluLLM', 'vbf', 'hba'],
        bio: tx('Luật sư Trần Thị Liên am hiểu sâu và có nhiều kinh nghiệm về pháp lý doanh nghiệp. Bà đã tham gia nhiều vụ việc tại Toà án và Trọng tài về tranh chấp hợp đồng xây dựng, hợp đồng mua bán, hợp đồng dịch vụ, hợp đồng bảo hiểm, tranh chấp đất đai và hành chính.',
          'Mrs. Tran Thi Lien has in-depth knowledge and extensive experience in corporate legal issues. She has participated in many lawsuits at court and arbitration regarding disputes in construction contracts, sales contracts, service contracts and insurance contracts, as well as land and administrative disputes.') },
      { name: tx('Phùng Văn Trường', 'Phung Van Truong'), role: tx('Chuyên gia pháp lý cấp cao', 'Senior Legal Advisor'), photo: 'img/team/truong.jpg',
        creds: ['hluLLB', 'vnuLLM', 'hluPhD'] },
      { name: tx('Nguyễn Huy Hoàng', 'Nguyen Huy Hoang'), role: tx('Chuyên gia pháp lý cấp cao', 'Senior Legal Advisor'), photo: 'img/team/hoang.jpg',
        creds: ['hluLLB', 'hluLLM'],
        bio: tx('Ông Nguyễn Huy Hoàng có nhiều năm hỗ trợ doanh nghiệp, cá nhân và tổ chức về pháp lý, cả tư vấn lẫn đại diện trong và ngoài tố tụng. Ông còn là đầu mối tin cậy cho các dịch vụ công chứng (Văn phòng công chứng) và lập vi bằng (Thừa phát lại) phục vụ giải quyết vụ việc và hỗ trợ đương sự.',
          'Mr. Nguyen Huy Hoang has several years of experience supporting businesses, individuals and other organizations on legal issues, in both consulting and representation in and out of litigation. He is also a trusted member of the team for services related to notarization (Notary Office) and document preparation (Bailiff) to resolve legal issues and support litigants.') },
      { name: tx('Trịnh Minh Đức', 'Trinh Minh Duc'), role: tx('Chuyên gia pháp lý cấp cao', 'Senior Legal Advisor'), photo: 'img/team/duc.jpg',
        creds: ['hluLLB'],
        bio: tx('Ông Trịnh Minh Đức có nhiều năm hỗ trợ doanh nghiệp, cá nhân và tổ chức tại Nhật Bản. Ông có kinh nghiệm tư vấn pháp lý (doanh nghiệp, đầu tư, lao động, bất động sản) và giải quyết tranh chấp trong và ngoài tố tụng tại Việt Nam.',
          'Mr. Trinh Minh Duc has several years of experience supporting businesses, individuals and other organizations in Japan. He is also skilled in legal consulting (enterprise, investment, labor, real estate) and in litigation and dispute resolution inside and outside of court in Vietnam.') },
      { name: tx('Hà Thiên Thu', 'Ha Thien Thu'), role: tx('Luật sư cộng sự', 'Associate'), photo: 'img/team/thu.jpg',
        creds: ['hluLLB', 'hluLLM', 'vbf', 'hba'] },
      { name: tx('Phạm Hiền', 'Pham Hien'), role: tx('Chuyên viên pháp lý', 'Legal Advisor'), photo: 'img/team/hien.jpg',
        creds: ['nagoya'],
        bio: tx('Bà Phạm Hiền có nhiều năm làm việc tại doanh nghiệp nước ngoài và các công ty lớn ở Nhật Bản và Việt Nam, giàu kinh nghiệm tư vấn đầu tư nước ngoài, giao dịch mua bán và sáp nhập (M&A), thuế và thương mại điện tử xuyên biên giới.',
          'Ms. Pham Hien has several years of experience at foreign businesses and leading companies in Japan and Vietnam. She has extensive experience in foreign investment consulting, mergers and acquisitions (M&A), taxes and cross-border e-commerce.') },
    ] as { name: Tx; role: Tx; photo: string; creds: string[]; bio?: Tx }[],
  },

  /** Bằng cấp/hội nghề nghiệp dùng chung cho thẻ luật sư. */
  creds: {
    hluLLB: tx('Cử nhân Luật, Đại học Luật Hà Nội', 'LL.B, Hanoi Law University'),
    hluLLM: tx('Thạc sĩ Luật, Đại học Luật Hà Nội', 'LL.M, Hanoi Law University'),
    hluPhD: tx('Nghiên cứu sinh, Đại học Luật Hà Nội', 'Doctoral candidate, Hanoi Law University'),
    hcmLLB: tx('Cử nhân Luật, Đại học Luật TP. Hồ Chí Minh', 'LL.B, Ho Chi Minh City University of Law'),
    fribourgLLM: tx('Thạc sĩ Luật, Đại học Fribourg (Thuỵ Sĩ)', 'LL.M, University of Fribourg, Switzerland'),
    vnuLLM: tx('Thạc sĩ Luật, Khoa Luật – ĐHQG Hà Nội', 'LL.M, VNU School of Law, Hanoi'),
    nagoya: tx('Đại học Kinh tế Nagoya (Nhật Bản)', 'Nagoya University of Economics, Japan'),
    vbf: tx('Thành viên Liên đoàn Luật sư Việt Nam', 'Member, Vietnam Bar Federation'),
    hba: tx('Thành viên Đoàn Luật sư TP. Hà Nội', 'Member, Hanoi Bar Association'),
  } as Record<string, Tx>,

  /**
   * Ấn phẩm & cập nhật pháp luật. Danh sách trống → ẩn cả mục trên trang chủ và mục "Ấn phẩm" trên menu.
   * Mẫu (bỏ comment và thay bằng bài thật; KHÔNG ghi số hiệu văn bản hay ngày ban hành chưa kiểm):
   *   { date: '2026-11-01', area: 'fdi', title: tx('Nghị định mới về đầu tư nước ngoài: điểm cần lưu ý', 'New decree on foreign investment: key points'),
   *     text: tx('Tóm tắt một câu.', 'One-sentence summary.'), href: '' },
   *   { date: '2026-10-01', area: 'tax', title: tx('Thay đổi về thuế thu nhập doanh nghiệp: doanh nghiệp FDI cần chuẩn bị gì', 'Corporate income tax changes: what FDI companies should prepare'),
   *     text: tx('Tóm tắt một câu.', 'One-sentence summary.'), href: '' },
   *   { date: '2026-09-01', area: 'compliance', title: tx('Bảo vệ dữ liệu cá nhân: nghĩa vụ của doanh nghiệp có vốn nước ngoài', 'Personal data protection: obligations for foreign-invested companies'),
   *     text: tx('Tóm tắt một câu.', 'One-sentence summary.'), href: '' },
   */
  publications: [] as { date: string; area: string; title: Tx; text: Tx; href: string }[],

  contact: {
    lead: tx('Chúng tôi sẵn sàng hỗ trợ doanh nghiệp của bạn bằng giải pháp pháp lý thực tế và hiệu quả.', 'We are ready to support your business with practical and effective legal solutions.'),
  },
};

export type Site = typeof site;
