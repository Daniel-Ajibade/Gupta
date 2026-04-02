// ============================================
// FERTOLIX PRO - JAVASCRIPT FUNCTIONALITY
// ============================================

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // LIVE VISITOR COUNTER
    // ============================================
    const visitorCountElement = document.getElementById('visitorCount');

    // Function to update visitor count with random fluctuation
    function updateVisitorCount() {
        // Random number between 35 and 65
        const count = Math.floor(Math.random() * (65 - 35 + 1)) + 35;
        visitorCountElement.textContent = count;
    }

    // Update visitor count every 8-12 seconds (random interval)
    function scheduleVisitorUpdate() {
        const interval = Math.floor(Math.random() * (12000 - 8000 + 1)) + 8000;
        setTimeout(function () {
            updateVisitorCount();
            scheduleVisitorUpdate(); // Schedule next update
        }, interval);
    }

    // Start visitor counter
    scheduleVisitorUpdate();

    // ============================================
    // ORDER NOTIFICATION POPUP
    // ============================================
    const orderNotification = document.getElementById('orderNotification');
    const notificationName = document.getElementById('notificationName');
    const notificationOrder = document.getElementById('notificationOrder');

    // Array of Nigerian names and cities
    const nigerianNames = [
        { name: 'Chinedu', city: 'Lagos' },
        { name: 'Ibrahim', city: 'Kano' },
        { name: 'Emeka', city: 'Port Harcourt' },
        { name: 'Adewale', city: 'Ibadan' },
        { name: 'Musa', city: 'Abuja' },
        { name: 'Chidi', city: 'Enugu' },
        { name: 'Obinna', city: 'Onitsha' },
        { name: 'Aliyu', city: 'Kaduna' },
        { name: 'Femi', city: 'Abeokuta' },
        { name: 'Usman', city: 'Sokoto' },
        { name: 'Ikechukwu', city: 'Owerri' },
        { name: 'Abubakar', city: 'Maiduguri' },
        { name: 'Oluwaseun', city: 'Osogbo' },
        { name: 'Abdullahi', city: 'Ilorin' },
        { name: 'Kelechi', city: 'Awka' },
        { name: 'Yusuf', city: 'Jos' },
        { name: 'Uchenna', city: 'Calabar' },
        { name: 'Sani', city: 'Bauchi' },
        { name: 'Olusegun', city: 'Akure' },
        { name: 'Tunde', city: 'Benin City' },
        { name: 'Godwin', city: 'Warri' },
        { name: 'Nasiru', city: 'Gombe' },
        { name: 'Nnamdi', city: 'Umuahia' },
        { name: 'Kabiru', city: 'Katsina' }
    ];

    // Array of package options
    const packages = [
        '1 Bottle',
        '2 Bottles + Diet Plan',
        '3 Bottles + Diet Plan',
        '4 Bottles + Diet Plan'
    ];

    // Function to show notification
    function showNotification() {
        // Get random name, city, and package
        const randomPerson = nigerianNames[Math.floor(Math.random() * nigerianNames.length)];
        const randomPackage = packages[Math.floor(Math.random() * packages.length)];

        // Update notification content
        notificationName.textContent = `${randomPerson.name} from ${randomPerson.city}`;
        notificationOrder.textContent = `just ordered ${randomPackage}`;

        // Show notification with slide-in animation
        orderNotification.classList.add('show');

        // Hide notification after 5 seconds
        setTimeout(function () {
            orderNotification.classList.remove('show');
        }, 5000);
    }

    // Show first notification after 15 seconds
    setTimeout(showNotification, 15000);

    // Then show notification every 15 seconds
    setInterval(showNotification, 15000);

    // ============================================
    // STOCK SCARCITY COUNTER
    // ============================================
    const stockCountElements = [
        document.getElementById('stockCount'),
        document.getElementById('stockCountForm'),
        document.getElementById('stockCountFinal')
    ];

    let stockCount = 12; // Starting stock count

    // Function to update all stock count displays
    function updateStockCount() {
        stockCountElements.forEach(element => {
            if (element) {
                element.textContent = stockCount;
            }
        });

        // Decrease stock count
        stockCount--;

        // Don't go below 5
        if (stockCount < 5) {
            stockCount = 5;
        }
    }

    // Update stock count every 45-90 seconds (random)
    function scheduleStockUpdate() {
        const interval = Math.floor(Math.random() * (90000 - 45000 + 1)) + 45000;
        setTimeout(function () {
            updateStockCount();
            scheduleStockUpdate(); // Schedule next update
        }, interval);
    }

    // Start stock counter
    scheduleStockUpdate();

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });

    // ============================================
    // FORM VALIDATION & SUBMISSION
    // ============================================
    const stateToLGA = {
        "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
        "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Larmurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
        "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
        "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
        "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
        "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
        "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Oturkpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"], "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
        "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"], "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
        "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
        "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba Okha", "Orhionmwon", "Oredo", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"], "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
        "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo-Uwani"], "FCT": ["Abuja", "Bwari", "Gwagwalada", "Kuje", "Kwali"], "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
        "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"], "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kazaure", "Kiri Kasama", "Kiyawa", "Kaugama", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
        "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
        "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
        "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dandume", "Danja", "Dan Musa", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
        "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
        "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
        "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"], "Lagos": ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"], "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
        "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Munya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
        "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
        "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
        "Osun": ["Aiyedade", "Aiyedire", "Atakunmosa East", "Atakunmosa West", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"], "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"], "Plateau": ["Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"], "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emuoha", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"], "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"], "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kurmi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"], "Yobe": ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"], "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Chafe", "Zurmi"]
    };
    const stateSelect = document.getElementById('state');
    const lgaSelect = document.getElementById('lga');

    // Populate states
    for (let state in stateToLGA) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }

    // Handle state change
    stateSelect.addEventListener('change', function () {
        const selectedState = this.value;
        lgaSelect.innerHTML = '';
        if (selectedState && stateToLGA[selectedState]) {
            lgaSelect.disabled = false;
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Select LGA --';
            lgaSelect.appendChild(defaultOption);
            stateToLGA[selectedState].forEach(lga => {
                const option = document.createElement('option');
                option.value = lga;
                option.textContent = lga;
                lgaSelect.appendChild(option);
            });
        } else {
            lgaSelect.disabled = true;
            const option = document.createElement('option');
            option.value = '';
            option.textContent = '-- Select State First --';
            lgaSelect.appendChild(option);
        }
    });

    // Validation for phone numbers
    document.getElementById("orderForm").addEventListener("submit", async function (event) {
        const phone = document.getElementById("phone").value.trim();
        const altPhone = document.getElementById("alt-phone").value.trim();
        const phoneRegex = /^\d{11}$/;

        if (!phoneRegex.test(phone) || !phoneRegex.test(altPhone)) {
            alert("Both phone numbers must be exactly 11 digits.");
            event.preventDefault();
            return false;
        }

        // Formspree submission
        event.preventDefault();
        let response = await fetch(this.action, {
            method: this.method,
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            window.location.href = "thanks.html";
        } else {
            alert("Something went wrong. Please try again.");
        }
    });

    // ============================================
    // SCROLL ANIMATIONS (Fade In On Scroll)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.testimonial-card, .benefit-card, .problem-item, .pricing-card, .faq-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // PREVENT FORM RESUBMISSION ON PAGE REFRESH
    // ============================================
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // ============================================
    // CONSOLE MESSAGE (Optional - for developers)
    // ============================================
    console.log('%c🌿 Gupta - Landing Page Loaded Successfully! 🌿', 'color: #2D8B8B; font-size: 16px; font-weight: bold;');
    console.log('%cAll interactive features are now active.', 'color: #5A6C7D; font-size: 12px;');

}); // End of DOMContentLoaded

