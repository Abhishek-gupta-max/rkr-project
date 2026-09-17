import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ar', label: 'العربية', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'bn', label: 'বাংলা', nativeName: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ta', label: 'தமிழ்', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
  { code: 'te', label: 'తెలుగు', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ml', label: 'മലയാളം', nativeName: 'മലയാളം', flag: '🇮🇳', dir: 'ltr' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', dir: 'ltr' },
  { code: 'gu', label: 'ગુજરાતી', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr' },
  { code: 'mr', label: 'मराठी', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ur', label: 'اردو', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'kn', label: 'ಕನ್ನಡ', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', dir: 'ltr' },
  { code: 'or', label: 'ଓଡ଼ିଆ', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', dir: 'ltr' },
  { code: 'ne', label: 'नेपाली', nativeName: 'नेपाली', flag: '🇳🇵', dir: 'ltr' },
  { code: 'si', label: 'සිංහල', nativeName: 'සිංහල', flag: '🇱🇰', dir: 'ltr' },
  { code: 'id', label: 'Bahasa Indonesia', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  { code: 'tl', label: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', dir: 'ltr' },
  { code: 'fr', label: 'Français', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'es', label: 'Español', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'ru', label: 'Русский', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'fa', label: 'فارسی', nativeName: 'فارسی', flag: '🇮🇷', dir: 'rtl' },
  { code: 'ps', label: 'پښتو', nativeName: 'پښتو', flag: '🇦🇫', dir: 'rtl' },
];

export const TRANSLATIONS = {
  en: {
    // Nav & Announcement
    announcement: 'MEA Licensed Recruitment Agency · Buxar, Bihar · Mon–Sat 9AM–6PM',
    select_language: 'Select Language',
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Services',
    nav_process: 'Process',
    nav_why_us: 'Why Us',
    nav_requirements: 'Requirements',
    nav_contact: 'Contact Us',
    nav_jobs: 'Jobs',
    nav_apply: 'Apply Now',
    get_manpower: 'Get Manpower',

    // Hero & Homepage
    hero_title: 'Global Manpower Solutions You Can Trust',
    hero_subtitle: 'Approved by Ministry of External Affairs (MEA), Govt. of India. Connecting skilled workforce with top employers across GCC & Europe.',
    hero_apply_btn: 'Apply For Job',
    hero_hire_btn: 'Hire Skilled Workers',
    stat_candidates: 'Candidates Deployed',
    stat_employers: 'Global Employers',
    stat_countries: 'GCC Countries',
    stat_experience: 'Years Experience',

    // Skill Categories
    trades_heading: 'Trades & Skill Categories',
    trades_subtitle: 'Explore our recruitment categories across Skilled, Semi-Skilled and Unskilled manpower.',
    cat_skilled: 'Skilled Trades',
    cat_semi_skilled: 'Semi-Skilled Trades',
    cat_unskilled: 'Unskilled Labor',
    apply_trade: 'Apply For Trade',

    // Job Application Header
    apply_for_job: 'Apply for a Job',
    apply_subtitle: 'Fill in your details and apply for your desired trade. Our recruitment team will review your application and get in touch with you soon.',
    selected_trade: 'Selected Trade / Skill',

    // Form Sections
    personal_info: '1. Personal Information',
    full_name: 'Full Name',
    father_name: "Father's Name",
    dob: 'Date of Birth',
    gender: 'Gender',
    mobile_number: 'Mobile Number',
    whatsapp_number: 'WhatsApp Number',
    email_address: 'Email Address',
    current_city: 'Current City',
    current_country: 'Current Country',

    professional_info: '2. Professional Information',
    total_experience: 'Total Work Experience',
    relevant_experience: 'Relevant Experience in Trade',
    current_job_title: 'Current Job Title',
    previous_company: 'Previous Company',
    preferred_country: 'Preferred Country',
    expected_salary: 'Expected Salary',

    skills_certifications: '3. Skills & Certifications',
    primary_skill: 'Primary Skill',
    additional_skills: 'Additional Skills',
    certifications: 'Certifications & Licenses',

    documents: '4. Documents',
    passport_number: 'Passport Number',
    passport_expiry: 'Passport Expiry Date',
    upload_cv: 'Upload CV / Resume',
    upload_passport: 'Upload Passport Copy',
    upload_experience: 'Upload Experience Certificate',
    upload_other: 'Upload Other Documents',

    additional_info: '5. Additional Information',
    message_placeholder: 'Tell us anything else about your experience, skills, availability or career preferences...',
    declaration: 'I hereby declare that all the information provided is true and correct to the best of my knowledge.',
    submit_application: 'Submit Application',
    submitting: 'Submitting Application...',

    // Validation
    val_name_req: 'Full Name is required',
    val_email_invalid: 'Please enter a valid email address',
    val_mobile_req: 'Mobile number is required',
    val_trade_req: 'Please select a trade or skill',

    // Success
    app_success_title: 'Application Submitted Successfully',
    app_success_desc: 'Thank you for applying. Our recruitment team will review your profile and contact you if your application matches an available opportunity.',
    app_id: 'Application ID',
    back_to_skills: 'Back to Skills',
    submit_another: 'Submit Another Application',

    // Contact & Footer
    contact_us: 'Contact Us',
    get_in_touch: 'Get In Touch With Our Team',
    office_address: 'Ramnath Deoria Basement & Ground Floor, Near Kali Mandir, Deoria Sadar R.S., Deoria – 274001, UP, India',
    quick_links: 'Quick Links',
    all_rights_reserved: 'All Rights Reserved',
  },
  hi: {
    announcement: 'विदेश मंत्रालय (MEA) द्वारा लाइसेंस प्राप्त भर्ती एजेंसी · बक्सर, बिहार · सोमु-शनि सुबह 9 से शाम 6 बजे',
    select_language: 'भाषा चुनें',
    nav_home: 'होम',
    nav_about: 'हमारे बारे में',
    nav_services: 'सेवाएं',
    nav_process: 'प्रक्रिया',
    nav_why_us: 'क्यों चुनें',
    nav_requirements: 'आवश्यकताएं',
    nav_contact: 'संपर्क करें',
    nav_jobs: 'नौकरियां',
    nav_apply: 'अभी आवेदन करें',
    get_manpower: 'मैनपावर प्राप्त करें',

    hero_title: 'विश्वसनीय वैश्विक जनशक्ति समाधान',
    hero_subtitle: 'विदेश मंत्रालय (MEA), भारत सरकार द्वारा स्वीकृत। जीसीसी और यूरोप में शीर्ष नियोक्ताओं के साथ कुशल श्रमिकों को जोड़ना।',
    hero_apply_btn: 'नौकरी के लिए आवेदन करें',
    hero_hire_btn: 'कुशल श्रमिक किराए पर लें',
    stat_candidates: 'तैनात उम्मीदवार',
    stat_employers: 'वैश्विक नियोक्ता',
    stat_countries: 'जीसीसी देश',
    stat_experience: 'वर्षों का अनुभव',

    trades_heading: 'ट्रेड और कौशल श्रेणियां',
    trades_subtitle: 'कुशल, अर्ध-कुशल और अकुशल मैनपावर में हमारी भर्ती श्रेणियों का पता लगाएं।',
    cat_skilled: 'कुशल ट्रेड',
    cat_semi_skilled: 'अर्ध-कुशल ट्रेड',
    cat_unskilled: 'अकुशल श्रम',
    apply_trade: 'ट्रेड के लिए आवेदन करें',

    apply_for_job: 'नौकरी के लिए आवेदन करें',
    apply_subtitle: 'अपनी विवरण भरें और अपने वांछित ट्रेड के लिए आवेदन करें। हमारी भर्ती टीम आपके आवेदन की समीक्षा करेगी और जल्द ही आपसे संपर्क करेगी।',
    selected_trade: 'चयनित ट्रेड / कौशल',

    personal_info: '1. व्यक्तिगत जानकारी',
    full_name: 'पूरा नाम',
    father_name: 'पिता का नाम',
    dob: 'जन्म तिथि',
    gender: 'लिंग',
    mobile_number: 'मोबाइल नंबर',
    whatsapp_number: 'व्हाट्सएप नंबर',
    email_address: 'ईमेल पता',
    current_city: 'वर्तमान शहर',
    current_country: 'वर्तमान देश',

    professional_info: '2. पेशेवर जानकारी',
    total_experience: 'कुल कार्य अनुभव',
    relevant_experience: 'ट्रेड में प्रासंगिक अनुभव',
    current_job_title: 'वर्तमान पद',
    previous_company: 'पिछली कंपनी',
    preferred_country: 'पसंदीदा देश',
    expected_salary: 'अपेक्षित वेतन',

    skills_certifications: '3. कौशल और प्रमाणपत्र',
    primary_skill: 'प्राथमिक कौशल',
    additional_skills: 'अतिरिक्त कौशल',
    certifications: 'प्रमाणपत्र और लाइसेंस',

    documents: '4. दस्तावेज',
    passport_number: 'पासपोर्ट नंबर',
    passport_expiry: 'पासपोर्ट समाप्ति तिथि',
    upload_cv: 'सीवी / रिज्यूमे अपलोड करें',
    upload_passport: 'पासपोर्ट कॉपी अपलोड करें',
    upload_experience: 'अनुभव प्रमाणपत्र अपलोड करें',
    upload_other: 'अन्य दस्तावेज अपलोड करें',

    additional_info: '5. अतिरिक्त जानकारी',
    message_placeholder: 'अपने अनुभव, कौशल, उपलब्धता या करियर प्राथमिकताओं के बारे में कुछ भी बताएं...',
    declaration: 'मैं एतद्वारा घोषणा करता/करती हूं कि प्रदान की गई सभी जानकारी मेरी सर्वोत्तम जानकारी के अनुसार सत्य और सही है।',
    submit_application: 'आवेदन जमा करें',
    submitting: 'आवेदन जमा हो रहा है...',

    val_name_req: 'पूरा नाम आवश्यक है',
    val_email_invalid: 'कृपया एक मान्य ईमेल पता दर्ज करें',
    val_mobile_req: 'मोबाइल नंबर आवश्यक है',
    val_trade_req: 'कृपया एक ट्रेड या कौशल चुनें',

    app_success_title: 'आवेदन सफलतापूर्वक जमा हो गया',
    app_success_desc: 'आवेदन करने के लिए धन्यवाद। हमारी भर्ती टीम आपकी प्रोफाइल की समीक्षा करेगी और यदि आपका आवेदन उपलब्ध अवसर से मेल खाता है तो आपसे संपर्क करेगी।',
    app_id: 'आवेदन आईडी',
    back_to_skills: 'कौशल पर वापस जाएं',
    submit_another: 'दूसरा आवेदन जमा करें',

    contact_us: 'संपर्क करें',
    get_in_touch: 'हमारी टीम से संपर्क करें',
    office_address: 'रामनाथ देवरिया बेसमेंट और ग्राउंड फ्लोर, काली मंदिर के पास, देवरिया सदर आर.एस., देवरिया - 274001, यूपी, भारत',
    quick_links: 'त्वरित लिंक्स',
    all_rights_reserved: 'सर्वाधिकार सुरक्षित',
  },
  ar: {
    announcement: 'وكالة توظيف مرخصة من وزارة الشؤون الخارجية · بوكسار، بيهار · الإثنين-السبت 9 صباحاً–6 مساءً',
    select_language: 'اختر اللغة',
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_services: 'الخدمات',
    nav_process: 'العملية',
    nav_why_us: 'لماذا نحن',
    nav_requirements: 'المتطلبات',
    nav_contact: 'اتصل بنا',
    nav_jobs: 'الوظائف',
    nav_apply: 'قدم الآن',
    get_manpower: 'طلب كوادر بشرية',

    hero_title: 'حلول القوى العاملة العالمية التي يمكنك الوثوق بها',
    hero_subtitle: 'معتمد من وزارة الشؤون الخارجية (MEA)، حكومة الهند. ربط العمالة الماهرة بأصحاب العمل الرائدين في دول الخليج وأوروبا.',
    hero_apply_btn: 'التقدم بطلب وظيفي',
    hero_hire_btn: 'توظيف عمالة ماهرة',
    stat_candidates: 'مرشح تم توظيفه',
    stat_employers: 'أصحاب عمل عالميون',
    stat_countries: 'دول مجلس التعاون',
    stat_experience: 'سنوات من الخبرة',

    trades_heading: 'فئات المهن والمهارات',
    trades_subtitle: 'استكشف فئات التوظيف لدينا عبر العمالة الماهرة وشبه الماهرة وغير الماهرة.',
    cat_skilled: 'المهن الماهرة',
    cat_semi_skilled: 'المهن شبه الماهرة',
    cat_unskilled: 'العمالة العادية',
    apply_trade: 'التقدم للمهنة',

    apply_for_job: 'التقدم بطلب للحصول على وظيفة',
    apply_subtitle: 'أدخل بياناتك وتقدم بطلبك للمهنة المطلوبة. سيقوم فريق التوظيف لدينا بمراجعة طلبك والتواصل معك قريباً.',
    selected_trade: 'المهنة / المهارة المختارة',

    personal_info: '1. المعلومات الشخصية',
    full_name: 'الاسم الكامل',
    father_name: 'اسم الأب',
    dob: 'تاريخ الميلاد',
    gender: 'الجنس',
    mobile_number: 'رقم الجوال',
    whatsapp_number: 'رقم الواتساب',
    email_address: 'البريد الإلكتروني',
    current_city: 'المدينة الحالية',
    current_country: 'الدولة الحالية',

    professional_info: '2. المعلومات المهنية',
    total_experience: 'إجمالي خبرة العمل',
    relevant_experience: 'الخبرة ذات الصلة بالمهنة',
    current_job_title: 'المسمى الوظيفي الحالي',
    previous_company: 'الشركة السابقة',
    preferred_country: 'الدولة المفضلة',
    expected_salary: 'الراتب المتوقع',

    skills_certifications: '3. المهارات والشهادات',
    primary_skill: 'المهارة الأساسية',
    additional_skills: 'مهارات إضافية',
    certifications: 'الشهادات والتراخيص',

    documents: '4. المستندات والوثائق',
    passport_number: 'رقم جواز السفر',
    passport_expiry: 'تاريخ انتهاء جواز السفر',
    upload_cv: 'تحميل السيرة الذاتية',
    upload_passport: 'تحميل نسخة جواز السفر',
    upload_experience: 'تحميل شهادة الخبرة',
    upload_other: 'تحميل مستندات أخرى',

    additional_info: '5. معلومات إضافية',
    message_placeholder: 'أخبرنا بأي شيء آخر عن خبرتك أو مهاراتك أو توفرك للعمل...',
    declaration: 'أقر بموجب هذا بأن جميع المعلومات المقدمة صحيحة ودقيقة وحقيقية حسب أفضل علمي.',
    submit_application: 'إرسال الطلب',
    submitting: 'جاري إرسال الطلب...',

    val_name_req: 'الاسم الكامل مطلوب',
    val_email_invalid: 'يرجى أدخال بريد إلكتروني صحيح',
    val_mobile_req: 'رقم الجوال مطلوب',
    val_trade_req: 'يرجى اختيار مهنة أو مهارة',

    app_success_title: 'تم إرسال الطلب بنجاح',
    app_success_desc: 'شكراً لتقدمك. سيقوم فريق التوظيف لدينا بمراجعة ملفك الشخصي والتواصل معك إذا كان طلبك يتطابق مع فرصة متاحة.',
    app_id: 'رقم الطلب المرجعي',
    back_to_skills: 'العودة للمهارات',
    submit_another: 'تقديم طلب آخر',

    contact_us: 'اتصل بنا',
    get_in_touch: 'تواصل مع فريقنا',
    office_address: 'رامناث ديوريا البدروم والطابق الأرضي، بالقرب من كالي ماندير، ديوريا سادار، यूपी، الهند',
    quick_links: 'روابط سريعة',
    all_rights_reserved: 'جميع الحقوق محفوظة',
  },
  bn: {
    announcement: 'পররাষ্ট্র মন্ত্রণালয় (MEA) অনুমোদিত রিক্রুটমেন্ট এজেন্সি · বক্সার, বিহার',
    select_language: 'ভাষা নির্বাচন করুন',
    nav_home: 'হোম',
    nav_about: 'আমাদের সম্পর্কে',
    nav_services: 'সেবাসমূহ',
    nav_process: 'প্রক্রিয়া',
    nav_why_us: 'কেন আমরা',
    nav_requirements: 'প্রয়োজনসমূহ',
    nav_contact: 'যোগাযোগ',
    nav_jobs: 'চাকরি',
    nav_apply: 'আবেদন করুন',
    get_manpower: 'ম্যানপাওয়ার নিন',
    apply_for_job: 'চাকরির জন্য আবেদন করুন',
    apply_subtitle: 'আপনার বিবরণ পূরণ করুন এবং আপনার কাঙ্ক্ষিত ট্রেডের জন্য আবেদন করুন।',
    selected_trade: 'নির্বাচিত ট্রেড / দক্ষতা',
    personal_info: '১. ব্যক্তিগত তথ্য',
    full_name: 'সম্পূর্ণ নাম',
    father_name: 'পিতার নাম',
    dob: 'জন্ম তারিখ',
    gender: 'লিঙ্গ',
    mobile_number: 'মোবাইল নম্বর',
    whatsapp_number: 'হোয়াটসঅ্যাপ নম্বর',
    email_address: 'ইমেল ঠিকানা',
    current_city: 'বর্তমান শহর',
    current_country: 'বর্তমান দেশ',
    professional_info: '২. পেশাগত তথ্য',
    total_experience: 'মোট কাজের অভিজ্ঞতা',
    relevant_experience: 'ট্রেডে প্রাসঙ্গিক অভিজ্ঞতা',
    current_job_title: 'বর্তমান পদবি',
    previous_company: 'পূর্ববর্তী কোম্পানি',
    preferred_country: 'পছন্দের দেশ',
    expected_salary: 'প্রত্যাশিত বেতন',
    skills_certifications: '৩. দক্ষতা ও সনদপত্র',
    primary_skill: 'প্রাথমিক দক্ষতা',
    additional_skills: 'অতিরিক্ত দক্ষতা',
    certifications: 'সনদপত্র ও লাইসেন্স',
    documents: '৪. নথিপত্র',
    passport_number: 'পাসপোর্ট নম্বর',
    passport_expiry: 'পাসপোর্ট মেয়াদের তারিখ',
    upload_cv: 'সিভি / জীবনবৃত্তান্ত আপলোড করুন',
    upload_passport: 'পাসপোর্ট কপি আপলোড করুন',
    upload_experience: 'অভিজ্ঞতার সনদ আপলোড করুন',
    upload_other: 'অন্যান্য নথি আপলোড করুন',
    additional_info: '৫. অতিরিক্ত তথ্য',
    message_placeholder: 'আপনার অভিজ্ঞতা বা ক্যারিয়ার সম্পর্কে অন্য কিছু জানান...',
    declaration: 'আমি ঘোষণা করছি যে প্রদত্ত সমস্ত তথ্য সত্য এবং সঠিক।',
    submit_application: 'আবেদন জমা দিন',
    submitting: 'আবেদন জমা হচ্ছে...',
    app_success_title: 'আবেদন সফলভাবে জমা হয়েছে',
    app_success_desc: 'আবেদন করার জন্য ধন্যবাদ। আমাদের রিক্রুটমেন্ট টিম আপনার প্রোফাইল পর্যালোচনা করবে।',
    app_id: 'আবেদন আইডি',
    back_to_skills: 'দক্ষতায় ফিরে যান',
    submit_another: 'অন্য আবেদন জমা দিন',
  },
  ur: {
    announcement: 'وزارت امور خارجه (MEA) سے منظور شدہ ریکروٹمنٹ ایجنسی · بکسر، بہار',
    select_language: 'زبان منتخب کریں',
    nav_home: 'ہوم',
    nav_about: 'ہمارے بارے میں',
    nav_services: 'خدمات',
    nav_process: 'طریقہ کار',
    nav_why_us: 'ہم کیوں',
    nav_requirements: 'ضروریات',
    nav_contact: 'رابطہ کریں',
    nav_jobs: 'ملازمتیں',
    nav_apply: 'ابھی اپلائی کریں',
    get_manpower: 'مین پاور حاصل کریں',
    apply_for_job: 'ملازمت کے لیے درخواست دیں',
    apply_subtitle: 'اپنی تفصیلات درج کریں اور اپنی مطلوبہ ٹریڈ کے لیے اپلائی کریں۔',
    selected_trade: 'منتخب کردہ ٹریڈ / مہارت',
    personal_info: '1. ذاتی معلومات',
    full_name: 'مکمل نام',
    father_name: 'والد کا نام',
    dob: 'تاریخ پیدائش',
    gender: 'جنس',
    mobile_number: 'موبائل نمبر',
    whatsapp_number: 'واٹس ایپ نمبر',
    email_address: 'ای میل ایڈریس',
    current_city: 'موجودہ شہر',
    current_country: 'موجودہ ملک',
    professional_info: '2. پیشہ ورانہ معلومات',
    total_experience: 'کل کام کا تجربہ',
    relevant_experience: 'ٹریڈ میں متعلقہ تجربہ',
    current_job_title: 'موجودہ عہدہ',
    previous_company: 'پچھلی کمپنی',
    preferred_country: 'ترجیحی ملک',
    expected_salary: 'متوقع تنخواہ',
    skills_certifications: '3. مہارت اور سرٹیفکیٹس',
    primary_skill: 'بنیادی مہارت',
    additional_skills: 'اضافی مہارتیں',
    certifications: 'سرٹیفکیٹس اور لائسنس',
    documents: '4. دستاویزات',
    passport_number: 'پاسپورٹ نمبر',
    passport_expiry: 'پاسپورٹ کی آخری تاریخ',
    upload_cv: 'سی وی / ریسیوم اپ لوڈ کریں',
    upload_passport: 'پاسپورٹ کی کاپی اپ لوڈ کریں',
    upload_experience: 'تجربہ کا سرٹیفکیٹ اپ لوڈ کریں',
    upload_other: 'دیگر دستاویزات اپ لوڈ کریں',
    additional_info: '5. اضافی معلومات',
    message_placeholder: 'اپنے تجربے یا کیریئر کی ترجیحات کے بارے میں بتائیں...',
    declaration: 'میں تصدیق کرتا ہوں کہ فراہم کردہ تمام معلومات درست اور سچی ہیں۔',
    submit_application: 'درخواست جمع کروائیں',
    submitting: 'درخواست جمع ہو رہی ہے...',
    app_success_title: 'درخواست کامیابی کے ساتھ جمع ہو گئی',
    app_success_desc: 'درخواست دینے کا شکریہ۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔',
    app_id: 'درخواست آئی ڈی',
    back_to_skills: 'مہارتوں پر واپس جائیں',
    submit_another: 'دوسری درخواست جمع کروائیں',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('user_language') || 'en';
  });

  const setLanguage = (langCode) => {
    const validLang = LANGUAGES.find(l => l.code === langCode);
    if (validLang) {
      setLanguageState(langCode);
      localStorage.setItem('user_language', langCode);

      // Trigger Google Translate fallback if set
      try {
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
      } catch (err) {
        console.warn('Cookie setting warning:', err);
      }
    }
  };

  useEffect(() => {
    const activeLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
    document.documentElement.lang = activeLang.code;
    document.documentElement.dir = activeLang.dir;

    // Load Google Translate script dynamically if not present
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            autoDisplay: false
          }, 'google_translate_element');
        }
      };

      const gtScript = document.createElement('script');
      gtScript.id = 'google-translate-script';
      gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      gtScript.async = true;
      document.body.appendChild(gtScript);
    }
  }, [language]);

  const t = (key) => {
    if (TRANSLATIONS[language] && TRANSLATIONS[language][key]) {
      return TRANSLATIONS[language][key];
    }
    // Fallback to English if key missing in specific language
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return key;
  };

  const currentLanguageObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES, currentLanguageObj }}>
      {/* Hidden element for Google Translate widget backing */}
      <div id="google_translate_element" style={{ display: 'none' }} />
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
