export const LOCALE_COOKIE_NAME = 'appbarn_locale';

export const supportedLocales = ['en', 'zh'] as const;

export type Locale = (typeof supportedLocales)[number];

export const messages = {
  en: {
    meta: {
      defaultTitle: 'AppBarn — Indie Dev Showcase',
    },
    nav: {
      products: 'Products',
      apps: 'Apps',
      websites: 'Websites',
      tools: 'Tools',
      home: 'Home',
      browse: 'Browse',
      submit: 'Submit',
    },
    footer: {
      tagline: 'AppBarn — daoba curated showcase of indie apps & system tools.',
    },
    common: {
      app: 'App',
      system: 'System',
      systemTool: 'System Tool',
      systemTools: 'System Tools',
      website: 'Website',
      websites: 'Websites',
      appStore: 'App Store',
      github: 'GitHub',
      visitSite: 'Visit Site',
      type: 'Type',
      name: 'Name',
      description: 'Description',
      link: 'Link',
      date: 'Date',
      status: 'Status',
      actions: 'Actions',
      searchPlaceholder: 'Search…',
      all: 'All',
      language: 'Language',
      localeShort: {
        en: 'EN',
        zh: '中',
      },
      localeName: {
        en: 'English',
        zh: '中文',
      },
      noItemsYet: 'No items yet.',
    },
    home: {
      title: 'Featured Products',
      browseAll: 'Browse all',
      empty: 'No products yet. Be the first to submit!',
      emptyFiltered: 'No products in this category yet.',
    },
    list: {
      title: 'Browse',
      heading: 'All Products',
      empty: 'No items match your filter.',
      filters: {
        all: 'All',
        app: 'Apps',
        website: 'Websites',
        system: 'System Tools',
      },
    },
    submit: {
      title: 'Submit',
      heading: 'Submit a Product',
      subtitle: 'Share your app, website, or system tool with the community.',
      moderationEnabled: 'Submissions will be reviewed before going live.',
      moderationDisabled: 'Submissions go live instantly.',
      tabs: {
        app: 'App',
        website: 'Website',
        system: 'System Tool',
      },
      labels: {
        name: 'Name',
        description: 'Description',
        linkApp: 'App Store Link',
        linkWebsite: 'Website URL',
        linkSystem: 'GitHub Link',
        image: 'Icon / Screenshot',
        optional: 'optional',
      },
      placeholders: {
        name: 'Your product name',
        description: 'Brief description of what it does…',
        link: 'https://',
      },
      file: {
        upload: 'Click to upload image',
        change: 'Change image',
        hint: 'Max 5 MB. PNG, JPG, WebP, SVG.',
      },
      actions: {
        submit: 'Submit Product',
        submitting: 'Submitting…',
      },
      success: {
        approved: 'Submitted successfully! Your product is now live.',
        pending: 'Submitted successfully! Awaiting review.',
      },
      errors: {
        imageUploadFailed: 'Image upload failed',
        submissionFailed: 'Submission failed',
        missingRequiredFields: 'Missing required fields',
        invalidType: 'Invalid type. Must be "app", "website", or "system"',
        noFileProvided: 'No file provided',
        unsupportedFileType: 'Unsupported file type',
        fileTooLarge: 'File too large (max 5MB)',
      },
    },
    admin: {
      title: 'Admin',
      heading: 'Admin Dashboard',
      moderation: 'Moderation',
      toggleTitle: 'Toggle moderation',
      filters: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        all: 'All',
      },
      login: {
        title: 'Admin Access',
        subtitle: 'Enter the admin token to continue.',
        placeholder: 'Admin token',
        action: 'Enter',
      },
      errors: {
        invalidToken: 'Invalid token.',
        connection: 'Connection error.',
        empty: 'No items in this category.',
      },
      actions: {
        approve: 'Approve',
        reject: 'Reject',
      },
      toasts: {
        approved: 'Approved!',
        rejected: 'Rejected.',
        moderationEnabled: 'Moderation enabled',
        moderationDisabled: 'Moderation disabled — submissions go live instantly',
      },
    },
    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
    },
  },
  zh: {
    meta: {
      defaultTitle: 'AppBarn — 独立应用与系统工具展示',
    },
    nav: {
      products: '产品',
      apps: '应用',
      websites: '网站',
      tools: '工具',
      home: '首页',
      browse: '浏览',
      submit: '提交',
    },
    footer: {
      tagline: 'AppBarn — 刀把精选独立应用与系统工具展示。',
    },
    common: {
      app: '应用',
      system: '系统',
      systemTool: '系统工具',
      systemTools: '系统工具',
      website: '网站',
      websites: '网站',
      appStore: 'App Store',
      github: 'GitHub',
      visitSite: '访问网站',
      type: '类型',
      name: '名称',
      description: '描述',
      link: '链接',
      date: '日期',
      status: '状态',
      actions: '操作',
      searchPlaceholder: '搜索…',
      all: '全部',
      language: '语言',
      localeShort: {
        en: 'EN',
        zh: '中',
      },
      localeName: {
        en: 'English',
        zh: '中文',
      },
      noItemsYet: '暂无内容。',
    },
    home: {
      title: '精选产品',
      browseAll: '查看全部',
      empty: '暂时还没有产品，来成为第一个提交者。',
      emptyFiltered: '当前分类下还没有内容。',
    },
    list: {
      title: '浏览',
      heading: '全部产品',
      empty: '没有匹配当前筛选条件的内容。',
      filters: {
        all: '全部',
        app: '应用',
        website: '网站',
        system: '系统工具',
      },
    },
    submit: {
      title: '提交',
      heading: '提交产品',
      subtitle: '把你的应用、网站或系统工具分享给更多人。',
      moderationEnabled: '提交内容会先审核，再公开展示。',
      moderationDisabled: '提交后会立即上线。',
      tabs: {
        app: '应用',
        website: '网站',
        system: '系统工具',
      },
      labels: {
        name: '名称',
        description: '描述',
        linkApp: 'App Store 链接',
        linkWebsite: '网站链接',
        linkSystem: 'GitHub 链接',
        image: '图标 / 截图',
        optional: '可选',
      },
      placeholders: {
        name: '输入你的产品名称',
        description: '简要说明它的作用…',
        link: 'https://',
      },
      file: {
        upload: '点击上传图片',
        change: '更换图片',
        hint: '最大 5 MB。支持 PNG、JPG、WebP、SVG。',
      },
      actions: {
        submit: '提交产品',
        submitting: '提交中…',
      },
      success: {
        approved: '提交成功，产品已上线。',
        pending: '提交成功，等待审核。',
      },
      errors: {
        imageUploadFailed: '图片上传失败',
        submissionFailed: '提交失败',
        missingRequiredFields: '缺少必填字段',
        invalidType: '无效类型，必须是 app、website 或 system',
        noFileProvided: '未选择文件',
        unsupportedFileType: '不支持的文件类型',
        fileTooLarge: '文件过大（最大 5 MB）',
      },
    },
    admin: {
      title: '管理',
      heading: '管理后台',
      moderation: '审核',
      toggleTitle: '切换审核开关',
      filters: {
        pending: '待审核',
        approved: '已通过',
        rejected: '已拒绝',
        all: '全部',
      },
      login: {
        title: '管理员访问',
        subtitle: '输入管理令牌以继续。',
        placeholder: '管理员令牌',
        action: '进入',
      },
      errors: {
        invalidToken: '令牌无效。',
        connection: '连接失败。',
        empty: '当前分类下没有内容。',
      },
      actions: {
        approve: '通过',
        reject: '拒绝',
      },
      toasts: {
        approved: '已通过。',
        rejected: '已拒绝。',
        moderationEnabled: '已开启审核',
        moderationDisabled: '已关闭审核，提交后会立即上线',
      },
    },
    status: {
      pending: '待审核',
      approved: '已通过',
      rejected: '已拒绝',
    },
  },
} as const;

