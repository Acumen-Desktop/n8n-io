import path from 'path';

// Type for app path getter function
type AppPathGetter = (name: 'userData' | 'cache' | 'logs') => string;

// Dependency injection for app path getter
export function createElectronConfig(getAppPath: AppPathGetter) {
	return {
		// Electron-specific configuration
		paths: {
			// Use Electron's app paths for data storage
			userData: getAppPath('userData'),
			cache: getAppPath('cache'),
			logs: getAppPath('logs'),
		},

		database: {
			type: 'sqlite',
			sqlite: {
				// Use Electron app's user data directory for database
				filename: path.join(getAppPath('userData'), 'n8n.sqlite'),
			},
		},

		endpoints: {
			// Disable external endpoints
			disableUi: false,
			rest: '/api',
		},

		// Disable external services
		externalHooks: {
			enabled: false,
		},

		// Minimal licensing for Electron
		license: {
			autoRenewalEnabled: false,
		},

		// Disable cloud/external features
		cloud: {
			enabled: false,
		},

		// Minimal execution mode
		executions: {
			mode: 'regular', // Local execution only
			maxResults: 250, // Limit results for performance
			process: 'main', // Explicitly set process type
		},

		// Disable community packages in Electron
		nodes: {
			communityPackages: {
				enabled: false,
			},
		},
	};
}

// Default export for cases where path getter is not provided
export const ElectronConfig = createElectronConfig((name) => {
	// Fallback path for non-Electron environments
	const basePath = process.cwd();
	const pathMap = {
		userData: path.join(basePath, '.n8n', 'userData'),
		cache: path.join(basePath, '.n8n', 'cache'),
		logs: path.join(basePath, '.n8n', 'logs'),
	};
	return pathMap[name];
});
