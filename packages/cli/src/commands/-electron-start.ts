import { Flags } from '@oclif/core';
import { Container } from 'typedi';
import { BaseCommand } from './base-command';

import { Server } from '@/server';
import { ActiveWorkflowManager } from '@/active-workflow-manager';
import { UrlService } from '@/services/url.service';
import config from '@/config';
import { Logger } from '@/utils/logger';

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

	protected activeWorkflowManager: ActiveWorkflowManager;
	protected server = Container.get(Server);
	protected logger: Logger;

	override needsCommunityPackages = false;

	constructor() {
		super();
		this.logger = Container.get(Logger);
	}

	private openBrowser() {
		const editorUrl = Container.get(UrlService).baseUrl;
		// In Electron, use Electron's shell to open URL
		// This will be replaced with Electron-specific opening method
		this.logger.info(`Opening UI at: ${editorUrl}`);
	}

	async init() {
		this.logger.info('Initializing n8n Electron process');

		// Minimal initialization
		await this.initCrashJournal();

		const { flags } = await this.parse(ElectronStart);

		// Use type-safe config access
		config.set('endpoints', {
			...config.get('endpoints'),
			disableUi: false,
		});
		config.set('executions', {
			...config.get('executions'),
			mode: 'regular',
		});

		await super.init();
		this.activeWorkflowManager = Container.get(ActiveWorkflowManager);

		// Minimal static asset generation
		if (!config.get('endpoints').disableUi) {
			await this.generateMinimalStaticAssets();
		}

		if (flags.open) {
			this.openBrowser();
		}
	}

	private async generateMinimalStaticAssets() {
		// Simplified static asset generation
		// Assumes editor files are already in place
		this.logger.info('Preparing Electron UI assets');
	}

	async run() {
		try {
			// Start the server
			await this.server.start();
		} catch (error) {
			this.logger.error('Failed to start n8n server', {
				error: error instanceof Error ? error.message : String(error),
			});
			process.exit(1);
		}
	}

	async catch(error: unknown) {
		this.logger.error('Electron startup error', {
			error: error instanceof Error ? error.message : String(error),
		});
		process.exit(1);
	}
}
