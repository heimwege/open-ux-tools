import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { initIcons } from '@sap-ux/ui-components';
import type { Scenario } from '@sap-ux-private/control-property-editor-common';
import { enableTelemetry } from '@sap-ux-private/control-property-editor-common';
import { initI18n } from './i18n';

import './index.css';
import App from './App';
import { store } from './store';
import type { ThemeName } from './components';
import { setThemeOnDocument } from './components';
import { registerAppIcons } from './icons';
import { setProjectScenario } from './slice';

export interface StartOptions {
    previewUrl: string;
    rootElementId: string;
    telemetry?: boolean;
    scenario: Scenario;
}

/**
 *  Start Control Property Editor with options.
 *
 * @param options StartOptions
 */
export function start(options: StartOptions): void {
    const { previewUrl, rootElementId, telemetry = false, scenario } = options;
    if (telemetry) {
        enableTelemetry();
    }
    initI18n();
    registerAppIcons();
    initIcons();

    const theme = localStorage.getItem('theme') ?? 'dark';
    setThemeOnDocument(theme as ThemeName);

    store.dispatch(setProjectScenario(scenario));

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App previewUrl={previewUrl} scenario={scenario} />
            </Provider>
        </React.StrictMode>,
        document.getElementById(rootElementId)
    );
}
