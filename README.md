# PPWL 11 AWS Teams 
## Kelas A / Tim 2
| Nama | NIM | Job |
|------|-----|-----|
| Arjun Maheswara Paundra  | H1101241029 | Admin                  |
| Aurellya Yocelyn Prasista| H1101241043 | Budget & Cost          |
| Febryanti Khumairoh      | H1101241006 | RDS Database           |
| Marcello Chrisdiantoro   | H1101241041 | Lambda Backend         |
| Regisha Sheren           | H1101241036 | S3+CloudFront Frontend |
| Nadylla Ayu Wulandari    | H1101211051 | Test & Docs            |

## Canva - Arsitektur Diagram AWS
🔗 [Link Diagram Arsitektur (Canva Papan Tulis)](https://www.canva.com/design/DAHHkkjzpVo/-mjSpF-7zbASW614qKZORg/edit)  

### Screenshot wajib:
| Komponen | Screenshot | Status |
|----------|------------|--------|
| S3 Frontend         | [Lihat screenshot](https://drive.google.com/file/d/1IfpVUSgwierCJolv9xVsJN7nLzjlAzEN/view?usp=drive_link)    | ✅ |
| RDS Database        | [Lihat screenshot](https://drive.google.com/file/d/1dNLiLGlMa093Nx4OU6XjDHuH1JeH6BhL/view?usp=drive_link)    | ✅ |
| Parameter Store     | [Lihat screenshot](https://drive.google.com/file/d/1owiaWJ7nnJkCoIFntzFhTPX6QXNv6VMa/view?usp=drive_link)    | ✅ |
| Lambda Backend      | [Lihat screenshot](https://drive.google.com/file/d/1kQFUvlwCSZRXhIR3Dq6FerdQY5I4eRL_/view?usp=drive_link)    | ✅ |
| CloudFront Frontend | [Lihat screenshot](https://drive.google.com/file/d/1u8_v_CozoCgG1NBmI-wYVrHx01aHIygT/view?usp=drive_link)    | ✅ |
| Budget (Monthly)    | [Lihat screenshot](https://drive.google.com/file/d/1ZkkcupFEN7tkW6ocbO7UXCOZpFzms_TL/view?usp=drive_link)    | ✅ |
| Task Cost Report    | [Lihat screenshot](https://drive.google.com/file/d/1B3H3aWo-i78uOXRPBedd2BoupaVOzlbf/view?usp=drive_link)    | ✅ |

## Layanan Berjalan & Akses
| Layanan | URL / Endpoint | Status |
|---------|----------------|--------|
| Frontend (CloudFront) | `https://d1keblkrm5z9c0.cloudfront.net/`                                  | ✅ |
| Backend Lambda | `https://zn5qcppmk2j6kbxsckfmk72qvq0pravj.lambda-url.us-east-1.on.aws`           | ✅ |
| RDS PostgreSQL | `postgresql://postgres:tim2ppwl@monorepo-db.cy9qaey8u3kn.us-east-1.rds.amazonaws.com:5432/monorepo_prod` | ✅ |
| S3 Bucket (static) | ` http://s3-monorepo-frontend-blackpa.s3-website-us-east-1.amazonaws.com`    | ✅ |

## Report Bug
1. Akun AWS belum terverifikasi untuk membuat CloudFront

Lokasi: AWS Console → CloudFront → Create distribution

Alur sebelum bug:
Login akun kemudian mencoba membuat CloudFront distribution untuk frontend tapi setelah mengisi konfigurasi, muncul error verifikasi akun
[Pesan error: "Your account must be verified before you can add new CloudFront resources".](https://drive.google.com/file/d/1R2UHaVDd1BgIju-4fIjDkp0HrMkamNGU/view?usp=drive_link)

Solusi yang dicoba:
Membuka kasus ke AWS Support via Account and billing support kemudian menjelaskan bahwa ini untuk tugas kuliah dan menyertakan error message dan region yang digunakan (us-east-1).

Selain itu:
Meminta bantuan dari kelompok lain yang akun AWS-nya sudah terverifikasi untuk membuat CloudFront distribution.
Dari CloudFront itu semua request frontend ke backend Lambda menjadi HTTPS, CORS terselesaikan, dan aplikasi berjalan normal. 
1. [Tampilan Users CloudFront](https://drive.google.com/file/d/11njoKsbMJT_sNGDpsa9cvSizXhPKLTv3/view?usp=drive_link)  
2. [Tampilan Classroom CloudFront](https://drive.google.com/file/d/1dTY1YDYieEjsD3o915SgkMAhWlFDFDHK/view?usp=drive_link) 