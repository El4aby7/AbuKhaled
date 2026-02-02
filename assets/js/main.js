document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initReservationForm();
    initGuestSelector();
    initAddToOrder();
});

function initMobileMenu() {
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (openBtn && menu) {
        openBtn.addEventListener('click', () => {
            menu.classList.remove('translate-x-full');
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
        });
    }

    // Close menu when clicking outside (optional, but good UX) or on a link
    if (menu) {
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('translate-x-full');
            });
        });
    }
}

function initReservationForm() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation check
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Simulate API call
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button:last-of-type');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('Reservation successful! We look forward to seeing you.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

        }, 1500);
    });
}

function initGuestSelector() {
    const guestBtns = document.querySelectorAll('.guest-btn');
    if (guestBtns.length === 0) return;

    guestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            guestBtns.forEach(b => {
                b.classList.remove('bg-primary', 'border-primary', 'text-black', 'font-bold', 'shadow-lg');
                b.classList.add('bg-white', 'dark:bg-[#221f10]', 'text-[#181711]', 'dark:text-white', 'font-medium');
                // Remove specific shadow if applied inline or via class logic in HTML
            });

            // Add active class to clicked
            btn.classList.remove('bg-white', 'dark:bg-[#221f10]', 'text-[#181711]', 'dark:text-white', 'font-medium');
            btn.classList.add('bg-primary', 'border-primary', 'text-black', 'font-bold', 'shadow-lg');
        });
    });
}

function initAddToOrder() {
    const buttons = document.querySelectorAll('.add-to-order-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Animation feedback
            const originalText = this.innerText;
            this.innerText = 'Added!';
            this.classList.add('bg-green-500', 'text-white');

            showToast('Item added to your order');

            setTimeout(() => {
                this.innerText = originalText;
                this.classList.remove('bg-green-500', 'text-white');
            }, 2000);
        });
    });
}

function showToast(message) {
    // Check if toast container exists
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-2';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'bg-deep-brown dark:bg-white text-white dark:text-deep-brown px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2';
    toast.innerHTML = `<span class="material-symbols-outlined text-primary">check_circle</span> ${message}`;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-10');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