// ============================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================

// Function to format Nigerian phone numbers
function formatNigerianPhone(phone) {
    // Remove all spaces and special characters
    let cleaned = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleaned.startsWith('234')) {
        cleaned = '0' + cleaned.substring(3);
    } else if (cleaned.startsWith('+234')) {
        cleaned = '0' + cleaned.substring(4);
    }

    return cleaned;
}

// Function to validate email (if needed in future)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Prevent right-click on images (optional - to protect product images)
// Uncomment if you want to enable this feature
/*
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});
*/

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if you add actual product images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// END OF SCRIPT
// ============================================

document.addEventListener("contextmenu", e => e.preventDefault());

document.addEventListener("keydown", e => {
    if (
        e.ctrlKey &&
        (e.key === "u" ||
            e.key === "U" ||
            e.key === "c" ||
            e.key === "C" ||
            e.key === "s" ||
            e.key === "S" ||
            e.key === "i" ||
            e.key === "I")
    ) {
        e.preventDefault();
    }
});
document.getElementById("stickyCtaBtn").addEventListener("click", function () {
    const orderForm = document.getElementById("orderForm");

    if (orderForm) {
        orderForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

/* ===== QUIZ ===== */
const gAnswers = { q1: null, q2: null };

function gSelect(el, step) {
    el.closest('.q-opts').querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
    el.classList.add('selected');
    gAnswers['q' + step] = el.dataset.value;
    document.getElementById('gnext' + step).disabled = false;
}

function gToggleMulti(el) {
    el.classList.toggle('selected');
    const any = el.closest('.q-opts').querySelectorAll('.selected').length > 0;
    document.getElementById('gnext3').disabled = !any;
}

function gNext(cur) {
    document.querySelector('[data-step="' + cur + '"]').classList.remove('active');
    document.querySelector('[data-step="' + (cur + 1) + '"]').classList.add('active');
    gUpdateProg(cur + 1);
}

function gPrev(cur) {
    document.querySelector('[data-step="' + cur + '"]').classList.remove('active');
    document.querySelector('[data-step="' + (cur - 1) + '"]').classList.add('active');
    gUpdateProg(cur - 1);
}

function gUpdateProg(step) {
    document.getElementById('gProg').style.width = (((step - 1) / 3) * 100) + '%';
}

function gShowResult() {
    let score = 0;
    if (gAnswers.q1 === 'active') score += 1;
    if (gAnswers.q1 === 'chronic') score += 2;
    if (gAnswers.q2 === 'active') score += 1;
    if (gAnswers.q2 === 'chronic') score += 2;

    // bonus if surgery mentioned or multiple treatments tried
    const q3Selected = document.querySelectorAll('#gopts3 .selected');
    q3Selected.forEach(el => { if (el.dataset.value === '1') score += 1; });

    let html = '';

    if (score <= 1) {
        // EARLY — recommend 2 bottles
        html = `
      <div class="res-badge early">● Early Stage Detected</div>
      <h3>Your Symptoms Are Early — Act Now Before They Progress</h3>
      <p class="res-desc">Your prostate condition is at an early stage. This is the best time to treat it — when the prostate is still manageable and full restoration is most achievable. Two bottles will give your body the complete treatment window it needs.</p>
      <div class="res-pkg">
        <div class="pkg-lbl">Your Recommended Package</div>
        <div class="pkg-name">Value Package — 2 Bottles</div>
        <div class="pkg-price">₦40,000 <s>₦45,000</s></div>
        <p class="pkg-note">1-month supply. Enough time to shrink the prostate, restore urinary flow, and address the root inflammation. Do not stop at 1 bottle — the second bottle is what cements the results.</p>
      </div>
      <a href="#order-form" class="q-cta">✅ Order My 2-Bottle Package Now</a>
      <button class="q-retake" onclick="gRetake()">Retake Assessment</button>`;
    } else if (score <= 3) {
        // ACTIVE — recommend 3 bottles
        html = `
      <div class="res-badge active">● Active Stage BPH</div>
      <h3>Your Prostate Needs a Full Treatment Cycle to Heal Properly</h3>
      <p class="res-desc">Your symptoms suggest the prostate has been enlarging for some time with significant impact on your daily life. A full 45-day treatment cycle is needed to properly shrink the prostate, correct the inflammation, and prevent it from returning.</p>
      <div class="res-pkg">
        <div class="pkg-lbl">Your Recommended Package</div>
        <div class="pkg-name">Complete Package — 3 Bottles ✅ Treat Once and For All</div>
        <div class="pkg-price">₦50,000 <s>₦55,000</s></div>
        <p class="pkg-note">45-day complete treatment. This is the package most men at your stage need for full and lasting restoration. Stopping early is the number one reason treatments fail — 3 bottles ensures you complete the full cycle.</p>
      </div>
      <a href="#order-form" class="q-cta">✅ Order My 3-Bottle Complete Package Now</a>
      <button class="q-retake" onclick="gRetake()">Retake Assessment</button>`;
    } else {
        // CHRONIC — recommend 3 or 4 bottles
        html = `
      <div class="res-badge chronic">● Chronic / Advanced Stage</div>
      <h3>Your Condition Is Advanced — A Full Extended Treatment Is Critical</h3>
      <p class="res-desc">Based on your answers, your prostate has been significantly enlarged for a long time with severe or multiple symptoms. To achieve full restoration and ensure the prostate does not continue to grow, an extended treatment cycle of 2 months is strongly recommended.</p>
      <div class="res-pkg-duo">
        <div class="res-pkg">
          <div class="pkg-lbl">Option A — Good</div>
          <div class="pkg-name">Complete Package — 3 Bottles</div>
          <div class="pkg-price">₦50,000 <s>₦55,000</s></div>
          <p class="pkg-note">45-day supply. Solid choice for advanced cases.</p>
        </div>
        <div class="res-pkg highlight">
          <div class="pkg-lbl">⭐ Option B — Best for Your Stage</div>
          <div class="pkg-name">Premium Package — 4 Bottles</div>
          <div class="pkg-price">₦65,000 <s>₦70,000</s></div>
          <p class="pkg-note">2-month supply. Most recommended for chronic/long-standing prostate enlargement. Gives maximum time for full prostate correction and prevents recurrence.</p>
        </div>
      </div>
      <a href="#order-form" class="q-cta">✅ Order My Recommended Package Now</a>
      <button class="q-retake" onclick="gRetake()">Retake Assessment</button>`;
    }

    document.getElementById('gProg').style.width = '100%';
    document.getElementById('gQuizBody').style.display = 'none';
    const resultEl = document.getElementById('gResult');
    resultEl.innerHTML = html;
    resultEl.classList.add('show');
}

function gRetake() {
    gAnswers.q1 = null; gAnswers.q2 = null;
    document.querySelectorAll('.q-opt').forEach(o => o.classList.remove('selected'));
    ['gnext1', 'gnext2', 'gnext3'].forEach(id => document.getElementById(id).disabled = true);
    document.querySelectorAll('.q-step').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-step="1"]').classList.add('active');
    document.getElementById('gResult').classList.remove('show');
    document.getElementById('gResult').innerHTML = '';
    document.getElementById('gQuizBody').style.display = 'block';
    document.getElementById('gProg').style.width = '0%';
}

/* ===== COMMENTS ===== */
function gLike(btn) {
    const countEl = btn.querySelector('span');
    let c = parseInt(countEl.textContent);
    if (btn.classList.contains('liked')) {
        btn.classList.remove('liked');
        countEl.textContent = c - 1;
    } else {
        btn.classList.add('liked');
        countEl.textContent = c + 1;
    }
}

function gSendComment() {
    const input = document.getElementById('gComInput');
    const text = input.value.trim();
    if (!text) return;
    const compose = document.querySelector('.com-compose');
    const item = document.createElement('div');
    item.className = 'com-item';
    item.innerHTML = `
    <div class="com-av">👤</div>
    <div class="com-body">
      <div class="com-name">You</div>
      <p class="com-text">${text.replace(/</g, '&lt;')}</p>
      <div class="com-meta">
        <button class="com-like" onclick="gLike(this)">👍 Like <span>0</span></button>
        <button class="com-reply-btn">Reply</button>
        <span>Just now</span>
      </div>
    </div>`;
    compose.parentNode.insertBefore(item, compose);
    input.value = '';
}