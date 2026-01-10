import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ⚠️ CẤU HÌNH FIREBASE - BẠN CẦN THAY THẾ THÔNG TIN BÊN DƯỚI BẰNG PROJECT CỦA BẠN ⚠️
const firebaseConfig = {
    apiKey: "AIzaSyC0xMM9-ZxEDyX1YNUvX7h3uSDsSH91UC8",
    authDomain: "weding-ed87e.firebaseapp.com",
    projectId: "weding-ed87e",
    storageBucket: "weding-ed87e.firebasestorage.app",
    messagingSenderId: "131957037080",
    appId: "1:131957037080:web:f288b07704e656ae4b0b6d"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lấy form theo ID
const form = document.getElementById('ud06m37d');

if (form) {
    let isSubmitting = false;

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Ngăn việc load lại trang

        if (isSubmitting) return;
        isSubmitting = true;

        // UI handling: Show loading
        const submitBtnWrapper = document.getElementById('w-xsopczfj');
        let originalTextElement = null;
        let originalText = "";

        if (submitBtnWrapper) {
            const loader = submitBtnWrapper.querySelector('.button-loader');
            if (loader) loader.style.display = 'block';

            originalTextElement = submitBtnWrapper.querySelector('.button-text');
            if (originalTextElement) {
                originalText = originalTextElement.innerText;
                originalTextElement.innerText = "Đang gửi...";
            }
        }

        // Collect data
        const formData = new FormData(form);
        const data = {
            full_name: formData.get('full_name'),
            bancuadaure: formData.get('bancuadaure'),
            guiloichuc: formData.get('guiloichuc'),
            ban_se_tham_du_chu: formData.get('ban_se_tham_du_chu'),
            created_at: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, "wishes"), data);
            console.log("Document written with ID: ", docRef.id);

            // Show success popup
            const successPopup = document.getElementById('w-__popup_default__');
            if (successPopup) {
                // Sử dụng style trực tiếp để override class d-none nếu cần
                successPopup.classList.remove('d-none');
                successPopup.style.display = 'block';

                // Tự động ẩn sau 5s
                setTimeout(() => {
                    successPopup.classList.add('d-none');
                    successPopup.style.display = 'none';
                }, 5000);
            } else {
                // alert("Gửi lời chúc thành công! Cảm ơn bạn.");
            }

            form.reset();
        } catch (e) {
            console.error("Error adding document: ", e);
            // alert("Có lỗi xảy ra: " + e.message);
        } finally {
            isSubmitting = false;
            // UI handling: Hide loading
            if (submitBtnWrapper) {
                const loader = submitBtnWrapper.querySelector('.button-loader');
                if (loader) loader.style.display = 'none';

                if (originalTextElement) {
                    originalTextElement.innerText = originalText;
                }
            }
        }
    });

    const fakeButton = document.getElementById('w-xsopczfj');
    const realSubmitBtn = form.querySelector('button[type="submit"]');

    // Nếu click vào nút giả (div), ta kích hoạt nút submit thật
    if (fakeButton && realSubmitBtn) {
        fakeButton.addEventListener('click', () => {
            realSubmitBtn.click();
        });
    }
} else {
    console.error("Không tìm thấy form với ID ud06m37d");
}