export type Messages = (typeof messages)[Locale];

function normalizeLocaleValue(input?: string | null): Locale | null {
  if (!input) {
    return null;
  }

  const normalized = input.trim().toLowerCase();
  if (normalized.startsWith('zh')) {
    return 'zh';
  }
  if (normalized.startsWith('en')) {
    return 'en';
  }
  return null;
}

function readCookie(cookieHeader: string | null | undefined, name: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [key, ...rest] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

function parseAcceptedLocale(acceptLanguageHeader: string | null | undefined): Locale | null {
  if (!acceptLanguageHeader) {
    return null;
  }

  const candidates = acceptLanguageHeader
    .split(',')
    .map((entry) => entry.split(';')[0]?.trim())
    .filter(Boolean);

  for (const candidate of candidates) {
    const locale = normalizeLocaleValue(candidate);
    if (locale) {
      return locale;
    }
  }

  return null;
}

export function detectLocale(
  cookieHeader: string | null | undefined,
  acceptLanguageHeader: string | null | undefined
): Locale {
  const cookieLocale = normalizeLocaleValue(readCookie(cookieHeader, LOCALE_COOKIE_NAME));
  if (cookieLocale) {
    return cookieLocale;
  }

  return parseAcceptedLocale(acceptLanguageHeader) ?? 'en';
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export function getRequestI18n(headers: Headers): { locale: Locale; messages: Messages } {
  const locale = detectLocale(headers.get('Cookie'), headers.get('Accept-Language'));
  return {
    locale,
    messages: getMessages(locale),
  };
}

export function getHtmlLang(locale: Locale): string {
  return locale === 'zh' ? 'zh-CN' : 'en';
}

export function getDateLocale(locale: Locale): string {
  return locale === 'zh' ? 'zh-CN' : 'en-US';
}

export function serializeForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
