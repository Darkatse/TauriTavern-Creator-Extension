export type Locale = 'en' | 'zh-Hans' | 'zh-Hant';

export interface Messages {
    // Settings
    'settings.title': string;
    'settings.description': string;
    'settings.enableRuntime': string;
    'settings.enableRuntimeDesc': string;
    'settings.appearance': string;
    'settings.appearanceDesc': string;
    'settings.appearanceNight': string;
    'settings.appearanceDay': string;
    'settings.area.characterTools': string;
    'settings.area.extensionDev': string;
    'settings.area.memoryDev': string;
    'settings.featureCount': string;
    'settings.customIcon': string;
    'settings.customIconDesc': string;
    'settings.transparentBg': string;
    'settings.transparentBgDesc': string;
    'settings.uploadIcon': string;
    'settings.removeIcon': string;

    // Panel sidebar
    'panel.sidebarTitle': string;
    'panel.globalSettings': string;

    // WorldInfo feature
    'worldInfo.title': string;
    'worldInfo.featureDesc': string;
    'worldInfo.description': string;
    'worldInfo.legendConstant': string;
    'worldInfo.legendActivated': string;
    'worldInfo.emptyNoBatch': string;
    'worldInfo.emptyNoEntries': string;
    'worldInfo.factTrigger': string;
    'worldInfo.factCaptured': string;
    'worldInfo.factEntries': string;
    'worldInfo.factWorldbooks': string;
    'worldInfo.factConstant': string;
    'worldInfo.factTriggered': string;
    'worldInfo.badgeConstant': string;
    'worldInfo.badgeActivated': string;
    'worldInfo.groupStats': string;
    'worldInfo.bubbleTitle': string;
    'worldInfo.bubbleMessage': string;

    // LLM API feature
    'llmApi.title': string;
    'llmApi.featureDesc': string;
    'llmApi.description': string;
    'llmApi.keepLabel': string;
    'llmApi.apply': string;
    'llmApi.prev': string;
    'llmApi.next': string;
    'llmApi.reload': string;
    'llmApi.preview': string;
    'llmApi.raw': string;
    'llmApi.copyRequest': string;
    'llmApi.copyResponse': string;
    'llmApi.requestCopied': string;
    'llmApi.responseCopied': string;
    'llmApi.requestPreview': string;
    'llmApi.requestRaw': string;
    'llmApi.responsePreview': string;
    'llmApi.responseRaw': string;
    'llmApi.empty': string;
    'llmApi.loading': string;
    'llmApi.factStatus': string;
    'llmApi.factSource': string;
    'llmApi.factModel': string;
    'llmApi.factDuration': string;
    'llmApi.factResponse': string;
    'llmApi.factTimestamp': string;

    // Dev Logs feature
    'devLogs.title': string;
    'devLogs.featureDesc': string;
    'devLogs.description': string;
    'devLogs.tabFrontend': string;
    'devLogs.tabBackend': string;
    'devLogs.filterPlaceholder': string;
    'devLogs.captureConsole': string;
    'devLogs.copyVisible': string;
    'devLogs.copied': string;
    'devLogs.clearView': string;
    'devLogs.emptyFiltered': string;
    'devLogs.emptyNone': string;
    'devLogs.summaryLine': string;
    'devLogs.bubbleFrontendWarn': string;
    'devLogs.bubbleFrontendError': string;
    'devLogs.bubbleBackendWarn': string;
    'devLogs.bubbleBackendError': string;

    // Chat Lab feature
    'chatLab.title': string;
    'chatLab.featureDesc': string;
    'chatLab.description': string;
    'chatLab.refreshContext': string;
    'chatLab.contextEmpty': string;
    'chatLab.tabFindLast': string;
    'chatLab.tabSearch': string;
    'chatLab.findLastTitle': string;
    'chatLab.findLastDesc': string;
    'chatLab.fieldExtraKeys': string;
    'chatLab.fieldRole': string;
    'chatLab.fieldLimit': string;
    'chatLab.fieldQuery': string;
    'chatLab.fieldQueryPlaceholder': string;
    'chatLab.btnLocate': string;
    'chatLab.btnSearch': string;
    'chatLab.searchTitle': string;
    'chatLab.searchDesc': string;
    'chatLab.resultsTitle': string;
    'chatLab.resultsDesc': string;
    'chatLab.viewPretty': string;
    'chatLab.viewRaw': string;
    'chatLab.copyJson': string;
    'chatLab.jsonCopied': string;
    'chatLab.stateLoading': string;
    'chatLab.stateEmpty': string;
    'chatLab.errorNoChat': string;
    'chatLab.noResult': string;
    'chatLab.roleAny': string;
    'chatLab.roleUser': string;
    'chatLab.roleAssistant': string;
    'chatLab.roleSystem': string;
    'chatLab.factMode': string;
    'chatLab.factKind': string;
    'chatLab.factChat': string;
    'chatLab.factWindow': string;
    'chatLab.windowEmpty': string;
    'chatLab.chatUnavailable': string;

    // Common
    'common.expandView': string;
    'common.close': string;
    'common.unknownModel': string;
}
