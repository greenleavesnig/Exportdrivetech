CREATE TABLE `folders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`filename` text NOT NULL,
	`url` text NOT NULL,
	`alt` text NOT NULL,
	`folder_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`folder_id`) REFERENCES `folders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `media_tags` (
	`media_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rfq_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference_number` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`buyer_name` text NOT NULL,
	`company` text NOT NULL,
	`country` text NOT NULL,
	`destination` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`preferred_contact` text DEFAULT 'email' NOT NULL,
	`category` text NOT NULL,
	`product` text NOT NULL,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	`packaging` text,
	`delivery_timeline` text,
	`quality_requirement` text,
	`target_price` text,
	`incoterms` text,
	`shipping_method` text,
	`has_freight_forwarder` text,
	`special_requirements` text,
	`message` text,
	`referral_source` text,
	`quote_sent_date` integer,
	`follow_up_date` integer,
	`internal_notes` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rfq_submissions_reference_number_unique` ON `rfq_submissions` (`reference_number`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);