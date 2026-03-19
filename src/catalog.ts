import type { Messages } from './i18n';
import type { AppType } from './types';

export interface AppTypeMeta {
  tagClass: string;
  label: string;
  sourceLabel: string;
  linkLabel: string;
  icon: string;
}

export function getTypeMetaMap(messages: Messages): Record<AppType, AppTypeMeta> {
  return {
    app: {
      tagClass: 'tag-app',
      label: messages.common.app,
      sourceLabel: messages.common.appStore,
      linkLabel: messages.common.appStore,
      icon: '📱',
    },
    system: {
      tagClass: 'tag-system',
      label: messages.common.systemTool,
      sourceLabel: messages.common.github,
      linkLabel: messages.common.github,
      icon: '⚙️',
    },
    website: {
      tagClass: 'tag-website',
      label: messages.common.website,
      sourceLabel: messages.common.website,
      linkLabel: messages.common.visitSite,
      icon: '🌐',
    },
  };
}

export function getTypeMeta(type: AppType, messages: Messages): AppTypeMeta {
  return getTypeMetaMap(messages)[type];
}
