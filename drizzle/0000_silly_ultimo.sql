CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT '05c28ba3-8e1f-4e7e-834d-0ec183c6ab18' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `whiteboard` (
	`id` text PRIMARY KEY DEFAULT 'e10fb7b2-773f-4a4b-843c-29f962f0db62' NOT NULL,
	`name` text NOT NULL,
	`elements` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
