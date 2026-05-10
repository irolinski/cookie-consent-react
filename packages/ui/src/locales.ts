export type CookieConsentTranslations = {
  title: string;
  description: string;
  required: string;

  privacyPolicyInfo: string;
  privacyPolicy: string;

  acceptAll: string;
  saveSelection: string;
  disableAll: string;

  cookiePreferences_show: string;
  cookiePreferences_hide: string;

  categories: string;

  essential: string;
  marketing: string;
  analytics: string;
  other: string;
};

export type CookieConsentCustomTranslations =
  Partial<CookieConsentTranslations>;

export type CookieConsentAvailableLanguage =
  keyof typeof CookieConsentDefaultTranslations;

export const CookieConsentDefaultTranslations = {
  en: {
    title: "Cookie consent",
    description:
      'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    required: "Required",
    privacyPolicyInfo: "For more information, please visit our",
    privacyPolicy: "Privacy Policy",
    acceptAll: "Accept all",
    saveSelection: "Save selection",
    cookiePreferences_show: "Cookie settings",
    cookiePreferences_hide: "Hide settings",
    categories: "Categories",
    disableAll: "Disable all",
    essential: "Essential",
    marketing: "Marketing",
    analytics: "Analytics",
    other: "Other",
  },
  de: {
    title: "Cookie-Einwilligung",
    description:
      'Wir verwenden Cookies, um Ihr Browsererlebnis zu verbessern, personalisierte Anzeigen oder Inhalte bereitzustellen und unseren Datenverkehr zu analysieren. Durch Klicken auf "Alle akzeptieren" stimmen Sie der Verwendung von Cookies zu.',
    required: "Erforderlich",
    privacyPolicyInfo: "Weitere Informationen finden Sie in unserer",
    privacyPolicy: "Datenschutzerklärung",
    acceptAll: "Alle akzeptieren",
    saveSelection: "Auswahl speichern",
    cookiePreferences_show: "Cookie-Einstellungen",
    cookiePreferences_hide: "Einstellungen ausblenden",
    categories: "Kategorien",
    disableAll: "Alle deaktivieren",
    essential: "Essenziell",
    marketing: "Marketing",
    analytics: "Analyse",
    other: "Andere",
  },
  es: {
    title: "Consentimiento de cookies",
    description:
      'Usamos cookies para mejorar su experiencia de navegación, ofrecer anuncios o contenido personalizados y analizar nuestro tráfico. Al hacer clic en "Aceptar todas", usted acepta el uso de cookies.',
    required: "Obligatorio",
    privacyPolicyInfo: "Para más información, por favor visite nuestra",
    privacyPolicy: "Política de Privacidad",
    acceptAll: "Aceptar todas",
    saveSelection: "Guardar selección",
    cookiePreferences_show: "Configuración de cookies",
    cookiePreferences_hide: "Ocultar configuración",
    categories: "Categorías",
    disableAll: "Desactivar todas",
    essential: "Esencial",
    marketing: "Marketing",
    analytics: "Analítica",
    other: "Otros",
  },
  fr: {
    title: "Consentement aux cookies",
    description:
      'Nous utilisons des cookies pour améliorer votre expérience de navigation, proposer des publicités ou des contenus personnalisés et analyser notre trafic. En cliquant sur "Tout accepter", vous consentez à l\'utilisation des cookies.',
    required: "Obligatoire",
    privacyPolicyInfo: "Pour plus d'informations, veuillez consulter notre",
    privacyPolicy: "Politique de confidentialité",
    acceptAll: "Tout accepter",
    saveSelection: "Enregistrer la sélection",
    cookiePreferences_show: "Paramètres des cookies",
    cookiePreferences_hide: "Masquer les paramètres",
    categories: "Catégories",
    disableAll: "Tout désactiver",
    essential: "Essentiel",
    marketing: "Marketing",
    analytics: "Analytique",
    other: "Autres",
  },
  it: {
    title: "Consenso sui cookie",
    description:
      'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, fornire annunci o contenuti personalizzati e analizzare il nostro traffico. Facendo clic su "Accetta tutto" acconsenti all\'uso dei cookie.',
    required: "Obbligatorio",
    privacyPolicyInfo: "Per ulteriori informazioni, visita la nostra",
    privacyPolicy: "Informativa sulla privacy",
    acceptAll: "Accetta tutto",
    saveSelection: "Salva selezione",
    cookiePreferences_show: "Impostazioni cookie",
    cookiePreferences_hide: "Nascondi impostazioni",
    categories: "Categorie",
    disableAll: "Disattiva tutto",
    essential: "Essenziale",
    marketing: "Marketing",
    analytics: "Analitica",
    other: "Altro",
  },
  nl: {
    title: "Cookie-toestemming",
    description:
      'We gebruiken cookies om uw browse-ervaring te verbeteren, gepersonaliseerde advertenties of inhoud te tonen en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, stemt u in met ons gebruik van cookies.',
    required: "Vereist",
    privacyPolicyInfo: "Voor meer informatie, bezoek ons",
    privacyPolicy: "Privacybeleid",
    acceptAll: "Alles accepteren",
    saveSelection: "Selectie opslaan",
    cookiePreferences_show: "Cookie-instellingen",
    cookiePreferences_hide: "Instellingen verbergen",
    categories: "Categorieën",
    disableAll: "Alles uitschakelen",
    essential: "Essentieel",
    marketing: "Marketing",
    analytics: "Analyse",
    other: "Overig",
  },
  pt: {
    title: "Consentimento de cookies",
    description:
      'Utilizamos cookies para melhorar sua experiência de navegação, fornecer anúncios ou conteúdos personalizados e analisar nosso tráfego. Ao clicar em "Aceitar todos", você concorda com o uso de cookies.',
    required: "Obrigatório",
    privacyPolicyInfo: "Para mais informações, visite nossa",
    privacyPolicy: "Política de Privacidade",
    acceptAll: "Aceitar todos",
    saveSelection: "Salvar seleção",
    cookiePreferences_show: "Configurações de cookies",
    cookiePreferences_hide: "Ocultar configurações",
    categories: "Categorias",
    disableAll: "Desativar todos",
    essential: "Essencial",
    marketing: "Marketing",
    analytics: "Análise",
    other: "Outros",
  },
  ja: {
    title: "クッキーの同意",
    description:
      "快適な閲覧体験を提供し、パーソナライズされた広告やコンテンツを表示し、トラフィックを分析するためにクッキーを使用しています。「すべて許可」をクリックすると、クッキーの使用に同意したことになります。",
    required: "必須",
    privacyPolicyInfo: "詳細については、当社の",
    privacyPolicy: "プライバシーポリシー",
    acceptAll: "すべて許可",
    saveSelection: "選択を保存",
    cookiePreferences_show: "クッキー設定",
    cookiePreferences_hide: "設定を隠す",
    categories: "カテゴリ",
    disableAll: "すべて無効にする",
    essential: "必須",
    marketing: "マーケティング",
    analytics: "分析",
    other: "その他",
  },
  zh: {
    title: "Cookie 同意",
    description:
      "我们使用 Cookie 来提升您的浏览体验，提供个性化广告或内容，并分析我们的流量。点击“全部接受”即表示您同意我们使用 Cookie。",
    required: "必需",
    privacyPolicyInfo: "欲了解更多信息，请访问我们的",
    privacyPolicy: "隐私政策",
    acceptAll: "全部接受",
    saveSelection: "保存选择",
    cookiePreferences_show: "Cookie 设置",
    cookiePreferences_hide: "隐藏设置",
    categories: "分类",
    disableAll: "全部禁用",
    essential: "必要",
    marketing: "营销",
    analytics: "分析",
    other: "其他",
  },
  ar: {
    title: "الموافقة على ملفات تعريف الارتباط",
    description:
      'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك، وتقديم إعلانات أو محتوى مخصص، وتحليل حركة المرور لدينا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
    required: "إلزامي",
    privacyPolicyInfo: "لمزيد من المعلومات، يرجى زيارة",
    privacyPolicy: "سياسة الخصوصية",
    acceptAll: "قبول الكل",
    saveSelection: "حفظ الاختيار",
    cookiePreferences_show: "إعدادات ملفات تعريف الارتباط",
    cookiePreferences_hide: "إخفاء الإعدادات",
    categories: "الفئات",
    disableAll: "تعطيل الكل",
    essential: "أساسي",
    marketing: "تسويق",
    analytics: "تحليلات",
    other: "أخرى",
  },
  ru: {
    title: "Согласие на использование файлов cookie",
    description:
      "Мы используем файлы cookie, чтобы улучшить ваш опыт просмотра, показывать персонализированную рекламу или контент и анализировать наш трафик. Нажимая «Принять все», вы соглашаетесь на использование файлов cookie.",
    required: "Обязательно",
    privacyPolicyInfo: "Для получения дополнительной информации посетите нашу",
    privacyPolicy: "Политику конфиденциальности",
    acceptAll: "Принять все",
    saveSelection: "Сохранить выбор",
    cookiePreferences_show: "Настройки cookie",
    cookiePreferences_hide: "Скрыть настройки",
    categories: "Категории",
    disableAll: "Отключить все",
    essential: "Необходимые",
    marketing: "Маркетинг",
    analytics: "Аналитика",
    other: "Другое",
  },
  ko: {
    title: "쿠키 동의",
    description:
      '더 나은 브라우징 환경 제공, 맞춤형 광고 또는 콘텐츠 제공, 트래픽 분석을 위해 쿠키를 사용합니다. "모두 허용"을 클릭하면 쿠키 사용에 동의하는 것입니다.',
    required: "필수",
    privacyPolicyInfo: "자세한 내용은 당사의",
    privacyPolicy: "개인정보 처리방침",
    acceptAll: "모두 허용",
    saveSelection: "선택 저장",
    cookiePreferences_show: "쿠키 설정",
    cookiePreferences_hide: "설정 숨기기",
    categories: "카테고리",
    disableAll: "모두 비활성화",
    essential: "필수",
    marketing: "마케팅",
    analytics: "분석",
    other: "기타",
  },
  pl: {
    title: "Zgoda na pliki cookie",
    description:
      "Używamy plików cookie, aby poprawić komfort przeglądania, wyświetlać spersonalizowane reklamy lub treści oraz analizować ruch na stronie. Klikając „Akceptuj wszystkie”, wyrażasz zgodę na używanie przez nas plików cookie.",
    required: "Wymagane",
    privacyPolicyInfo: "Aby uzyskać więcej informacji, odwiedź naszą",
    privacyPolicy: "politykę prywatności",
    acceptAll: "Akceptuj wszystkie",
    saveSelection: "Zapisz wybór",
    cookiePreferences_show: "Ustawienia plików cookie",
    cookiePreferences_hide: "Ukryj ustawienia",
    categories: "Kategorie",
    disableAll: "Wyłącz wszystkie",
    essential: "Niezbędne",
    marketing: "Marketingowe",
    analytics: "Analityczne",
    other: "Inne",
  },
};
