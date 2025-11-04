// ==========================================================
// File: js/data-service.js
// Fungsi: Semua interaksi langsung dengan Firestore
// ==========================================================

const dataService = {
    // --- CRUD NILAI ---
    simpanData: async (dataObj) => {
        return await db.collection(COLLECTION_NILAI).add(dataObj);
    },
    loadSemuaNilai: async () => {
        return await db.collection(COLLECTION_NILAI).orderBy('timestamp', 'desc').get();
    },
    loadNilaiDashboard: async (limit) => {
        return await db.collection(COLLECTION_NILAI).orderBy('timestamp', 'desc').limit(limit).get();
    },
    hapusDokumen: async (collectionName, docId) => {
        return await db.collection(collectionName).doc(docId).delete();
    },

    // --- CRUD MAHASISWA ---
    simpanMahasiswa: async (data) => {
        // Menggunakan NIM sebagai ID dokumen
        return await db.collection(COLLECTION_MAHASISWA).doc(data.nim).set(data);
    },
    loadSemuaMahasiswa: async () => {
        return await db.collection(COLLECTION_MAHASISWA).orderBy('nama', 'asc').get();
    },
    loadMahasiswaByNim: async (nim) => {
        const doc = await db.collection(COLLECTION_MAHASISWA).doc(nim).get();
        return doc.exists ? doc.data() : null;
    },

    // --- CRUD MATA KULIAH ---
    simpanMK: async (data) => {
        // Menggunakan Kode MK sebagai ID dokumen
        return await db.collection(COLLECTION_MK).doc(data.kode_mk).set(data);
    },
    loadSemuaMK: async () => {
        // Urutkan sesuai Abjad (asc)
        return await db.collection(COLLECTION_MK).orderBy('nama_mk', 'asc').get();
    },
    
    // --- PENCARIAN & STATISTIK ---
    getTotalDokumen: async (collectionName) => {
        const snapshot = await db.collection(collectionName).get();
        return snapshot.size;
    },
    cariDataNilai: async (keyword) => {
         // Query yang kompleks, kita hanya akan melakukan filter di sisi klien setelah loadSemuaNilai 
         // untuk menghindari pengindeksan Firestore yang rumit di code lab
         return dataService.loadSemuaNilai();
    }
};