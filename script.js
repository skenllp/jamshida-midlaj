/**
 * Two Beginnings · One Blessed Celebration
 * Family Invitation Website Logic
 * Centralized Configuration & Production Interactions
 */

// ==========================================================================
// 1. CENTRALIZED EVENT CONFIGURATION
// ==========================================================================
const EVENT_CONFIG = {
    title: "Two Beginnings · One Blessed Celebration",
    event1: {
        type: "Marriage Ceremony (Nikah)",
        couple: "Jamshida & Midlaj",
        bride: "Jamshida (d/o Jabbar NV)",
        groom: "Midlaj (s/o late Ashraf NP)",
        date: "Saturday, 19 December 2026",
        time: "After Asr",
        venue: "Saraam Palli (Vatakara Srambi Mosque)",
        venueMalayalam: "വടകര സ്രാംപള്ളിയിൽ",
        mapsUrl: "https://maps.app.goo.gl/BkHGc2HMfjUfrfEw6?g_st=iw"
    },
    event2: {
        type: "Housewarming & Wedding Reception",
        hosts: "Muhammed Jalib V & Fathima MC",
        couple: "Jamshida & Midlaj",
        date: "Sunday, 20 December 2026",
        time: "11:00 AM Onwards",
        isoDateTime: "2026-12-20T11:00:00+05:30",
        venue: "Baithul Madina (New Home of Muhammed Jalib)",
        address: "Mangottuparambu, Vaikkileri, Vatakara",
        mapsUrl: "https://maps.app.goo.gl/w9KewmuugsnGbFMSA"
    },
    family: {
        hosts: [
            "Jabbar NV & Bathuly V",
            "Muhammed Jalib V & Fathima MC",
            "Subaida Moosa KK"
        ],
        withRegards: "Ummerkutty Vaikkileri"
    },
    googleSheetsEndpoint: "https://script.google.com/macros/s/AKfycbx5X_ZICxm69Vr2Ud_9PUgxxF3ycwqZoyyLziUuw9geL9HowGpB-KSywYOm961DXC0i/exec"
};

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 2. SCRATCH TO OPEN INVITATION (CANVAS FOIL & ACCESSIBILITY)
    // ==========================================================================
    const scratchCanvas = document.getElementById("scratchCanvas");
    const scratchScreen = document.getElementById("scratchScreen");
    const skipScratchBtn = document.getElementById("skipScratchBtn");
    const bgAudio = document.getElementById('bg-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');

    let isAudioPlaying = false;
    let autoRevealStarted = false;

    if (scratchCanvas && scratchScreen) {
        // Lock body scrolling while scratch screen is open
        document.body.classList.add('scratch-active');

        const ctx = scratchCanvas.getContext("2d");
        let isDrawing = false;
        let isChecking = false;

        function resizeCanvas() {
            if (autoRevealStarted) return;
            const rect = scratchCanvas.getBoundingClientRect();
            scratchCanvas.width = rect.width;
            scratchCanvas.height = rect.height;
            drawLuxuryGoldFoil();
        }

        function drawLuxuryGoldFoil() {
            const w = scratchCanvas.width;
            const h = scratchCanvas.height;

            if (w === 0 || h === 0) return;

            // Metallic Gold Linear Gradient
            const grad = ctx.createLinearGradient(0, 0, w, h);
            grad.addColorStop(0, '#cda869');
            grad.addColorStop(0.25, '#faeecf');
            grad.addColorStop(0.5, '#b88e40');
            grad.addColorStop(0.75, '#faeecf');
            grad.addColorStop(1, '#856122');

            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            // Shimmer Noise Sparkles
            try {
                const imgData = ctx.getImageData(0, 0, w, h);
                const data = imgData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const noise = (Math.random() - 0.5) * 20;
                    data[i] = Math.min(255, Math.max(0, data[i] + noise));
                    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
                    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
                }
                ctx.putImageData(imgData, 0, 0);
            } catch (e) {
                // Fallback for CORS restricted environments
            }

            // Luxury Geometric Diamond Grid Pattern
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
            ctx.lineWidth = 1;
            const step = 38;
            ctx.beginPath();
            for (let x = -h; x < w + h; x += step) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x + h, h);
            }
            for (let x = w + h; x > -h; x -= step) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x - h, h);
            }
            ctx.stroke();

            // Double Gold Borders
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
            ctx.lineWidth = 6;
            ctx.strokeRect(10, 10, w - 20, h - 20);

            ctx.strokeStyle = 'rgba(133, 97, 34, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(18, 18, w - 36, h - 36);

            // Center Foil Text & Icon
            ctx.fillStyle = '#4d3622';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Glow shadow
            ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
            ctx.shadowBlur = 6;

            ctx.font = '700 13px "Plus Jakarta Sans", sans-serif';
            ctx.fillText('✦ AN INVITATION TO CELEBRATE ✦', w / 2, h / 2 - 24);

            ctx.font = '700 18px "Cinzel", Georgia, serif';
            ctx.fillText('Scratch to Open Invitation', w / 2, h / 2 + 6);

            ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
            ctx.fillStyle = '#6b4c2b';
            ctx.fillText('Two Beginnings · One Blessed Celebration', w / 2, h / 2 + 32);

            ctx.shadowBlur = 0;
        }

        // Initialize and listen for resize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Scratch Drawing Logic
        function getCoords(e) {
            const rect = scratchCanvas.getBoundingClientRect();
            if (e.touches && e.touches[0]) {
                return {
                    x: e.touches[0].clientX - rect.left,
                    y: e.touches[0].clientY - rect.top
                };
            }
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }

        function scratch(x, y) {
            if (autoRevealStarted) return;
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 32, 0, Math.PI * 2);
            ctx.fill();

            checkRevealPercentage();
        }

        function checkRevealPercentage() {
            if (autoRevealStarted || isChecking) return;
            isChecking = true;

            setTimeout(() => {
                isChecking = false;
                if (autoRevealStarted) return;

                const w = scratchCanvas.width;
                const h = scratchCanvas.height;
                try {
                    const imgData = ctx.getImageData(0, 0, w, h);
                    const pixels = imgData.data;
                    let transparent = 0;
                    const sampleStep = 32;
                    let totalSamples = 0;

                    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
                        totalSamples++;
                        if (pixels[i] === 0) transparent++;
                    }

                    const ratio = transparent / totalSamples;
                    if (ratio >= 0.18) {
                        revealInvitation();
                    }
                } catch (e) {
                    // Fallback
                }
            }, 60);
        }

        // Event Listeners for Scratch Canvas
        scratchCanvas.addEventListener("mousedown", (e) => {
            isDrawing = true;
            const pos = getCoords(e);
            scratch(pos.x, pos.y);
        });

        scratchCanvas.addEventListener("mousemove", (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getCoords(e);
            scratch(pos.x, pos.y);
        });

        window.addEventListener("mouseup", () => { isDrawing = false; });

        scratchCanvas.addEventListener("touchstart", (e) => {
            isDrawing = true;
            const pos = getCoords(e);
            scratch(pos.x, pos.y);
        }, { passive: false });

        scratchCanvas.addEventListener("touchmove", (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getCoords(e);
            scratch(pos.x, pos.y);
        }, { passive: false });

        window.addEventListener("touchend", () => { isDrawing = false; });

        // Skip Button Trigger
        if (skipScratchBtn) {
            skipScratchBtn.addEventListener("click", () => {
                revealInvitation();
            });
        }

        // Keyboard support: Enter / Space triggers reveal
        window.addEventListener("keydown", (e) => {
            if (!autoRevealStarted && (e.key === "Enter" || e.key === " ")) {
                revealInvitation();
            }
        });

        function revealInvitation() {
            if (autoRevealStarted) return;
            autoRevealStarted = true;

            // Remove body scroll lock and reset scroll immediately to top
            document.body.classList.remove('scratch-active');
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Attempt Audio Playback (user-gesture approved)
            playAudioSafely();

            // GSAP Animated Reveal
            if (typeof gsap !== "undefined") {
                gsap.to("#scratchCanvas", {
                    opacity: 0,
                    scale: 1.04,
                    duration: 0.5,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to("#scratchScreen", {
                            opacity: 0,
                            duration: 0.4,
                            ease: "power2.out",
                            onComplete: () => {
                                scratchScreen.remove();
                                animateHeroEntrance();
                            }
                        });
                    }
                });
            } else {
                scratchScreen.style.opacity = "0";
                setTimeout(() => {
                    scratchScreen.remove();
                    animateHeroEntrance();
                }, 400);
            }
        }
    }

    function animateHeroEntrance() {
        window.scrollTo({ top: 0, behavior: 'instant' });

        if (typeof gsap === "undefined") return;

        // Smooth subtle entrance without blanking the page
        gsap.fromTo(".hero-content", 
            { y: 15, opacity: 0.85 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }

    // ==========================================================================
    // 3. BACKGROUND MUSIC AUDIO CONTROLLER
    // ==========================================================================
    function playAudioSafely() {
        if (!bgAudio) return;
        bgAudio.play()
            .then(() => {
                isAudioPlaying = true;
                if (audioToggle) audioToggle.classList.add('playing');
                if (audioIcon) {
                    audioIcon.innerHTML = `
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    `;
                }
            })
            .catch(() => {
                isAudioPlaying = false;
            });
    }

    function pauseAudio() {
        if (!bgAudio) return;
        bgAudio.pause();
        isAudioPlaying = false;
        if (audioToggle) audioToggle.classList.remove('playing');
        if (audioIcon) {
            audioIcon.innerHTML = `
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM12 4L9.91 6.09 12 8.18V4zm-8.09-.09L2.81 5.09 6.82 9H4v6h4l5 5v-6.83l4.88 4.88c-.62.47-1.31.85-2.08 1.09v2.01c1.3-.3 2.49-.93 3.47-1.76l2.62 2.62 1.41-1.41L4.82 2.81 3.91 3.91zM12 15.17L9.83 13H8v-2h1.83l.26-.26 1.91 1.91v2.52z"/>
            `;
        }
    }

    if (audioToggle) {
        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isAudioPlaying) {
                pauseAudio();
            } else {
                playAudioSafely();
            }
        });
        audioToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                audioToggle.click();
            }
        });
    }

    // ==========================================================================
    // 4. LIVE COUNTDOWN TIMER (ASIA/KOLKATA TIMEZONE)
    // ==========================================================================
    // Sunday, 20 December 2026 at 11:00 AM IST
    const targetTimestamp = new Date(EVENT_CONFIG.event2.isoDateTime).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetTimestamp - now;

        if (difference <= 0) {
            if (daysEl) daysEl.innerText = "00";
            if (hoursEl) hoursEl.innerText = "00";
            if (minutesEl) minutesEl.innerText = "00";
            if (secondsEl) secondsEl.innerText = "00";

            const titleEl = document.querySelector('.countdown-title');
            if (titleEl) titleEl.innerText = "The Celebration Has Begun!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerText = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerText = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ==========================================================================
    // 5. CALENDAR INTEGRATION (GOOGLE CALENDAR & .ICS)
    // ==========================================================================
    const addToCalBtn = document.getElementById('addToCalBtn');
    const calDropdown = document.getElementById('calDropdown');
    const calGoogle = document.getElementById('calGoogle');
    const calIcs = document.getElementById('calIcs');

    if (addToCalBtn && calDropdown) {
        addToCalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = calDropdown.hasAttribute('hidden');
            if (isHidden) {
                calDropdown.removeAttribute('hidden');
            } else {
                calDropdown.setAttribute('hidden', '');
            }
        });

        document.addEventListener('click', () => {
            if (!calDropdown.hasAttribute('hidden')) {
                calDropdown.setAttribute('hidden', '');
            }
        });

        // Generate Google Calendar Link
        // Event on 20 Dec 2026 from 11:00 to 17:00 IST (UTC: 20261220T053000Z to 20261220T113000Z)
        const gCalTitle = encodeURIComponent("Housewarming & Wedding Reception · Baithul Madina");
        const gCalDetails = encodeURIComponent("You are cordially invited to the Housewarming of Muhammed Jalib & Fathima and the Wedding Reception of Jamshida & Midlaj at Baithul Madina.");
        const gCalLoc = encodeURIComponent("Baithul Madina, Mangottuparambu, Vaikkileri, Vatakara, Kerala");
        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gCalTitle}&dates=20261220T053000Z/20261220T113000Z&details=${gCalDetails}&location=${gCalLoc}`;

        if (calGoogle) calGoogle.href = gCalUrl;

        // Generate .ics File Data URI
        const icsData = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Two Beginnings//Family Invitation//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            "UID:invitation-20261220@skenllp.com",
            "DTSTAMP:20261220T053000Z",
            "DTSTART:20261220T053000Z",
            "DTEND:20261220T113000Z",
            "SUMMARY:Two Beginnings · Housewarming & Wedding Feast (Baithul Madina)",
            "DESCRIPTION:Celebration of the Housewarming of Muhammed Jalib & Fathima and the Marriage Reception of Jamshida & Midlaj.",
            "LOCATION:Baithul Madina, Mangottuparambu, Vaikkileri, Vatakara, Kerala",
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        if (calIcs) {
            calIcs.href = "data:text/calendar;charset=utf8," + encodeURIComponent(icsData);
        }
    }

    // ==========================================================================
    // 6. VENUE TABS SWITCHER
    // ==========================================================================
    const tabHome = document.getElementById('tabHome');
    const tabMosque = document.getElementById('tabMosque');
    const panelHome = document.getElementById('panelHome');
    const panelMosque = document.getElementById('panelMosque');

    if (tabHome && tabMosque && panelHome && panelMosque) {
        tabHome.addEventListener('click', () => {
            tabHome.classList.add('active');
            tabHome.setAttribute('aria-selected', 'true');
            tabMosque.classList.remove('active');
            tabMosque.setAttribute('aria-selected', 'false');

            panelHome.classList.add('active');
            panelHome.removeAttribute('hidden');
            panelMosque.classList.remove('active');
            panelMosque.setAttribute('hidden', '');
        });

        tabMosque.addEventListener('click', () => {
            tabMosque.classList.add('active');
            tabMosque.setAttribute('aria-selected', 'true');
            tabHome.classList.remove('active');
            tabHome.setAttribute('aria-selected', 'false');

            panelMosque.classList.add('active');
            panelMosque.removeAttribute('hidden');
            panelHome.classList.remove('active');
            panelHome.setAttribute('hidden', '');
        });
    }

    // ==========================================================================
    // 7. RSVP FORM HANDLING & STORAGE
    // ==========================================================================
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');
    const editRsvpBtn = document.getElementById('edit-rsvp-btn');
    const guestsGroup = document.getElementById('guests-group');
    const eventsGroup = document.getElementById('events-group');
    const guestsInput = document.getElementById('rsvp-guests');
    const guestMinus = document.getElementById('guestMinus');
    const guestPlus = document.getElementById('guestPlus');
    const successMsgDetails = document.getElementById('successMessageDetails');

    const nameInput = document.getElementById('rsvp-name');
    const mobileInput = document.getElementById('rsvp-mobile');
    const messageInput = document.getElementById('rsvp-message');

    const nameError = document.getElementById('nameError');
    const mobileError = document.getElementById('mobileError');
    const guestsError = document.getElementById('guestsError');

    const attendYesRadio = document.getElementById('attend-yes');
    const attendNoRadio = document.getElementById('attend-no');

    // Guest counter buttons
    if (guestMinus && guestPlus && guestsInput) {
        guestMinus.addEventListener('click', () => {
            let val = parseInt(guestsInput.value, 10) || 1;
            if (val > 1) guestsInput.value = val - 1;
        });

        guestPlus.addEventListener('click', () => {
            let val = parseInt(guestsInput.value, 10) || 1;
            if (val < 25) guestsInput.value = val + 1;
        });
    }

    // Radio toggling
    if (attendYesRadio && attendNoRadio) {
        attendYesRadio.addEventListener('change', () => {
            if (guestsGroup) guestsGroup.style.display = 'block';
            if (eventsGroup) eventsGroup.style.display = 'block';
            if (guestsInput) guestsInput.value = '1';
        });

        attendNoRadio.addEventListener('change', () => {
            if (guestsGroup) guestsGroup.style.display = 'none';
            if (eventsGroup) eventsGroup.style.display = 'none';
            if (guestsInput) guestsInput.value = '0';
        });
    }

    // Check LocalStorage on load
    const savedRsvp = localStorage.getItem('celebration_rsvp_2026');
    if (savedRsvp) {
        try {
            const data = JSON.parse(savedRsvp);
            showRsvpSuccess(data);
        } catch (e) {}
    }

    // Form submission
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear errors
            if (nameError) nameError.classList.remove('visible');
            if (mobileError) mobileError.classList.remove('visible');
            if (guestsError) guestsError.classList.remove('visible');

            const attendance = document.querySelector('input[name="attendance"]:checked')?.value || "Yes, Insha Allah";
            const name = nameInput.value.trim();
            const mobile = mobileInput.value.trim();
            const isAttending = attendance.includes('Yes');
            const guests = isAttending ? (parseInt(guestsInput.value, 10) || 1) : 0;
            const events = isAttending ? (document.querySelector('input[name="events"]:checked')?.value || "Both Celebrations (19 & 20 Dec)") : "None";
            const message = messageInput ? messageInput.value.trim() : '';

            let hasError = false;

            if (!name) {
                if (nameError) nameError.classList.add('visible');
                hasError = true;
            }

            if (!mobile || mobile.length < 7) {
                if (mobileError) mobileError.classList.add('visible');
                hasError = true;
            }

            if (isAttending && guests < 1) {
                if (guestsError) guestsError.classList.add('visible');
                hasError = true;
            }

            if (hasError) return;

            const rsvpRecord = {
                id: 'rsvp_' + Date.now(),
                attendance,
                name,
                mobile,
                guests,
                events,
                message,
                timestamp: new Date().toISOString()
            };

            const submitBtn = document.getElementById('rsvpSubmitBtn');
            const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
            const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

            if (btnText) btnText.innerText = 'Sending RSVP...';
            if (submitBtn) submitBtn.disabled = true;

            // Submit to Google Sheets Apps Script endpoint
            try {
                await fetch(EVENT_CONFIG.googleSheetsEndpoint, {
                    method: "POST",
                    headers: { "Content-Type": "text/plain;charset=utf-8" },
                    body: JSON.stringify({
                        attendance: attendance,
                        name: name,
                        mobile: mobile,
                        guests: guests,
                        events: events,
                        message: message
                    })
                });
            } catch (err) {
                console.log("Sheet submission network note:", err);
            }

            // Always save to LocalStorage for guest peace of mind
            localStorage.setItem('celebration_rsvp_2026', JSON.stringify(rsvpRecord));

            showRsvpSuccess(rsvpRecord);
            rsvpForm.reset();

            if (submitBtn) submitBtn.disabled = false;
            if (btnText) btnText.innerText = 'Confirm Attendance';
        });
    }

    if (editRsvpBtn) {
        editRsvpBtn.addEventListener('click', () => {
            if (rsvpForm) rsvpForm.style.display = 'block';
            if (rsvpSuccess) rsvpSuccess.setAttribute('hidden', '');

            const stored = localStorage.getItem('celebration_rsvp_2026');
            if (stored) {
                try {
                    const data = JSON.parse(stored);
                    if (data.attendance && data.attendance.includes('Yes')) {
                        if (attendYesRadio) attendYesRadio.checked = true;
                        if (guestsGroup) guestsGroup.style.display = 'block';
                        if (eventsGroup) eventsGroup.style.display = 'block';
                        if (guestsInput) guestsInput.value = data.guests || 1;
                    } else {
                        if (attendNoRadio) attendNoRadio.checked = true;
                        if (guestsGroup) guestsGroup.style.display = 'none';
                        if (eventsGroup) eventsGroup.style.display = 'none';
                        if (guestsInput) guestsInput.value = '0';
                    }
                    if (nameInput) nameInput.value = data.name || '';
                    if (mobileInput) mobileInput.value = data.mobile || '';
                    if (messageInput) messageInput.value = data.message || '';
                } catch (e) {}
            }
        });
    }

    function showRsvpSuccess(data) {
        if (!rsvpForm || !rsvpSuccess || !successMsgDetails) return;

        rsvpForm.style.display = 'none';
        rsvpSuccess.removeAttribute('hidden');

        if (data.attendance && data.attendance.includes('Yes')) {
            successMsgDetails.innerHTML = `
                <p><strong>Dear ${escapeHTML(data.name)},</strong></p>
                <p style="margin-top: 6px;">Your confirmation has been received for <strong>${data.guests} guest${data.guests > 1 ? 's' : ''}</strong>.</p>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--primary-forest);">Attending: <strong>${escapeHTML(data.events || 'Both Celebrations')}</strong></p>
                <p style="margin-top: 6px; font-size: 0.9rem; color: var(--gold-deep);">We warmly look forward to welcoming you to <strong>Baithul Madina</strong>!</p>
            `;
        } else {
            successMsgDetails.innerHTML = `
                <p><strong>Dear ${escapeHTML(data.name)},</strong></p>
                <p style="margin-top: 6px;">Thank you for letting us know. We will miss your presence and truly appreciate your heartfelt prayers and duas!</p>
            `;
        }
    }

    function escapeHTML(str) {
        const p = document.createElement('p');
        p.textContent = str;
        return p.innerHTML;
    }

    // ==========================================================================
    // 8. SCROLL REVEAL (INTERSECTION OBSERVER) & FLOATING NAV ACTIVE STATE
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const floatingNav = document.getElementById('floatingNav');
    const navItems = document.querySelectorAll('.nav-item');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('active'));
    }

    // Floating Nav Visibility & Active Spy
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Show nav after scrolling past top 280px
        if (floatingNav) {
            if (scrollPos > 280) {
                floatingNav.classList.add('visible');
            } else {
                floatingNav.classList.remove('visible');
            }
        }

        // Active section spy
        const sections = document.querySelectorAll('header, section');
        let currentSectionId = '';

        sections.forEach(section => {
            const top = section.offsetTop - 180;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    item.classList.add('active');
                } else if (!item.classList.contains('nav-item-highlight')) {
                    item.classList.remove('active');
                }
            });
        }
    }, { passive: true });

});
