import {
	INodeProperties,
} from 'n8n-workflow';

export const channelOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'channel',
				],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				description: 'Retrieve all channels',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a channel',
			},
			{
				name: 'Upload Banner',
				value: 'uploadBanner',
				description: 'Upload a channel banner',
			}
		],
		default: 'getAll',
		description: 'The operation to perform.'
	}
] as INodeProperties[];

export const channelFields = [
	/* -------------------------------------------------------------------------- */
	/*                                 channel:getAll                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Fields',
		name: 'part',
		type: 'multiOptions',
		options: [
			{
				name: 'Audit Details',
				value: 'auditDetails',
			},
			{
				name: 'Branding Settings',
				value: 'brandingSettings',
			},
			{
				name: 'Content Details',
				value: 'contentDetails',
			},
			{
				name: 'Content Owner Details',
				value: 'contentOwnerDetails',
			},
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Localizations',
				value: 'localizations',
			},
			{
				name: 'Snippet',
				value: 'snippet',
			},
			{
				name: 'Statistics',
				value: 'statistics',
			},
			{
				name: 'Status',
				value: 'status',
			},
			{
				name: 'Topic Details',
				value: 'topicDetails',
			},
		],
		required: true,
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
			},
		},
		description: 'The fields parameter specifies a comma-separated list of one or more channel resource properties that the API response will include.',
		default: ''
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
			},
		},
		default: false,
		description: 'If all results should be returned or only up to a given limit.',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
				returnAll: [
					false,
				],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		default: 100,
		description: 'How many results to return.',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'getAll',
				],
				resource: [
					'channel',
				],
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				description: 'The categoryId parameter specifies a YouTube guide category, thereby requesting YouTube channels associated with that category.',
			},
			{
				displayName: 'For Username',
				name: 'forUsername',
				type: 'string',
				default: '',
				description: `The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.`,
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				default: '',
				description: `The id parameter specifies a comma-separated list of the YouTube channel ID(s) for the resource(s) that are being retrieved. In a channel resource, the id property specifies the channel's YouTube channel ID.`,
			},
			{
				displayName: 'Managed By Me',
				name: 'managedByMe',
				type: 'boolean',
				default: false,
				description: `Set this parameter's value to true to instruct the API to only return channels managed by the content owner that the onBehalfOfContentOwner parameter specifies`,
			},
			{
				displayName: 'Mine',
				name: 'mine',
				type: 'boolean',
				default: false,
				description: `This parameter can only be used in a properly authorized request. Set this parameter's value to true to instruct the API to only return channels owned by the authenticated user.`,
			},
			{
				displayName: 'Language Code',
				name: 'h1',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getLanguages'
				},
				default: '',
				description: `The hl parameter instructs the API to retrieve localized resource metadata for a specific application language that the YouTube website supports.`,
			},
			{
				displayName: 'On Behalf Of Content Owner',
				name: 'onBehalfOfContentOwner',
				type: 'string',
				default: '',
				description: `The onBehalfOfContentOwner parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value`,
			},
		],
	},
	/* -------------------------------------------------------------------------- */
	/*                                 channel:update                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'channel',
				],
			},
		},
		options: [
			{
				displayName: 'Branding Settings',
				name: 'brandingSettingsUi',
				type: 'fixedCollection',
				default: {},
				description: 'Encapsulates information about the branding of the channel.',
				placeholder: 'Add Branding Settings',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'channelSettingsValues',
						displayName: 'Channel Settings',
						values: [
							{
								displayName: 'Channel',
								name: 'channel',
								type: 'collection',
								default: '',
								placeholder: 'Add Channel Settings',
								typeOptions: {
									multipleValues: false,
								},
								options: [
									{
										displayName: 'Country',
										name: 'country',
										type: 'string',
										default: '',
										description: 'The country with which the channel is associated. Update this property to set the value of the snippet.country property.',
									},
									{
										displayName: 'Description',
										name: 'description',
										type: 'string',
										default: '',
										description: `The channel description, which appears in the channel information box on your channel page. The property's value has a maximum length of 1000 characters.`,
									},
									{
										displayName: 'Default Language',
										name: 'defaultLanguage',
										type: 'string',
										default: '',
										description: 'The content tab that users should display by default when viewers arrive at your channel page.',
									},
									{
										displayName: 'Default Tab',
										name: 'defaultTab',
										type: 'string',
										default: 'The content tab that users should display by default when viewers arrive at your channel page.',
									},
									{
										displayName: 'Featured Channels Title',
										name: 'featuredChannelsTitle',
										type: 'string',
										default: '',
										description: 'The title that displays above the featured channels module. The title has a maximum length of 30 characters.',
									},
									{
										displayName: 'Featured Channels Urls',
										name: 'featuredChannelsUrls',
										type: 'string',
										typeOptions: {
											multipleValues: true,
										},
										description: 'A list of up to 100 channels that you would like to link to from the featured channels module. The property value is a list of YouTube channel ID values, each of which uniquely identifies a channel.',
										default: [],
									},
									{
										displayName: 'Keywords',
										name: 'keywords',
										type: 'string',
										typeOptions: {
											alwaysOpenEditWindow: true,
										},
										placeholder: 'tech,news',
										description: 'Keywords associated with your channel. The value is a space-separated list of strings.',
										default: '',
									},
									{
										displayName: 'Moderate Comments',
										name: 'moderateComments',
										type: 'boolean',
										description: 'This setting determines whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible.',
										default: false,
									},
									{
										displayName: 'Profile Color',
										name: 'profileColor',
										type: 'string',
										default: '',
										description: `A prominent color that complements the channel's content.`,
									},
									{
										displayName: 'Show Related Channels',
										name: 'showRelatedChannels',
										type: 'boolean',
										description: 'This setting indicates whether YouTube should show an algorithmically generated list of related channels on your channel page.',
										default: false,
									},
									{
										displayName: 'Show Browse View',
										name: 'showBrowseView',
										type: 'boolean',
										description: 'This setting indicates whether the channel page should display content in a browse or feed view.',
										default: false,
									},
									{
										displayName: 'Tracking Analytics AccountId',
										name: 'trackingAnalyticsAccountId',
										type: 'string',
										description: 'The ID for a Google Analytics account that you want to use to track and measure traffic to your channel.',
										default: '',
									},
									{
										displayName: 'Unsubscribed Trailer',
										name: 'unsubscribedTrailer',
										type: 'string',
										description: `The video that should play in the featured video module in the channel page's browse view for unsubscribed viewers.`,
										default: '',
									},
								],
							},
						],
						description: 'The channel object encapsulates branding properties of the channel page',
					},
					{
						name: 'imageSettingsValues',
						displayName: 'Image Settings',
						values: [
							{
								displayName: 'Image',
								name: 'image',
								type: 'collection',
								default: '',
								placeholder: 'Add Channel Settings',
								description: `The image object encapsulates information about images that display on the channel's channel page or video watch pages.`,
								typeOptions: {
									multipleValues: false,
								},
								options: [
									{
										displayName: 'Banner External Url',
										name: 'bannerExternalUrl',
										type: 'string',
										default: '',
									},
									{
										displayName: 'Tracking Image Url',
										name: 'trackingImageUrl',
										type: 'string',
										default: '',
									},
									{
										displayName: 'watch Icon Image Url',
										name: 'watchIconImageUrl',
										type: 'string',
										default: '',
									},
								],
							},
						],
					},
					{
						name: 'statusValue',
						displayName: 'Status',
						values: [
							{
								displayName: 'Status',
								name: 'status',
								type: 'collection',
								default: '',
								placeholder: 'Add Status',
								typeOptions: {
									multipleValues: false,
								},
								options: [
									{
										displayName: 'Self Declared Made For Kids',
										name: 'selfDeclaredMadeForKids',
										type: 'boolean',
										default: false,
									},
								],
							},
						],
					},
				],
			},
			{
				displayName: 'On Behalf Of Content Owner',
				name: 'onBehalfOfContentOwner',
				type: 'string',
				default: '',
			},
		],
	},
	/* -------------------------------------------------------------------------- */
	/*                                 channel:uploadBanner                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Channel ID',
		name: 'channelId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'uploadBanner',
				],
				resource: [
					'channel',
				],
			},
		},
		default: '',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'uploadBanner',
				],
				resource: [
					'channel',
				],
			},
		},
		default: 'data',
	},
] as INodeProperties[];
