CREATE TABLE `user` (
	`id` text PRIMARY KEY DEFAULT 'e80c794c-a1d6-4674-a1b2-592231101117' NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `whiteboard` (
	`id` text PRIMARY KEY DEFAULT 'e514171d-f6e5-4737-bc14-a77cf5bde9fb' NOT NULL,
	`name` text NOT NULL,
	`elements` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
