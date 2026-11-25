# Website NP Legal

Website giới thiệu công ty luật NP Legal, song ngữ Việt/Anh, dựng theo hồ sơ năng lực (xanh rừng, nâu đồng, logo NP LEGAL). Không cần đăng nhập, không cần máy chủ.
Vite + React + TypeScript; khi build, mỗi trang được dựng sẵn thành một file HTML riêng để Google và Zalo/Facebook đọc được:

- Trang chủ: `/` (tiếng Việt) và `/en/` (tiếng Anh).
- 7 trang lĩnh vực: `/linh-vuc/<slug>/` và `/en/practice/<slug>/`.
- Cùng với `404.html`, `sitemap.xml` (có hreflang vi/en) và `robots.txt`.
Host trên GitHub Pages, build bằng GitHub Actions mỗi lần push nhánh `master`.

## Sửa nội dung

Nội dung nằm ở các file sau:

- **`src/site.ts`**: liên hệ, số liệu, giới thiệu, thông điệp, 10 lĩnh vực (lĩnh vực nào có `detail` thì có trang riêng), đội ngũ. Mỗi đoạn chữ có cả `vi` và `en`.
- `src/ui.ts`: chữ cố định của menu, nút và form.
- `public/img/`: ảnh. Ảnh đội ngũ ở `team/`, đặt cùng tên file để thay.
- Đầu `src/styles.css`: màu và font.

**Ấn phẩm** (`publications` trong `src/site.ts`): danh sách trống thì ẩn cả mục trên trang chủ lẫn mục "Ấn phẩm" trên menu. ⚠ Nhánh `redesign` đang có 3 bài tiêu đề "[MẪU]" chỉ để duyệt bố cục: phải đặt lại `publications: []` (hoặc thay bằng bài thật) trước khi merge vào `master`. Không merge khi còn bài mẫu.

Mục giấy phép (`legal.license`) và mã số thuế (`legal.taxCode`) chỉ hiện ở chân trang khi đã điền.

### Ảnh hero

`public/img/hero.jpg` hiện là **ảnh tạm** (ảnh dọc 468×941, bị phóng to nên mờ ở màn hình lớn). Cần ảnh thật:

- Hà Nội lúc hoàng hôn, **khổ ngang, rộng ≥ 2400px**.
- Trời tối ở nửa trên; vùng trái-dưới ít chi tiết để đặt chữ.
- Xuất thêm bản rộng 1200px cho điện thoại, gắn vào thẻ `<img>` của hero qua `srcset` (trong `src/App.tsx`).

Sau khi thay: đo lại tương phản chữ trắng trên ảnh ở 900–1239px. Nếu đạt ≥ 4.5:1 thì hạ lớp tối tạm (`--hero-shade` trong khối `@media (min-width: 900px)` của `src/styles.css`, có ghi TODO) về giới hạn ban đầu: tối đa 60% ở góc có chữ, về 0% ở giữa ảnh. Dưới 900px chữ nằm trên nền tối riêng, không đè lên ảnh.

```bash
npm install
npm run dev       # xem thử ở http://localhost:5173
npm run build     # ra dist/ (giống bản GitHub Actions build)
```

## Đưa lên mạng

1. Tạo repo **công khai** trống trên GitHub (không tick README), ví dụ `lawweb`.
2. Push mã: `git remote add origin git@github.com:<tài-khoản>/lawweb.git && git push -u origin master`
3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Tab **Actions** chạy "Deploy Pages" (~1 phút) → web ở `https://<tài-khoản>.github.io/lawweb/`.

Từ đó mỗi lần sửa `src/site.ts` rồi push là web tự cập nhật.

## Gắn tên miền riêng

1. Repo → **Settings → Pages → Custom domain**: nhập `www.ten-mien.vn` → Save.
2. Ở nơi quản lý DNS của tên miền:
   - `www` → bản ghi **CNAME** trỏ `<tài-khoản>.github.io`
   - tên miền gốc `@` → 4 bản ghi **A**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Chờ DNS cập nhật (vài phút đến vài giờ), quay lại trang Pages tick **Enforce HTTPS**.
4. Kiểm tra `url` trong `src/site.ts` (đang là `https://www.nplegal.vn/`) (dùng cho sitemap và link chia sẻ) rồi push.

## Form liên hệ (không cần máy chủ)

Mặc định nút "Gửi yêu cầu tư vấn" mở ứng dụng email của khách với nội dung điền sẵn.
Muốn thư về thẳng hộp mail công ty: đăng ký **Web3Forms** (web3forms.com, nhập email công ty → nhận access key, 250 thư/tháng)
rồi điền vào `web3formsKey` trong `src/site.ts`. Hoặc dùng Formspree (`formEndpoint`).

## Đưa lên Google

Sau khi có tên miền: vào Google Search Console → thêm tên miền → gửi `sitemap.xml`. Tạo thêm hồ sơ **Google Business Profile** (miễn phí) để hiện trên Google Maps.

## Lưu ý

- GitHub Pages gói free yêu cầu repo công khai (ai cũng xem được mã nguồn và nội dung). Đừng để mật khẩu hay thông tin khách hàng trong repo.
- Nội dung quảng cáo dịch vụ luật sư cần tuân thủ Luật Luật sư và Quy tắc đạo đức nghề nghiệp luật sư (không cam kết kết quả, không tự nhận "tốt nhất").
