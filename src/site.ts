// ===== THÔNG TIN CÔNG TY – sửa file này là đổi nội dung toàn trang =====
// Các giá trị dưới đây là MẪU. Thay bằng thông tin thật trước khi đưa web ra ngoài.

export const site = {
  /** Tên đầy đủ (hiện ở đầu trang, chân trang, tiêu đề tab). */
  name: 'Công ty Luật Mẫu',
  /** Tên ngắn trên thanh menu. */
  shortName: 'Luật Mẫu',
  /** Một câu giới thiệu ngắn dưới tên. */
  tagline: 'Tư vấn và tranh tụng cho doanh nghiệp, gia đình và cá nhân.',
  /** Mô tả cho Google và khi chia sẻ link (khoảng 150 ký tự). */
  description: 'Công ty Luật Mẫu: tư vấn doanh nghiệp, đất đai, hôn nhân gia đình, lao động, tranh tụng tại toà. Đặt lịch tư vấn qua điện thoại, Zalo hoặc email.',
  /** Địa chỉ web chính thức (tên miền của bạn, có / ở cuối). Dùng cho sitemap và thẻ chia sẻ. */
  url: 'https://www.ten-mien-cua-ban.vn/',

  phone: '0900 000 000',
  /** Số Zalo (chỉ chữ số). Để trống '' nếu không dùng. */
  zalo: '0900000000',
  email: 'lienhe@ten-mien-cua-ban.vn',
  address: 'Số 1 Đường Mẫu, Phường Mẫu, Quận Mẫu, Hà Nội',
  hours: 'Thứ 2 – Thứ 6: 8:00 – 17:30 · Thứ 7: 8:00 – 12:00',
  /** Link nhúng Google Maps: Google Maps → Chia sẻ → Nhúng bản đồ → lấy phần src="…". Để trống thì ẩn bản đồ. */
  mapEmbed: '',

  /** Thông tin pháp lý ở chân trang (theo Luật Luật sư, nên ghi rõ). */
  legal: {
    license: 'Giấy đăng ký hoạt động số …… do Sở Tư pháp …… cấp ngày ……',
    bar: 'Thành viên Đoàn Luật sư thành phố ……',
    representative: 'Luật sư …… – Giám đốc',
  },

  /**
   * Gửi form liên hệ về email mà không cần máy chủ (miễn phí):
   * - Web3Forms: lấy access key tại web3forms.com (250 thư/tháng) → điền vào `web3formsKey`.
   * - Hoặc Formspree: tạo form tại formspree.io (50 thư/tháng) → điền URL vào `formEndpoint`.
   * Để trống cả hai: nút Gửi mở ứng dụng email của khách với nội dung đã điền sẵn.
   */
  web3formsKey: '',
  formEndpoint: '',

  practiceAreas: [
    { title: 'Doanh nghiệp & đầu tư', text: 'Thành lập, tái cấu trúc, góp vốn, M&A, hợp đồng thương mại, tuân thủ pháp luật cho doanh nghiệp.' },
    { title: 'Đất đai & bất động sản', text: 'Thủ tục cấp sổ, chuyển nhượng, thừa kế quyền sử dụng đất, rà soát pháp lý dự án, tranh chấp đất đai.' },
    { title: 'Hôn nhân & gia đình', text: 'Ly hôn thuận tình và đơn phương, chia tài sản chung, quyền nuôi con, cấp dưỡng, thoả thuận tài sản.' },
    { title: 'Lao động', text: 'Hợp đồng lao động, nội quy, kỷ luật, chấm dứt hợp đồng, bảo hiểm xã hội, tranh chấp lao động.' },
    { title: 'Tranh tụng dân sự – thương mại', text: 'Đại diện, bảo vệ quyền lợi tại toà án và trọng tài; thu hồi nợ; thi hành án.' },
    { title: 'Hình sự', text: 'Bào chữa, bảo vệ quyền lợi bị hại, tư vấn trong giai đoạn điều tra, truy tố, xét xử.' },
  ],

  /** Quy trình làm việc với khách – hiện thành các bước đánh số. */
  steps: [
    { title: 'Tiếp nhận', text: 'Khách gọi, nhắn Zalo hoặc gửi form. Chúng tôi phản hồi trong giờ làm việc.' },
    { title: 'Tư vấn ban đầu', text: 'Nghe vụ việc, xem giấy tờ, nêu hướng xử lý và rủi ro chính.' },
    { title: 'Báo phí & ký hợp đồng dịch vụ', text: 'Báo phí rõ ràng theo phạm vi công việc trước khi bắt đầu.' },
    { title: 'Thực hiện & cập nhật', text: 'Luật sư phụ trách làm việc và báo tiến độ định kỳ cho khách.' },
  ],

  team: [
    { name: 'Luật sư Nguyễn Văn A', role: 'Giám đốc · Luật sư điều hành', text: 'Hơn 15 năm hành nghề, chuyên doanh nghiệp và tranh tụng thương mại.' },
    { name: 'Luật sư Trần Thị B', role: 'Luật sư thành viên', text: 'Chuyên hôn nhân gia đình và đất đai.' },
    { name: 'Luật sư Lê Văn C', role: 'Luật sư', text: 'Chuyên lao động và hình sự.' },
  ],

  faq: [
    { q: 'Tư vấn lần đầu có mất phí không?', a: 'Sửa câu trả lời này theo chính sách của công ty (ví dụ: tư vấn qua điện thoại 15 phút đầu miễn phí).' },
    { q: 'Tôi cần chuẩn bị gì khi đến gặp luật sư?', a: 'Giấy tờ tuỳ thân và các giấy tờ liên quan đến vụ việc (hợp đồng, giấy chứng nhận, tin nhắn, biên bản…). Bản chụp cũng được.' },
    { q: 'Thông tin của tôi có được giữ bí mật không?', a: 'Có. Luật sư có nghĩa vụ giữ bí mật thông tin của khách hàng theo Luật Luật sư.' },
    { q: 'Công ty có nhận vụ việc ở tỉnh khác không?', a: 'Sửa câu trả lời này theo phạm vi hoạt động thực tế của công ty.' },
  ],
};

export type Site = typeof site;
