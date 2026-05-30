-- 1. Buat Dummy Users (Agar ID 1, 2, dan 3 tersedia untuk relasi)
INSERT INTO users (id, name, username, email, provider, created_at, updated_at) VALUES
(1, 'Alpraditia Malik', 'alpraditia', 'alpra@test.com', 'email', NOW(), NOW()),
(2, 'Reza Atikasari', 'reza_atksr', 'reza@test.com', 'email', NOW(), NOW()),
(3, 'Budi Santoso', 'budisantoso', 'budi@test.com', 'email', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Buat Dummy Posts dengan topik bervariasi (Gaya Quora)
INSERT INTO posts (user_id, content, image_url, created_at, updated_at) VALUES
(1, 'Saya sebelum baca buku: Goblog, ga pede, miskin, gampang emosian. Setelah baca buku jadi lebih terarah. Apa pendapat kalian soal membaca di tahun 2026 ini?', 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', NOW(), NOW()),
(2, 'Ada yang punya rekomendasi warkop atau cafe yang enak buat nugas sampai malam di sekitaran Pontianak? Yang wifinya kenceng ya!', NULL, NOW(), NOW()),
(3, 'Menurut kalian, apakah umur 25 tahun sudah terlalu terlambat untuk mengubah jalur karir secara drastis?', NULL, NOW(), NOW()),
(2, 'Mahasiswa jurusan Sistem Informasi mending beli laptop Windows atau MacBook ya? Mohon sarannya untuk pemakaian jangka panjang.', NULL, NOW(), NOW()),
(1, 'Apa life hack paling sederhana namun sangat mengubah hidup yang kalian pelajari dari internet?', NULL, NOW(), NOW());