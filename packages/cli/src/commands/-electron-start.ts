import { Flags } from '@oclif/core';
import { Container } from 'typedi';
import { BaseCommand } from './base-command';

import { Server } from '@/server';
import config from '@/config';

export class ElectronStart extends BaseCommand {
	static description = 'Starts n8n in Electron. Minimal startup with local editor.';

	static examples = ['$ n8n-electron start'];

	static flags = {
		help: Flags.help({ char: 'h' }),
		open: Flags.boolean({
			char: 'o',
			description: 'opens the UI automatically',
			default: true,
		}),
	};

	protected server = Container.get(Server);

	constructor() {
		super(process.argv, {});
	}

	async init() {
		const { flags } = await this.parse(ElectronStart);

		// Minimal configuration setup with full type requirements
		config.set('endpoints', {
			rest: 'default-rest-endpoint',
		});
		config.set('executions', {
			process: 'main',
			mode: 'regular',
			concurrency: {
				productionLimit: 10,
			},
			timeout: 3600, // 1 hour default
			maxTimeout: 86400, // 24 hours max
			saveDataOnError: 'default',
			saveDataOnSuccess: 'default',
			saveExecutionProgress: true,
			saveDataManualExecutions: false,
			queueRecovery: {
				interval: 30, // default interval
				batchSize: 10, // default batch size
			},
		});

		await super.init();

		// Minimal static asset generation
		await this.generateMinimalStaticAssets();

		if (flags.open) {
			this.openBrowser();
		}
	}

	private openBrowser() {
		// Placeholder for opening browser in Electron
		console.log('Opening UI');
	}

	private async generateMinimalStaticAssets() {
		// Simplified static asset generation
		console.log('Preparing Electron UI assets');
	}

	async run() {
		try {
			// Start the server
			await this.server.start();
		} catch (error) {
			console.error('Failed to start n8n server', error);
			process.exit(1);
		}
	}

	async catch(error: unknown) {
		console.error('Electron startup error', error);
		process.exit(1);
	}
}
