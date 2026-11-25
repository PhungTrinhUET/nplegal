# Website công ty luật

Trang giới thiệu một trang (lĩnh vực, quy trình, đội ngũ, hỏi đáp, liên hệ), không cần đăng nhập, không cần máy chủ.
Vite + React + TypeScript; khi build, nội dung được dựng sẵn thành HTML để Google và Zalo/Facebook đọc được.
Host miễn phí trên GitHub Pages, build bằng GitHub Actions mỗi lần push nhánh `master`.

## Sửa nội dung

Toàn bộ chữ nằm ở **`src/site.ts`**: tên công ty, điện thoại, Zalo, email, địa chỉ, giờ làm việc, lĩnh vực, quy trình, luật sư, hỏi đáp, thông tin giấy phép ở chân trang.
Giá trị hiện tại là **mẫu**, phải thay trước khi công khai. Màu và font ở đầu `src/styles.css`.

```bash
npm install
npm run dev       # xem thử ở http://localhost:5173
npm run build     # ra dist/ (giống bản GitHub Actions build)
```

## Đưa lên mạng (0 đồng)

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
4. Sửa `url` trong `src/site.ts` thành `https://www.ten-mien.vn/` (dùng cho sitemap và link chia sẻ) rồi push.

## Form liên hệ (miễn phí, không máy chủ)

Mặc định nút "Gửi yêu cầu tư vấn" mở ứng dụng email của khách với nội dung điền sẵn.
Muốn thư về thẳng hộp mail công ty: đăng ký **Web3Forms** (web3forms.com, nhập email công ty → nhận access key, 250 thư/tháng)
rồi điền vào `web3formsKey` trong `src/site.ts`. Hoặc dùng Formspree (`formEndpoint`).

## Đưa lên Google

Sau khi có tên miền: vào Google Search Console → thêm tên miền → gửi `sitemap.xml`. Tạo thêm hồ sơ **Google Business Profile** (miễn phí) để hiện trên Google Maps.

## Chi phí

| Phần | Dùng | Chi phí |
|---|---|---|
| Host + HTTPS | GitHub Pages | 0 đ |
| Build | GitHub Actions (repo công khai) | 0 đ |
| Form liên hệ | Web3Forms / Formspree gói free | 0 đ |
| Bản đồ | Google Maps nhúng (không cần API key) | 0 đ |
| Tên miền | đã có | phí gia hạn hằng năm |

Lưu ý: GitHub Pages gói free yêu cầu repo công khai (ai cũng xem được mã nguồn và nội dung). Đừng để mật khẩu hay thông tin khách hàng trong repo.
Nội dung quảng cáo dịch vụ luật sư cần tuân thủ Luật Luật sư và Quy tắc đạo đức nghề nghiệp luật sư (không cam kết kết quả, không tự nhận "tốt nhất").
