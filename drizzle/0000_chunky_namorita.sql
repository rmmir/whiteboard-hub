CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT '9c1fb80b-d657-475b-b004-9a11c2106242' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `whiteboard` (
	`id` text PRIMARY KEY DEFAULT 'f98253ea-98ce-45f8-b2c4-32a0f8b6b877' NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`elements` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
