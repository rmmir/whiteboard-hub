CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT 'c06fdb9d-bab2-4e64-90cc-a492401ae8fe' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `whiteboard` (
	`id` text PRIMARY KEY DEFAULT '9aef031b-9365-45ca-9d42-b5eb84520cb5' NOT NULL,
	`name` text NOT NULL,
	`elements` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
