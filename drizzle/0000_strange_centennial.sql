CREATE TABLE `documents` (
	`id` text PRIMARY KEY DEFAULT 'bce419e4-781c-4b21-921b-2f16b1d54428' NOT NULL,
	`name` text NOT NULL,
	`path` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `knowledgebase` (
	`id` text PRIMARY KEY DEFAULT '4834a65d-d725-415f-9872-d37e99012df2' NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`document_ids` text DEFAULT '[]' NOT NULL
);
